import * as usersAPI from './users-api';

export async function signUp(userData) {
  try {
    // usersAPI.signUp will resolve to the token sent back
    // from the server
    const token = await usersAPI.signUp(userData);
    localStorage.setItem('token', token);
    return getUser();
  } catch {
    throw new Error('Invalid Sign Up');
  }
}

export async function login(credentials) {
  try {
    // usersAPI.login will resolve to the token sent back
    // from the server
    const token = await usersAPI.login(credentials);
    localStorage.setItem('token', token);
    return getUser();
  } catch {
    throw new Error('Invalid Credentials - Try Again');
  }
}

export function getToken() {
  // getItem returns null if there's no string
  const token = localStorage.getItem('token');
  if (!token) return null;
  // Obtain the payload of the token
  const payload = JSON.parse(atob(token.split('.')[1]));
  // A JWT's exp is expressed in seconds, not milliseconds, so convert
  if (payload.exp < Date.now() / 1000) {
    // Token has expired - remove it from localStorage
    localStorage.removeItem('token');
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  // If there's a token, return the user in the payload, otherwise return null
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export function logOut() {
  localStorage.removeItem('token');
}

export function checkToken() {
  return usersAPI.checkToken()
    .then(dateStr => new Date(dateStr));
}

export function allUsers() {
  return usersAPI.allUsers()
}