import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "./test-utils";
import { Register } from "../pages/user";
import userEvent from "@testing-library/user-event";

export const handlers = [
  rest.get("/api/user", (req, res, ctx) => {
    return res(ctx.json("John Smith"), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test("Register component test...", async () => {
  renderWithProviders(<Register />, { route: "/register" });

  expect(screen.getByText(/Register/i)).toBeInTheDocument();
  expect(
    screen.queryByText(/Don't have an account?\.\.\./i)
  ).not.toBeInTheDocument();

  fireEvent.click(screen.getByText("Sign Up"));
  expect(screen.getByText(/Password Confirm/i)).toBeInTheDocument();

  const user = userEvent.setup();
  const email = screen.getByLabelText("Email");
  await user.type(email, "hayoungcau@gmail.com");

  const password = screen.getByLabelText("Password");
  await user.type(password, "11111111");

  const passwordConfirm = screen.getByLabelText("Password confirm");
  await user.type(passwordConfirm, "11111111");

  expect(email).toHaveValue("hayoungcau@gmail.com");
  expect(password).toHaveValue("11111111");
  expect(passwordConfirm).toHaveValue("11111111");

  fireEvent.click(screen.getByText("Sign Up"));
  await new Promise((r) => setTimeout(r, 2000));
});
