import { HttpStatusCode } from "axios";
import { axiosInstance } from "../utils/common-utils";
import { LocalStorageService } from "./local-storage-service";

const createProduct = async (data) => {
  try {
    const { listingType } = data;
    if (listingType === "BUY") {
      delete data.rentPrice;
      delete data.rentType;
    } else {
      delete data.price;
    }
    const response = await axiosInstance.post("products", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + LocalStorageService.getAuthToken(),
      },
    });
    return response.data;
  } catch (error) {
    if (error && error.response) {
      const errorResponseStatus = error.response.status;
      switch (errorResponseStatus) {
        case HttpStatusCode.Unauthorized:
          throw new Error("Username and password don't match.");
        default:
          throw new Error("Couldn't create product. Please try again.");
      }
    } else {
      throw new Error("Couldn't create product. Please try again.");
    }
  }
};

const retrieveProductsOfUser = async ({
  id,
  pageNo = 0,
  pageSize = 15,
  source,
}) => {
  try {
    const response = await axiosInstance.get(`users/${id}/products`, {
      headers: {
        Authorization: "Bearer " + LocalStorageService.getAuthToken(),
      },
      params: {
        pageNo,
        pageSize,
      },
      cancelToken: source?.token,
    });
    return response.data;
  } catch (error) {
    return [];
  }
};

const deleteProduct = async ({ id }) => {
  try {
    const response = await axiosInstance.delete(`products/${id}`, {
      headers: {
        Authorization: "Bearer " + LocalStorageService.getAuthToken(),
      },
    });
    return response.data;
  } catch (error) {
    if (error && error.response) {
      const errorResponseStatus = error.response.status;
      switch (errorResponseStatus) {
        case HttpStatusCode.Unauthorized:
        case HttpStatusCode.Forbidden:
          throw new Error("You are not allowed to delete this product.");
        case HttpStatusCode.NotFound:
          throw new Error("Product not found!");
        default:
          throw new Error("Product couldn't be deleted. Please try again.");
      }
    } else {
      throw new Error("Product couldn't be deleted. Please try again.");
    }
  }
};
const updateProduct = async (id, state) => {
  try {
    if (state.listingType === "BUY") {
      state.rentPrice = null;
      state.rentType = null;
    } else {
      state.price = null;
    }
    const response = await axiosInstance.put(`products/${id}`, state, {
      headers: {
        Authorization: "Bearer " + LocalStorageService.getAuthToken(),
      },
    });
    return response.data;
  } catch (error) {
    if (error && error.response) {
      const errorResponseStatus = error.response.status;
      switch (errorResponseStatus) {
        case HttpStatusCode.Unauthorized:
        case HttpStatusCode.Forbidden:
          throw new Error("You are not allowed to delete this product.");
        case HttpStatusCode.NotFound:
          throw new Error("Product not found!");
        case HttpStatusCode.BadRequest:
          throw new Error("Bad request!");
        default:
          throw new Error("Product couldn't be deleted. Please try again.");
      }
    } else {
      throw new Error("Product couldn't be deleted. Please try again.");
    }
  }
};

