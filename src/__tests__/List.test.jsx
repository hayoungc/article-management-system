import React from "react";
import { renderWithProviders } from "./test-utils";
import { List } from "../pages/article";

test("List component test...", () => {
  renderWithProviders(<List />, {
    route: "/",
    preloadedState: {
      auth: {
        value: { id: 1, email: "hayoungc_@naver.com", token: "mock-jwt-token" },
      },
      articles: {
        list: {
          value: [
            {
              id: 1,
              title: "haha",
              author: "hayoungc_@naver.com",
              tags: ["haha", "sleep"],
              content: "haha",
              createdAt: "2023-09-09T02:31:51.418Z",
            },
            {
              id: 2,
              title: "Juhee",
              author: "jh@gmail.com",
              tags: ["BlueJays"],
              content: "Power Through!",
              createdAt: "2023-09-09T19:08:10.796Z",
            },
          ],
        },
        item: null,
      },
    },
  });

  // jest.useFakeTimers();
  // setTimeout(() => {
  //   fireEvent.click(screen.getByText("✍️"));
  // }, 1500);
  // jest.runAllTimers();
});
