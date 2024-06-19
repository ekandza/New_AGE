<template>
  <div class="mt-60 flex justify-center mt-15">
    <img class="my-30" src="../images/plumes.jpeg" alt="Exemple d'image">

    <form class="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="submitForm">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Titre:</label>
        <input class="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               id="title"
               type="text"
               v-model="title"
               placeholder="Titre"
               required>
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Description:</label>
        <textarea class="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  v-model="description"
                  placeholder="Description"
                  required></textarea>
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-red-800 fas fa-feather-alt hover:bg-blue-700 text-white font-bold py-5 px-10 rounded focus:outline-none focus:shadow-outline"
                type="submit">
          Créer
        </button>

        <p>
          <router-link to="/voir" class="mr-4"><i class="fas fa-eye"></i> Voir les articles </router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';
import ky from 'ky';

export default {
  data() {
    return {
      title: '',
      description: ''
    };
  },
  name: 'CreateForm',
  avg:'EBP',
  methods: {
    async submitForm() {
      try {
        const response = await ky.post('http://localhost:3000/api/items', {
          json: {
            title: this.title,
            description: this.description
          }
          
        }).json();

        console.log(response)
        this.title = '';
        this.description = '';
        toastr.success('Votre article a été ajouté avec succès!');
      } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'article:', error);
        toastr.error('Erreur lors de l\'ajout de l\'article');
      }
    },
    created() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/login');
    } }

  }
};
</script>

<style scoped>
/* Styles spécifiques au composant */
</style>
