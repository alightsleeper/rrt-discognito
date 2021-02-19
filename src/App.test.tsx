import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App'

test('renders discogs search form and returns results', async () => {
  
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  const searchButton = getByText('Search Discogs')
  expect(searchButton).toBeInTheDocument()

  fireEvent.click(searchButton)
  let result = await screen.findByText('Chris Porter')
  expect(result).toBeInTheDocument()

  const viewArtistButton = getByText('Chris Porter')
  expect(viewArtistButton).toBeInTheDocument()

  fireEvent.click(viewArtistButton)
  result = await screen.findByText('British producer and engineer from Southampton, England. Now based in London where he started his career in 1979. Owner of [l=Porterhouse (2)] (1987-2003) and co-owner of [l=Stanley House] (2005-2015) studios.')
  expect(result).toBeInTheDocument()

})
