import React from "react";
import { renderWithProviders } from "./test-utils";
import { ArticleLayout } from "../pages/article";

test("ArticleLayout component test...", () => {
  renderWithProviders(<ArticleLayout />, {
    route: "/",
    preloadedState: {
      auth: {
        value: { id: 1, email: "hayoungc_@naver.com", token: "mock-jwt-token" },
      },
      articles: {
        list: {
          value: [],
        },
        item: null,
      },
    },
  });
});
