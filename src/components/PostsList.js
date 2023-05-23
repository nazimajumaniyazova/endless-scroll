import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import postsStore from '../store/posts.store';

function PostsList() {
  const { posts, getPosts } = postsStore;
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      {posts &&
        posts.map((post) => (
          <div className='post' key={post.id}>
            <div className='post__title'>
              {post.id}. {post.title}
            </div>
            <img src={post.thumbnailUrl} />
          </div>
        ))}
    </div>
  );
}

export default observer(PostsList);
