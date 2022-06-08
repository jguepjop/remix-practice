export function login(userName: string) {
  window.localStorage.setItem("userName", userName);
}

export function logout() {
  window.localStorage.removeItem("userName");
}

export function checkLogin() {
  // const username = window.localStorage.getItem("userName");
  return window.localStorage.getItem("userName") || "";
}
