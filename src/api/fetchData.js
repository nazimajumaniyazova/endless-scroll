export const fetchData = async () =>
  await fetch('https://jsonplaceholder.typicode.com/photos?_limit=10&_page=1');
