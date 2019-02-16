import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import AddRecipe from "./views/Recipe.vue";
import EditRecipe from "./views/Edit.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/add_recipe",
      name: "recipe",
      component: AddRecipe
    },
    {
      path: "/edit_recipe/:recipe_slug",
      name: "edit",
      component: EditRecipe
    }
  ]
});
