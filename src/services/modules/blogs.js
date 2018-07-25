import Vue from 'vue';
import toolbelt from 'ajc-toolbelt/js';

import api from './../api';

const module = {
  namespaced:true,
  state: {
    manifest: null,
    entries: {},
    blogs: {}
  },
  getters: {
    manifest(state) {
      return state.manifest;
    },
    entry(state) {
      return (id) => {
        return state.entries.get(id);
      };
    },
    blog(state) {
      return (id) => {
        return state.blogs.get(id);
      };
    }
  },
  mutations: {
    manifest(state, manifest) {
      Vue.set(state, 'manifest', manifest);
    },
    entries(state, entries) {
      entries.forEach((entry, id) => {
        entry.fromNow = moment().calendar(entry.created_at);
        Vue.set(state.entries, id, entry);
      });
    },
    entry(state, entry) {
      Vue.set(state.entries, entry.id, entry);
    },
    blog(state, { id, blog }) {
      Vue.set(state.blog, id, blog);
    }
  },
  actions: {
    manifest({ commit }) {
      return api.get('/blogs/manifest').then(resp => {
        commit('manifest', resp);
        return resp;
      });
    },
    entries({ commit }, ids = []) {
      return api.post('/blogs/entries', ids).then(entries => {
        commit('entries', entries);
        return entries;
      });
    },
    entriesByPage({ commit, dispatch }, page) {
      return api.get('/blogs/entriesByPage', { page, limit:20 }).then(ids => {
        return dispatch('entries', ids);
      });
    },
    content({ commit }, id) {
      return api.get(`/blogs/${id}`).then(resp => {
        commit('blog', { id, blog:resp });
        return resp;
      });
    }
  }
};

export default module;
