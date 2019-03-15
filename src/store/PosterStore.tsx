import { observable, action, autorun, toJS, decorate } from "mobx";
import axios from "axios";
import { PostersStoreInterface } from '../interfaces/PostersStoreInteface';
import { MoviesInfoEntity } from '../types/types';

export class PosterStore implements PostersStoreInterface {
  public info: MoviesInfoEntity | undefined;
  public error = "";
  public page = 1;


  public getMoviesInfo = async (page: number): Promise<void> => {
    try {
      const { data } = await axios(`http://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&page=${page}`)
      this.info = data;
    } catch(err) {
      this.error = err
    }
  }

  public changePageNumber = (page: number): void => {
    this.page = page;
  }
}

decorate(PosterStore, {
  info: observable,
  error: observable,
  getMoviesInfo: action,
  changePageNumber: action,
})

const posterStore = new PosterStore();

autorun(() => {
  console.log('posterStore', toJS(posterStore))
})

export default posterStore