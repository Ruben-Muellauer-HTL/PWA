<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="d-flex justify-content-center">
    <RouterLink to="/" class="text-dark nav-link" active-class="border-bottom border-3 border-dark"
      >Home</RouterLink
    >
    <RouterLink
      to="/about"
      class="text-dark ms-4 nav-link"
      active-class="border-bottom border-3 border-dark"
      >About</RouterLink
    >
  </div>
  <RouterView class="mt-4"></RouterView>
</template>
