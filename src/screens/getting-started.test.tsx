import 'react-native';
import '@testing-library/jest-native/extend-expect';

// Note: test renderer must be required after react-native.
import type { RenderAPI, RenderOptions } from '@testing-library/react-native';
import { cleanup, render } from '@testing-library/react-native';
import React from 'react';

import { GettingStartedScreen } from './getting-started-screen';

afterEach(cleanup);

const customRender = (
  ui: React.ReactElement<any>,
  options?: RenderOptions | undefined
): RenderAPI => render(ui, { ...options }); // render(ui, {wrapper: ThemeProvider, ...options});

describe('Getting Started Test ', () => {
  it('renders correctly', async () => {
    const { findByText } = customRender(<GettingStartedScreen />);
    expect(await findByText(/Get Started/i)).not.toBeNull();
  });

  // it('Should call LoginForm with correct values when values are valid', async () => {
  //   // const mockOnSubmit = jest.fn(({ email, password }) => {
  //   //   return Promise.resolve({ email, password });
  //   // });

  //   const { getByTestId } = customRender(<GettingStartedScreen onSubmit={onSubmitMock} />);

  //   const button = getByTestId('login-button');
  //   const emailInput = getByTestId('email-input');
  //   const passwordInput = getByTestId('password-input');

  //   fireEvent.changeText(emailInput, 'youssef@gmail.com');
  //   fireEvent.changeText(passwordInput, 'password');
  //   fireEvent.press(button);
  //   await waitFor(() => {
  //     expect(onSubmitMock).toHaveBeenCalledTimes(1);
  //   });
  //   // undefined because we don't use second argument of the  SubmitHandler
  //   expect(onSubmitMock).toBeCalledWith(
  //     {
  //       email: 'youssef@gmail.com',
  //       password: 'password',
  //     },
  //     undefined
  //   );
  // });
});
