<template>
  <div>
    <Navbar />
    
  </div>
    <div class="about">
      <p>Name : {{datauser.name}}</p>
      <p>Email : {{datauser.email}}</p>
      <p>Role : {{datauser.role}}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Navbar from '@/components/Navbar.vue';
  import Login from '@/views/auth/Login.vue';


  
  const datauser = ref("");
  datauser.value=JSON.parse(localStorage.getItem('user'));
  console.log(JSON.parse(localStorage.getItem('user')).role);
  
  console.log(datauser);
  
  </script>

  
  