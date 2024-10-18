<template>
  <v-img
      class="mt-5"
      height="40"
      src="@/assets/galisHomeVariant.jpeg"

    />

  <v-empty-state
  headline="Bienvenido,"
  title="¿Qué te gustaría hacer hoy?"
>
<template v-slot:actions>
  <v-btn variant="tonal" @click="$router.push('/')">Inicio</v-btn>
</template>
  <v-container>

    <v-row>
      <v-col cols="12" md="6">
        <v-card
          color="light-green-lighten-5"
          :to="'/licencias'"
          prepend-icon="mdi-key-variant"
          text="Administre las licencias de sus compras"
          title="Registro de Licencias"
        ></v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card
          color="light-green-lighten-5"
          :to="'/componentes'"
          prepend-icon="mdi-cpu-64-bit"
          text="Administre los componentes internos de las PC"
          title="Componentes"
        ></v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card
          color="light-green-lighten-5"
          :to="'/piezas'"
          prepend-icon="mdi-keyboard-outline"
          text="Administre las piezas/periféricos de las PC"
          title="Piezas"
        ></v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card
          color="light-green-lighten-5"
          :to="'/computadoras'"
          prepend-icon="mdi-monitor"
          text="Administre las PC a partir de piezas y componentes"
          title="Ordenadores"
        ></v-card>
      </v-col>
    </v-row>
  </v-container>
</v-empty-state>
</template>
