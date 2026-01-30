const api = ({ inProduction }: { inProduction: boolean }) => {
  const BASE_URL_LINK = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/v1";

  return {
    auth: BASE_URL_LINK + "/auth",
    designs: BASE_URL_LINK + "/designs",
    claims: BASE_URL_LINK + "/claims",
    categories: BASE_URL_LINK + "/categories",
    collections: BASE_URL_LINK + "/collections",
    profiles: BASE_URL_LINK + "/profiles",
    tags: BASE_URL_LINK + "/tags",
    users: BASE_URL_LINK + "/users",
  };
};

export default api;
