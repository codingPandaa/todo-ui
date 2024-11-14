// set token in local storage
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

// get token in local storage
export const getToken = () => {
  return localStorage.getItem("token");
};

// storing the logged user in session storage
export const saveLoggedInUser = (username, role) => {
  sessionStorage.setItem("authenticatedUser", username);
  sessionStorage.setItem("role", role);
};

// checking if the user is logged in
export const isUserLoggedIn = () => {
  const username = sessionStorage.getItem("authenticatedUser");
  if (username == null) {
    return false;
  } else {
    return true;
  }
};

// getting logged in user
export const getLoggedInUser = () => {
  const username = sessionStorage.getItem("authenticatedUser");
  return username;
};

// logout
export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
};

//checks admin role
export const isAdminUser = () => {
  let role = sessionStorage.getItem("role");
  if (role != null && role === "ROLE_ADMIN") {
    return true;
  } else {
    return false;
  }
};
