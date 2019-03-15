import { MovieDetailsEntity } from "../types/types";

export interface ModalStoreInterface {
    details: MovieDetailsEntity | undefined,
    error: string,
    getMovieDetails: (pathname: string) => void,
    clearMovieDetails: () => void,
}