<template>
  <navbar></navbar>
  <div class="flex justify-center items-center">
    <div
    class="mx-4 mt-80 bg-gray-200 border-b border-t border-black shadow-xl rounded  w-72 text-gray-900">
      <div class="mx-auto w-32 h-32 relative -mt-16 border shadow shadow-black  rounded-full overflow-hidden ">
          <img class="object-cover object-center h-32" :src='userAvatar'>
      </div>
      <div class="text-center mt-2">
          <h2 class="font-semibold pt-2">{{ userData.compname }}</h2>
          <p class="text-gray-500 whitespace-normal break-words px-2 pt-3">{{ userData.compbio }}</p>
      </div>
      <div class="p-4 border-t mx-8 mt-2">
          <button  @click="toggleAvatar" class="w-full mx-auto rounded-full bg-colorAccent hover:bg-blue-800 duration-300 font-semibold text-white px-6 py-2">{{buttonText}}</button>
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
  