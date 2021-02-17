/** @format */

import axios from 'axios';

export default {
  state: {
    loading: false,
    user: JSON.parse(localStorage.getItem('user')) || {},
  },
  mutations: {
    auth_request(state) {
      state.loading = true;
    },
    async auth_success(state, data) {
      state.loading = false;
      state.user = await data;
    },
    auth_error(state) {
      state.loading = false;
    },
    logout(state) {
      state.token = '';
      state.user = {};
    },
  },
  actions: {
    async login({ commit }, body) {
      try {
        commit('auth_request');
        const { data } = await axios.post('http://localhost:5002/api/login', {
          email: body.email,
          password: body.password,
        });
        console.log(data);
        if (data) {
          commit('auth_success', data);
          localStorage.setItem('user', JSON.stringify(data));
        }
      } catch (e) {
        commit('auth_error', e);
        localStorage.removeItem('user');
      }
    },
    async register({ commit }, body) {
      try {
        commit('auth_request');
        const { data } = await axios.post(
          'http://localhost:5002/api/register',
          {
            first_name: body.first_name,
            last_name: body.last_name,
            username: body.username,
            email: body.email,
            phone: body.phone,
            password: body.password,
          },
        );
        console.log(data);
        if (data) {
          localStorage.setItem('user', JSON.stringify(data));
          commit('auth_success', data);
        }
      } catch (e) {
        commit('auth_error', e);
        localStorage.removeItem('user');
      }
    },
    async logout({ commit }) {
      commit('logout');
      localStorage.removeItem('user');
    },
  },
  getters: {
    isLoggedIn(state) {
      return !!state.user.token;
    },
    isLoading: (state) => state.loading,
    getId: (state) => state.user._id,
    getEmail: (state) => state.user.email,
  },
};
