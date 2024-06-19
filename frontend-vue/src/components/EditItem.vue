<!-- src/components/EditItem.vue -->
<template>
  <div class="container mx-auto">
    <h1 class="text-2xl text-white bg-red-600 text-center font-bold my-20"> <i class="fa fa-pen"></i> Éditer l'Article</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Titre</label>
        <input v-model="formData.title" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Titre de l'Article">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Description</label>
        <textarea v-model="formData.description" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Description de l'Article"></textarea>
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-red-600 hover:bg-blue-700  fas fa-feather-alt hover:bg-blue-700 text-white font-bold py-5 px-10 rounded focus:outline-none focus:shadow-outline  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Editer</button>
      </div>
    </form>
  </div>
</template>

<script>
import ky from 'ky';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';


export default {
  name: 'EditItem',
  props: ['id'],
  data() {
    return {
      formData: {
        title: '',
        description: ''
      }
    };
  },
  mounted() {
    // Récupérer les données de l'article à éditer lors du chargement du composant
    this.fetchArticle(this.id);
  },
  methods: {
    async fetchArticle(articleId) {
      try {
        const response = await ky.get(`http://localhost:3000/api/items/articles/${articleId}`).json();
        this.formData = response;
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'article:', error);
      }
    },
    async submitForm() {
      try {
        const response = await ky.put(`http://localhost:3000/api/items/articles/${this.id}`, { json: this.formData }).json();
        // Rediriger l'utilisateur vers la page de détails de l'article ou une autre page appropriée après la soumission réussie
        console.log(response);
        //this.$router.push(`/details/${this.id}`);
      
        toastr.success('Votre article a été éditer avec succès!');
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'article:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Styles spécifiques au composant */
</style>
