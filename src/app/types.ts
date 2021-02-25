
export interface Artist {
    name?: string,
    profile?: string,
    releases_url?: string,
};

export interface ArtistRelease {
    resource_url: string
    stats: StatsType,
    title: string,
    type: string,
    year: number,
};

export interface SearchResult {
    thumb: string,
    title: string,
    resource_url: string,
};

interface StatsGroup {
    in_wantlist: number,
    in_collection: number
};

interface StatsType {
    community: StatsGroup,
};
