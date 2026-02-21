import axios from "axios";
import env from "@/config/env";

import { IFetchBrandQuery, IBrand } from "@/types";

class Service {
  fetchBrands(queries?: IFetchBrandQuery) {
    return axios.get(env.api.brands, {
      params: queries,
      withCredentials: true,
    });
  }

  createBrand({ name, status }: IBrand) {
    return axios.post(
      env.api.brands,
      {
        name,
        status,
      },
      {
        withCredentials: true,
      },
    );
  }

  updateBrand({ id, name, status }: IBrand) {
    return axios.put(
      env.api.brands + `/` + id,
      {
        name,
        status,
      },
      {
        withCredentials: true,
      },
    );
  }

  deleteBrand({ id }: { id: string }) {
    return axios.delete(`${env.api.brands}/${id}`, {
      withCredentials: true,
    });
  }

  getBrandById({ brandId }: { brandId: string }) {
    return axios.get(`${env.api.brands}/${brandId}`, {
      withCredentials: true,
    });
  }
}

const BrandsService = new Service();
export default BrandsService;
