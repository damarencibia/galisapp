<template>
  <!-- <v-container fluid class="py-12 px-4 bg-green-lighten-5"></v-container> -->

  <v-footer
  class="text-center d-flex flex-column"
  color="#E7F5E7"
>
<v-container>
<div class="grid-center">
  <v-img
    alt="Vuetify Logo"
    class="shrink mr-2 ms-5 mt-5 mb-5"
    contain
    src="@/assets/galisHomeVariantGreen.jpeg"
    transition="scale-transition"
    width="300"
  />
</div>
<v-empty-state
  class="mb-5"
  headline="Gestión de Activos y Licencias de Software"
  text="Soluciones avanzadas para la administración y protección de infraestructura IT y licencias de software"

></v-empty-state>

<v-container>
<div class="d-flex justify-center mb-6 mt-5">

  <v-btn
    class="text-none mb-4 mx-5 ms-5"
    color="rgb(0,120,84)"
    size="x-large"
    variant="flat"
    style="width: 240px; height: 50px; font-size:0.9rem;"
    :to="'/homeprovider'"
  >
    EMPEZAR
  </v-btn>
  <v-btn
    class="text-none mb-4 mx-5 ms-5"
    color="rgb(0,120,84)"
    size="x-large"
    variant="outlined"
    style="width: 240px; height: 50px; font-size:0.9rem;"
  >
    POR QUE NOSOTROS?
  </v-btn>
  <v-btn
    class="text-none mb-4 mx-5 ms-5"
    color="grey-darken-3"
    size="x-large"
    variant="flat"
    style="width: 240px; height: 50px; font-size:0.9rem;"
  >
    CONTACTENOS
  </v-btn>
</div>
</v-container>
</v-container>
</v-footer>



<v-footer
class="bg-green-lighten-5 text-center d-flex flex-column"
>


<div>
  <v-btn

    class="mx-4"
    variant="text"
  ></v-btn>
</div>



<v-divider></v-divider>

<div>
  &copy;{{ new Date().getFullYear() }} — EICMA 306 S.U.R.L. Todos los derechos reservados
</div>
<div class="d-flex justify-space-between mb-6 mt-5">
  <a
                href=""
                class=" text-decoration-none text-black mx-5"
                @click="$router.push('/')"
              >
                Términos y condiciones
              </a>
  <a
                href=""
                class=" text-decoration-none text-black me-5"
                @click="$router.push('/')"
              >
                Política de Privacidad
              </a>
</div>
</v-footer>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-cart-minus',
      ],
    }),
  }
</script>

<style scoped>
.grid-center {
  display: grid;
  place-items: center;
}
</style>
