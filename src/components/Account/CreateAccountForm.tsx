import { SubmitHandler, useForm } from "react-hook-form";

import { emailPattern, passwordPattern } from "../../utils/patterns";
import { Error, Form, Input } from "../Account/Auth-components";

export interface IAuthFormData {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
}

interface CreateAccountFormProps {
  onAuthFormValid: SubmitHandler<IAuthFormData>;
}

const CreateAccountForm: React.FC<CreateAccountFormProps> = ({
  onAuthFormValid,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IAuthFormData>();
  return (
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
            value: emailPattern,
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
            value: passwordPattern,
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
            value: passwordPattern,
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
      />
    </Form>
  );
};

export default CreateAccountForm;
