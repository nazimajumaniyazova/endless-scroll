import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (fetching) {
      fetch(
        `https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`
      )
        .then((response) => {
          if (!response.ok) {
            throw Error(`Error ${response.status}. Can not find the data`);
          }
          setTotalCount(response.headers['x-total-count']);
          for (var pair of response.headers.entries()) {
            if (pair[0] === 'x-total-count') {
              setTotalCount(pair[1]);
            }
          }
          return response.json();
        })
        .then((data) => {
          setPosts([...posts, ...data]);
          setCurrentPage((prevState) => prevState + 1);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);

    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [totalCount]);

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
    <div className='App'>
      {error && <div className='error'>{error}</div>}
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

export default App;
