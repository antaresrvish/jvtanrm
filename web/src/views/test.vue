<template>
{{ data }}
  </template>
  
  <script>
  import axios from 'axios';
  import { resolveComponent } from 'vue';
    export default {
      name: 'test',
      data() {
        return {
            data: null
        };
      },
      mounted() {
        const urlParams = new URLSearchParams(window.location.search);
        const dataString = urlParams.get('data');
        if (dataString) {
        this.data = JSON.parse(dataString);
        }
     },
    };
  </script>
  