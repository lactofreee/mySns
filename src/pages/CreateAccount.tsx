import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import {
  Title,
  Wrapper,
  Form,
  Input,
  Switcher,
  Error,
} from "../components/Auth-components";
import GithubBtn from "../components/githubBtn";
import { SubmitHandler, useForm } from "react-hook-form";
import FirebaseErrorHandler from "../components/FirebaseErrorHandler";

interface IAuthFormData {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
}

const CreateAccount = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<IAuthFormData>();

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
        setError(e.message);
        console.log(errors);
      }
    }
  };

  return (
    <Wrapper>
      <Title>sign up</Title>
      <Form onSubmit={handleSubmit(onAuthFormValid)}>
        <Input
          {...register("name", {
            required: "이름을 입력해주세요.",
            minLength: {
              value: 2,
              message: "2글자 이상 입력해주세요.",
            },
          })}
          placeholder="Name"
        />
        {errors.name && <Error>{errors.name.message}</Error>}
        <Input
          {...register("email", {
            required: "이메일을 입력해 주세요.",
            maxLength: {
              value: 254,
              message: "허용 길이를 초과하였습니다.",
            },
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
              message: "올바르지 않은 email형식입니다.",
            },
          })}
          placeholder="Email"
        />
        {errors.email && <Error>{errors.email.message}</Error>}
        <Input
          {...register("password", {
            required: "비밀번호를 입력해 주세요.",
            pattern: {
              value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/,
              message:
                "8~20자의 영문, 숫자, 특수문자를 모두 포함한 비밀번호를 입력해주세요.",
            },
          })}
          placeholder="Password"
        />
        {errors.password && <Error>{errors.password.message}</Error>}
        <Input
          {...register("passwordCheck", {
            required: "비밀번호를 입력해 주세요.",
            pattern: {
              value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/,
              message:
                "8~20자의 영문, 숫자, 특수문자를 모두 포함한 비밀번호를 입력해주세요.",
            },
          })}
          placeholder="Password_Check"
        />
        {errors.passwordCheck && <Error>{errors.passwordCheck.message}</Error>}
        <Input
          type="submit"
          value={isSubmitting ? "Loading..." : "Create Account"}
          disabled={!isDirty || !isValid}
        />
      </Form>
      {error !== "" ? <Error>{FirebaseErrorHandler(error)}</Error> : null}
      <Switcher>
        Already have an account? <Link to="/login">Log in &rarr;</Link>
      </Switcher>
      <GithubBtn />
    </Wrapper>
  );
};

export default CreateAccount;
