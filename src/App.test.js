import { render, screen } from '@testing-library/react';
import App from './App';

// Simple test without using react-router-dom
test('renders App component', () => {
  render(<App />);
  
  // Check if an element within App exists
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
