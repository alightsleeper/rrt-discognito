import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectArtist } from '../search/searchSlice'
import { ArtistRelease } from '../../app/types';

export const Artist = () => {
    const artist = useSelector(selectArtist);
    const [releases, setReleases] = useState<ArtistRelease[]>([]);
    const [releasesLoading, setReleasesLoading] = useState<boolean>(false);
    
    useEffect(() => {
        setReleases([]);
        if(artist.releases_url) {
            setReleasesLoading(true)
            fetch(artist.releases_url + '?page=1&per_page=500')
            .then(response => response.json())
            .then(data => data.releases.filter((r: ArtistRelease) => (r.type === "master" && r.role==="Main")))
            .then(filtered => filtered.sort((a: ArtistRelease, b: ArtistRelease) => {
                return (
                    // //sort releases by most in_wantlist, then least in_collection
                    // (b.stats.community.in_wantlist - a.stats.community.in_wantlist) ||
                    // (a.stats.community.in_collection - b.stats.community.in_collection)
                    
                    //sort releases by delta of in_wantlist and in_collection, desc
                    (b.stats.community.in_wantlist - b.stats.community.in_collection) -
                    (a.stats.community.in_wantlist - a.stats.community.in_collection)
                );
            }))
            .then(sorted => setReleases(sorted))
            .finally(() => setReleasesLoading(false))
        };
    }, [artist])

    const artistReleases = releases.map((release: ArtistRelease, index: number) => {
        return (
            <div key={index}>
                <h3>{release.title} {release.year && `(${release.year})`}</h3>
                <p><strong>In Wantlist: </strong>{release.stats.community.in_wantlist}</p>
                <p><strong>In Collection: </strong>{release.stats.community.in_collection}</p>
                <p><strong>Delta: </strong>{release.stats.community.in_wantlist - release.stats.community.in_collection}</p>
                <p><strong>URL: </strong>{release.resource_url}</p>
                <hr/>
            </div>
        );      
    });

    return (
        <div className="content">          
            <h1 className="center">{artist.name}</h1>
            <p>{artist.profile}</p>
            <p className="center">{releasesLoading && "Loading..."}</p>
            <h2 className="center">{releases.length > 0 && "Releases"}</h2>
            {artistReleases}
        </div>
    )
}
