import { useEffect, useState } from "react";
import { CategoryTabs } from "./components/CategoryTabs";
import { ProductCard } from "./components/ProductCard";
import { ProductModal } from "./components/ProductModal";
import { getProducts } from "./services/products";
import type { Product } from "./types/Product";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState("CELULAR");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        setError("");
        const data = await getProducts();
        setProducts(data);
      } catch {
        setError("Não foi possível carregar os produtos.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const visibleProducts = products.slice(0, 4);

  return (
    <>
      <header className="page-header">
        <span className="header-line" />
        <h1>Produtos relacionados</h1>
        <span className="header-line" />
      </header>

      <main className="container">
        <CategoryTabs
          active={activeCategory}
          onChange={setActiveCategory}
        />

        <section className="showcase" aria-label="Produtos relacionados">
          <button type="button" className="arrow" aria-label="Produtos anteriores">
            ‹
          </button>

          <div className="products-grid">
            {loading && <p className="message">Carregando produtos...</p>}

            {error && <p className="message error">{error}</p>}

            {!loading &&
              !error &&
              visibleProducts.map((product, index) => (
                <ProductCard
                  key={`${product.productName}-${index}`}
                  product={product}
                  onOpen={setSelectedProduct}
                />
              ))}
          </div>

          <button type="button" className="arrow" aria-label="Próximos produtos">
            ›
          </button>
        </section>
      </main>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}

export default App;