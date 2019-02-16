<template>
  <div class="add-recipe container">
    <h2 class="center-align blue-text">Add New Recipe</h2>
    <form @submit.prevent="addRecipe()">
      <div class="field title">
        <label for="title">Recipe Title</label>
        <input type="text" name="title" v-model="title" @input="slugify()">
      </div>
      
        <div class="field" v-for="(ingredient, index) in ingredients" :key="index">
          <label for="ingredient">Ingredient:</label>
          <input type="text" name="ingredient" v-model="ingredients[index]">
          <i class="material-icons delete" @click="deleteIng(ingredient)">delete</i>
        </div>
      
      <div class="field add-ingredient">
        <label for="add-ingredient">Add Ingredient</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
        <small class="red-text" v-if="this.feedback">{{ feedback }}</small>
      </div>
      <div class="field center-align">
        <button class="btn yellow darken-4">Add Recipe</button>
      </div>
      <div v-for="(error, index) in errors" :key="index">
        <p class="red-text error">{{ error }}</p>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'


export default {
  name: 'AddRecipe',
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      errors: [],
      slug: null
    }
  },
  methods: {
    addRecipe() {
      if (this.title) {
        this.errors.shift();
        this.addIng();
        db.collection('recipes').add({
          title: this.title,
          ingredients: this.ingredients,
          slug: this.slug,
        }).then(() => {
          this.$router.push({ name: 'home'})
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.errors.push('You must enter a title!')
      }
      if (this.ingredients.length) {
        
      } else {
        this.errors.push('Your recipe must have ingredients!')
      }
    },
    addIng() {
      if(this.another) {
        this.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "Please enter a value here!"
      }
    },
    deleteIng(ing) {
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient != ing
      })
    },
    slugify() {
      let slug = this.title
          .toLowerCase()
          .split(' ')
          .join('-');
  
      this.slug = slug;
    }
  },
}
</script>

<style>
.add-recipe {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-recipe h2 {
  font-size: 2.4em;
  margin: 20px auto;
}
.add-recipe .field {
  margin: 20px auto;
  position: relative;
}
.error {
  font-size: 1.2em;
}
.delete {
  color: #999;
  bottom: 16px;
  right: 0;
  font-size: 1.4em;
  cursor: pointer;
  position: absolute
}
</style>
