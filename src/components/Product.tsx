import { productData } from "../data/data";
import ProductTile from "./productTile";

const Product = () => {
  return (
    <div>
      {productData.map((data) => {
        return (
          <div key={data.productID}>
            <ProductTile
              productID={data.productID}
              productName={data.productName}
              productDesc={data.productDesc}
              productImageURL={data.productImageURL}
              originalPrice={data.originalPrice}
              offerPrice={data.offerPrice}
              quantity={data.quantity}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Product;
