import React, { Suspense, useState }from 'react'

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

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        setQuery(e.currentTarget.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setResults([])
        setArtist({})
        fetch(`${SEARCH_URL}?query=${query}&type=artist&Authorization=${AUTH_STR}&token=${AUTH_TKN}`)
        .then(response => response.json())
        .then(data => setResults(data.results))
    }

    const viewArtist = (url: string) => {
        setQuery('')
        setResults([])
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setArtist(data)
        })    
    }

    const resultsList = results.map( (result: SearchResult, index: number) => {
        return (
            <div key={index}>
                { result.thumb && 
                    <p><img src={result.thumb} alt="thumb"/></p>
                }
                <button className="button" onClick={() => viewArtist(result.resource_url)}>{result.title}</button> 
                <hr/>
            </div>
        )
    })

    const displayArtist = () => {
        if (artist) {
            return (
                <div>
                    <h1>{artist.name}</h1>
                    <p>{artist.profile}</p>
                </div>
            )
        }
    }
    
    return (
        <>
            <form onSubmit={handleSubmit}>
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
            <Suspense fallback={<h1>Loading...</h1>}>
                {resultsList.length > 0 && resultsList}
            </Suspense>
            <Suspense fallback={<h1>Getting Artist...</h1>}>
                {displayArtist()}
            </Suspense>
        </>
    )
}
