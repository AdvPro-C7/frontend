export interface UserProps {
  id: number
  email: string
  full_name: string
  is_staff: boolean
  username: string
}
export interface AuthContextProps {
  user: UserProps
  token: string
  isLoading: boolean
  isAuthenticated: boolean
  logout: () => void
  getData: () => void
}
export interface AuthContextProviderProps {
  children: React.ReactNode
}
