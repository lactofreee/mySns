import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";

import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import {
  Error,
  Switcher,
  Title,
  Wrapper,
} from "../components/Account/Auth-components";
import GithubBtn from "../components/Account/githubBtn";
import CreateAccountForm, {
  IAuthFormData,
} from "../components/Account/CreateAccountForm";
import FirebaseErrorHandler from "../components/Account/FirebaseErrorHandler";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onAuthFormValid: SubmitHandler<IAuthFormData> = async (data) => {
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(credentials.user);

      // Update user profile
      await updateProfile(credentials.user, {
        displayName: data.name,
      });

      // redirect to the home page
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.code);
      }
    }
  };

  return (
    <Wrapper>
      <Title>sign up</Title>
      <CreateAccountForm onAuthFormValid={onAuthFormValid}></CreateAccountForm>
      {error !== "" ? <Error>{FirebaseErrorHandler(error)}</Error> : null}
      <Switcher>
        Already have an account? <Link to="/login">Log in &rarr;</Link>
      </Switcher>
      <GithubBtn />
    </Wrapper>
  );
};

export default CreateAccount;
