import { createRouter, createWebHistory } from "vue-router";
import History from "@/views/todo/History.vue";
import Kelas from "@/views/todo/Kelas.vue";
import Siswa from "@/views/todo/Siswa.vue";
import Petugas from "@/views/todo/Petugas.vue";
import Spp from "@/views/todo/Spp.vue";
import Pembayaran from "@/views/todo/Pembayaran.vue";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      // name: "login",
      // component: Login,
      children:[
        {
          path:"/",
          name:"login",
          component:Login
        },
        {
          path: "/register",
          name: "register",
          component: Register,
        },
      ]
    },
   
    {
      path: "/pembayaran",
      name: "pembayaran",
      component: Pembayaran,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/histori",
      name: "histori",
      component: History,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/kelas",
      name: "kelas",
      component: Kelas,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/petugas",
      name: "petugas",
      component: Petugas,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/siswa",
      name: "siswa",
      component: Siswa,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/spp",
      name: "spp",
      component: Spp,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});
router.beforeEach((to, from, next) => {
 
  let currentUser=JSON.parse(localStorage.getItem('role'));
  // console.log(currentUser);
  let token = localStorage.getItem('token') != null;

  if (to.name === 'login' && token){
    next({ name: 'about' })
  }else if(to.name === 'register' && token){
    next({ name: 'about' })
  }else if(to.matched.some(record => record.meta.requiresAuth)) {

      if (!token) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } 
      else if(to.name==='siswa' && currentUser=='staff'){
        next({name:'about'})
      }
      else if(to.name==='kelas' && currentUser=='staff'){
        next({name:'about'})
      } else if(to.name==='petugas' && currentUser=='staff'){
        next({name:'about'})
      }

      // else if(to.name==='petugas' && currentUser='staff'){
      //   next({name:'about'})
      // }
      else if(to.name==='spp' && currentUser=='staff'){
        next({name:'about'})
      }
      else if(to.name==='kelas' && currentUser=='siswa'){
        next({name:'about'})
      }
      else if(to.name==='petugas' && currentUser=='siswa'){
        next({name:'about'})
      }
      else if(to.name==='spp' && currentUser=='siswa'){
        next({name:'about'})
      }
      else if(to.name==='pembayaran' && currentUser=='siswa'){
        next({name:'about'})
      }
      else if(to.name==='siswa' && currentUser=='siswa'){
        next({name:'about'})
      }
      else{
        next()
      }


        
  }else {
     next()
  }

 

});
export default router;
