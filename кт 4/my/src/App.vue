<template>
  <div id="app">
    <h1>Каталог товаров</h1>
    <ProductList />
  </div>
</template>

<script setup>
import ProductList from './components/ProductList.vue'
</script>

<style>
#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
