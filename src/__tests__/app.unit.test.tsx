import axios from "axios";
import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import { App } from "../app";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

test("login invalid user", async () => {
  const error: any = { response: { status: 400 } };
  mockedAxios.post.mockRejectedValue(error);
  let app = render(<App />);
  const { getByText, findByRole } = app;
  fireEvent.click(getByText("Login"));
  const message = await findByRole("alert");
  expect(message.innerHTML).toBe("Invalid username or password");
});

test("login internal server error", async () => {
  const error: any = { response: { status: 500 } };
  mockedAxios.post.mockRejectedValue(error);
  let app = render(<App />);
  const { getByText, findByRole } = app;
  fireEvent.click(getByText("Login"));
  const message = await findByRole("alert");
  expect(message.innerHTML).toBe("Internal Server Error");
});
