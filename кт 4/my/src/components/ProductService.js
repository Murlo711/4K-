import { ref } from 'vue';

const products = ref([]);

export async function fetchProducts() {
  const response = await fetch('https://dummyjson.com/products?limit=50');
  const data = await response.json();
  products.value = data.products;
}

export function getFilteredProducts(filters) {
  return products.value.filter(product => {
    const matchesName = product.title.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category);
    const matchesRating = product.rating >= filters.rating;
    const matchesPrice =
      product.price >= filters.priceMin && product.price <= filters.priceMax;
    return matchesName && matchesCategory && matchesRating && matchesPrice;
  });
}

export function getUniqueCategories() {
  const categoriesSet = new Set(products.value.map(p => p.category));
  return Array.from(categoriesSet);
}

export function getPriceRange() {
  if (products.value.length === 0) return { min: 0, max: 500 };
  const prices = products.value.map(p => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}