<template>
  <div class="index container">
    <div class="card" v-for="recipe in recipes" :key="recipe.id">
      <div class="card-content">
        <i class="material-icons delete" v-on:click="deleteRecipe(recipe.id)">delete</i>
        <h2 class="blue-text">{{ recipe.title }}</h2>
        <ul class="ingredients">
          <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
            <span class="chip">{{ ingredient }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab yellow darken-2">
        <router-link :to="{ name: 'edit', params: { recipe_slug: recipe.slug } }">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "Index",
  data() {
    return {
      recipes: []
    };
  },
  methods: {
    deleteRecipe(id) {
      db.collection('recipes')
        .doc(id)
        .delete()
        .then(() => {
          this.recipes = this.recipes.filter(recipe => {
            return recipe.id != id
          })
        })
    }
  },
  created() {
    // fetch data from firestore
    db.collection("recipes")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
            let recipe = doc.data();
            recipe.id = doc.id;
            this.recipes.push(recipe);
            });
        });
  }
};
</script>

<style>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.index .ingredients {
  margin: 30px auto;
}
.index .ingredients li {
  display: inline-block;
}
.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  font-size: 1.4em;
  color: #999999;
}
.index .ingredients .chip {
  font-size: 1em;
  height: auto;
}
/*MEDIA QUERIES*/
@media screen and ( max-width: 460px) {
  .index .ingredients .chip {
    font-size: 2.9vw;

  }
}
@media screen and ( max-width: 599px ) {
  .index {
    display: block;
  }
  .index h2 {
    font-size: 1.3em;
  }
  .index .ingredients .chip {
    font-size: 2.7vw;
    height: auto;
  }
}
@media screen and (min-width: 600px) and ( max-width: 786px ) {
  .index {
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
  .index h2 {
    font-size: 1.25em
  }
  .index .ingredients li {
    display: block;
  }
  .index .ingredients .chip {
    font-size: 1.75vw;
    height: auto;
  }
}
@media screen and (min-width: 787px) and ( max-width: 1024px ) {
  .index {
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;

  }
  .index h2 {
    font-size: 2.9vw
  }
  .index .ingredients li {
    display: block;
  }
  .index .ingredients .chip {
    font-size: 1.75vw;
    height: auto;
  }
}
@media screen and (min-width: 1025px) and (max-width: 1200px) {
  .index {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
  }
  .index h2 {
    font-size: 2.6vw
  }
  .index .ingredients li {
    display: block;
  }
  .index .ingredients .chip {
    font-size: 1.2vw;
    height: auto;
  }
}
</style>