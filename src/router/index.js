import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import Account from "@/pages/Account.vue";
import Artifact from "@/pages/Artifact.vue";
import About from "@/pages/About.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/account",
      name: "Account",
      component: Account,
    },
    {
      path: "/about",
      name: "About",
      component: About,
    },
    {
      path: "/artifact/:id",
      name: "Artifact",
      component: Artifact,
    },
  ],
});

export default router;
