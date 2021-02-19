import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App'

test('renders discogs search form and returns results', async () => {
  
  const { getByText, getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  const searchButton = getByTestId('searchBtn')
  expect(searchButton).toBeInTheDocument()

  const searchInput = getByTestId('searchInput')
  expect(searchInput).toBeInTheDocument()

  userEvent.type(searchInput, 'fugazi')
  userEvent.click(searchButton)

  let result = await screen.findByText('Fugazi')
  expect(result).toBeInTheDocument()

  const viewArtistButton = getByText('Fugazi')
  expect(viewArtistButton).toBeInTheDocument()

  userEvent.click(viewArtistButton)
  result = await screen.findByText('Fugazi is an American punk rock band that formed in Washington, D.C. in 1987. The band consists of guitarists and vocalists Ian MacKaye and Guy Picciotto, bassist Joe Lally and drummer Brendan Canty. They are noted for their DIY ethic, manner of business practice, and contempt towards the music industry. Fugazi have performed numerous worldwide tours, produced six studio albums, a film and a comprehensive live series, gaining the band critical acclaim and success around the world. The band has been on an indefinite break since 2003.')
  expect(result).toBeInTheDocument()
})
