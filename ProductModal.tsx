import { useEffect } from "react";
import type { Product } from "../types/Product";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

export function ProductModal({ product, onClose }: ProductModalProps) {
  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="close-button"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>

        <div className="modal-image-wrap">
          <img src={product.photo} alt={product.productName} />
        </div>

        <div className="modal-info">
          <span className="modal-label">PRODUTO</span>
          <h2 id="modal-title">{product.productName}</h2>
          <p>{product.descriptionShort}</p>
          <strong>{money.format(product.price)}</strong>
          <span className="shipping">Frete grátis</span>
          <button type="button" className="modal-buy-button">
            COMPRAR
          </button>
        </div>
      </section>
    </div>
  );
}