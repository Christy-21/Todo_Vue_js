<template>
  <center>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title">Sign Up</h3>
            <div class="form-group">
              <label>Username</label>
              <input type="text" v-model="username" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
              <label>Email address</label>
              <input type="email" v-model="email" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" v-model="password" class="form-control form-control-lg" />
            </div><br>
            <button type="submit" @click="handleSignup" class="btn btn-dark btn-lg btn-block">Sign Up</button>
            <p class="forgot-password text-right">
              Already registered? <router-link :to="{ name: 'login' }">Sign in</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</center>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      username: 'christy',
      email: 'test@gmail.com',
      password: 'welcome123',
    };
  },
  methods: {
    handleSignup() {
      const username = this.username;
      const email = this.email;
      const password = this.password;

      const userData = {
        username,
        email,
        password,
      };

      this.$store
        .dispatch('registerUser', userData)
        .then(() => {
          this.$router.push('/todo');
        })
        .catch((error) => {
          // Handle any error that occurs during registration
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 50px;
}
</style>
