<script>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
export default {
  components: {
    Navbar
  }
}
</script>

<template>
  <Navbar />
  <div class="py-[50px]">
    <RouterView />
  </div>
</template>
