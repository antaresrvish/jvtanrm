<template>
  <div v-if="isLoggedIn" class="flex flex-col h-dvh">
    <div class="">
      <navbar />
    </div>
    <div class="flex justify-center items-center h-full overflow-auto">
      <div
        class="w-4/5 h-3/4 bg-white shadow-lg rounded border flex flex-col py-0 px-0"
      >
        <div class="flex flex-row justify-between items-center bg-gray-50 px-5 py-2">
          <h1 class="text-2xl font-medium mb-5 mt-3 ml-3">Companys List</h1>
              <div class="relative">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3 ">
                      <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                  </div>
                  <input type="search" v-model="searchQuery" id="default-search" class="block w-96 py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-colorAccent focus:border-colorAccent  " placeholder="Search Companys.." required />
              </div>
          <button
            @click="showNew = true"
            class="bg-colorAccent hover:bg-blue-800 rounded-lg w-36 duration-300 text-white flex justify-center p-2 font-sans items-center "
          >
            <span class="font-normal text-sm ">New Company</span>
          </button>
        </div>
        <div class="h-max overflow-auto">
          <table class="w-full text-md bg-slate-100 marker: rounded text-sm table-fixed">
            <tbody>
              <tr class="border-b border-gray-300 rounded-t ">
                <th class="text-left p-3 px-5 w-44 lg:w-64 font-medium">Company</th>
                <th class="text-left p-3 font-medium ">Biography</th>
                <th class="text-left p-3 px-5  w-40  font-medium lg:w-80">Actions</th>
              </tr>
              <tr
                v-for="userData in filteredUserData"
                :key="userData.data_id"
                class="border-b border-gray-300 hover:bg-blue-100 duration-300 bg-white text-base"
              >
                <td class="p-1 px-3 flex flex-row h-12 items-center">
                  <img
                    :src="userData.avatarUrl"
                    class="w-10 h-10 rounded-full mr-4"
                    alt="Avatar"
                  />
                  <button
                    @click="showInfo = true"
                    class="font-thin text-base mt-1 hover:underline"
                  >
                    {{ userData.compname }}
                  </button>
                </td>
                <td class="p-1 px-3  truncate h-12">
                  <div class="font-thin text-base">{{ userData.compbio }}</div>
                </td>
                <td class="p-1 px-3 w-32 h-12">          
                  <button
                    v-on:click="openTab(userData.data_id)"
                    class="duration-300 text-white p-2 rounded-lg inline-flex items-center mr-2 hover:bg-blue-300"
                  >
                    <svg
                      class="h-5 w-5 text-colorAccent"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 9L21 3M21 3H15M21 3L13 11M10 5H7.8C6.11984 5 5.27976 5 4.63803 5.32698C4.07354 5.6146 3.6146 6.07354 3.32698 6.63803C3 7.27976 3 8.11984 3 9.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H14.2C15.8802 21 16.7202 21 17.362 20.673C17.9265 20.3854 18.3854 19.9265 18.673 19.362C19 18.7202 19 17.8802 19 16.2V14"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    
                  </button>
                  <button
                    @click="openEdit(userData)"
                    class="duration-300 text-white inline-flex items-center p-2 rounded-lg hover:bg-blue-300"
                  >
                    <svg
                      class="w-5 h-5 text-colorAccent"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 3.99998H6.8C5.11984 3.99998 4.27976 3.99998 3.63803 4.32696C3.07354 4.61458 2.6146 5.07353 2.32698 5.63801C2 6.27975 2 7.11983 2 8.79998V17.2C2 18.8801 2 19.7202 2.32698 20.362C2.6146 20.9264 3.07354 21.3854 3.63803 21.673C4.27976 22 5.11984 22 6.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9264 19.673 20.362C20 19.7202 20 18.8801 20 17.2V13M7.99997 16H9.67452C10.1637 16 10.4083 16 10.6385 15.9447C10.8425 15.8957 11.0376 15.8149 11.2166 15.7053C11.4184 15.5816 11.5914 15.4086 11.9373 15.0627L21.5 5.49998C22.3284 4.67156 22.3284 3.32841 21.5 2.49998C20.6716 1.67156 19.3284 1.67155 18.5 2.49998L8.93723 12.0627C8.59133 12.4086 8.41838 12.5816 8.29469 12.7834C8.18504 12.9624 8.10423 13.1574 8.05523 13.3615C7.99997 13.5917 7.99997 13.8363 7.99997 14.3255V16Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    @click="openDelete(userData.data_id)"
                    class="duration-300 text-white rounded-lg ml-2 p-2 inline-flex items-center hover:bg-red-300"
                  >
                    <svg
                      class="w-5 h-5 text-red-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <newModal :isVisible="showNew" @close="showNew = false">
          <div class="bg-white rounded-lg  p-6 w-full">
            <h1 class="text-2xl font-medium text-center mb-4">New Company</h1>
            <form @submit.prevent="handleSubmit" class="grid grid-cols-2 gap-4">
              <div class="col-span-1">
                <div class="mb-1">
                  <label for="companyName" class="block text-gray-700 font-medium mb-2">Company Name</label>
                  <input
                    type="text"
                    id="companyName"
                    v-model="companyName"
                    placeholder="Your Company Name"
                    class="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div class="mb-1">
                  <label for="companyBio" class="block text-gray-700 font-medium mb-2">Company biography</label>
                  <textarea
                    id="companyBio"
                    v-model="companyBio"
                    placeholder="Example Bio"
                    class="shadow border rounded-lg w-full h-28 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  ></textarea>
                </div>
              </div>
              <div class="col-span-1 border-l pl-3">
                <div class="mb-1 relative w-full flex flex-row items-center justify-center">
                  <input
                    accept="image/png, image/jpg, image/jpeg"
                    class="absolute inset-0 opacity-0 cursor-pointer"
                    type="file"
                    id="companyAvatar"
                    @change="onAvatarChange"
                    ref="companyAvatar"
                    required
                  />
                  <button
                    class="bg-colorAccent hover:bg-blue-800 text-white font-normal w-32  py-2 px-4 mr-2 rounded-lg focus:outline-none focus:shadow-outline"
                  >
                    Select Avatar
                  </button>
                  <div v-if="avatarPreview" class="flex justify-start mt-2">
                    <img :src="avatarPreview" alt="Avatar Preview" class="my-1 w-24 h-24 rounded">
                  </div>
                  <div v-else class="flex justify-start mt-2">
                    <img src="https://via.placeholder.com/100" alt="Default Avatar" class="my-1 w-24 rounded">
                  </div>
                </div>
                <div class="mb-1 relative w-full flex flex-row items-center justify-center">
                  <input
                    accept="image/gif"
                    class="absolute inset-0 opacity-0 cursor-pointer"
                    type="file"
                    id="companyPhoto"
                    @change="onPhotoChange"
                    ref="companyPhoto"
                    required
                  />
                  <button
                    class="bg-colorAccent hover:bg-blue-800 text-white font-normal w-32  py-2 px-4 mr-2 rounded-lg focus:outline-none focus:shadow-outline"
                  >
                    Select Gif
                  </button>
                  <div v-if="photoPreview" class="flex justify-start mt-2">
                    <img :src="photoPreview" alt="Photo Preview" class="w-24 h-24 mb-1 rounded">
                  </div>
                  <div v-else class="flex justify-start mt-2">
                    <img src="https://via.placeholder.com/100" alt="Default Gif" class="w-24 mb-1 rounded">
                  </div>
                </div>
              </div>
              <div class="col-span-2 flex justify-center">
                <button
                  type="submit"
                  class="bg-colorAccent hover:bg-blue-800 text-white font-normal w-full  py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                  
                >
                  Ok
                </button>
              </div>
            </form>
          </div>
        </newModal>
              <usureModal :isVisible="showUsure" @close="showUsure = false">
                <div class="flex flex-col justify-center items-center">
                  <svg class="h-16 w-16 text-red-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
                  <h2 class="text-2xl font-medium text-center mb-1 mt-4">Are you sure?</h2>
                  <p class="text-sm text-gray-700 mb-4">If you delete, there is no coming back.</p>
                  <div class="flex flex-row mt-0">
                    
                    <button
                      class="bg-gray-600 w-24 p-2 rounded text-white hover:bg-gray-700 duration-300"
                      @click="showUsure = false"
                    >
                      No
                    </button>
                    <button
                      class="bg-red-600 ml-4 p-2 w-24 rounded text-white hover:bg-red-700 duration-300"
                      @click="handleDelete(clickedCompId)"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </usureModal>
              <editModal :isVisible="showEdit" @close="showEdit = false">
                <div class="bg-white rounded-lg  p-6 w-full">
            <h1 class="text-2xl font-medium text-center mb-4">New Company</h1>
            <form @submit.prevent="handleEdit(clickedCompId)" class="grid grid-cols-2 gap-4">
              <div class="col-span-1">
                <div class="mb-1">
                  <label for="companyName" class="block text-gray-700 font-medium mb-2">Company Name</label>
                  <input
                    type="text"
                    id="companyName"
                    v-model="clickedCompName"
                    placeholder="Your Company Name"
                    class="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div class="mb-1">
                  <label for="companyBio" class="block text-gray-700 font-medium mb-2">Company biography</label>
                  <textarea
                    id="companyBio"
                    v-model="clickedCompBio"
                    placeholder="Example Bio"
                    class="shadow border rounded-lg w-full h-28 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  ></textarea>
                </div>
              </div>
              <div class="col-span-1 border-l pl-3">
                <div class="mb-1 relative w-full flex flex-row items-center justify-center">
                  <input
                    accept="image/png, image/jpg, image/jpeg"
                    class="absolute inset-0 opacity-0 cursor-pointer"
                    type="file"
                    id="companyAvatar"
                    @change="onAvatarChange"
                    ref="companyAvatar"
                    
                  />
                  <button
                    class="bg-colorAccent hover:bg-blue-800 text-white font-normal w-32  py-2 px-4 mr-2 rounded-lg focus:outline-none focus:shadow-outline"
                  >
                    Select Avatar
                  </button>
                  <div  class="flex justify-start mt-2">
                    <img :src="clickedCompAvatar" alt="Avatar Preview" class="my-1 w-24 h-24 rounded">
                  </div>
                </div>
                <div class="mb-1 relative w-full flex flex-row items-center justify-center">
                  <input
                    accept="image/gif"
                    class="absolute inset-0 opacity-0 cursor-pointer"
                    type="file"
                    id="companyPhoto"
                    @change="onPhotoChange"
                    ref="companyPhoto"
                    
                  />
                  <button
                    class="bg-colorAccent hover:bg-blue-800 text-white font-normal w-32  py-2 px-4 mr-2 rounded-lg focus:outline-none focus:shadow-outline"
                  >
                    Select Gif
                  </button>
                  <div class="flex justify-start mt-2">
                    <img :src="clickedCompPic" alt="Photo Preview" class="w-24 h-24 mb-1 rounded">
                  </div>
                </div>
              </div>
              <div class="col-span-2 flex justify-center">
                <button
                  type="submit"
                  class="bg-colorAccent hover:bg-blue-800 text-white font-normal w-full  py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                  
                >
                  Ok
                </button>
              </div>
            </form>
          </div>
                
              </editModal>
            </div>
          </div>
        </div>
