<template>
  <div>
    <center>
      <router-link to="/todo">Back to Form</router-link>
    </center>
    <br>
    <div v-if="username !== null">
      <div class="form-container">
        <p>
          Username: <span @click="toggleTreeView">{{ username }}</span>
        </p>
        <div v-if="isTreeViewVisible">
          <ul>
            <li v-for="(value, key) in formData" :key="key">
              <strong>{{ key }}:</strong> {{ formatValue(value) }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No user data available.</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['formData']),
    username() {
      if (this.formData !== null) {
        return this.formData.username;
      }
      return null;
    },
  },
  data() {
    return {
      isTreeViewVisible: false,
    };
  },
  methods: {
    toggleTreeView() {
      this.isTreeViewVisible = !this.isTreeViewVisible;
    },
    addFormData(formData) {
      // Dispatch the action to update the Vuex store
      this.$store.dispatch('appendFormData', formData);
      this.saveFormData(formData);
    },
    saveFormData(formData) {
      // Store the form data in localStorage
      localStorage.setItem('formData', JSON.stringify(formData));
    },
    formatValue(value) {
      if (typeof value === 'object') {
        return Object.keys(value)
          .map((key) => `${key}: ${value[key]}`)
          .join(', ');
      }
      return value;
    },
  },
  created() {
    if (this.formData === null) {
      // Retrieve form data from Vuex or localStorage
      const storedFormData = localStorage.getItem('formData');
      if (storedFormData) {
        try {
          const parsedFormData = JSON.parse(storedFormData);
          this.$store.commit('setFormData', parsedFormData);
        } catch (error) {
          console.error('Error parsing stored form data:', error);
        }
      }
    }
  },
  beforeDestroy() {
    // Persist the form data to localStorage before leaving the page
    this.saveFormData(this.formData);
  },
};
</script>

<style>
.form-container {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.form-container p {
  margin: 5px 0;
}
</style>
