<template>
  <div v-if="isLoggedIn" class="flex justify-center items-center h-screen">
    <div class="w-4/5 h-3/4 bg-colorSecondary rounded-2xl shadow-lg shadow-black">
        <ul class="space-y-4 h-96 m-10">
            <li v-for="userData in userData" :key="userData.data_id"  class="border-b-black border-b-2 pb-2">
                <div class="flex items-center">
                    <img :src="userData.avatarUrl" class="w-10 h-10 rounded-full mr-4" alt="Avatar">
                    <a href="?" class="font-medium hover:underline">{{ userData.compname }}</a>
                    <div class="ml-auto flex">
                      <button v-on:click="test"  class="bg-green-500 hover:bg-green-700 duration-300 text-white font-bold py-2 px-4 rounded mr-2">
                        open
                      </button>
                      <button class="bg-blue-500 hover:bg-blue-700 duration-300 hover:anima text-white font-bold py-2 px-4 rounded ">
                        edit
                      </button>
                      <button class="bg-red-500 hover:bg-red-700 duration-300 text-white font-bold py-2 px-4 rounded ml-2">
                        delete
                      </button>
                    </div>
                </div>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import { resolveComponent } from 'vue';
  export default {
    name: 'home',
    data() {
      return {
        isLoggedIn: false,
        userData: [],
      };
    },
    
    methods: {
      async loadUser(){
        try{
          const res = await axios.post('http://localhost:3000/api/auth/userdata', {}, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          this.userData = res.data.map(user => {
            if (user.compavatar && user.compavatar.data) {
              const byteArray = new Uint8Array(user.compavatar.data);
              let binaryString = '';
              byteArray.forEach(byte => {
                binaryString += String.fromCharCode(byte);
              });
              const base64String = btoa(binaryString);
              user.avatarUrl = `data:image/png;base64,${base64String}`;
            }else{
              user.avatarUrl = ''; 
            }
            return user;
          });
        }catch(ex){
          console.log(ex);
        }
      },
    },  
    mounted() {
      const token = localStorage.getItem('token');
      this.isLoggedIn = !!token;
      if(token){
        this.loadUser();
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
