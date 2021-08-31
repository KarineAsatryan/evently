
import React, { useState } from "react";
import { Router, useHistory } from "react-router-dom";
import { logIn, signUp } from "../../constants/constants";
import { useAuth } from "../../contexts/AuthContext";
import {Routes} from "../../constants/routes";
import Button from "../Button/Button";
import Input from "../Inputs/Input";
import {
  titleLogin,
  inputWrapper,
  emailInput,
  emailPassword,
  emailPassStyle,
  emailPassLabel,
  buttonContainer,
} from "./LoginSign.style";

export let Child = (props) => {
  let { setIsLoggedIn } = props;
  const [login, setLogin] = useState(false);
  const [name, setName] = useState(signUp);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { userSignUp, currentUser } = useAuth();

  function handleLogin(event) {
    event.stopPropagation();
    setName(logIn);
    setLogin(true);
  }
  function handleSign(event) {
    event.stopPropagation();
    setName(signUp);
    setLogin(false);
    history.push(Routes.signup().path);
  }

  async function handleSubmit() {
    setIsLoggedIn(true);

    try {
      await userSignUp(email, password);
    } catch {
      console.log("error");
    }
  }

  function handleEmail(event) {
    setEmail(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }

  return (
    <>
      {login ? (
        <div>
          <h2 className={titleLogin}>{signUp}</h2>
        </div>
      ) : (
        <div>
          <h2 className={titleLogin}>{logIn}</h2>
        </div>
      )}

      <div className={inputWrapper}>
        <div className={emailInput}>
          <div className={emailPassword}>
            <Input
              onChange={handleEmail}
              id="email"
              name="email"
              type="text"
              className={emailPassStyle}
              placeholder="Email address"
            />
            <label className={emailPassLabel}>Email Address</label>
          </div>
          <div className={emailPassword}>
            <Input
              onChange={handlePassword}
              id="password"
              name="password"
              type="password"
              className={emailPassStyle}
              placeholder="Password"
            />
            <label className={emailPassLabel}>Password</label>
          </div>
          <div>
            <span className="underline text-custom-current hover:text-purple-700 cursor-pointer" onClick={handleSign}>
              {name}
            </span>
          </div>
          {login ? (
            <div className={emailPassword}>
              {/* <span className="underline" onClick={handleSign}>
                {name}

              </span> */}

              <Button onClick={handleSubmit} name={signUp} />
            </div>
          ) : (
            <div className={emailPassword}>
              {/* <span className="underline" onClick={handleLogin}>
                {name}

              </span> */}
              <div className={buttonContainer}>
                <Button onClick={handleSubmit} name={logIn} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
