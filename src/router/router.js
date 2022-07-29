import { createRouter, createWebHashHistory } from "vue-router";
import isAuthenticatedGuard from "./auth-guard";

// import ListPage from "@/modules/pokemon/pages/ListPage";
// import AboutPage from "@/modules/pokemon/pages/AboutPage";
// import PokemonPage from "@/modules/pokemon/pages/PokemonPage";

// import NoPageFound from "@/modules/shared/pages/NoPageFound";

const routes = [
  {
    path: "/",
    redirect: "/pokemon",
  },
  {
    path: "/pokemon",
    name: "pokemon",
    component: () =>
      import(
        /*webpackChunkName: "PokemonLayout" */ "@/modules/pokemon/layouts/PokemonLayout"
      ),
    children: [
      {
        path: "home",
        name: "pokemon-home",
        component: () =>
          import(
            /*webpackChunkName: "ListPage"*/ "@/modules/pokemon/pages/ListPage"
          ),
      },
      {
        path: "about",
        name: "pokemon-about",
        component: () =>
          import(
            /*webpackChunkName: "AboutPage"*/ "@/modules/pokemon/pages/AboutPage"
          ),
      },
      {
        path: "pokemonid/:pokeid",
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
        path: "",
        redirect: { name: "pokemon-about" },
      },
    ],
  },
  {
    path: "/dbz",
    name: "dbz",
    beforeEnter : [ isAuthenticatedGuard ],
    component: () =>
      import(
        /*webpackChunkName:"DBZLayout"*/ "@/modules/dbz/layouts/DragonBallLayout"
      ),
    children: [
      {
        path: "characters",
        name: "dbz-characters",
        beforeEnter : [ isAuthenticatedGuard ],
        component: () =>
          import(
            /*webpackChunkName:"DBZCharacters"*/ "@/modules/dbz/pages/Characters"
          ),
      },
      {
        path: "about",
        name: "dbz-about",
        beforeEnter : [ isAuthenticatedGuard ],
        component: () =>
          import(/*webpackChunkName:"DBZAbout"*/ "@/modules/dbz/pages/About"),
      },
      {
        path: "",
        redirect: { name: "dbz-characters" },
      },
    ],
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

// Guard Global - Sincrono
// router.beforeEach((to,from,next)=> {
//   console.log({to,from,next})

//   const random = Math.random() * 100
//   if(random > 50){
//     console.log('autenticado')
//     next()
//   }else{
//     console.log(random, 'bloquedo por el beforeEach Guard')
//     next({name: 'pokemon-home'})

//   }
// })

//Guard global asíncono
// const canAccess = () => {
//   return new Promise((resolve) => {
//     const random = Math.random() * 100;
//     if (random > 50) {
//       console.log("autenticado - canAccess")
//       resolve(true)
//     } else {
//       console.log(random, "bloquedo por el beforeEach Guard - caAccess")
//       resolve(false)
//     }
//   });
// };

// router.beforeEach(async(to,from,next)=>{
//   const authorized = await canAccess(to,from,next)
//   authorized ? next() : next({name: 'pokemon-home'})
// })

export default router;
