import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "./test-utils";
import userEvent from "@testing-library/user-event";
import { NewEdit } from "../pages/article";

test("NewEdit component test...", async () => {
  renderWithProviders(<NewEdit type="new" />, {
    route: "/article/new",
    preloadedState: {
      auth: {
        value: { id: 1, email: "hayoungc_@naver.com", token: "mock-jwt-token" },
      },
    },
  });

  const user = userEvent.setup();
  const title = screen.getByLabelText("Title");
  await user.type(title, "I want to get a gold");

  const content = screen.getByLabelText("Content");
  await user.type(content, "Show me the money");

  const tags = screen.getByPlaceholderText("Please enter a tag");
  await user.type(tags, "Google");
  fireEvent.keyDown(tags, { key: "Enter", code: "Enter", charCode: 13 });

  fireEvent.click(screen.getByText("Create"));
});
