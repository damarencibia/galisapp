<template>
  <v-app-bar class="elevation-0" color="green-lighten-5" density="compact">
    <v-toolbar-title>
      <!-- BUSCADOR DE TABLA -->
      <v-text-field class="font-weight-bold" v-model="search" label="Buscar" prepend-inner-icon="mdi-magnify"
        variant="text" hide-details single-line color="green-lighten-1" clearable width="300px">
        <v-tooltip activator="parent" location="bottom">Evitar espacios en blanco
          ej: placa_base
        </v-tooltip>
      </v-text-field>
    </v-toolbar-title>

    <template v-slot:append>

      <!-- BOTON DE NUEVO REGISTRO -->
      <div class="text-center pa-4">
        <v-dialog v-model="dialog_nuevo_registro" max-width="400" persistent>
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn icon class="elevation-0 text-none" variant="outlined" density="compact" color="gray" size="small"
              v-bind="activatorProps" rounded>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-theme-provider class="pa-10" theme="light">
            <v-card>
              <div class="d-flex justify-space-between">
                <v-card-title>Crear Componente</v-card-title>
                <v-btn class="mt-3 me-2" density="compact" variant="text" @click="dialog_nuevo_registro = false"
                  icon="mdi-close-circle-outline"></v-btn>
              </div>
              <CrearComponente />
            </v-card>
          </v-theme-provider>
        </v-dialog>
      </div>

      <!-- BOTON DE HISTORIAL -->
      <v-btn :to="'/historialComponentes'" icon class="elevation-0  text-none" variant="text" color="gray" text
        density="compact">
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <!-- MENU DE ESTADÍSTICAS RAPIDAS -->
      <div class="text-center me-3">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn prepend-icon="mdi-chart-line" class="mx-4 me-1 elevation-0 text-none" variant="elevated" size="small"
              v-bind="props">
              Estadísticas
            </v-btn>
          </template>

          <!-- TOTAL DE COMPONENTES -->
          <v-list>
            <v-list-item>
              <v-list-item-title class="text-h6  mx-5 ">Generales</v-list-item-title>
            </v-list-item>
            <v-list-item title="Total de Componentes " link class="mx-5">
              <template v-slot:append>
                <v-badge color="rgb(186,232,217)" :content="totalRegistros" inline></v-badge>
              </template>
            </v-list-item>

            <!-- COMPONENTES DISPONIBLES -->
            <v-list-item title="Componentes disponibles" link class="mx-5">
              <template v-slot:append>
                <v-badge color="rgb(186,232,217)" :content="disponiblesCount" inline> </v-badge>
              </template>
            </v-list-item>

            <!-- COMPONENTES NO DISPONIBLES -->
            <v-list-item title="Componentes en uso" link class="mx-5">
              <template v-slot:append>
                <v-badge color="rgb(186,232,217)" :content="noDisponiblesCount" inline></v-badge>
              </template>
            </v-list-item>

            <v-divider class="mx-4" inset></v-divider>

            <v-list-item>
              <v-list-item-title class="text-h6  mx-5 ">Específicas</v-list-item-title>
            </v-list-item>

            <!-- CONTADOR DE  PLACA BASE-->
            <v-list-item title="Placa Base" link class="mx-5">
              <template v-slot:append>
                <v-badge color="rgb(186,232,217)" :content="placaBaseCount" inline></v-badge>
              </template>
            </v-list-item>

            <!-- CONTADOR DE LECTOR CD-->
            <v-list-item title="Lector CD" link class="mx-5">
              <template v-slot:append>
                <v-badge color="rgb(186,232,217)" :content="lectorCdCount" inline></v-badge>
              </template>
            </v-list-item>

            <!-- CONTADOR DE MEMORIA RAM -->
            <v-list-item title="Memoria ram" link class="mx-5">
              <template v-slot:append>
                <v-badge color="rgb(186,232,217)" :content="memoriaRamCount" inline></v-badge>
              </template>
            </v-list-item>

            <!-- CONTADOR DE DISCO DURO  -->
            <v-list-item title="Disco duro" link class="mx-5">
              <template v-slot:append>
                <v-badge color="rgb(186,232,217)" :content="discoDuroCount" inline></v-badge>
              </template>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <LoginButton/>

    </template>
  </v-app-bar>

  <v-app-bar class="elevation-0" height="210">
    <div class="d-flex justify-start mx-5">
      <div class="d-flex justify-center">
        <!-- Card % Disponibles - Vinculados -->
        <v-card class="elevation-0">
          <v-card-text style="margin-top: 25%;">
            <!-- Disponibles -->
            <div class="d-flex justify-start mb-6">
              <v-card class="mx-1" border flat width="15px" height="15px" color="rgba(212,152,31,0.67)"
                style="margin-top: 10px;"></v-card>
              <p class="text-subtitle-3 text-center mt-2" style="color: #78909C !important;">
                Disponibles
              </p>
              <p class="text-subtitle-2 ms-5" style="color: black !important; font-size: 20px !important;">
                {{ disponiblesCount }} U -
              </p>
              <p class="text-subtitle-2 mx-1" style="color: black !important; font-size: 20px !important;">
                {{ percentageAvailable }}%
              </p>
            </div>

            <!-- Vinculados -->
            <div class="d-flex justify-start mb-6">
              <v-card class="mx-1" border flat width="15px" height="15px" color="#78909C"
                style="margin-top: 10px;"></v-card>
              <p class="text-subtitle-3 text-center mt-2" style="color: #78909C !important;">
                Vinculados
              </p>
              <p class="text-subtitle-2 ms-5" style="color: black !important; font-size: 20px !important;">
                {{ noDisponiblesCount }} U -
              </p>
              <p class="text-subtitle-2 mx-1" style="color: black !important; font-size: 20px !important;">
                {{ percentageVinculated }}%
              </p>
            </div>

          </v-card-text>
        </v-card>

        <!-- Grafica de total de registros -->
        <v-progress-circular :model-value="percentageAvailable" :rotate="360" :size="200" :width="10"
          class="custom-progress-circular" style="color: rgba(212,152,31,0.67) !important;">
          <div>
            <p class="text-subtitle-2 text-center" style="color: black !important; font-size: 40px !important;">
              {{ totalRegistros }}
            </p>
            <p class="text-subtitle-3 text-center" style="color: #78909C !important;">
              Dispositivos
            </p>
          </div>
        </v-progress-circular>
      </div>
    </div>
  </v-app-bar>

  <v-sheet>
    <v-app-bar class="elevation-0">
      <v-tabs v-model="tab">
        <v-tab value="componentes">Componentes</v-tab>
        <v-tab value="two">Item Two</v-tab>
        <v-tab value="three">Item Three</v-tab>
      </v-tabs>
    </v-app-bar>

    <div>
      <v-tabs-window class="mt-5" v-model="tab">
        <v-tabs-window-item value="componentes">
          <!-- Data table card -->
          <v-card variant="text">
            <v-data-table loading-text="Cargando..." :loading="isLoading" class="elevation-0  table-hover-effect"
              fixed-header v-model:page="page" :headers="headers" :items="articulos" :search="search" density="compact"
              :items-per-page="itemsPerPage" style="font-size:0.9rem;">

              <template v-slot:loading>
                <v-skeleton-loader type="table-row@10" color="green-lighten-5"></v-skeleton-loader>
              </template>

              <!-- <template v-slot:top></template> -->

              <!-- Filas del data table -->
              <template v-slot:item="{ item, index }">
                <tr>
                  <td>
                    <v-text-field class="mt-5  font-weight-bold" variant="text" color="green-lighten-1"
                      v-model="item.nro_serie" :readonly="isReadOnly" required width="200"
                      density="compact"></v-text-field>
                  </td>

                  <td>
                    <v-text-field class="mt-5" variant="text" color="green-lighten-1" v-model="item.marca"
                      :readonly="isReadOnly" required width="200" density="compact"></v-text-field>
                  </td>

                  <td>
                    <v-select variant="text" density="compact" class="mt-5" v-model="item.tipo_componente"
                      :items="tipos_de_componentes" :rules="[v => !!v || 'Componente es requerido']" width="150"
                      required :readonly="isReadOnly"></v-select>

                  </td>
                  <td>
                    <v-chip variant="flat" size="small" :color="item.disponible ? 'rgb(0,120,84)' : 'rgb(158,38,41)'"
                      style="font-size: 0.7rem;">
                      {{ item.disponible ? 'Si' : 'No' }}
                    </v-chip>
                  </td>
                  <td>{{ new Date(item.created_at).toLocaleString() }}</td>
                  <td>{{ new Date(item.updated_at).toLocaleString() }}</td>
                  <td>

                    <!-- BOTON EDITAR -->
                    <v-btn variant="tonal" class="mx-1" density="comfortable"
                      @click="updateArticulo(item.id, item.nro_serie, item.marca, item.tipo_componente)" icon
                      size="small">
                      <v-icon>mdi-cog</v-icon>
                      <v-tooltip activator="parent" location="bottom">Editar {{ item.nro_serie }}</v-tooltip>
                    </v-btn>



                    <!-- BOTON ELIMINAR -->
                    <v-btn variant="tonal" density="comfortable" @click.stop="dialog = true; id = item.id" icon
                      size="small">
                      <v-icon>mdi-trash-can</v-icon>
                      <v-tooltip activator="parent" location="bottom">Eliminar {{ item.nro_serie }}</v-tooltip>
                    </v-btn>
                  </td>
                </tr>

              </template>


              <template v-slot:bottom></template>

            </v-data-table>


            <!-- ventana de dialogo para eliminar registros -->
            <v-dialog v-model="dialog" max-width="300">
              <v-card>
                <v-card-title class="headline text-center">
                  <div>
                    <v-icon color="red">mdi-delete-forever-outline</v-icon>
                  </div>
                  <div>
                    ¿Borrar?
                  </div>
                  <div style="font-size: 0.8rem;">
                    Esta acción es irreversible
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="dialog = false" variant="outlined" class="elevation-0"
                    size="small"><v-icon>mdi-close</v-icon>
                    Cancelar</v-btn>
                  <v-btn @click="confirmarBorrado(id)" class="elevation-0" variant="elevated" color="red" size="small">
                    <v-icon>mdi-delete-forever-outline</v-icon>
                    Aceptar</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-snackbar v-model="snackbar" color="white" multi-line>
              {{ textsnack }}
              <template v-slot:actions>
                <v-btn color="blue" variant="text" @click="snackbar = false">
                  Cerrar
                </v-btn>
              </template>
            </v-snackbar>

          </v-card>
        </v-tabs-window-item>

        <v-tabs-window-item value="two">
          Two
        </v-tabs-window-item>

        <v-tabs-window-item value="three">
          Three
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </v-sheet>

  <AppFooter />

