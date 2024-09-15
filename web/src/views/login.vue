<template>
    <div class="flex justify-center items-center h-screen">
    <div class="bg-zinc-900 p-6 rounded-lg shadow-lg shadow-colorSecondary justify-center flex flex-col ">
      <h1 class="text-2xl font-thin  mb-4 text-center text-colorText font-sans">LOGIN</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="email" class="block text-colorText font-thin font-sans mb-2">mail</label>
          <input type="email" id="email" v-model="email" class="shadow appearance-none border border-black rounded-lg w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline bg-colorBackground" required>
        </div>
        <div class="mb-6">
          <label for="password" class="block text-colorText font-thin mb-2 font-sans">password</label>
          <div class="relative">
            <input type="password" id="password" v-model="password" class="shadow appearance-none border border-black rounded-lg w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline bg-colorBackground" required>
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
        <button type="submit" class="bg-colorSecondary hover:bg-colorPrimary hover:text-black duration-300 text-white font-thin w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline">login</button>
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
        }catch(ex){
          console.error(  ex.response.data);
        }
      },
      togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
        const passwordInput = document.getElementById('password');
        passwordInput.type = this.showPassword ? 'text' : 'password';
      },
    },
  };
</script>
