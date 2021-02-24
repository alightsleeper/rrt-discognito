import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { Artist } from './Search'

interface SearchState {
    artist: Artist
}

const initialState: SearchState = {
    artist: {},
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setArtist: (state, action: PayloadAction<Artist>) => {state.artist = action.payload}
    }
})

export const selectArtist = (state: RootState) => state.search.artist

export const { setArtist } = searchSlice.actions

export default searchSlice.reducer
