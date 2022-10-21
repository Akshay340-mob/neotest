/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../src/navigator/AppNavigator';


// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('AppStack', () => {
  it('renders the correct screen', async () => {
    const { getByText } = render(<App/>);
    await waitFor(() => getByText('Login'));
  });
});
