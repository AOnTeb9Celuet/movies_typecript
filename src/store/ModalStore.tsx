import { observable, action, autorun, toJS, decorate } from "mobx";
import axios from "axios";
import { MovieDetailsEntity } from '../types/types';
import { ModalStoreInterface } from '../interfaces/ModalStoreInterface';

export class ModalStore implements ModalStoreInterface{

  public details: MovieDetailsEntity;
  public error: string;

  getMovieDetails = async (pathname: string): Promise<void> => {
    try {
      const { data } = await axios(`http://api.themoviedb.org/3/movie${pathname}?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c`)
      this.details = data
    } catch(err) {
      this.error = err
    }
  }

  clearMovieDetails() {
    this.details = null;
  }
}

decorate(ModalStore, {
  details: observable,
  error: observable,
  getMovieDetails: action,
  clearMovieDetails: action,
})

const modalStore = new ModalStore();

autorun(() => {
  console.log("modalStore", toJS(modalStore));
});

export default modalStore;
