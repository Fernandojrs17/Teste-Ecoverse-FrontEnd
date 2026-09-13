import type { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
  onOpen: (product: Product) => void;
}

const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

export function ProductCard({ product, onOpen }: ProductCardProps) {
  return (
    <article className="product-card">
      <button
        type="button"
        className="product-image-button"
        onClick={() => onOpen(product)}
        aria-label={`Ver detalhes de ${product.productName}`}
      >
        <img
          src={product.photo}
          alt={product.productName}
          className="product-image"
        />
      </button>

      <div className="product-info">
        <h2>{product.descriptionShort}</h2>
        <strong className="product-price">{money.format(product.price)}</strong>
        <span className="shipping">Frete grátis</span>
      </div>

      <button
        type="button"
        className="buy-button"
        onClick={() => onOpen(product)}
      >
        COMPRAR
      </button>
    </article>
  );
}