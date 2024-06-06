import { ProductService } from "../../../services/product-service";
import ProductList from "./ProductList";

const LentProducts = () => {
  const retrieveProducts = async ({ id, pageNo, pageSize, source }) => {
    return await ProductService.retrieveLentProductsOfUser({
      id,
      pageNo,
      pageSize,
      source,
    });
  };
  return <ProductList retrieveData={retrieveProducts} />;
};

export default LentProducts;
