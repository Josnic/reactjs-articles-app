import React from "react";
import { render, screen } from '@testing-library/react';
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

import Home from './index';

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


test('render home page', () => {
    render(<Provider store={store}><Home /></Provider>, { wrapper: BrowserRouter, container: container  });
    expect(screen.getByText('Artículos')).toBeDefined();
});


