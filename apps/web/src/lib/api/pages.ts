import axios from 'axios';

// Vite env typing fix
const API_URL =
  (import.meta as any).env?.VITE_API_URL ||
  (window as any).VITE_API_URL ||
  'http://localhost:3001';

export async function createPage(siteId: string, title: string, slug: string) {
  const res = await axios.post(`${API_URL}/sites/${siteId}/pages`, {
    title,
    slug,
  });
  return res.data;
}

export async function getPage(siteId: string, slug: string) {
  const res = await axios.get(`${API_URL}/sites/${siteId}/pages/${slug}`);
  return res.data;
}

export async function updatePage(siteId: string, slug: string, data: any) {
  const res = await axios.put(`${API_URL}/sites/${siteId}/pages/${slug}`, {
    data,
  });
  return res.data;
}
