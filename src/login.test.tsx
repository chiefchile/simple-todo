import React from 'react';
import { Login } from './login';
import {render, fireEvent, cleanup, wait} from 'react-testing-library'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

it('onSubmit is called when "Login" is clicked', async () => {
  const mockOnSubmit = jest.fn();
  const {getByText, getByTestId, container, asFragment} = render(
    <Login onSubmit={mockOnSubmit} onLoginAsGuest={jest.fn()} loginResult={null} />,
  )

  fireEvent.click(getByText('Login'));
  
  await wait();
  expect(mockOnSubmit).toHaveBeenCalled();
});

it('onLoginAsGuest is called when "Login as Guest" is clicked', async () => {
  const mockOnLoginAsGuest = jest.fn();
  const {getByText, getByTestId, container, asFragment} = render(
    <Login onLoginAsGuest={mockOnLoginAsGuest} onSubmit={jest.fn()} loginResult={null} />,
  )
  
  fireEvent.click(getByText('Login as Guest'));
  
  await wait();
  expect(mockOnLoginAsGuest).toHaveBeenCalled();
});

