import Vue from 'vue';
import Vuex from 'vuex';
import ky from 'ky';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearAuthData(state) {
      state.token = '';
      state.user = null;
      localStorage.removeItem('token');
    }
  },
  actions: {
    async login({ commit }, { login, password }) {
      try {
        const response = await ky.post('http://localhost:3000/api/login', {
          json: { login, password }
        }).json();
        commit('setToken', response.token);
        return response.token;
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    async fetchUser({ commit }) {
      try {
        const token = this.state.token;
        const user = await ky.get('http://localhost:3000/api/profile', {
          headers: {
            Authorization: token
          }
        }).json();
        commit('setUser', user);
      } catch (error) {
        console.error('Fetching user failed:', error);
      }
    }
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    getUser(state) {
      return state.user;
    }
  }
});
