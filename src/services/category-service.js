import { axiosInstance } from "../utils/common-utils";

const retrieveAllCategories = async () => {
  try {
    const response = await axiosInstance.get("categories");
    return response.data;
  } catch (error) {
    return [];
  }
};

export const CategoryService = { retrieveAllCategories };
