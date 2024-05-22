"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  AuthContextProps,
  AuthContextProviderProps,
  UserProps,
} from './interface'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { DEFAULT_USER } from './constant'
import axios from 'axios'

const AuthContext = createContext({
  token: '',
  isLoading: false,
  isAuthenticated: false,
  user: DEFAULT_USER,
  logout: () => {},
} as AuthContextProps) // TODO: Declare interface of contextValue

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [token, setToken] = useState<string>('')
  const [user, setUser] = useState<UserProps>(DEFAULT_USER)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const getData = async (jwt: string = Cookies.get('token') as string) => {
    try {
      setIsLoading(true)
      const res = await axios.get(`/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      const user = res?.data as UserProps
      setIsAuthenticated(true)
      setUser(user)
      setToken(jwt)
    } catch (error: any) {
      console.log(error)
      setToken('')
      setIsAuthenticated(false)
      setUser(DEFAULT_USER)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true)
      setIsAuthenticated(false)
      setToken('')
      setUser(DEFAULT_USER)
      Cookies.remove('token')
      window.location.replace(
        ``
      )
    } finally {
      setIsLoading(false)
    }
  }

  const contextValue = {
    token: token,
    user: user,
    isLoading: isLoading,
    isAuthenticated: isAuthenticated,
    logout: logout,
    getData: getData,
  }

  useEffect(() => {
    if (router.asPath.includes('token')) {
      const jwt = router.asPath.split('?token=')[1]
      Cookies.remove('token')

      Cookies.set('token', jwt)
      router.push('/')
    } else if (Cookies.get('token')) {
      const jwt = Cookies.get('token') as string
      getData(jwt)
    }
  }, [router.asPath])

  useEffect(() => {
    if (Cookies.get('token')) {
      const jwt = Cookies.get('token') as string
      getData(jwt)
    }
  }, [])

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
