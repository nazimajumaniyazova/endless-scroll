import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import postsStore from '../store/posts.store';

function PostsList() {
  const { posts, getPosts, setFetching, totalCount, fetching, isLoading } =
    postsStore;
  useEffect(() => {
    getPosts();
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
        100 &&
      posts.length < totalCount
    ) {
      setFetching(true);
    }
  };
  return (
    <div>
      {posts &&
        posts.map((post, inex) => (
          <div className='post' key={inex}>
            <div className='post__title'>
              {post.id}. {post.title}
            </div>
            <img src={post.thumbnailUrl} />
          </div>
        ))}
      {isLoading ? <p style={{ fontSize: '40px' }}>Loading...</p> : ''}
    </div>
  );
}

export default observer(PostsList);
