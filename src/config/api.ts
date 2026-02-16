const api = ({ inProduction }: { inProduction: boolean }) => {
  const BASE_URL_LINK = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/admin";

  return {
    auth: BASE_URL_LINK + "/auth",
    categories: BASE_URL_LINK + "/categories",
    tags: BASE_URL_LINK + "/tags",
    users: BASE_URL_LINK + "/users",
    products: BASE_URL_LINK + "/products",
  };
};

export default api;
