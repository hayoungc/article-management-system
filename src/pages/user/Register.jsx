import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { history } from "../../services";
import { userActions, alertActions } from "../../app/store";

import {
  StyledForm,
  StyledInput,
  StyledButton,
  StyledTitle,
  StyledWarning,
  StyledFooter,
  StyledSpinner,
} from "../../styles/CommonStyle";

export function Register() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  async function onSubmit(data) {
    dispatch(alertActions.clear());
    try {
      await dispatch(userActions.register(data)).unwrap();

      history.navigate("/login");
      dispatch(
        alertActions.success({
          message: "Successfully registered!",
          showAfterRedirect: true,
        })
      );
    } catch (error) {
      dispatch(alertActions.error(error));
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledTitle>Register</StyledTitle>

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

      <label htmlFor="password">Password</label>
      <StyledInput
        id="password"
        name="password"
        type="password"
        ref={password}
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

      <label htmlFor="passwordConfirm">Password confirm</label>
      <StyledInput
        id="passwordConfirm"
        type="password"
        autoComplete="off"
        {...register("passwordConfirm", {
          required: "Password confirm is required",
          validate: (value) =>
            value === password.current || "The passwords do not match",
        })}
      />
      {errors.passwordConfirm?.message && (
        <StyledWarning>{errors.passwordConfirm.message}</StyledWarning>
      )}

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
        Sign Up
      </StyledButton>

      <StyledFooter>
        Already have an account? <Link to="../login">Login</Link>
      </StyledFooter>
    </StyledForm>
  );
}
