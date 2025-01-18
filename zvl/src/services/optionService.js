import axiosInstance from './axiosInstance'; 

export async function fetchSkillsAndCategories() {
  const [skillsResponse, categoriesResponse] = await Promise.all([
    axiosInstance.get(`/skills`),
    axiosInstance.get(`/categories`),
  ]);
  return {
    skills: skillsResponse.data,
    categories: categoriesResponse.data,
  };
}
