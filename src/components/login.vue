<template>
  <center>
  <div class="vue-template">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">Sign In</h3>
              <form @submit="handleLogin">
                <div class="form-group">
                  <label>Email address</label>
                  <input type="email" v-model="email" class="form-control form-control-lg" />
                </div>
                <div class="form-group">
                  <label>Password</label>
                  <input type="password" v-model="password" class="form-control form-control-lg" />
                </div><br>
                <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
                <p class="forgot-password text-right mt-2 mb-4">
                  <router-link to="/forgot-password">Forgot password?</router-link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</center>
</template>

<script>
export default {
  data() {
    return {
      email: 'test@gmail.com',
      password: 'welcome123',
    };
  },
  methods: {
    handleLogin(event) {
      event.preventDefault();

      const email = this.email;
      const password = this.password;
      const loginSuccessful = true; // Replace with your login logic

      if (loginSuccessful) {
        // Redirect to Todos page
        this.$router.push('/todo');
      } else {
        // Handle login failure
        alert('Login failed. Please try again.');
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 50px;
}
</style>
