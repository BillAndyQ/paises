<template>
    <button @click="viewDetailsCountry" class="bg-white h-52 rounded-2xl shadow-md sm:w-72 w-full max-w-96 cursor-pointer hover:shadow-xl">
      <img class="w-full h-32 rounded-t-2xl object-cover" :src="imagenPais" alt="Imagen del país">
      <div class="w-full flex items-center h-20 px-4">
        <span class="text-[3.4rem]">
          {{ bandera }}
        </span>
        <div class="ms-3">
          <p class="text-lg text-start text-blue-500 font-semibold">{{ nombrePais }}</p>
          <p class="text-sm text-start text-gray-700 font-medium">{{ ContinentePais }}</p>
        </div>
      </div>
    </button>
  </template>
  
  <script>
  //Card donde se muestra la información e imagen del pais
  export default {
    name: 'CardPais',
    props: {
      nombrePais: String,
      ContinentePais: String,
      bandera: String,
      imagenPais: String,
    },
    methods: {
        viewDetailsCountry() {
            this.$emit('detailsCountry'); // Retorna la función para usarla
        }
    }
  }
  </script>
  
  <style scoped>
  </style>
  