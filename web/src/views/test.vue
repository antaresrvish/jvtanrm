<template>
  <navbar></navbar>
  <div class="flex justify-center items-center">
    <div
    class="mx-4 mt-40 bg-gray-200 border-b border-t border-black shadow-xl rounded h-48 w-72 text-gray-900">
      <div class="mx-auto w-32 h-32 relative -mt-16 border shadow shadow-black  rounded-full overflow-hidden ">
          <img class="object-cover object-center h-32" :src='userAvatar'>
      </div>
      <div class="text-center mt-2">
          <h2 class="font-semibold">{{ userData.compname }}</h2>
          <p class="text-gray-500">{{ userData.compbio }}</p>
      </div>
      <div class="p-4 border-t mx-8 mt-2">
          <button @click="talk" class="w-1/2 block mx-auto rounded-full bg-colorAccent hover:bg-blue-800 duration-300 font-semibold text-white px-6 py-2">Talk</button>
      </div>
    </div>  
  </div>
</template>
  
<script>
  import axios from 'axios';
  import navbar from '../components/navbar.vue'
  import { getTransitionRawChildren } from 'vue';
  import { resolveComponent } from 'vue';
  export default {
    name: 'test',
    components: {
      navbar
    },
    data() {
      return {
          data: null,
          userData: [],
          userAvatar: undefined,
      };
    },
    methods: {
      async getData(dataId){
        try{
          const res = await axios.post( 
            'http://localhost:3000/api/auth/getdata',{
              id: dataId
            }
          );
          this.userData = res.data[0];
          if (this.userData.compavatar) {
            const byteArray = new Uint8Array(this.userData.compavatar.data);
            let binaryString = "";
            byteArray.forEach((byte) => {
              binaryString += String.fromCharCode(byte);
            });
            const base64String = btoa(binaryString);
            this.userData.avatarUrl = `data:image/gif;base64,${base64String}`;
          } else {
            this.userData.avatarUrl = "";
          }
          if (this.userData.comppic) {
            const byteArray = new Uint8Array(this.userData.comppic.data);
            let binaryString = "";
            byteArray.forEach((byte) => {
              binaryString += String.fromCharCode(byte);
            });
            const base64String = btoa(binaryString);
            this.userData.picUrl = `data:image/gif;base64,${base64String}`;
          } else {
            this.userData.picUrl = "";
          }
          this.userAvatar = this.userData.avatarUrl
          console.log(this.userData);
        }catch(ex){
          console.log('erro while fetching data');
        }
      },
      talk(){
        this.userAvatar = this.userData.picUrl;
      }
    },
    mounted() {
      const urlParams = new URLSearchParams(window.location.search);
      const dataString = urlParams.get('data');
      if (dataString) {
      this.data = JSON.parse(dataString);
      //console.log(this.data);
      this.getData(this.data);
      }
    },
    watch: {
    $route: function (to, from) {
      const token = localStorage.getItem("token");
      this.isLoggedIn = !!token;
  },
},
  };
</script>
  