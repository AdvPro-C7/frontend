"use client";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import sha56 from "crypto-js/sha256";
import { userContext } from "@/app/contexts/AuthContext";
import "./auth.css";

const authServerDomain = "https://auth-b4rcuut5xa-ew.a.run.app";

function toggleAccordions(event: { target: any }) {
  const accordion = event.target.parentNode;

  const content = accordion.parentNode.nextElementSibling;

  content.style.maxHeight = content.style.maxHeight
    ? null
    : content.scrollHeight + "px";

  accordion.querySelector(".icon").classList.toggle("active-icon");
}

const encryptPassword = (input: string) => sha56(input).toString();

function togglePopUp(message: string) {
  document.getElementById("popup-message")!.innerText = message;

  document.getElementById("popup")!.style.display = message ? "block" : "none";
}

function closePupUp() {
  document.getElementById("popup")!.style.display = "none";
}

interface LoginFormValues {
  id: string;
  password: string;
}

interface RegistrationFormValues {
  username: string;
  emailAddress: string;
  phoneNumber: string;
  password: string;
}

export default function authPage() {
  const { state, setState } = userContext();
  const router = useRouter();

  useEffect(() => {
    if (state.authenticated) router.push("/");
  }, []);

  async function handleSubmit(endpoint: string, data: Record<string, any>) {
    console.log("Submitting data:", data);
    try {
      const response = await fetch(authServerDomain + endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: endpoint == "/login" ? "include" : "omit",
        body: JSON.stringify(data),
      });

      const body = await response.json();

      if (response.ok) {
        togglePopUp(body.message);

        if (endpoint == "/login") {
          const modifiedState = { ...state };
          modifiedState.id = body.user.id;
          modifiedState.name = body.user.nama;
          modifiedState.sex = body.user.jenisKelamin;
          modifiedState.photoLink = body.user.foto;
          modifiedState.email = body.user.email;
          modifiedState.phoneNum = body.user.noTelp;
          modifiedState.birthDate = body.user.tanggalLahir;
          modifiedState.bio = body.user.bio;
          modifiedState.warningCount = body.user.jumlahPeringatan;
          modifiedState.role = body.user.role;
          modifiedState.authenticated = true;

          setState(modifiedState);
          localStorage.setItem("userState", JSON.stringify(modifiedState));

          router.push("/");
        }
      } else {
        togglePopUp(body.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);

      togglePopUp("An error occurred.");
    }
  }

  const [loginForm, setLoginForm] = useState<LoginFormValues>({
    id: "",
    password: "",
  });

  const [registrationForm, setRegistrationForm] =
    useState<RegistrationFormValues>({
      username: "",
      emailAddress: "",
      phoneNumber: "",
      password: "",
    });

  const handleLoginInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setLoginForm((prevLoginForm) => ({
      ...prevLoginForm,
      [name]: value,
    }));
  };

  const handleRegistrationInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setRegistrationForm((prevRegistrationForm) => ({
      ...prevRegistrationForm,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async () => {
    const { id, password } = loginForm;

    const encryptedPassword = encryptPassword(password);

    await handleSubmit("/login", {
      id: id,
      password: encryptedPassword,
    });
  };

  const handleRegistrationSubmit = async () => {
    const { username, emailAddress, phoneNumber, password } = registrationForm;

    if (username.includes("#")) {
      togglePopUp("Username cannot contain hash.");
    } else {
      const encryptedPassword = encryptPassword(password);

      await handleSubmit("/register", {
        name: username,
        emailAddress: emailAddress,
        phoneNumber: phoneNumber,
        password: encryptedPassword,
      });
    }

    setRegistrationForm((_) => ({
      username: "",
      emailAddress: "",
      phoneNumber: "",
      password: "",
    }));
  };

  return (
    <div className="w-full text-black-100 flex justify-center text-center item-center flex-col text-black p-36 py-40 min-h-screen">
      <div id="popup">
        <div className="popup-content">
          <span className="close-btn" onClick={closePupUp}>
            &times;
          </span>
          <h2>Message</h2>
          <p id="popup-message"></p>
        </div>
      </div>
      <div id="auth-form" className="accordion">
        <div className="accordion-item">
          <div className="accordion-header">
            <h2>Register</h2>
            <button className="accordion-btn" onClick={toggleAccordions}>
              <span className="icon"></span>
            </button>
          </div>
          <div id="reg-content">
            <div className="form">
              <label htmlFor="reg-username">Name:</label>
              <input
                type="text"
                id="reg-username"
                name="username"
                className="bg-white-100"
                value={registrationForm.username}
                onChange={handleRegistrationInputChange}
                required
              />
              <label htmlFor="reg-email-address">Email Address:</label>
              <input
                type="text"
                id="reg-email-address"
                name="emailAddress"
                className="bg-white-100"
                value={registrationForm.emailAddress}
                onChange={handleRegistrationInputChange}
                required
              />
              <label htmlFor="reg-phone-number">Phone Number:</label>
              <input
                type="text"
                id="reg-phone-number"
                name="phoneNumber"
                 className="bg-white-100"
                value={registrationForm.phoneNumber}
                onChange={handleRegistrationInputChange}
                required
              />
              <label htmlFor="reg-password">Password:</label>
              <input
                type="password"
                id="reg-password"
                name="password"
                 className="bg-white-100"
                value={registrationForm.password}
                onChange={handleRegistrationInputChange}
                required
              />
              <button
                type="button"
                id="reg-submit-btn"
                onClick={handleRegistrationSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <div className="accordion-header">
            <h2>Login</h2>
            <button className="accordion-btn" onClick={toggleAccordions}>
              <span className="icon"></span>
            </button>
          </div>
          <div id="login-content">
            <div className="form">
              <label className="text-left" htmlFor="login-id">Email Address/Phone Number:</label>
              <input
                type="text"
                id="login-id"
                name="id"
                 className="bg-white-100"
                value={loginForm.id}
                onChange={handleLoginInputChange}
                required
              />
              <label htmlFor="login-password">Password:</label>
              <input
                type="password"
                id="login-password"
                name="password"
                 className="bg-white-100"
                value={loginForm.password}
                onChange={handleLoginInputChange}
                required
              />
              <button
                type="button"
                id="login-submit-btn"
                onClick={handleLoginSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
