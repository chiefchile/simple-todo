import { default as React, useState } from "react";
import { default as Todo, API_HOST } from "./todo";
import "./index.css";
import { Login } from "./login";
import axios from "axios";
import User from "./user";
import IResult, { Result } from "./result";

export function App() {
  const [loginResult, setLoginResult] = useState<IResult | null>(null);
  const [authToken, setAuthToken] = useState<string>("");

  function login(user: User): void {
    axios
      .post(`${API_HOST}/api-token-auth/`, user)
      .then((res) => {
        setAuthToken(res.data.token);
      })
      .catch((error) => {
        if (error.response) {
          let msg = "";
          if (error.response.status === 400) {
            msg = "Invalid username or password";
          } else {
            msg = "Internal Server Error";
          }
          setLoginResult(new Result(error.response.status, msg));
        }
        console.error(error);
      });
  }

  function loginAsGuest(): void {
    let guest: User = { username: "guest", password: "guest" };
    login(guest);
  }

  return (
    <div>
      {authToken ? (
        <Todo authToken={authToken} />
      ) : (
        <Login
          onSubmit={(user: User) => login(user)}
          onLoginAsGuest={() => loginAsGuest()}
          loginResult={loginResult}
        />
      )}
    </div>
  );
}
