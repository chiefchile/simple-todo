import React from 'react';
import { Message } from './message';
import {render, fireEvent, cleanup, wait} from 'react-testing-library'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

it('style should be "alert alert-success" if result is successful', () => {
  const msg = 'Success';
  const success = {code: 0, msg: msg};
  const {getByText} = render(
    <Message result={success} />,
  )
  
  const message = getByText(msg);
  expect(message.className).toBe('alert alert-success');
});

it('style should be "alert alert-danger" if result is error', () => {
  const msg = 'Error';
  const success = {code: -1, msg: msg};
  const {getByText} = render(
    <Message result={success} />,
  )
  
  const message = getByText(msg);
  expect(message.className).toBe('alert alert-danger');
});

it('should display nothing if there is no result', () => {
  const {queryByRole} = render(
    <Message />,
  )
  
  const message = queryByRole('alert');
  expect(message).not.toBeTruthy();
});

