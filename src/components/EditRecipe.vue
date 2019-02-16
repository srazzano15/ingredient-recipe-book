<template>
  <div v-if="recipe" class="edit-recipe container">
    <h2>Edit {{ recipe.title }}</h2>
    <form @submit.prevent="editRecipe()">
      <div class="field title">
        <label for="title">Recipe Title</label>
        <input type="text" name="title" v-model="recipe.title" @input="slugify()">
      </div>

      <div class="field" v-for="(ingredient, index) in recipe.ingredients" :key="index">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="recipe.ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ingredient)">delete</i>
      </div>

      <div class="field add-ingredient">
        <label for="add-ingredient">Add Ingredient</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
        <small class="red-text" v-if="this.feedback">{{ feedback }}</small>
      </div>
      <div class="field center-align">
        <button class="btn yellow darken-4">Update Recipe</button>
      </div>
      <div v-for="(error, index) in errors" :key="index">
        <p class="red-text error">{{ error }}</p>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
export default {
  name: "EditRecipe",
  data() {
    return {
      recipe: null,
      another: null,
      feedback: null,
      errors: []
    };
  },
  created() {
    let ref = db
      .collection("recipes")
      .where("slug", "==", this.$route.params.recipe_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.recipe = doc.data();
        this.recipe.id = doc.id;
      });
    });
  },
  methods: {
    addIng() {
      if (this.another) {
        this.recipe.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "Please enter a value here!";
      }
    },
    deleteIng(ing) {
      this.recipe.ingredients = this.recipe.ingredients.filter(ingredient => {
        return ingredient != ing;
      });
    },
    slugify() {
      let slug = this.recipe.title
          .toLowerCase()
          .split(' ')
          .join('-');
  
      this.recipe.slug = slug;
    },
    editRecipe() {
      if (this.recipe.title) {
        this.errors.shift();
        db.collection('recipes').doc(this.recipe.id).update({
          title: this.recipe.title,
          ingredients: this.recipe.ingredients,
          slug: this.recipe.slug,
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
    }
  }
};
</script>

<style>
.edit-recipe {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-recipe h2 {
  font-size: 2.4em;
  margin: 20px auto;
}
.edit-recipe .field {
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
  position: absolute;
}
</style>
