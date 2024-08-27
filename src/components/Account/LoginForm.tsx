import { Form, Input, Error } from "./Auth-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { emailPattern, passwordPattern } from "../../utils/patterns";

export interface ILoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onLoginFormValid: SubmitHandler<ILoginFormData>;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginFormValid }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginFormData>();

  return (
    <Form onSubmit={handleSubmit(onLoginFormValid)}>
      <Input
        {...register("email", {
          required: "email을 입력해 주세요.",
          pattern: {
            value: emailPattern,
            message: "올바르지 않은 email 형식입니다.",
          },
        })}
        placeholder="Email"
      />
      {errors.email && <Error>{errors.email.message}</Error>}
      <Input
        {...register("password", {
          required: "password를 입력해 주세요.",
          pattern: {
            value: passwordPattern,
            message: "올바르지 않은 password 형식입니다.",
          },
        })}
        name="password"
        placeholder="Password"
        type="password"
      />
      {errors.password && <Error>{errors.password.message}</Error>}
      <Input type="submit" value={isSubmitting ? "Loading..." : "Login"} />
    </Form>
  );
};

export default LoginForm;
