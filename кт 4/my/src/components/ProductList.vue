<template>
  <div class="product-page">
    <section class="filters">
      <h2>Фильтры</h2>
      <form @submit.prevent class="filter-form">
        <div class="filter-group">
          <label for="search">Поиск по названию</label>
          <input
            id="search"
            v-model="filters.search"
            type="text"
            placeholder="Введите название..."
            class="input-text"
          />
        </div>

        <div class="filter-group">
          <label for="categories">Категории</label>
          <select
            id="categories"
            multiple
            v-model="filters.categories"
            class="select-multiple"
          >
            <option
              v-for="category in categories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>

        <div class="filter-group range-group">
          <label>Цена от {{ filters.priceMin }} $</label>
          <input
            type="range"
            :min="priceRange.min"
            :max="priceRange.max"
            step="50"
            v-model.number="filters.priceMin"
            class="range-input"
          />
        </div>
        <div class="filter-group range-group">
          <label>до {{ filters.priceMax }} $</label>
          <input
            type="range"
            :min="priceRange.min"
            :max="priceRange.max"
            step="50"
            v-model.number="filters.priceMax"
            class="range-input"
          />
        </div>

        <div class="filter-group rating-group">
          <label>Рейтинг: {{ filters.rating }}</label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            v-model.number="filters.rating"
            class="range-input"
          />
        </div>
      </form>
    </section>

    <section class="products">
      <h2>Товары</h2>
      <div class="product-grid">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="product-card"
        >
          <img :src="product.images[0]" alt="" class='product-image' />
          <h3>{{ product.title }}</h3>
          <p>{{ product.description }}</p>
          <p><strong>Категория:</strong> {{ product.category }}</p>
          <p><strong>Цена:</strong> {{ product.price }} $</p>
          <p><strong>Рейтинг:</strong> {{ product.rating }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  fetchProducts,
  getUniqueCategories,
  getPriceRange,
  getFilteredProducts,
} from './ProductService.js'

const products = ref([])
const categories = ref([])
const priceRange = ref({ min: 0, max: 500 })

const filters = ref({
  search: '',
  categories: [],
  priceMin: 0,
  priceMax: 500,
  rating: 0,
})

onMounted(async () => {
  await fetchProducts()
  products.value = getFilteredProducts({})
  categories.value = getUniqueCategories()
  const range = getPriceRange()
  priceRange.value = range
  filters.value.priceMin = range.min
  filters.value.priceMax = range.max
})

const filteredProducts = computed(() => {
  return getFilteredProducts(filters.value)
})
</script>

<style scoped>
.product-page {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
  background-color: #f4f4f9;
}

h2 {
  color: #333;
}

.filters {
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
  margin-bottom:30px;
}
.filter-form {
  display:flex;
  flex-wrap: wrap;
  gap:20px;
}
.filter-group {
  display:flex;
  flex-direction: column;
}
.input-text {
  padding:10px;
  border-radius:8px;
  border:1px solid #ccc;
}
.select-multiple {
  padding:10px;
  border-radius:8px;
  border:1px solid #ccc;
}
.range-group {
}
.rating-group {
}

.range-input {
  width:100%;
}

.products {
}
.product-grid {
 display:flex;
 flex-wrap:wrap;
 gap:20px;
}
.product-card {
 background:#fff;
 border-radius:12px;
 box-shadow:0px4px8px rgba(0,0,0,0.05);
 width: calc(25% -20px);
 padding:15px;
 transition:.3s all ease-in-out;
 display:flex;
 flex-direction:column;
 align-items:center; 
}
.product-card:hover {
 box-shadow:0px4px16px rgba(0,0,0,0.15);
 transform:translateY(-5px);
}
.product-image {
 width:auto;
 height:auto;
 max-width:100%;
 border-radius:8px; 
 margin-bottom:10px; 
 object-fit:cover; 
}

@media(max-width:1024px){
 .product-card{
   width:auto;
 }
}

</style>