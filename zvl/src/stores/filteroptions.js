import { defineStore } from 'pinia'
import { fetchSkillsAndCategories } from "@/services/optionService";

export const useFilterOptionStore = defineStore("filteroption", {
  state: () => ({
    options: [],
    loading: false,
    error: null,
  }),
  actions: {

    async loadOptionsFromApi() {
      this.loading = true;
      this.error = null;

      try {
        const { skills, categories } = await fetchSkillsAndCategories();
        this.options = categories.map((category) => ({
          key: `${category.id}`,
          label: category.name,
          children: skills
            .filter((skill) => skill.category_id === category.id)
            .map((skill) => ({
              key: `${category.id}-${skill.id}`,
              label: skill.name,
              data: skill.id,
            })),
        }));
      } catch (error) {
        console.error("Error fetching skills or categories:", error);
        this.error = "Failed to load options.";
      } finally {
        this.loading = false;
      }
    },
  },
});
