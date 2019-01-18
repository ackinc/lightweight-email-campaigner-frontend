import { post } from './http';

export async function loginUser(payload) {
  const { token } = await post('/auth', payload);
  window.localStorage.setItem('token', token);
}

export function logoutUser() {
  window.localStorage.removeItem('token');
}
