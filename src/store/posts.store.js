import { makeAutoObservable, runInAction } from 'mobx';
import { fetchData } from '../api/fetchData';

class postsStore {
  constructor() {
    makeAutoObservable(this);
  }
  posts = [];
  isLoading = false;
  currentPage = 1;
  fetching = true;
  error = null;
  getPosts = async () => {
    if (this.fetching) {
      try {
        this.isLoading = true;
        const res = await fetchData(this.currentPage);
        if (!res.ok) {
          throw new Error('Could not fetch the data');
        }
        const data = await res.json();
        runInAction(() => {
          this.posts.push(...data);
          this.isLoading = false;
        });
      } catch (err) {
        console.log(err);
        this.isLoading = false;
        this.error = err.message;
      } finally {
        this.fetching = false;
        this.currentPage++;
      }
    }
  };
  setFetching = (isFetching) => {
    this.fetching = isFetching;
  };
}

export default new postsStore();
