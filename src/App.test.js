import { render, screen } from '@testing-library/react';
import App from './App';
import { renderWithProviders } from './__tests__/test-utils';

test('full app rendering', async () => {
  const { user } = renderWithProviders(<App />)
  expect(screen.getByText(/Login/i)).toBeInTheDocument()
})

test('landing on a bad page', () => {
  renderWithProviders(<App />, { route: '/something-that-does-not-match' })

})
