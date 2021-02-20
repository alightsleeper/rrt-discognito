import React, { useState }from 'react'

interface Props {
    
}

interface SearchResult {
    thumb: string,
    title: string,
    resource_url: string,
}

interface Artist {
    name?: string,
    profile?: string,
}

const SEARCH_URL = "https://api.discogs.com/database/search"
const AUTH_STR = "Discogs"
const AUTH_TKN = "nVmyqrYTMwIgQdhGqftwZyUmjEHUdkXBBamVJVDL"

export const Search = (props: Props) => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [artist, setArtist] = useState<Artist>()
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        setQuery(e.currentTarget.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setResults([])
        setArtist({})
        setIsLoading(true)
        fetch(`${SEARCH_URL}?query=${query}&type=artist&Authorization=${AUTH_STR}&token=${AUTH_TKN}`)
        .then(response => response.json())
        .then(data => setResults(data.results))
        .finally(() => setIsLoading(false))
    }

    const viewArtist = (url: string) => {
        setQuery('')
        setResults([])
        setIsLoading(true)
        fetch(url)
        .then(response => response.json())
        .then(data => setArtist(data))
        .finally(() => setIsLoading(false))    
    }

    const resultsList = results.map( (result: SearchResult, index: number) => {
        return (
            <div key={index} className="searchResult">
                {result.thumb && <img src={result.thumb} alt="thumb"/>}
                <button className="button btnArtist" onClick={() => viewArtist(result.resource_url)}>{result.title}</button> 
                <hr/>
            </div> 
        )
    })

    const displayArtist = () => {
        if (artist) {
            return (
                <div className="searchResult">
                    <h1>{artist.name}</h1>
                    <p>{artist.profile}</p>
                </div>
            )
        }
    }
    
    return (
        <div className="container">
            <form className="searchForm" onSubmit={handleSubmit}>
                <input
                    className="textbox"
                    data-testid="searchInput"
                    onChange={handleChange}
                    type="text"
                    value={query}
                    placeholder="Enter artist name"
                    autoFocus={true}
                />
                <button data-testid="searchBtn" className="button" type="submit">Search {AUTH_STR}</button>
            </form>
            {isLoading ?  <h3 className="center">Loading...</h3> : resultsList }
            {displayArtist()}
        </div>
    )
}
