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
  totalCount = 100;

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
          this.currentPage++;
        });
      } catch (err) {
        console.log(err);
        this.isLoading = false;
      } finally {
        this.fetching = false;
      }
    }
  };
  setFetching = (isFetching) => {
    this.fetching = isFetching;
  };
}

export default new postsStore();
