<template>
  <nav class="bg-black py-4">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="text-white text-xl font-bold flex items-center">
        <i class="fas fa-home mr-2"></i> Accueil
      </router-link>
      <div>
        <router-link to="/create" class="text-white flex items-center mr-4">
          <i class="fas fa-plus-circle mr-2"></i> Créer
        </router-link>
        <router-link to="/voir" class="text-white flex items-center mr-4">
          <i class="fas fa-eye mr-2"></i> Voir
        </router-link>
        <router-link to="/compte" class="text-white flex items-center mr-4">
          <i class="fas fa-users mr-2"></i> Compte
        </router-link>
        <router-link v-if="isAuthenticated" @click.prevent="logout" to="/" class="text-white flex items-center">
          <i class="fas fa-sign-out-alt mr-2"></i> Déconnexion
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import api from '../api';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
 

export default {
  name: 'MainView',
  data() {
    return {
      isAuthenticated: false
    };
  },
  methods: {
    checkAuth() {
      this.isAuthenticated = !!localStorage.getItem('token');
    },
    async logout() {
      try {
        await api.post('logout');
        localStorage.removeItem('token');
        this.isAuthenticated = false;
        toastr.success('Déconnexion réussie');
        this.$router.push('/login');
      } catch (error) {
        toastr.error('Erreur lors de la déconnexion');
      }
    }
  },
  mounted() {
    this.checkAuth();
  },
  watch: {
    '$route'() {
      this.checkAuth();
    }
  }
};
</script>

<style scoped>
/* Styles spécifiques au composant */
</style>
