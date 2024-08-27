import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import {
  Title,
  Wrapper,
  Switcher,
  Error,
} from "../components/Account/Auth-components";
import GithubBtn from "../components/Account/githubBtn";
import LoginForm, { ILoginFormData } from "../components/Account/LoginForm";
import FirebaseErrorHandler from "../components/Account/FirebaseErrorHandler";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onLoginFormValid: SubmitHandler<ILoginFormData> = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.code);
        console.log(error);
      }
    }
  };
  return (
    <Wrapper>
      <Title>Login</Title>
      <LoginForm onLoginFormValid={onLoginFormValid} />
      {error !== "" ? <Error>{FirebaseErrorHandler(error)}</Error> : null}
      <Switcher>
        Dont't have an account?{" "}
        <Link to="/create-account">Create One &rarr;</Link>
      </Switcher>
      <GithubBtn />
    </Wrapper>
  );
};

export default Login;
