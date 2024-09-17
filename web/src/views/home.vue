<template>
  <div v-if="isLoggedIn" class="flex justify-center items-center h-screen">
    <div class="w-4/5 h-3/4 bg-colorSecondary rounded-2xl shadow-lg shadow-black flex flex-col">
      <button @click="showNew = true" class="bg-green-800 hover:bg-green-700 w-full duration-300 text-white font-medium py-2 px-4 rounded-t-2xl mr-2 border-b-2 border-b-black">
        new
      </button>
        <ul class="space-y-4 h-max m-10 overflow-y-auto">
          <li v-for="userData in userData" :key="userData.data_id"  class="border-b-black border-b-2 pb-2">
            <div class="flex items-center">
              <img :src="userData.avatarUrl" class="w-10 h-10 rounded-full mr-4" alt="Avatar">
              <button @click="showInfo = true" class="font-medium hover:underline">{{ userData.compname }}</button>
              <div class="ml-auto flex">
                <button v-on:click="test"  class="bg-green-500 hover:bg-green-700 duration-300 text-white font-medium py-2 px-4 rounded-full mr-2 ">
                  open
                </button>
                <button class="bg-blue-500 hover:bg-blue-700 duration-300 text-white font-medium py-2 px-4 rounded-full ">
                  edit
                </button>
                <button @click="handleDelete(userData.data_id)" class="bg-red-500 hover:bg-red-700 duration-300 text-white font-medium py-2 px-4 rounded-full ml-2">
                  delete
                </button>
              </div>
            </div>
          </li>
        </ul>
        <newModal :isVisible="showNew" @close="showNew = false">
          <div class="flex flex-row justify-center">
            <form @submit.prevent="handleSubmit">
              <div class="mb-4">
                <label for="companyName" class="block text-colorText font-thin font-sans mb-2">company name</label>
                <input type="text" id="companyName" v-model="companyName" class="shadow appearance-none border mb-2 border-black rounded-lg w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline bg-colorBackground" required>
                
                <label for="companyBio" class="block text-colorText font-thin font-sans mb-2">company biography</label>
                <textarea id="companyBio" v-model="companyBio" class="shadow appearance-none border mb-2 border-black rounded-lg w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline bg-colorBackground" required></textarea>
                
                <label for="companyAvatar" class="block text-colorText font-thin font-sans mb-2">upload avatar</label>
                <input type="file" id="companyAvatar" accept="image/*" ref="companyAvatar" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 duration-300 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-colorSecondary file:text-white hover:file:bg-colorPrimary"/>

                <label for="companyPhoto" class="block text-colorText font-thin font-sans mb-2">upload photo</label>
                <input type="file" id="companyPhoto" accept="image/*" ref="companyPhoto" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 duration-300 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-colorSecondary file:text-white hover:file:bg-colorPrimary"/>

                <label for="companyGifVideo" class="block text-colorText font-thin font-sans mb-2">upload gif or short video</label>
                <input type="file" id="companyGifVideo" accept="image/gif, video/*" ref="companyGifVideo" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 duration-300 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-colorSecondary file:text-white hover:file:bg-colorPrimary"/>
              </div>
              <button type="submit" class="bg-colorSecondary hover:bg-colorPrimary hover:text-black duration-300 text-white font-thin w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                create
              </button>
            </form>
          </div>
        </newModal>
        <infoModal :isVisible="showInfo" @close="showInfo = false">
          <div class="H-60 flex flex-col justify-center z-50">
            <div class="overflow-hidden w-full">
              <img src="../assets/ha.png" class=" w-full h-32 object-cover" alt="Background Image" />
              <div class="-mt-12 flex flex-col justify-center items-center">
                <img src="../assets/a.jpeg" class="w-24 h-24 rounded-full border-4 border-white " alt="Profile Picture" />
                <div class="text-center">
                  <h2 class="text-2xl font-bold text-colorText">{{ userData.compname }}</h2>
                  <p class="text-lg text-gray-400 mt-2">{{ userData.companyBio }}</p>
                </div>
              </div>
            </div>
          </div>
        </infoModal>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import { resolveComponent } from 'vue';
import newModal from '../components/newModal.vue';
import infoModal from '../components/infoModal.vue';
  export default {
    name: 'home',
    components: {
      newModal,
      infoModal
    },
    data() {
      return {
        isLoggedIn: false,
        userData: [],
        showNew: false,
        showInfo: false,
        companyName: '',
        companyBio: '',
        companyPhoto: null,
        companyAvatar: null,
        companyGifVideo: null,
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
      async handleSubmit() {
        try {
          const formData = new FormData();
          formData.append('companyName', this.companyName);
          formData.append('companyBio', this.companyBio);
          formData.append('companyAvatar', this.$refs.companyAvatar.files[0]);
          formData.append('companyPhoto', this.$refs.companyPhoto.files[0]);
          formData.append('companyGifVideo', this.$refs.companyGifVideo.files[0]);
          const response = await axios.post('http://localhost:3000/api/auth/addcomp', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          this.loadUser();
        } catch (ex) {
          console.log("error", ex);
        }
      },
      async handleDelete(dataId) {
        try {
          await axios.delete(`http://localhost:3000/api/auth/deletecomp/${dataId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          this.loadUser();
        } catch (ex) {
          console.log("error while deleting", ex);
        }
  }
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
