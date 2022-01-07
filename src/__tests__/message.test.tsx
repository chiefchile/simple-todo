import React from "react";
import { Message } from "../message";
import { render, cleanup, screen } from "@testing-library/react";
import { Result } from "../result";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('style should be "alert-success" if result is successful', () => {
  const msg = "Success";
  const success = new Result(200, msg);
  const { getByText } = render(<Message result={success} isShort={false} />);
  // screen.debug();

  const message = getByText(msg);
  expect(message.className).toMatch(/alert-success/);
});

it('style should be "alert-danger" if result is error', () => {
  const msg = "Error";
  const success = new Result(300, msg);
  const { getByText } = render(<Message result={success} isShort={false} />);

  const message = getByText(msg);
  expect(message.className).toMatch(/alert-danger/);
});

it("should display nothing if there is no result", () => {
  const { queryByRole } = render(<Message result={null} isShort={false} />);

  const message = queryByRole("alert");
  expect(message).not.toBeTruthy();
});
