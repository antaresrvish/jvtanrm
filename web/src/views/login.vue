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
              <svg v-if="showPassword" class="h-5 w-5 text-colorAccent hover:text-gray-500 bg-transparent" viewBox="0 0 24 24"  fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.42012 12.7132C2.28394 12.4975 2.21584 12.3897 2.17772 12.2234C2.14909 12.0985 2.14909 11.9015 2.17772 11.7766C2.21584 11.6103 2.28394 11.5025 2.42012 11.2868C3.54553 9.50484 6.8954 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7766C21.8517 11.9015 21.8517 12.0985 21.8231 12.2234C21.785 12.3897 21.7169 12.4975 21.5807 12.7132C20.4553 14.4952 17.1054 19 12.0004 19C6.8954 19 3.54553 14.4952 2.42012 12.7132Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.0004 15C13.6573 15 15.0004 13.6569 15.0004 12C15.0004 10.3431 13.6573 9 12.0004 9C10.3435 9 9.0004 10.3431 9.0004 12C9.0004 13.6569 10.3435 15 12.0004 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
                            
              <svg  v-else class="h-5 w-5 text-gray-500 hover:text-colorAccent duration-300" viewBox="0 0 24 24"  fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.7429 5.09232C11.1494 5.03223 11.5686 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7767C21.8518 11.9016 21.8517 12.0987 21.8231 12.2236C21.7849 12.3899 21.7164 12.4985 21.5792 12.7156C21.2793 13.1901 20.8222 13.8571 20.2165 14.5805M6.72432 6.71504C4.56225 8.1817 3.09445 10.2194 2.42111 11.2853C2.28428 11.5019 2.21587 11.6102 2.17774 11.7765C2.1491 11.9014 2.14909 12.0984 2.17771 12.2234C2.21583 12.3897 2.28393 12.4975 2.42013 12.7132C3.54554 14.4952 6.89541 19 12.0004 19C14.0588 19 15.8319 18.2676 17.2888 17.2766M3.00042 3L21.0004 21M9.8791 9.87868C9.3362 10.4216 9.00042 11.1716 9.00042 12C9.00042 13.6569 10.3436 15 12.0004 15C12.8288 15 13.5788 14.6642 14.1217 14.1213" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
