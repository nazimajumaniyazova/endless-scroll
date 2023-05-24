export const fetchData = async (page) =>
  await fetch(
    `https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${page}`
  );
