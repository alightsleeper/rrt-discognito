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
            fetch(artist.releases_url)
            .then(response => response.json())
            .then(data => data.releases.filter((r: ArtistRelease) => r.type === "master"))
            .then(filtered => filtered.sort((a: ArtistRelease, b: ArtistRelease) => { return a.stats.community.in_wantlist - b.stats.community.in_wantlist}))
            .then(sorted => setReleases(sorted))
            .finally(() => setReleasesLoading(false))
        };
    }, [artist])

    const artistReleases = releases.map((release: ArtistRelease, index: number) => {
        return (
            <div key={index}>
                <h3>{release.title} {release.year && `(${release.year})`}</h3>
                <p><strong>In Wantlist: </strong>{release.stats.community.in_wantlist}</p>
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
