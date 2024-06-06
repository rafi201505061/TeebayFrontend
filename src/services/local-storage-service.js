const AUTH_TOKEN_KEY = "auth-token-key";
const setAuthToken = (token) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

const getAuthToken = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

const deleteAuthToken = () => {
  return localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const LocalStorageService = {
  setAuthToken,
  getAuthToken,
  deleteAuthToken,
};
