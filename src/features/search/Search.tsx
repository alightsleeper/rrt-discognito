import React, { useState }from 'react'

interface Props {
    
}

interface SearchResult {
    id: string,
    type: string,
    title: string,

}

const BASE_URL = "https://api.discogs.com/database/search"
const AUTH_STR = "Discogs"
const AUTH_TKN = "nVmyqrYTMwIgQdhGqftwZyUmjEHUdkXBBamVJVDL"

export const Search = (props: Props) => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        setQuery(e.currentTarget.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetch(`${BASE_URL}?query=${query}&Authorization=${AUTH_STR}&token=${AUTH_TKN}`)
        .then(response => response.json())
        .then(data => setResults(data.results))
    }

    const resultsList = results.map( (result: SearchResult, index: number) => {
        return (
            <ul key={index}>
                <li>{result.id}</li>
                <li>{result.type}</li>
                <li>{result.title}</li>
            </ul>
        )
    })
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleChange}
                    name="query"
                    type="text"
                    value={query}
                />
                <button type="submit">Search Discogs</button>
            </form>
            {resultsList}
        </>
    )
}
