import { Form, Input } from "../components/Auth-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { emailPattern, passwordPattern } from "../utils/patterns";

export interface ILoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onLoginFormValid: SubmitHandler<ILoginFormData>;
}

const LoginForm: React.FC<LoginFormProps> = ({onLoginFormValid}) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ILoginFormData>();

  return (
    <Form onSubmit={handleSubmit(onLoginFormValid)}>
      <Input
        {...register("email", {
          required: "email을 입력해 주세요.",
          pattern: {
            value: emailPattern,
            message: "올바르지 않은 email형식입니다.",
          },
        })}
        placeholder="Email"
      />
      <Input
        {...register("password", {
          required: "password를 입력해 주세요.",
          pattern: passwordPattern,
        })}
        name="password"
        placeholder="Password"
        type="password"
        required
      />
      <Input
        type="submit"
        value={isSubmitting ? "Loading..." : "Login"}
      />
    </Form>
  );
};

export default LoginForm;
