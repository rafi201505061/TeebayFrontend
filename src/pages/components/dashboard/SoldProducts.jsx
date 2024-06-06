import { ProductService } from "../../../services/product-service";
import ProductList from "./ProductList";

const SoldProducts = () => {
  const retrieveProducts = async ({ id, pageNo, pageSize, source }) => {
    return await ProductService.retrieveSoldProductsOfUser({
      id,
      pageNo,
      pageSize,
      source,
    });
  };
  return <ProductList retrieveData={retrieveProducts} />;
};

export default SoldProducts;
