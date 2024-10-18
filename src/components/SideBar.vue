<template>
  <!-- <div class="d-flex align-center">
    <v-img alt="Vuetify Logo" class="shrink mr-2 ms-5" contain src="@/assets/galisAppBar2.jpeg" transition="scale-transition" width="100"  />
  </div> -->
  <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
        color="rgb(0,120,84)"
      >
        <v-list-item
          prepend-avatar="@/assets/galisLogoBackground.jpeg"
        >
        <div class="d-flex align-center">
          <v-img alt="Vuetify Logo" class="shrink mr-5" contain src="@/assets/galisAppBar3.jpeg" transition="scale-transition" width="100"  />
        </div>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-outline" title="Home" value="home" :to="'/homeprovider'"></v-list-item>
          <v-list-item prepend-icon="mdi-keyboard-outline" title="Piezas" value="piezas" :to="'/piezas'"></v-list-item>
          <v-list-item prepend-icon="mdi-cpu-64-bit" title="Componentes" value="componentes" :to="'/componentes'"></v-list-item>
          <v-list-item prepend-icon="mdi-monitor" title="Ordenadores" value="ordenadores" :to="'/computadoras'"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
        </v-list>

        <div class="d-flex justify-center" v-if="rail === true">
            <v-btn
              icon="mdi-chevron-right"
              variant="text"
              @click.stop="rail = !rail"
            ></v-btn>
        </div>
        <div class="d-flex justify-center" v-else>
            <v-btn
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="rail = !rail"
            ></v-btn>
        </div>
      </v-navigation-drawer>



</template>

<script>
import api from '@/axiosconfig'

export default {
  props: [],

  data: () => ({
    drawer: true,
    rail: true,
  }),

  mounted() {


  },



  methods: {

  }
};
</script>
