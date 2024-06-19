<template>
  <div>
      <link href="/tailwind.css" rel="stylesheet">
  
     
      <MainView/>
      <router-view></router-view>

     
  </div>
</template>

<script>

import MainView from './components/MainView.vue'; 
// Dans votre composant principal, par exemple App.vue


export default {
  components: {
    MainView
  } }
   
</script>
<style>
@import "~@fortawesome/fontawesome-free/css/all.min.css";
</style>