</template>

<style scoped>
.even-row {
  background-color: #DEF9C4;
  /* Color de fondo para filas pares */
}

.odd-row {
  background-color: #9CDBA6;
  /* Color de fondo para filas impares */
}

.custom-progress-circular {
  margin: 1rem;
}
</style>

<script>
import api from '@/axiosconfig'
import LoginButton from './LoginButton.vue';

export default {
  name: 'ListarArticulosPage',
  data() {
    return {
      dialog: false,
      dialog_nuevo_registro: false,
      articulos: [],
      id: null,
      search: '',
      snackbar: false,
      headers: [
        { title: 'Serial', value: 'nro_serie', key: 'nro_serie' },
        { title: 'Marca', value: 'marca', key: 'marca' },
        { title: 'Tipo de Componente', value: 'tipo_componente', key: 'tipo_componente' },
        { title: 'Disponible', value: 'disponible', key: 'disponible' },
        { title: 'Creado', value: 'created_at', key: 'created_at' },
        { title: 'Modificado', value: 'updated_at', key: 'updated_at' },
        { title: 'Operaciones', value: 'operaciones' },
      ],
      page: 1,
      itemsPerPage: 10,
      show: false,
      isLoading: false,
      isReadOnly: true,
      tab: null,

      tipos_de_componentes: [
        'disco_duro',
        'placa_base',
        'lector_cd',
        'memoria_ram',
      ],
    };
  },

  mounted() {
    this.obtenerArticulos();
  },

  computed: {
    percentageAvailable() {
      const totalArticles = this.totalRegistros;
      const availableArticles = this.disponiblesCount;

      if (totalArticles > 0) {
        return ((availableArticles / totalArticles) * 100).toFixed(0);
      }

      return 0;
    },
    percentageVinculated() {
      const totalArticles = this.totalRegistros;
      const vinculated = this.noDisponiblesCount;

      if (totalArticles > 0) {
        return ((vinculated / totalArticles) * 100).toFixed(0);
      }

      return 0;
    },

    pageCount() {
      return Math.ceil(this.articulos.length / this.itemsPerPage)
    },

    totalRegistros() {
      return this.articulos.length;
    },

    disponiblesCount() {
      return this.articulos.filter(articulo => articulo.disponible === 1).length;
    },
    noDisponiblesCount() {
      return this.articulos.filter(articulo => articulo.disponible === 0).length;
    },
    placaBaseCount() {
      return this.articulos.filter(articulo => articulo.tipo_componente === 'placa_base').length;
    },
    lectorCdCount() {
      return this.articulos.filter(articulo => articulo.tipo_componente === 'lector_cd').length;
    },
    memoriaRamCount() {
      return this.articulos.filter(articulo => articulo.tipo_componente === 'memoria_ram').length;
    },
    discoDuroCount() {
      return this.articulos.filter(articulo => articulo.tipo_componente === 'disco_duro').length;
    },
  },
  methods: {
    toggleAllFields() {
      this.isReadOnly = !this.isReadOnly;
      // console.log('Toggling all fields:', this.isReadOnly);
    },

    obtenerNombreTipoComponente(tipoComponente) {
      const mapeo = {
        placa_base: 'Placa Base',
        memoria_ram: 'Memoria RAM',
        lector_cd: 'Lector CD',
        disco_duro: 'Disco Duro'
      };
      return mapeo[tipoComponente] || tipoComponente;
    },

    obtenerArticulos() {
      this.isLoading = true;
      api.get('/componentes')
        .then(response => {
          // console.log(response.data);
          this.articulos = response.data;
          this.isLoading = false;
        })
        .catch(error => console.error(error));
    },

    async updateArticulo(id, nro_serie, marca, tipo_componente) {
      id: id;
      const articulo = {
        nro_serie: nro_serie,
        marca: marca,
        tipo_componente: tipo_componente
      };
      // console.log(id, articulo);

      try {
        const response = await api.put(`/componentes/${id}`, articulo)
        // console.log(response);
        window.location.reload();
      } catch (error) {
        console.error(error.response);
      }
    },

    confirmarBorrado(id) {
      api.delete(`/componentes/${id}`)
        .then(() => {
          this.obtenerArticulos();
          this.dialog = false;
          this.snackbar = true;
          this.textsnack = 'Registro eliminado exitosamente';
        })
        .catch((error) => {
          this.dialog = false;
          this.snackbar = true;
          this.textsnack = `${error.response.data.message}\n${error.response.data.details}`;

        });
    },
  },
};
</script>
