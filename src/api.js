export const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');
let csrfToken = '';
let currentUser = null;
export function getUser() { return currentUser; }
export function setUser(user) {
  currentUser = user;
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.dispatchEvent(new CustomEvent('userUpdated', { detail: user }));
}
export async function apiFetch(path, options = {}) {
  const method = (options.method || 'GET').toUpperCase();
  if (!['GET', 'HEAD', 'OPTIONS'].includes(method) && !['/user/login', '/new/signup'].includes(path) && !csrfToken) await loadSession();
  const headers = new Headers(options.headers);
  if (options.body && !(options.body instanceof FormData)) headers.set('Content-Type', 'application/json');
  if (csrfToken) headers.set('X-CSRF-Token', csrfToken);
  const response = await fetch(API_BASE + path, { ...options, headers, credentials: 'include' });
  if (response.status === 401) { csrfToken = ''; setUser(null); }
  return response;
}
export async function request(path, options) {
  const response = await apiFetch(path, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Opération impossible. Réessayez.');
  if (data.csrfToken) csrfToken = data.csrfToken;
  return data;
}
export async function loadSession() {
  const response = await fetch(API_BASE + '/session', { credentials: 'include' });
  if (response.status === 401) { csrfToken = ''; setUser(null); return null; }
  if (!response.ok) throw new Error('Session indisponible. Réessayez.');
  const data = await response.json(); csrfToken = data.csrfToken; setUser(data.user); return data.user;
}
export async function logout() {
  await request('/user/logout', { method: 'POST' }); csrfToken = ''; setUser(null);
}
export async function download(path, filename) {
  const response = await apiFetch(path);
  if (!response.ok) throw new Error((await response.json().catch(() => ({}))).error || 'Téléchargement impossible');
  const url = URL.createObjectURL(await response.blob());
  const link = document.createElement('a'); link.href = url; link.download = filename;
  document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}
