"use client";
import React, { useEffect, useState } from "react";
import sha56 from "crypto-js/sha256";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("authenticated") != null) router.push("/");
  }, []);

  async function handleSubmit(endpoint: string, data: Record<string, any>) {
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
          localStorage.setItem("name", body.user.nama);
          localStorage.setItem("sex", body.user.jenisKelamin);
          localStorage.setItem("photoLink", body.user.foto);
          localStorage.setItem("emailAddress", body.user.email);
          localStorage.setItem("phoneNum", body.user.noTelp);
          localStorage.setItem("birthDate", body.user.tanggalLahir);
          localStorage.setItem("bio", body.user.bio);
          localStorage.setItem(
            "warningCount",
            body.user.jumlahPeringatan.toString()
          );
          localStorage.setItem("role", body.user.role);
          localStorage.setItem("authenticated", true.toString());

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
    <main>
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
                value={registrationForm.username}
                onChange={handleRegistrationInputChange}
                required
              />
              <label htmlFor="reg-email-address">Email Address:</label>
              <input
                type="text"
                id="reg-email-address"
                name="email"
                value={registrationForm.emailAddress}
                onChange={handleRegistrationInputChange}
                required
              />
              <label htmlFor="reg-phone-number">Phone Number:</label>
              <input
                type="text"
                id="reg-phone-number"
                name="phoneNumber"
                value={registrationForm.phoneNumber}
                onChange={handleRegistrationInputChange}
                required
              />
              <label htmlFor="reg-password">Password:</label>
              <input
                type="password"
                id="reg-password"
                name="password"
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
              <label htmlFor="login-id">Email Address/Phone Number:</label>
              <input
                type="text"
                id="login-id"
                name="id"
                value={loginForm.id}
                onChange={handleLoginInputChange}
                required
              />
              <label htmlFor="login-password">Password:</label>
              <input
                type="password"
                id="login-password"
                name="password"
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
    </main>
  );
}
