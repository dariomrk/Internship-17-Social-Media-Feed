import seedData from '../data/seed.json';

/**
 * Gets all users from localStorage.
 * @returns {[{username: string, password: string, lastLogin: string}]} users array
 */
export const getUsers = () => JSON.parse(localStorage.getItem('users')) ?? seedData.users;

/**
 * Adds a new user to localStorage.
 * @param {string} username new users username
 * @param {string} password new users password
 * @returns {void}
 */
export const addUser = (username, password) => {
  const existingUsers = getUsers();
  if (existingUsers.some((existingUser) => existingUser.username === username)) { throw new Error('Username is taken.'); }

  localStorage.setItem('users', JSON.stringify([
    ...existingUsers,
    {
      username,
      password,
      lastLogin: new Date().toISOString(),
    }]));
};

/**
 * Check whether the given username is already in use.
 * @param {string} username username to check
 * @returns {boolean} boolean indicating the username is in use
 */
export const usernameExists = (username) => {
  const user = getUsers().find((u) => u.username === username);

  return !!user;
};

/**
 * Check whether the users login is still valid.
 * @param {string} username users username
 * @returns {boolean} boolean indicating whether the login is still valid.
 */
export const isValidLoginTimespan = (username) => {
  if (!usernameExists(username)) {
    return false;
  }
  const user = getUsers().find((u) => u.username === username);
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
  if (!usernameExists(username)) {
    return;
  }
  const user = getUsers().find((u) => u.username === username);
  removeUser(username);
  addUser(username, user.password);
};

/**
 * Sets the last logged in user.
 * @param {string} username user to set
 * @returns {void}
 */
export const setLastLoggedIn = (username) => {
  localStorage.setItem('lastLoggedInUser', username);
};

/**
 * Clears the last logged in user.
 * @returns {void}
 */
export const clearLastLoggedIn = () => {
  localStorage.setItem('lastLoggedInUser', null);
};

/**
 * Get the last logged in users username.
 * @returns {string} last logged in users username
 */
export const getLastLoggedIn = () => localStorage.getItem('lastLoggedInUser');

/**
 * Checks users credentials.
 * @param {string} username users username
 * @param {stringn} password users password
 * @returns {boolean} boolean indicating credential validity.
 */
export const logIn = (username, password) => {
  if (!usernameExists(username)) { return false; }

  const user = getUsers().find((u) => u.username === username);

  if (user.password === password) {
    setLastLoggedIn(username);
    updateLoginTimestamp(username);
    return true;
  }
  return false;
};

/**
 * Check whether the last user can auto log in.
 * @returns {boolean} boolean indicating whether the last user can auto log in
 */
export const canAutoLogIn = () => isValidLoginTimespan(getLastLoggedIn());
