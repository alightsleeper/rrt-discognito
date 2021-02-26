import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders discogs search form and returns results', async () => {
  
  const { getByText, getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const searchButton = getByTestId('searchBtn');
  expect(searchButton).toBeInTheDocument();

  const searchInput = getByTestId('searchInput');
  expect(searchInput).toBeInTheDocument();

  userEvent.type(searchInput, 'wt7greaw5');
  userEvent.click(searchButton);

  let result = await screen.findByText('No results found.');
  expect(result).toBeInTheDocument();

  userEvent.type(searchInput, 'polvo');
  userEvent.click(searchButton);

  result = await screen.findByText('Polvo');
  expect(result).toBeInTheDocument();

  const viewArtistButton = getByText('Polvo');
  expect(viewArtistButton).toBeInTheDocument();

  userEvent.click(viewArtistButton);
  result = await screen.findByText('American indie noise rock band formed in 1990 in Chapel Hill, NC and disbanded in 1998. They reformed in 2008.');
  expect(result).toBeInTheDocument();

  result = await screen.findByText('Today\'s Active Lifestyles (1993)');
  expect(result).toBeInTheDocument();

});
