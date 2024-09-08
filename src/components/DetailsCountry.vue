<template>
    <div :class="`bg-white h-104 ${hidden} row-span-3 px-7 py-3 fixed lg:relative top-8 lg:top-0 pt-8 lg:col-start-2 xl:col-start-3 col-start-0 row-start-1 shadow-xl lg:shadow-md w-72 max-w-96 hover:shadow-sm`">
        <img class="w-full h-40 object-cover" :src="imagenPais" alt="Imagen del país">
        <button type="button" @click="closeDetails" class="text-gray-400 absolute top-1 right-1 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
        </button>
      <div class="w-[calc(85%)] flex items-center h-20">
        <span class="text-[3.4rem]">
          {{ bandera }}
        </span>
        <div class="ms-3">
          <p class="text-lg text-blue-500 font-semibold">{{ nombrePais }}</p>
          <p class="text-sm text-gray-700 font-medium">{{ ContinentePais.name }}</p>
        </div>
      </div>
      <div>
        <span class="text-lg text-blue-500 font-semibold">Capital : </span>
        <span class="text-lg text-gray-700 font-semibold">{{ capital }}</span>
      </div>
      <div>
        <span class="text-lg text-blue-500 font-semibold">Language : </span>
        <span v-for="language in languages" :key="language.code" class="text-lg text-gray-700 font-semibold">
          {{ language.name }},
        </span>
      </div>
      <div>
        <span class="text-lg text-blue-500 font-semibold">Currency : </span>
        <span class="text-lg text-gray-700 font-semibold">{{ currency }}</span>
      </div>
      <div>
        <span class="text-lg text-blue-500 font-semibold">Region : </span>
        <div class="h-52 overflow-auto p-3 bg-gray-50 border mt-2">
          <p v-for="state in states" :key="state.code" class="text-sm  text-gray-700 font-semibold">
            {{ state.name }}
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DetailsCountry',
    props: {
      nombrePais: String,
      ContinentePais: {
        type: Array,
        required: true
      },
      bandera: String,
      imagenPais: String,
      hidden : String,
      capital : String,
      currency :  String,
      languages : {
        type: Array,
        required: true
      },
      states: {
        type: Array,
        required: true
      },
    },
    methods: {
    closeDetails() {
      this.$emit('update:hidden', 'hidden');  //Retorna la función para usarla en actualizar un prop
    }
  }
  }
  </script>
  
  <style scoped>
  </style>
  