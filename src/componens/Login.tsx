import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ILoginRequest, useSignInMutation } from "../store/auth/auth.api";
import { setCredentials } from "../store/auth/auth.slice";
import { useAppDispatch } from "../store/hooks";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formState, setFormState] = useState<ILoginRequest>({
    email: "test@mail.com",
    password: "testPassword",
  });

  const [signIn, { error: errorUser }] = useSignInMutation();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const handleSubmitSignIn = async (e: FormEvent) => {
    e.preventDefault();
    const user = await signIn(formState).unwrap();
    dispatch(setCredentials(user));
    navigate("/contacts");
  };

  return (
    <div className="login">
      <h2 className="login__caption">Вход</h2>
      <form className="login-form" onSubmit={handleSubmitSignIn}>
        <label className="login-form__label-text-field" htmlFor="emailInput">
          <span className="login-form__label-text">Логин</span>
          <input
            type="text"
            value={formState.email}
            onChange={handleChange}
            name="email"
            id="emailInput"
          />
        </label>
        <label className="login-form__label-text-field" htmlFor="passwordInput">
          <span className="login-form__label-text">Пароль</span>
          <input
            type="password"
            value={formState.password}
            onChange={handleChange}
            name="password"
            id="passwordInput"
          />
        </label>
        <button type="submit" className="login-form__button-sign-in">
          Войти
        </button>
      </form>
      {errorUser && JSON.stringify(errorUser, null, 2)}
    </div>
  );
};

export default Login;
