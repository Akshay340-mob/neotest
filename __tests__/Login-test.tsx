import 'react-native';
import React from 'react';
import Login from '../src/screens/Auth/Login';

import { render } from "@testing-library/react-native"

it('renders default elements', () => {
  const {getAllByText} = render(<Login/>)

  expect(getAllByText('Login').length).toBe(1)
});
