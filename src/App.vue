<template>
  <div id="app" class="bg-gray-100 min-h-screen">
    <AppSidebar @change-view="changeView" />
    <div class="ms-0 sm:ms-64">
      <ListaPaises  v-if="currentView === 'ListaPaises'"/>
      <VistaUno  v-if="currentView === 'VistaUno'"/>
    </div>
  </div>
</template>

<script>
// Vistas principales
import ListaPaises from './views/ListaPaises.vue'
import VistaUno from './views/VistaUno.vue'
import AppSidebar from './components/Sidebar.vue'
import { onMounted } from 'vue'

// Uso flowbite para el sidebar
import { initFlowbite } from 'flowbite'

export default {
  name: 'App',
  components: {
    AppSidebar,
    ListaPaises,
    VistaUno
  }
  ,
  data() {
    return {
      currentView: 'ListaPaises' // Vista inicial
    }
  },
  methods: {
    changeView(view) {
      this.currentView = view
    }
  }
}

// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite();
})
</script>

<style>
</style>
