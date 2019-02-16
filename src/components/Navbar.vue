<template>
  <div class="navbar">
    <nav class="nav-extended blue darken-1">
      <div class="nav-content">
        <router-link :to="{ name: 'home' }">
          <span class="nav-title">My Recipes</span>
        </router-link>
        <a href="" class="btn-floating btn-large halfway-fab yellow darken-4">
          <router-link :to="{ name: 'recipe' }">
            <i class="material-icons">add</i>
          </router-link>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {

    }
  }
}
</script>

<style>
.navbar nav {
  padding: 0 20px;
}
</style>