import { post } from "./http";

export async function loginUser(payload) {
  const { token } = await post("/users", payload);
  window.localStorage.setItem("token", token);
}

export function checkLoggedIn() {
  return window.localStorage.getItem("token") !== null;
}

export function logoutUser() {
  window.localStorage.removeItem("token");
}