</template>

<script>
import axios from "axios";
import { resolveComponent } from "vue";
import newModal from "../components/newModal.vue";
import usureModal from "../components/usureModal.vue";
import navbar from "../components/navbar.vue";
import editModal from "../components/editModal.vue";
export default {
  name: "home",
  components: {
    navbar,
    newModal,
    usureModal,
    editModal,
  },
  data() {
    return {
      isLoggedIn: false,
      userData: [],
      showNew: false,
      showUsure: false,
      showEdit: false,
      companyName: "",
      companyBio: "",
      companyPhoto: null,
      companyAvatar: null,
      clickedCompId: undefined,
      clickedCompName: undefined,
      clickedCompBio: undefined,
      clickedCompAvatar: undefined,
      clickedCompPic: undefined,
      avatarPreview: null,
      photoPreview: null,
      searchQuery: '', 
    };
  },

  computed: {
    filteredUserData() {
      return this.userData.filter((user) => {
        return user.compname.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
    

  },

  methods: {
    async loadUser() {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/auth/userdata",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.userData = res.data.map((user) => {
          if (user.compavatar && user.compavatar.data) {
            const byteArray = new Uint8Array(user.compavatar.data);
            let binaryString = "";
            byteArray.forEach((byte) => {
              binaryString += String.fromCharCode(byte);
            });
            const base64String = btoa(binaryString);
            user.avatarUrl = `data:image/gif;base64,${base64String}`;
          } else {
            user.avatarUrl = "";
          }
          if (user.comppic && user.comppic.data) {
            const byteArray1 = new Uint8Array(user.comppic.data);
            let binaryString1 = "";
            byteArray1.forEach((byte) => {
              binaryString1 += String.fromCharCode(byte);
            });
            const base64String1 = btoa(binaryString1);
            user.picUrl = `data:image/gif;base64,${base64String1}`;
          } else {
            user.picUrl  = "";
          }
          return user;
        });
      } catch (ex) {
        console.log(ex);
      }
    },
    async handleSubmit() {
      this.resetPreviews();
      try {
        const formData = new FormData();
        formData.append("companyName", this.companyName);
        formData.append("companyBio", this.companyBio);
        formData.append("companyAvatar", this.$refs.companyAvatar.files[0]);
        formData.append("companyPhoto", this.$refs.companyPhoto.files[0]);
        const response = await axios.post(
          "http://localhost:3000/api/auth/addcomp",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.loadUser();
        this.showNew = false;
      } catch (ex) {
        console.log("error", ex);
      }
    },
    async handleEdit(dataId){
      this.resetPreviews();
      try {
        const formData = new FormData();
        formData.append("companyName", this.clickedCompName);
        formData.append("companyBio", this.clickedCompBio);
        formData.append("companyId", dataId);
        if (this.$refs.companyAvatar.files[0]) {
          formData.append("companyAvatar", this.$refs.companyAvatar.files[0]);
        }
        if (this.$refs.companyPhoto.files[0]) {
          formData.append("companyPhoto", this.$refs.companyPhoto.files[0]);
        }

        const response = await axios.put(
          `http://localhost:3000/api/auth/updatecomp/${dataId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.loadUser();
        this.showEdit = false;
      } catch (ex) {
        console.log("error", ex);
      }
    },
    async handleDelete(dataId) {
      try {
        await axios.delete(`http://localhost:3000/api/auth/deletecomp/${dataId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.loadUser();
        this.showUsure = false;
      } catch (ex) {
        console.log("error while deleting", ex);
      }
    },
    openEdit(userData) {
      this.clickedCompId = userData.data_id;
      this.clickedCompName = userData.compname;
      this.clickedCompBio = userData.compbio;
      this.clickedCompAvatar = userData.avatarUrl;
      
      this.clickedCompPic = userData.picUrl;
      this.showEdit = true;
    },
    openTab(id){
      const dataToPass = id;
      const url = new URL('/test', window.location.origin);
      url.searchParams.set('data', JSON.stringify(dataToPass));
      window.open(url.toString(), '_blank');
    },
    openDelete(id){
      this.clickedCompId = id;
      this.showUsure = true;
    },
    onAvatarChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.avatarPreview = e.target.result;
        this.clickedCompAvatar = e.target.result;
      };

      reader.readAsDataURL(file);
    },
    onPhotoChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoPreview = e.target.result;
        this.clickedCompPic = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    resetPreviews() {
      this.avatarPreview = null;
      this.photoPreview = null;
    },
    
  },
  mounted() {
    const token = localStorage.getItem("token");
    this.isLoggedIn = !!token;
    if (token) {
      this.loadUser();
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