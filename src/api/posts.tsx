export const fetchPosts = async () => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return error;
  }
};
