<template>
  <div v-if="!isLoggedIn" class="flex justify-center items-center h-screen">
    <div class="bg-colorBackground p-6 rounded shadow-md shadow-black justify-center flex flex-col ">
      <h1 class="text-2xl font-thin  mb-4 text-center text-colorText font-mono">LOGIN</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="email" class="block text-colorText font-mono mb-2">mail</label>
          <input type="email" id="email" v-model="email" placeholder="name@example.com" class="shadow border border-black font-mono rounded-lg w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:border-colorAccent duration-300 bg-colorBackground" required>
        </div>
        <div class="mb-6">
          <label for="password" class="block text-colorText mb-2 font-mono">password</label>
          <div class="relative">
            <input type="password" id="password" v-model="password" class="shadow border font-mono border-black rounded-lg w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:border-colorAccent duration-300 bg-colorBackground" required>
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
        <button type="submit" class="bg-colorAccent hover:bg-blue-500 hover:text-black duration-300 text-white font-mono w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline flex flex-row justify-end">
          Login
          <svg class="h-6 w-6 ml-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M15 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11985 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H15M10 7L15 12M15 12L10 17M15 12L3 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
 </svg>
        </button>
      </form>
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
    },
    watch: {
      '$route': function(to, from) {
        const token = localStorage.getItem('token');
        this.isLoggedIn = !!token;
      }
    }
  };
</script>
