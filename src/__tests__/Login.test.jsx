import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "./test-utils";
import { Login } from "../pages/user";
import userEvent from "@testing-library/user-event";

test("Login component test...", async () => {
  renderWithProviders(<Login />, {
    route: "/login",
  });

  expect(screen.getByText(/Register/i)).toBeInTheDocument();
  expect(
    screen.queryByText(/Already have an account?\.\.\./i)
  ).not.toBeInTheDocument();

  fireEvent.click(screen.getByText("Login"));
  expect(screen.getByText(/Password/i)).toBeInTheDocument();

  const user = userEvent.setup();
  const email = screen.getByLabelText("Email");
  await user.type(email, "hayoungcau@gmail.com");

  const password = screen.getByLabelText("Password");
  await user.type(password, "1");

  expect(email).toHaveValue("hayoungcau@gmail.com");
  expect(password).toHaveValue("1");
  fireEvent.click(screen.getByText("Login"));

  await user.type(password, "1111111");
  expect(password).toHaveValue("11111111");
  fireEvent.click(screen.getByText("Login"));
});
