import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { unmountComponentAtNode } from "react-dom";

import AuthReducer from './../../reducers/authReducer';

const mockStore = configureMockStore([thunk]);
const store = mockStore({ reducer: {
    auth: AuthReducer
} });

import Login from './index';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


test('render login page', () => {
    
    render(<Provider store={store}><Login /></Provider>, { wrapper: BrowserRouter, container: container  });
    expect(screen.getByText('Ingreso a artículos')).toBeDefined();
    expect(screen.getByLabelText('Username')).toBeDefined();
    expect(screen.getByLabelText('Password')).toBeDefined();
    expect(screen.getByRole('button')).toBeDefined();

});

test('Login click button without username and password', async() => {
    
    render(<Provider store={store}><Login /></Provider>, { wrapper: BrowserRouter , container: container });
    const button = await screen.getByRole('button');
    fireEvent.click(button);
    await waitFor(() => expect(screen.queryByText('Debes ingresar el username!')).toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText('Debes ingresar el password!')).toBeInTheDocument())

});

test('Login click button with username and password', async() => {
    
    render(<Provider store={store}><Login /></Provider>, { wrapper: BrowserRouter, container: container });
    const usernameInput = container.querySelector(`#basic_username`);
    const passwordInput = container.querySelector(`#basic_password`);
    fireEvent.change(usernameInput, {target: {value: 'user'}});
    fireEvent.change(passwordInput, {target: {value: 'password'}});
    const button = screen.getByRole('button');
    fireEvent.click(button);
    await waitFor(() => expect(screen.queryByText('Debes ingresar el username!')).not.toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText('Debes ingresar el password!')).not.toBeInTheDocument())

});

