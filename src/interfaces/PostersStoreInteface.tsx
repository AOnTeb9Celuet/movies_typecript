import { MoviesInfoEntity } from '../types/types';

export interface PostersStoreInterface {
    info: MoviesInfoEntity | [],
    error: string,
    page: number,
    getMoviesInfo: (page: number) => Promise<void>,
    changePageNumber: (page: number) => void,
}