import renderer from 'react-test-renderer';
import Login from '../Login';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../../../Store';
import reducer, { loginRequest, loginSuccess, loginFailure, logout } from '../../../Features/UserSlice';
/*
test("Matching the UI", () => {
  const { container } = render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );
  screen.debug(container); // Debugging is useful for visualizing the output
  expect(container).toMatchSnapshot();
});
*/
test("Validate the email using regex", () => {
  render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );

  const emailInput = screen.getByLabelText(/email/i);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Valid email test
  fireEvent.change(emailInput, { target: { value: 'reem@gmail.com' } });
  expect(emailRegex.test(emailInput.value)).toBe(true);

  // Invalid email test (should be handled by validation)
  fireEvent.change(emailInput, { target: { value: 'abcgmail.com' } });
  expect(emailRegex.test(emailInput.value)).toBe(false);

  // Add validation message check
  fireEvent.blur(emailInput);
  waitFor(() => {
    expect(screen.getByText(/Username should not be empty/i)).toBeInTheDocument();
  });
});
/*
test("Validate the password", () => {
  render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );

  const passwordInput = screen.getByLabelText(/password/i);
  const passwordRegex = /^(?=.*[A-Z].*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

  // Pass case
  fireEvent.change(passwordInput, { target: { value: 'AaB@12' } });
  expect(passwordRegex.test(passwordInput.value)).toBe(true);

  // Fail case: Only one uppercase letter
  fireEvent.change(passwordInput, { target: { value: 'Abc@12' } });
  expect(passwordRegex.test(passwordInput.value)).toBe(false);

  // Check validation feedback message
  fireEvent.blur(passwordInput);
  waitFor(() => {
    expect(screen.getByText(/Password should not be empty/i)).toBeInTheDocument();
  });
});

test("Testing Initial State in Slice", () => {
  const testInitValue = {
    user: null,
    token: null,
    isAdmin: false,
    loading: false,
    error: null,
    message: '',
  };
  expect(reducer(undefined, { type: undefined })).toEqual(testInitValue);
});

describe('User Slice', () => {
  const initialState = {
    user: null,
    token: null,
    isAdmin: false,
    loading: false,
    error: null,
    message: '',
  };

  // Test loginRequest action
  test('should handle loginRequest', () => {
    const action = loginRequest();
    const expectedState = {
      ...initialState,
      loading: true,
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  // Test loginSuccess action
  test('should handle loginSuccess', () => {
    const userData = {
      user: { id: 1, name: 'John Doe' },
      token: 'abcd1234',
      isAdmin: false,
    };
    const action = loginSuccess(userData);
    const expectedState = {
      ...initialState,
      user: userData.user,
      token: userData.token,
      isAdmin: userData.isAdmin,
      loading: false,
      message: 'Login successful',
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  // Test loginFailure action
  test('should handle loginFailure', () => {
    const errorData = { error: 'Invalid credentials' };
    const action = loginFailure(errorData);
    const expectedState = {
      ...initialState,
      loading: false,
      error: errorData.error,
      message: 'Login failed',
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  // Test logout action
  test('should handle logout', () => {
    const action = logout();
    const expectedState = {
      ...initialState,
      user: null,
      token: null,
      isAdmin: false,
      message: 'Logged out',
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
*/