interface CategoryTabsProps {
  active: string;
  onChange: (category: string) => void;
}

const categories = [
  "CELULAR",
  "ACESSÓRIOS",
  "TABLETS",
  "NOTEBOOKS",
  "TVS",
  "VER TODOS"
];

export function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <nav className="categories" aria-label="Categorias de produtos">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`category ${active === category ? "active" : ""}`}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </nav>
  );
}