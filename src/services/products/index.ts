import axios from "axios";
import env from "@/config/env";

class Service {
  fetchProducts(query?: any) {
    return axios.get(env.api.products, {
      params: query,
      withCredentials: true,
    });
  }

  getProductById({ productId }: { productId: string }) {
    return axios.get(`${env.api.products}/${productId}`, {
      withCredentials: true,
    });
  }

  createProduct(data: any) {
    return axios.post(env.api.products, data, {
      withCredentials: true,
    });
  }

  updateProduct({ id, ...data }: { id: string; [key: string]: any }) {
    return axios.put(`${env.api.products}/${id}`, data, {
      withCredentials: true,
    });
  }

  deleteProduct({ id }: { id: string }) {
    return axios.delete(`${env.api.products}/${id}`, {
      withCredentials: true,
    });
  }
}

const ProductsService = new Service();
export default ProductsService;
