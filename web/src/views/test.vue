<template>
  <div class="flex flex-col h-dvh">
    <div class="">
      <navbar />
    </div>
    <div class="flex justify-center items-center h-full overflow-auto bg-gray-100">
      <div class="w-96 rounded-lg shadow-md border p-4">
        <div class="flex items-center justify-center font-sans text-2xl mb-20 font-medium">
          Talk with your AI
        </div>

          <div class="mx-auto w-48 h-48 relative -mt-16 border shadow-lg  rounded-full overflow-hidden ">
          <img class="object-cover object-center h-48 w-48" :src='userAvatar'>
        </div>

        
        <div class=" flex flex-col items-center justify-center">
          <div class="mb-4">
            <h2 class="font-bold text-2xl text-gray-800 mt-3">{{ userData.compname }}</h2>
          </div>
          <p class="text-gray-600 text-base mt-2">{{ userData.compbio }}</p>
          <div class="mt-6">
            <button class="bg-colorAccent hover:bg-blue-800 text-white font-bold w-80 mb-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="toggleAvatar">
              {{ buttonText }}
            </button>
          </div>
        </div>
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
          isGifPlaying: false,
          audioPlayer: null,
          isClicked: false, 
          buttonText: 'Talk',
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
      toggleAvatar() {
        if (!this.isClicked) {
          this.isClicked = true;
          this.buttonText = 'Listening'; 
        } else {
          if (this.userData.comppic && !this.audioPlayer) {
            this.audioPlayer = new Audio('hm.mp3');

            this.audioPlayer.addEventListener('ended', () => {
              this.isGifPlaying = false;
              this.userAvatar = this.convertBinaryToDataURL(this.userData.compavatar.data); 
              this.buttonText = 'Talk'; 
              this.isClicked = false; 
            });
          }

          if (this.audioPlayer) {
            this.audioPlayer.play(); 
            this.isGifPlaying = true; 
            this.userAvatar = this.convertBinaryToDataURL(this.userData.comppic.data); 
            this.buttonText = 'Playing'; 
            this.isClicked = true; 
          }
        }
      },
      convertBinaryToDataURL(binaryData) {
        const byteArray = new Uint8Array(binaryData);
        let binaryString = '';
        byteArray.forEach((byte) => {
          binaryString += String.fromCharCode(byte);
        });
        const base64String = btoa(binaryString);
        return `data:image/gif;base64,${base64String}`;
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
  