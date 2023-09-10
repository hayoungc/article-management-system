import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { alertReducer, articleReducer, authReducer } from "../app/store";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import { createMemoryHistory } from "history";

export function renderWithProviders(
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
    preloadedState = {},
    store = configureStore({
      reducer: {
        alert: alertReducer,
        auth: authReducer,
        articles: articleReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter history={history}>{children}</BrowserRouter>
      </Provider>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...render(ui, { wrapper: Wrapper, history, ...renderOptions }),
  };
}

test("Just util functions...", () => {});
