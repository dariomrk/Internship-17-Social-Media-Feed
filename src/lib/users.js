/**
 * Gets all users from localStorage.
 * @returns {[{username: string, password: string, lastLogin: string}]} users array
 */
export const getUsers = () => JSON.parse(localStorage.getItem('users'));

/**
 * Adds a new user to localStorage.
 * @param {string} username new users username
 * @param {string} password new users password
 * @returns {void}
 */
export const addUser = (username, password) => {
  const existingUsers = getUsers();

  if (existingUsers.any((existingUser) => existingUser.username === username)) { throw new Error('Username is taken.'); }

  localStorage.setItem('users', JSON.stringify([
    existingUsers,
    {
      username,
      password,
      lastLogin: new Date().toISOString(),
    }]));
};

/**
 * Check whether the users login is still valid.
 * @param {string} username users username
 * @returns {boolean} boolean indicating whether the login is still valid.
 */
export const isValidLoginTimespan = (username) => {
  const user = getUsers().find((u) => u.username === username);

  if (!user) {
    throw new Error('User does not exist.');
  }

  const elapsedMilliseconds = Date.now() - Date.parse(user.lastLogin);
  const elapsedHours = elapsedMilliseconds / (1000 * 60 * 60);

  return elapsedHours <= 12;
};

/**
 * Removes user by username.
 * @param {string} username user to remove
 * @returns {void}
 */
export const removeUser = (username) => {
  const users = getUsers();
  const filtered = users.filter((user) => user.username !== username);
  localStorage.setItem('users', JSON.stringify(filtered));
};

/**
 * Updates the login timestamp.
 * @param {string} username update login timestamp of given user
 * @returns {void}
 */
export const updateLoginTimestamp = (username) => {
  const user = getUsers().find((u) => u.username === username);

  if (!user) {
    throw new Error('User does not exist.');
  }
  removeUser(username);
  addUser(username, user.password);
};

/**
 * Checks users credentials.
 * @param {string} username users username
 * @param {stringn} password users password
 * @returns {boolean} boolean indicating credential validity.
 */
export const logIn = (username, password) => {
  const user = getUsers().find((u) => u.username === username);

  if (!user) {
    throw new Error('User does not exist.');
  }

  if (user.password === password) {
    updateLoginTimestamp(username);
    return true;
  }
  return false;
};
