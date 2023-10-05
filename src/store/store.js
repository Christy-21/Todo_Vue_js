import { createStore, createLogger } from 'vuex';

const state = {
  loggedIn: false,
  formData: [], // Initialize as an empty array
};

const mutations = {
  updateLoggedInState(state, isLoggedIn) {
    state.loggedIn = isLoggedIn;
  },
  setFormData(state, formData) {
    state.formData = formData;
  },
};

const actions = {
  registerUser({ commit }, userData) {
    // Registration logic...

    // Simulating a successful registration
    const signupSuccessful = true;

    if (signupSuccessful) {
      commit('updateLoggedInState', true);
    }
  },
  appendFormData({ commit, state }, formData) {
    const updatedFormData = [...state.formData, formData];
    commit('setFormData', updatedFormData);
  },
};

const getters = {};

const store = createStore({
  state,
  mutations,
  actions,
  getters,
  plugins: [createLogger()],
});

export default store;
