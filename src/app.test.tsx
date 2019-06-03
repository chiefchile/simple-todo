import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  wait,
  within,
  waitForElement
} from "react-testing-library";
import { App } from "./app";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

test("login", async () => {
  let app = render(<App />);
  const { getByText, getByLabelText, getByPlaceholderText } = app;
  fireEvent.change(getByPlaceholderText("Username"), {
    target: { value: "guest" }
  });
  fireEvent.change(getByPlaceholderText("Password"), {
    target: { value: "guest" }
  });
  fireEvent.click(getByText("Login"));
  await waitForElement(() => getByText("New Note"));
});
