import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../app/store";
import { StyledSpinner } from "../../styles/CommonStyle";

import {
  StyledForm,
  StyledInput,
  StyledButton,
  StyledTitle,
  StyledWarning,
  StyledFooter,
} from "../../styles/CommonStyle";

export function Login() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = ({ email, password }) => {
    return dispatch(authActions.login({ email, password }));
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledTitle>Login</StyledTitle>

      <label htmlFor="email">Email</label>
      <StyledInput
        id="email"
        {...register("email", {
          required: "Email is required",
          validate: {
            maxLength: (v) =>
              v.length <= 50 || "The email should have at most 50 characters",
            matchPattern: (v) =>
              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
              "Email address must be a valid address",
          },
        })}
      />
      {errors.email?.message && (
        <StyledWarning>{errors.email.message}</StyledWarning>
      )}
      <br />
      <label htmlFor="password">Password </label>
      <StyledInput
        id="password"
        name="password"
        type="password"
        autoComplete="off"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters",
          },
        })}
      />
      {errors.password?.message && (
        <StyledWarning>{errors.password.message}</StyledWarning>
      )}
      <br />
      <StyledButton type="primary" disabled={isSubmitting}>
        {isSubmitting && (
          <StyledSpinner viewBox="0 0 30 30">
            <circle
              className="path"
              cx="15"
              cy="15"
              r="10"
              fill="none"
              strokeWidth="2"
            />
          </StyledSpinner>
        )}
        Next
      </StyledButton>
      <StyledFooter>
        Don't have an account? <Link to="../register">Register</Link>
      </StyledFooter>
    </StyledForm>
  );
}
