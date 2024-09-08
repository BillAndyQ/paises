<template>
  <div class="max-w-xl mx-auto py-5" ref="menu">   
    <div class="w-full bg-white relative ps-7 pe-4 shadow-md flex items-center justify-center py-1 rounded-[35px]">
      <div class="w-full">
        <p class="ps-1 font-semibold text-gray-700 text-md">País</p>
        <input v-model="searchCountries" 
               @input="emitSearchCountries"
               ref="searchCountries"
               type="text" 
               class="w-[70%] md:w-[60%] text-xs py-1 mb-1 pt-0 px-1 border-none focus:ring-white focus-custom-ring" 
               placeholder="Escribe el país que deseas ver">
      </div>
      <button @click="emitSearchCountries" type="submit" class="text-white flex bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-4 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-5 h-5 inline-block text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span class="inline-block ms-2 text-sm">Buscar</span>
      </button>
      <!-- Elemento de filtro por continente -->
      <div ref="filterContinent" class="bg-white z-40 hidden rounded-[35px] absolute top-16 start-0 py-3 px-8 shadow-md w-full md:w-[calc(100%-120px)]">
          <div class="flex justify-between">
              <p class="text-gray-700">Filtrar por componentes</p>
              <button class="text-blue-500 hover:underline" @click="toggleFocus('limpiar')">Limpiar</button>
          </div>
          <div class="grid gap-4 grid-cols-3 mt-3">
              <button :key="1" :class="[{ focused: isButton1Focused }, 'button-filter','rounded-lg']" @click="toggleFocus('button1')">
                  <img class="w-full rounded-lg h-20 object-cover" src="https://upload.wikimedia.org/wikipedia/commons/1/1d/MapLab-Eastern_Europe.png" alt="">
                  <p class="text-gray-700 text-start text-sm">Europa</p>
              </button>
              <button :key="2" :class="[{ focused: isButton2Focused }, 'button-filter','rounded-lg']" @click="toggleFocus('button2')">
                  <img class="w-full rounded-lg h-20 object-cover" src="https://upload.wikimedia.org/wikipedia/commons/1/1d/MapLab-Eastern_Europe.png" alt="">
                  <p class="text-gray-700 text-start text-sm">América</p>
              </button>
              <button :key="3" :class="[{ focused: isButton3Focused }, 'button-filter','rounded-lg']" @click="toggleFocus('button3')">
                  <img class="w-full rounded-lg h-20 object-cover" src="https://upload.wikimedia.org/wikipedia/commons/1/1d/MapLab-Eastern_Europe.png" alt="">
                  <p class="text-gray-700 text-start text-sm">Asia</p>
              </button>
              <button :key="4" :class="[{ focused: isButton4Focused }, 'button-filter','rounded-lg']" @click="toggleFocus('button4')">
                  <img class="w-full rounded-lg h-20 object-cover" src="https://upload.wikimedia.org/wikipedia/commons/1/1d/MapLab-Eastern_Europe.png" alt="">
                  <p class="text-gray-700 text-start text-sm">Oceanía</p>
              </button>
              <button :key="5" :class="[{ focused: isButton5Focused }, 'button-filter','rounded-lg']" @click="toggleFocus('button5')">
                  <img class="w-full rounded-lg h-20 object-cover" src="https://upload.wikimedia.org/wikipedia/commons/1/1d/MapLab-Eastern_Europe.png" alt="">
                  <p class="text-gray-700 text-start text-sm">África</p>
              </button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputSearch',
  data() {
    return {
      searchCountries: '',
      isButton1Focused: false,
      isButton2Focused: false,
      isButton3Focused: false,
      isButton4Focused: false,
      isButton5Focused: false,
      filterContinents: []
    };
  },
  methods: {
    toggleFocus(button) {
      if (button === 'button1') {
        this.isButton1Focused = !this.isButton1Focused;
        if(this.isButton1Focused){
          this.filterContinents.push('EU');
        }else{
          this.filterContinents =  this.filterContinents.filter(continent => continent != "EU");
        }
        console.log(this.filterContinents);
      } else if (button === 'button2') {
        this.isButton2Focused = !this.isButton2Focused;
        if(this.isButton2Focused){
          this.filterContinents.push('SA');
        }else{
          this.filterContinents =  this.filterContinents.filter(continent => continent != "SA");
        }
        console.log(this.filterContinents);
      } 
      else if (button === 'button3') {
        this.isButton3Focused = !this.isButton3Focused;
        if (this.isButton3Focused) {
          this.filterContinents.push('AS');
        } else {
          this.filterContinents = this.filterContinents.filter(continent => continent != "AS");
        }
        console.log(this.filterContinents);
      } else if (button === 'button4') {
        this.isButton4Focused = !this.isButton4Focused;
        if (this.isButton4Focused) {
          this.filterContinents.push('OC');
        } else {
          this.filterContinents = this.filterContinents.filter(continent => continent != "OC");
        }
        console.log(this.filterContinents);
      } else if (button === 'button5') {
        this.isButton5Focused = !this.isButton5Focused;
        if (this.isButton5Focused) {
          this.filterContinents.push('AF');
        } else {
          this.filterContinents = this.filterContinents.filter(continent => continent != "AF");
        }
        console.log(this.filterContinents);
      }
      else if (button === 'limpiar') {
        this.filterContinents= [];
        document.querySelectorAll('.focused').forEach(btn => {
        btn.classList.remove('focused');
        this.isButton1Focused = false;
        this.isButton2Focused = false;
        this.isButton3Focused = false;
        this.isButton4Focused = false;
        this.isButton5Focused = false;
      });
      }
      function capitalizeFirstLetter(str) {
        if (!str) return str; // Maneja el caso en que la cadena esté vacía
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
      this.$emit('search-countries', capitalizeFirstLetter(this.searchCountries), this.filterContinents);
    },
    emitSearchCountries() {
      function capitalizeFirstLetter(str) {
        if (!str) return str; // Maneja el caso en que la cadena esté vacía
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
      this.$emit('search-countries', capitalizeFirstLetter(this.searchCountries), this.filterContinents);
    },

    handleClickOutside(event) {
      const menu = this.$refs.menu;
      const filter = this.$refs.filterContinent;

      if (menu && !menu.contains(event.target) && !filter.contains(event.target)) {
        filter.classList.add("hidden");
      }else{
        filter.classList.remove("hidden");
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  }
}
</script>
<style scoped>
.focus-custom-ring:focus {
    box-shadow: 0 2px 0 0 rgb(139, 139, 139);
}

.button-filter {
  outline: none
}

.button-filter.focused {
  outline: 2px solid #2b6eeb
}
</style>
