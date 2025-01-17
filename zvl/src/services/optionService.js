import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL;

export async function fetchSkillsAndCategories() {
  const [skillsResponse, categoriesResponse] = await Promise.all([
    axios.get(`${baseUrl}/skills`),
    axios.get(`${baseUrl}/categories`),
  ]);
  return {
    skills: skillsResponse.data,
    categories: categoriesResponse.data,
  };
}
