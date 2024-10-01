<template>
    <nav class="bg-gray-50 border-b shadow">
      <div class="mx-5 px-0 py-3 flex justify-between items-center">
        <a href="/" class="text-colorText  text-2xl font-sans">JVTANRM.dev</a>
        <button v-if="isLoggedIn" @click="logout" class="text-colorText hover:text-red-600 duration-300 flex flex-row">
          <span class="font-light mr-1 text-base">Logout</span>
          <svg class="h-6 w-5 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M16 17L21 12M21 12L16 7M21 12H9M9 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
 </svg>
        </button>
      </div>
    </nav>
</template>
  
<script>
  import axios from 'axios';
  export default {
    name: 'navbar',
    data() {
      return {
        isLoggedIn: false,
        userName: undefined,
      };
    },
    methods:{
      async logout() {
        try {
          await axios.post('http://localhost:3000/api/auth/logout');
          localStorage.clear('token');
          this.$router.push('/login');
          console.log('ok');
        } catch (error) {
          console.error('no:', error);
        }
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
  
      