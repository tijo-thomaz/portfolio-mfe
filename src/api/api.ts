export const fetchProjects = async () => {
  try {
    const response = await fetch("https://htmx-mfe.example.com/api/projects");
    return response.json();
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};
