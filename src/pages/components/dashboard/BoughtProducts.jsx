import { ProductService } from "../../../services/product-service";
import ProductList from "./ProductList";

const BoughtProducts = () => {
  const retrieveProducts = async ({ id, pageNo, pageSize, source }) => {
    return await ProductService.retrieveBoughtProductsOfUser({
      id,
      pageNo,
      pageSize,
      source,
    });
  };
  return <ProductList retrieveData={retrieveProducts} />;
};

export default BoughtProducts;
