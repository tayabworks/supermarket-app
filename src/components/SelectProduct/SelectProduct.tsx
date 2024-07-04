import { Product } from "../../types";

interface SelectProductProps {
  catalogue: Product[];
  selectedProduct: string;
  setSelectedProduct: (productName: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const ProductSelector = ({
  catalogue,
  selectedProduct,
  setSelectedProduct,
  quantity,
  setQuantity,
}: SelectProductProps) => {
  return (
    <div>
      <h2>Select Product</h2>
      <select
        value={selectedProduct}
        onChange={(e) => setSelectedProduct(e.target.value)}
      >
        {catalogue.map((product) => (
          <option key={product.name} value={product.name}>
            {product.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        min="1"
      />
    </div>
  );
};

export default ProductSelector;
