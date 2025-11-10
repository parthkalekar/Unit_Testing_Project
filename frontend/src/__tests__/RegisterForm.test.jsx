import { render, screen, fireEvent } from '@testing-library/react';
import RegisterForm from '../components/RegisterForm';
import { vi } from 'vitest';

test('shows success message and clears inputs on successful registration (mocked fetch)', async () => {
  // Mock a successful 201 response
  global.fetch = vi.fn(() =>
    Promise.resolve({
      status: 201,
      json: () => Promise.resolve({ message: 'User registered' })
    })
  );

  // Mock the alert function to prevent actual popup
  const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

  render(<RegisterForm />);

  // Fill the form fields
  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const registerButton = screen.getByRole('button', { name: /Register/i });

  fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(registerButton);

  // Wait for the success message to appear
  const message = await screen.findByTestId('message');

  // Assertions
  expect(message).toBeInTheDocument();
  expect(message.textContent).toMatch(/User registered|Registration successful/i);
  expect(emailInput.value).toBe(''); // should clear email
  expect(passwordInput.value).toBe(''); // should clear password
  expect(alertSpy).toHaveBeenCalledWith('Registration Successful');

  vi.restoreAllMocks();
});
