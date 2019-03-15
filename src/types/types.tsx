export type MoviesInfoObject = {
    vote_count: number,
    id: number,
    video: boolean,
    vote_average: number,
    title: string,
    popularity: number,
    poster_path: string,
    original_language: string,
    original_title: string,
    genre_ids: [number],
    backdrop_path: string,
    adult: boolean,
    overview: string,
    release_date: string,
}

export type MoviesInfoEntity = {
    dates: {
        maximum: string,
        minimum: string,
    },
    page: number,
    results: [MoviesInfoObject],
    total_pages: number,
    total_results: number,
}

export type MovieDetailsEntity = {
    adult: boolean,
    backdrop_path: string,
    belongs_to_collection: null | {
        id: number,
        name: string,
        poster_path: string,
        backdrop_path: string,
    },
    budget: number,
    genres: [{
        id: number,
        name: string,
    }],
    homepage: string,
    id: number,
    imdb_id: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: [{
        id: number,
        logo_path: string,
        name: string,
        origin_country: string,
    }],
    production_countries: [{
        iso_3166_1: string,
        name: string,
    }],
    release_date: string,
    revenue: number,
    runtime: number,
    spoken_languages: [{
        iso_639_1: string,
        name: string,
    }],
    status: string,
    tagline: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
}