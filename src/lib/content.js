/**
 * Gets all posts and related comments from localStorage.
 * @returns {{
 * id: string,
 * image: string,
 * text: string,
 * createdBy: string,
 * timestamp: string,
 * comments: {
 *  id: string,
 *  text:string,
 *  createdBy: string,
 *  timestamp: string}[]
 * }[]} posts and comments array.
 */
export const getPosts = () => JSON.parse(localStorage.getItem('content')) ?? [];

/**
 * Adds a new post to localStorage.
 * @param {{
 * id: string | undefined,
 * image: string,
 * text:string,
 * createdBy: string
 * timestamp: string | undefined,
 * comments: {
 *  id: string,
*   text:string,
*   createdBy: string,
*   timestamp: string}[] | undefined,
 * }} post post to add
 * @returns {string} post id
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
      id: id ?? crypto.randomUUID(),
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

/**
 * @param {string} postId
 * @param {{image: string,
 * text:string,
 * createdBy: string
 * timestamp: string | undefined,
 * comments: {
 *   text:string,
 *   createdBy: string,
 *   timestamp: string}[] | undefined,
 * }} editedPost
 * @returns {void}
 */
export const editPost = (postId, editedPost) => {
  let post = getPost(postId);
  removePost(postId);
  post = { ...post, ...editedPost };
  addPost(post);
};

export const addComment = (postId, { createdBy, text }) => {
  editPost(postId, {
    comments: [...getPost(postId).comments, {
      id: crypto.randomUUID(),
      createdBy,
      text,
      timestamp: new Date().toISOString(),
    }],
  });
};

export const sortedPosts = () => getPosts()
  .sort((p1, p2) => {
    const date1 = Date.parse(p1.timestamp);
    const date2 = Date.parse(p2.timestamp);

    return (date1 < date2) ? 1 : -1;
  });

export const filterPosts = (posts, searchKeyword) => posts
  .filter((post) => post.createdBy.includes(searchKeyword) || post.text.includes(searchKeyword));

export const sortComments = (comments) => comments
  .sort((c1, c2) => {
    const date1 = Date.parse(c1.timestamp);
    const date2 = Date.parse(c2.timestamp);

    return (date1 < date2) ? 1 : -1;
  });
