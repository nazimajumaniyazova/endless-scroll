import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import postsStore from '../store/posts.store';

function PostsList() {
  const { posts, getPosts, setFetching, fetching, isLoading, error } =
    postsStore;
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) {
      getPosts();
    }
    mounted.current = true;
  }, [fetching]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);
  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        e.target.documentElement.scrollTop -
        window.innerHeight <
      100
    ) {
      setFetching(true);
    }
  };
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <div>
            {post.id}. {post.title}
          </div>
          <img src={post.thumbnailUrl} alt='' />
        </div>
      ))}
      {error && <p>{error}</p>}
      {isLoading ? <p style={{ fontSize: '40px' }}>Loading...</p> : ''}
    </div>
  );
}

export default observer(PostsList);