const updateViewCount = async (id) => {
  try {
    await axiosInstance.put(
      `products/${id}/view-count`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const mapHistoryData = (data = []) => {
  return data.map((item) => ({
    ...item.product,
    bought: item.acquisitionType === "BUY",
    rented: item.acquisitionType === "RENT",
    acquiredAt: item.acquiredAt,
    rentFrom: new Date(item.acquisitionStart).toUTCString(),
    rentTo: new Date(item.acquisitionEnd).toUTCString(),
  }));
};

const retrieveBoughtProductsOfUser = async ({
  id,
  pageNo = 0,
  pageSize = 15,
  source,
}) => {
  try {
    const response = await axiosInstance.get(`acquisitions`, {
      headers: {
        Authorization: "Bearer " + LocalStorageService.getAuthToken(),
      },
      params: {
        pageNo,
        pageSize,
        acquisitionType: "BUY",
        userId: id,
      },
      cancelToken: source?.token,
    });
    return mapHistoryData(response.data);
  } catch (error) {
    return [];
  }
};

const retrieveBorrowedProductsOfUser = async ({
  id,
  pageNo = 0,
  pageSize = 15,
  source,
}) => {
  try {
    const response = await axiosInstance.get(`acquisitions`, {
      headers: {
        Authorization: "Bearer " + LocalStorageService.getAuthToken(),
      },
      params: {
        pageNo,
        pageSize,
        acquisitionType: "RENT",
        userId: id,
      },
      cancelToken: source?.token,
    });
    return mapHistoryData(response.data);
  } catch (error) {
    return [];
  }
};
const retrieveSoldProductsOfUser = async ({
  id,
  pageNo = 0,
  pageSize = 15,
  source,
}) => {
  try {
    const response = await axiosInstance.get(`acquisitions/uploaded-products`, {
      headers: {
        Authorization: "Bearer " + LocalStorageService.getAuthToken(),
      },
      params: {
        pageNo,
        pageSize,
        ownerId: id,
        acquisitionType: "BUY",
      },
      cancelToken: source?.token,
    });
    return mapHistoryData(response.data);
  } catch (error) {
    return [];
  }
};
const retrieveLentProductsOfUser = async ({
  id,
  pageNo = 0,
  pageSize = 15,
  source,
}) => {
  try {
    const response = await axiosInstance.get(`acquisitions/uploaded-products`, {
      headers: {
        Authorization: "Bearer " + LocalStorageService.getAuthToken(),
      },
      params: {
        pageNo,
        pageSize,
        ownerId: id,
        acquisitionType: "RENT",
      },
      cancelToken: source?.token,
    });
    return mapHistoryData(response.data);
  } catch (error) {
    return [];
  }
};

const retrieveProducts = async ({
  pageNo = 0,
  pageSize = 15,
  source,
  minPrice = "",
  maxPrice = "",
  categoryId,
  acquisitionType,
  rentType,
  title = "",
}) => {
  try {
    const response = await axiosInstance.get(`products`, {
      params: {
        pageNo,
        pageSize,
        title,
        ...(minPrice ? { minPrice } : {}),
        ...(maxPrice ? { minPrice } : {}),
        ...(categoryId ? { categoryId } : {}),
        acquisitionType,
        ...(rentType ? { rentType } : {}),
      },
      cancelToken: source?.token,
    });
    return response.data;
  } catch (error) {
    return [];
  }
};

const retrieveProductDetails = async ({ id, source }) => {
  try {
    const response = await axiosInstance.get(`products/` + id, {
      cancelToken: source?.token,
    });
    return response.data;
  } catch (error) {
    if (error && error.response) {
      const errorResponseStatus = error.response.status;
      switch (errorResponseStatus) {
        case HttpStatusCode.NotFound:
          throw new Error("Product not found!");

        default:
          throw new Error("Product couldn't be deleted. Please try again.");
      }
    } else {
      throw new Error("Product couldn't be deleted. Please try again.");
    }
  }
};
const buy = async ({ id, userId, version }) => {
  try {
    const response = await axiosInstance.post(
      "acquisitions",
      { acquisitionType: "BUY", productId: id, acquirerId: userId, version },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + LocalStorageService.getAuthToken(),
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error && error.response) {
      const errorResponseStatus = error.response.status;
      switch (errorResponseStatus) {
        case HttpStatusCode.NotFound:
          throw new Error("Product not found!");
        case HttpStatusCode.Forbidden:
          throw new Error("You can't buy your own products.");
        case HttpStatusCode.Unauthorized:
          throw new Error("Please log in first.");
        case HttpStatusCode.Conflict:
          throw new Error("Product not available to buy.");
        default:
          throw new Error("Product couldn't be purchased. Please try again.");
      }
    } else {
      throw new Error("Product couldn't be purchased. Please try again.");
    }
  }
};

const borrow = async ({ id, userId, version }) => {
  try {
    const response = await axiosInstance.post(
      "acquisitions",
      { acquisitionType: "RENT", productId: id, acquirerId: userId, version },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + LocalStorageService.getAuthToken(),
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error && error.response) {
      const errorResponseStatus = error.response.status;
      switch (errorResponseStatus) {
        case HttpStatusCode.NotFound:
          throw new Error("Product not found!");
        case HttpStatusCode.Forbidden:
          throw new Error("You can't borrow your own products.");
        case HttpStatusCode.Unauthorized:
          throw new Error("Please log in first.");
        case HttpStatusCode.Conflict:
          throw new Error("Product not available to borrow.");
        default:
          throw new Error("Product couldn't be borrowed. Please try again.");
      }
    } else {
      throw new Error("Product couldn't be borrowed. Please try again.");
    }
  }
};

export const ProductService = {
  createProduct,
  retrieveProductsOfUser,
  deleteProduct,
  updateProduct,
  retrieveBoughtProductsOfUser,
  retrieveBorrowedProductsOfUser,
  retrieveLentProductsOfUser,
  retrieveSoldProductsOfUser,
  retrieveProducts,
  retrieveProductDetails,
  buy,
  borrow,
  updateViewCount,
};
