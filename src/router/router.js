import { createRouter, createWebHashHistory } from "vue-router";

// import ListPage from "@/modules/pokemon/pages/ListPage";
// import AboutPage from "@/modules/pokemon/pages/AboutPage";
// import PokemonPage from "@/modules/pokemon/pages/PokemonPage";

// import NoPageFound from "@/modules/shared/pages/NoPageFound";

const routes = [
  {
    path:  '/',
    redirect:'/home'
  },
  {
    path: "/home",
    name: 'home',
    component: () =>
      import(
        /*webpackChunkName: "ListPage"*/ "@/modules/pokemon/pages/ListPage"
      ),
  },
  {
    path: "/about",
    name: 'about',
    component: () =>
      import(
        /*webpackChunkName: "AboutPage"*/ "@/modules/pokemon/pages/AboutPage"
      ),
  },
  {
    path: "/pokemonid/:pokeid",
    name: "pokemon-id",
    component: () =>
      import(
        /*webpackChunkName: "PokemonPage"*/ "@/modules/pokemon/pages/PokemonPage"
      ),
    props: (route) => {
      const { pokeid } = route.params;
      const id = Number(pokeid);
      return isNaN(id) ? { pokeid: 1 } : { pokeid: id };
    },
  },
  {
    path: "/:pathMatch(.*)*",
    component: () =>
      import(
        /*webpackChunkName: "NoPageFound"*/ "@/modules/shared/pages/NoPageFound"
      ),
    // redirect: '/home'
  },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

export default router;
