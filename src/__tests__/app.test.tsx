import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from "react-testing-library";
import { App } from "../app";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

test("login success", async () => {
  let app = render(<App />);
  const { getByText, getByLabelText } = app;
  fireEvent.change(getByLabelText("Username"), {
    target: { value: "guest" },
  });
  fireEvent.change(getByLabelText("Password"), {
    target: { value: "guest" },
  });
  fireEvent.click(getByText("Login"));
  await waitForElement(() => getByText("New Note"));
});

test("login invalid user", async () => {
  let app = render(<App />);
  const { getByText, getByLabelText, findByRole } = app;
  fireEvent.change(getByLabelText("Username"), {
    target: { value: "userdoesnotexist" },
  });
  fireEvent.change(getByLabelText("Password"), {
    target: { value: "pass" },
  });
  fireEvent.click(getByText("Login"));
  const message = await findByRole("alert");
  expect(message.innerHTML).toBe("Invalid username or password");
});
