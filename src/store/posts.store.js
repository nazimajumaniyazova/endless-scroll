import { makeAutoObservable, runInAction } from 'mobx';
import { fetchData } from '../api/fetchData';

class postsStore {
  constructor() {
    makeAutoObservable(this);
  }
  posts = [];
  isLoading = false;

  getPosts = async () => {
    try {
      this.isLoading = true;
      const res = await fetchData();
      const data = await res.json();
      runInAction(async () => {
        this.posts = data;
        this.isLoading = false;
      });
    } catch (err) {
      console.log(err);
      this.isLoading = false;
    }
  };
}

export default new postsStore();
