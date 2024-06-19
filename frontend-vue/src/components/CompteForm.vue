<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4 bg-red-800 mx-60 px-40  text-center text-white fas fa-users" >Gestion des Comptes</h1>

    <form @submit.prevent="createUser" class="mb-6">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="login">Login</label>
        <input v-model="newUser.login" class="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="login" type="text" placeholder="Login" required>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
        <input v-model="newUser.email" class="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" required>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
        <input v-model="newUser.password" class="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" required>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="photo">Photo</label>
        <input @change="handleFileUpload" class="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="photo" type="file" required>
      </div>
      <button class="fas fa-check bg-red-800 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded focus:outline-none focus:shadow-outline" type="submit">Créer</button>
    </form>

    <table class="min-w-full bg-white">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">Login</th>
          <th class="py-2 px-4 border-b">Email</th>
          <th class="py-2 px-4 border-b">Photo</th>  
          <th class="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td class="py-2 px-4 border-b">{{ user.login }}</td>
          <td class="py-2 px-4 border-b">{{ user.email }}</td>
          <td class="py-2 px-4 border-b">     <img :src="`${backendUrl}${user.photo}`" alt="User photo" class="w-10 h-10 rounded-full">     </td>
          
          <td class="py-2 px-4 border-b">
            <button @click="editUser(user)" class="fas fa-edit bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">Editer</button>
            <button @click="deleteUser(user._id)" class="fas fa-trash bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <!-- Modal -->
<div v-if="isEditModalOpen" class="fixed z-10 inset-0 overflow-y-auto">
  <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div class="fixed inset-0 transition-opacity" aria-hidden="true">
      <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>

    <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
      <div>
        <!-- Bouton pour fermer le modal -->
        <button @click="isEditModalOpen = false" class="absolute top-0 right-0 m-4 text-gray-700 hover:text-gray-900">
          <svg class="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M6.225 4.811l.084.073L12 10.586l5.691-5.702a1 1 0 111.415 1.414l-5.701 5.691 5.701 5.69a1 1 0 01-1.415 1.414l-5.69-5.701-5.691 5.702a1 1 0 01-1.414-1.415l5.701-5.69-5.701-5.691a1 1 0 011.33-1.487z"/>
          </svg>
        </button>

        <div class="mt-3 text-center sm:mt-5">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Editer l'Utilisateur
          </h3>
          <div class="mt-2">
            <form @submit.prevent="updateUser">
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="login">Login</label>
                <input v-model="currentUser.login" class="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="login" type="text" required>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
                <input v-model="currentUser.email" class="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" required>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                <!-- Afficher le mot de passe décrypté -->
                <input v-model="currentUser.password" class="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" required>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="photo">Photo</label>
                <!-- Afficher la photo de l'utilisateur de manière circulaire -->
                <img :src="`${backendUrl}${currentUser.photo}`" alt="User photo" class="w-16 h-16 rounded-full mx-auto mb-4">
                <input @change="handleFileUpload" class="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="photo" type="file">
              </div>
              <button class="fas fa-edit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Mettre à jour</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>




  </div>
</template>





<script>
import ky from 'ky';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';

export default {
  data() {
    return {
      newUser: {
        login: '',
        email: '',
        password: '',
        photo: null,
      },
      users: [],
      isEditModalOpen: false,
      currentUser: {},
      selectedFile: null,
      backendUrl: 'http://localhost:3000' // L'URL du backend
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const users = await ky.get(`${this.backendUrl}/api/compte/users`).json(); // Utilisation de backendUrl
        this.users = users;
      } catch (error) {
        toastr.error("Erreur lors de la récupération des utilisateurs.");
      }
    },
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    async createUser() {
      const formData = new FormData();
      formData.append('login', this.newUser.login);
      formData.append('email', this.newUser.email);
      formData.append('password', this.newUser.password);
      formData.append('photo', this.selectedFile);

      try {
        await ky.post(`${this.backendUrl}/api/compte/users`, { body: formData }); // Utilisation de backendUrl
        this.fetchUsers();
        toastr.success("Utilisateur créé avec succès.");
      } catch (error) {
        toastr.error("Erreur lors de la création de l'utilisateur.");
      }
    },
    editUser(user) {
      this.currentUser = { ...user };
      this.isEditModalOpen = true;
    },
    async updateUser() {
      const formData = new FormData();
      formData.append('login', this.currentUser.login);
      formData.append('email', this.currentUser.email);
      formData.append('password', this.currentUser.password);
      formData.append('photo', this.selectedFile);

      try {
        await ky.put(`${this.backendUrl}/api/compte/users/${this.currentUser._id}`, { body: formData }); // Utilisation de backendUrl
        this.fetchUsers();
        this.isEditModalOpen = false;
        toastr.success("Utilisateur mis à jour avec succès.");
      } catch (error) {
        toastr.error("Erreur lors de la mise à jour de l'utilisateur.");
      }
    },
    async deleteUser(userId) {
      try {
        await ky.delete(`${this.backendUrl}/api/compte/users/${userId}`); // Utilisation de backendUrl
        this.fetchUsers();
        toastr.success("Utilisateur supprimé avec succès.");
      } catch (error) {
        toastr.error("Erreur lors de la suppression de l'utilisateur.");
      }
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>














<style scoped>
/* Ajoutez ici vos styles personnalisés si nécessaire */
</style>
