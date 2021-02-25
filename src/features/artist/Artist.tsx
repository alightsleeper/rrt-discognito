import React from 'react'
import { useSelector } from 'react-redux'
import { selectArtist } from '../search/searchSlice'

export const Artist = () => {

    const artist = useSelector(selectArtist)

    return (
        <div>
            <h1 className="center">{artist.name}</h1>
            <p>{artist.profile}</p>
        </div>
    )
}
