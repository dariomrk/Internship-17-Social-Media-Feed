/**
 * Gets all posts and related comments from localStorage.
 * @returns {{
 * id: number,
 * image: string,
 * text: string,
 * createdBy: string,
 * timestamp: string,
 * comments: {
 *  text:string,
 *  createdBy: string,
 *  timestamp: string}[]
 * }[]} posts and comments array.
 */
export const getPosts = () => JSON.parse(localStorage.getItem('content')) ?? [];

/**
 * Adds a new post to localStorage.
 * @param {{
 * id: number | undefined,
 * image: string,
 * text:string,
 * createdBy: string
 * timestamp: string | undefined,
 * comments: {
*   text:string,
*   createdBy: string,
*   timestamp: string}[] | undefined,
 * }} post post to add
 * @returns {number} post id
 */
export const addPost = ({
  id = undefined,
  image,
  text,
  createdBy,
  timestamp = undefined,
  comments = undefined,
}) => {
  const previous = getPosts();
  localStorage.setItem('content', JSON.stringify([
    ...previous,
    {
      id: id ?? previous.length,
      image,
      text,
      createdBy,
      timestamp: timestamp ?? new Date().toISOString(),
      comments: comments ?? [],
    },
  ]));
  return previous.length;
};

export const postExists = (postId) => getPosts().includes((post) => post.id === postId);

export const getPost = (postId) => getPosts().find((post) => post.id === postId) ?? null;

export const removePost = (postId) => {
  const posts = getPosts();
  const filtered = posts.filter((post) => post.id !== postId);
  localStorage.setItem('content', JSON.stringify(filtered));
};

export const editPost = (postId, editCallback) => {
  // TODO implement
};

export const addComment = (postId, { createdBy, text }) => {
  // TODO implement
};

export const sortedPosts = () => getPosts()
  .sort((p1, p2) => {
    const date1 = Date.parse(p1.timestamp);
    const date2 = Date.parse(p2.timestamp);

    return (date1 < date2) ? 1 : -1;
  });
