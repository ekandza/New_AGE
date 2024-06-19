<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md relative">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <div v-if="isRedirecting" class="absolute top-0 left-0 right-0 h-1 bg-blue-500">
        <div class="loader-bar"></div>
      </div>
      <form @submit.prevent="loginUser" class="space-y-4">
        <div>
          <input v-model="login" type="text" placeholder="Login" required 
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"/>
        </div>
        <div>
          <input v-model="password" type="password" placeholder="Password" required 
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"/>
        </div>
        <div>
          <button type="submit" :disabled="isLoading"
            class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            <span v-if="isLoading" class="loader"></span>
            <span v-else>Login</span>
          </button>
        </div>
      </form>
      <p v-if="errorMessage" class="text-red-500 text-center mt-4">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';
import ky from 'ky';

export default {
  name: 'LoginView',
  data() {
    return {
      login: '',
      password: '',
      errorMessage: '',
      isLoading: false,
      isRedirecting: false
    };
  },
  methods: {
    async loginUser() {
      this.isLoading = true;
      try {
        const response = await ky.post('http://localhost:3000/api/login', {
          json: {
            login: this.login,
            password: this.password
          }
        }).json();

        const token = response.token;
        localStorage.setItem('token', token);

        toastr.success('Login successful! Redirecting to create...');

        this.isLoading = false;
        this.isRedirecting = true;

        setTimeout(() => {
          this.$router.push('/create');
        }, 3000); // Wait for 5 seconds
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.errorMessage = 'Invalid login or password';
        } else {
          this.errorMessage = 'An error occurred during login';
        }
        toastr.error(this.errorMessage);
        console.error('Login failed:', error);
      } finally {
        this.isLoading = false;
      }
    },
    logged() {
    const token = localStorage.getItem('token');
    if (token) {
      //if token redirect to create
      this.$router.push('/create');
    } }
  

  }
};
</script>

<style scoped>
.loader {
  border: 2px solid #f3f3f3;
  border-radius: 50%;
  border-top: 2px solid #3498db;
  width: 16px;
  height: 16px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
  display: inline-block;
  vertical-align: middle;
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loader-bar {
  height: 100%;
  width: 0;
  background-color: #3498db;
  animation: loading 5s linear forwards;
}

@keyframes loading {
  0% { width: 0; }
  100% { width: 100%; }
}
</style>
