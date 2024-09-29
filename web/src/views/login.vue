<template>
  <div v-if="!isLoggedIn" class="flex justify-center items-center h-screen">
    <div class="bg-gray-50 p-6 rounded-s-lg border shadow-xl justify-center flex flex-col w-96  h-80">
      <h1 class="text-2xl font-light text-left mb-4">Sign In</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-medium mb-2">Mail</label>
          <input
                  type="email"
                  id="email"
                  v-model="email"
                  placeholder="example@mail.com"
                  class="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 font-medium mb-2">Password</label>
          <div class="relative">
            <input
                  type="password"
                  id="password"
                  v-model="password"
                  placeholder="secret password"
                  class="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
            <button type="button" @click="togglePasswordVisibility" class="absolute top-1/2 right-2 transform -translate-y-1/2">
              <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-colorAccent hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-14-14a1 1 0 00-1.414 0z" clip-rule="evenodd" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 hover:text-colorAccent duration-300" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fill-rule="evenodd" d="M.458 10.811A16.146 16.146 0 0010 19.944a16.146 16.146 0 009.542-9.133A15.961 15.961 0 0010 2.056 15.961 15.961 0 00.458 10.811z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        <button type="submit" class="bg-colorAccent hover:bg-blue-800 duration-300 text-white font-bold w-full py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline flex flex-row justify-center">
          Login
          
        </button>
      </form>
    </div>
    <div class="bg-gradient-to-r from-blue-400 to-blue-700 w-96 h-80 rounded-e-lg flex items-center justify-center flex-col">
      <h1 class="text-gray-200 font-sans text-xl font-bold ">Welcome back to</h1>
      <h1 class="text-white font-mono text-4xl mt-3 flex flex-row items-end">JVTANRM.<p class="text-xl pb-0.5 font-mono">dev</p></h1>
      <h1 class="text-gray-200 font-sans text-lg mt-3 font-thin ">Make your company tests with AI.</h1>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { resolveComponent } from 'vue';
  export default {
    name: 'login',
    data() {
      return {
        email: '',
        password: '',
        showPassword: false,
      };
    },
    methods: {
      async handleSubmit(){
        console.log(this.email, this.password);
        try{
          const res = await axios.post('http://localhost:3000/api/auth/login', {
            email: this.email,
            password: this.password
          });
          localStorage.setItem('token', res.data.token);
          console.log('yonlendirmebasio');
          this.$router.push('/');  
        }catch(ex){
          console.log(  ex.response.data);
        }
      },
      togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
        const passwordInput = document.getElementById('password');
        passwordInput.type = this.showPassword ? 'text' : 'password';
      },
    },
    mounted() {
      const token = localStorage.getItem('token');
      this.isLoggedIn = !!token;
      if(this.isLoggedIn){
        this.$router.push('/');
      }
    },
    watch: {
      '$route': function(to, from) {
        const token = localStorage.getItem('token');
        this.isLoggedIn = !!token;
      }
    }
  };
</script>
