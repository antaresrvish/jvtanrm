<template>
    <nav class="bg-black shadow-md shadow-colorSecondary">
      <div class="mx-5 px-0 py-3 flex justify-between items-center">
        <a href="#" class="text-colorText  text-4xl font-thin  font-sans">JVTANRM.dev</a>
        <button v-if="isLoggedIn" @click="logout" class="text-colorText font-thin hover:underline">logout</button>
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
      }
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
  
      