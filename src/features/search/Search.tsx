import React, { useState }from 'react';
import { useDispatch } from 'react-redux';
import { setArtist } from './searchSlice';
import { SearchResult } from '../../app/types';

const SEARCH_URL = "https://api.discogs.com/database/search";
const AUTH_STR = "Discogs";
const AUTH_TKN = "nVmyqrYTMwIgQdhGqftwZyUmjEHUdkXBBamVJVDL";

export const Search = () => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    
    const dispatch = useDispatch();

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setQuery(e.currentTarget.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setResults([]);
        setIsLoading(true);
        fetch(`${SEARCH_URL}?query=${query}&type=artist&Authorization=${AUTH_STR}&token=${AUTH_TKN}`)
        .then(response => response.json())
        .then(data => {
            data.pagination.items === 0 ? setError('No results found.') : setResults(data.results);
            dispatch(setArtist({}));
        })
        .finally(() => setIsLoading(false));
    };

    const resultsList = results.map( (result: SearchResult, index: number) => {
        return (
            <div key={index}>
                {result.thumb && <img src={result.thumb} alt="thumb"/>}
                <button className="button btnArtist" onClick={() => getArtist(result.resource_url)}>{result.title}</button> 
                <hr/>
            </div> 
        );
    });

    const getArtist = (url: string) => {
        setQuery('');
        setError('');
        setResults([]);
        setIsLoading(true);
        fetch(url)
        .then(response => response.json())
        .then(data => dispatch(setArtist(data)))
        .finally(() => setIsLoading(false));    
    };
    
    return (
        <>
            <form className="center" onSubmit={handleSubmit}>
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
            <div className="content">
                <p className="center">{error}</p>
                {isLoading &&  <h3 className="center">Loading...</h3>}
                {resultsList}
            </div>
        </>
    );
};
