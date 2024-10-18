<template>
  <v-card>
    <v-stepper
      hide-actions
      :items="['Seleccionar Plan', 'Obtener serial', 'Obtener Verificación']"
      v-model="currentStep"
    >
      <template v-slot:item.1>
        <v-card  flat>
          <!-- Contenido del paso 1 -->
          <v-card-title class="text-h5 mb-6 font-weight-light">
            Planes
          </v-card-title>
          <v-row class="mb-5">
            <!-- PLan Mensual -->
            <v-col cols="6">
              <v-card class="elevation-4" variant="elevated">
                <v-card-title class="text-overline">
                  <div class="text-h6 mb-6 font-weight-light">Mensual</div>
                  <div class="text-green-darken-3 text-h3 font-weight-bold">510.00 CUP</div>

                  <v-rating
                  :model-value="3"
                  color="amber"
                  density="compact"
                  size="small"
                  half-increments
                  readonly
                ></v-rating>
                <div class="text-h6 text-medium-emphasis font-weight-regular">
                  &nbsp;
                </div>
                </v-card-title>
                <v-divider></v-divider>

                <v-list-item
                  lines="two"
                  subtitle=""
                  @click="planMensual"
                  >
                  Empezar

                </v-list-item>
              </v-card>
            </v-col>

            <!-- Plan Semestral -->
            <v-col cols="6">
              <v-card class="elevation-4" variant="elevated">
                <v-card-title class="text-overline">
                  <div class="text-h6 mb-6 font-weight-light">Semestral</div>
                  <div class="text-green-darken-3 text-h3 font-weight-bold">2754.00 CUP</div>
                  <v-rating
                  :model-value="3.5"
                  color="amber"
                  density="compact"
                  size="small"
                  half-increments
                  readonly
                ></v-rating>
                  <div class="text-h6 text-medium-emphasis font-weight-regular">
                    Obtenga hasta un 10% de descuento
                  </div>
                </v-card-title>
                <v-divider></v-divider>

                <v-list-item
                  lines="two"
                  subtitle=""
                  @click="planSemestral"
                  >
                  Empezar

                </v-list-item>
              </v-card>
            </v-col>

            <!-- Plan Anual -->
            <v-col cols="6">
              <v-card class="elevation-4" variant="elevated">
                <v-card-title class="text-overline">
                  <div class="text-h6 mb-6 font-weight-light">Anual</div>
                  <div class="text-green-darken-3 text-h3 font-weight-bold">3600.00 CUP</div>
                  <v-rating
                  :model-value="5"
                  color="amber"
                  density="compact"
                  size="small"
                  half-increments
                  readonly
                ></v-rating>
                  <div class="text-h6 text-medium-emphasis font-weight-regular">
                    Obtenga hasta un 20% de descuento
                  </div>
                </v-card-title>
                <v-divider></v-divider>

                <v-list-item
                  lines="two"
                  subtitle=""
                  @click="planAual"
                  >
                  Empezar

                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
        </v-card>

      </template>

      <template v-slot:item.2>
        <v-card flat>
          <v-card-title class="text-h5 mb-6 font-weight-light mt-1">
            Obtener serial de compra
          </v-card-title>

          <!-- Contenido del paso 2 -->
          <div class="d-flex justify-center mb-6 mt-6">
            <v-card class="elevation-3" style="width: 750px;">
              <v-row>
                <v-col cols="12">
                  <v-card>
                    <v-card-title class="text-h6 mb-6 font-weight-light">
                      1. Genere un serial de compra totalmente aleatorio.
                    </v-card-title>
                    <v-div class="ms-4 text-h6 mb-6 font-weight-light">
                      2. Envíe a su proveedor el serial generado para recibir un código de verificación.
                    </v-div>
                    <div class="d-flex justify-center mb-6">
                      <v-btn variant="elevated" color="green-lighten-1" rounded="0" class="flex-grow-1 elevation-0 mt-5"
                      height="48" @click="generarserial">Generar</v-btn>
                    </div>
                    <v-text-field v-model="articulo.serial" readonly rounded="0" color="green-lighten-1"></v-text-field>
                    <div class="d-flex justify-space-between mb-6">
                      <v-btn class="ms-3 flex-grow-1 elevation-0 mx-1" variant="text" @click="previusStep">Anterior</v-btn>
                      <v-btn class="me-3 flex-grow-1 elevation-0 mx-1" variant="text" :disabled="!articulo.serial" @click="nextStep">Siguiente</v-btn>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </v-card>
      </template>

      <template v-slot:item.3>
        <v-card flat>
          <v-card-title class="text-h5 mb-6 font-weight-light">
            Obtener verificación
          </v-card-title>

          <!-- Contenido del paso 3 -->
          <div class="d-flex justify-center mb-6 mt-6">
            <v-card class="elevation-3" style="width: 700px;">
              <v-row>
                <v-col cols="12">
                  <v-card>
                    <v-card-title class="text-h6 mb-6 font-weight-light mt-1">
                      3. Copie y pegue el código de verificaión recibido debajo.
                    </v-card-title>
                    <v-text-field rounded="0" v-model="articulo.key" color="green-lighten-1"></v-text-field>
                    <div class="d-flex justify-center mb-6">
                      <v-btn variant="elevated" color="green-lighten-1" rounded="0" class="flex-grow-1 elevation-0 mt-5"
                      height="48" @click="validarCodigoSeguridad">Verificar</v-btn>
                    </div>

                    <div class="d-flex justify-start mb-6">
                      <v-btn class="ms-3 flex-grow-1 elevation-0 mx-1" variant="text" @click="previusStep">Anterior</v-btn>
                      <v-btn class="me-3 flex-grow-1 elevation-0 mx-1" variant="text" :disabled=true @click="nextStep"></v-btn>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </v-card>
        <!-- SNACKBAR -->
        <div class="text-center">
          <v-snackbar
            v-model="snackbar"
            vertical
            color="white"
            style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
          >
            <div class="text-subtitle-1 pb-2">El código proporcionado es incorrecto</div>

            <p>Comuníquese con su proveedor para obtener uno válido</p>

            <template v-slot:actions>
              <v-btn

                variant="text"
                @click="snackbar = false"
                color="red"
              >
                Cerrar
              </v-btn>
            </template>
          </v-snackbar>
        </div>

        <!-- SNACKBAR 2-->
        <div class="text-center">
          <v-snackbar
            v-model="snackbar2"
            vertical
            color="white"
            timeout="-1"
            style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
          >
            <div class="text-subtitle-1 pb-2">Verificación exitosa</div>

            <p>Usted ha comprado una licencia de GALIS válida por {{this.articulo.estado}} días.</p>


            <template v-slot:actions>
              <div class="text-center">
              <v-btn

                variant="text"
                :to="'/home'"
                color="success"
              >
                Finalizar
              </v-btn>
            </div>
            </template>
          </v-snackbar>
        </div>
      </template>


      <div class="d-flex justify-center mb-6 mt-5">
        <v-div class="text-h6 mt-5 font-weight-light">Tiene alguna pregunta sobre los pagos?
          <v-btn text  variant="text" class="text-h6 text-none" size="comfortable" color="primary">
            <span class="mb-1">Contáctenos</span>
          </v-btn>
        </v-div>
      </div>
    </v-stepper>

    <AppFooter />
  </v-card>
</template>

<script>
import api from '@/axiosconfig'

export default {

  data() {
    return {
      currentStep: 1,
      mensajeValidacion: null,
      snackbar: false,
      snackbar2: false,

      articulo: {
        serial: '',
        key: '',
        estado: null
      },

    }
  },
  methods: {
    planMensual() {
      this.articulo.estado = 30;
      console.log(this.articulo.estado);
      this.currentStep += 1
    },
    planSemestral() {
      this.articulo.estado = 183;
      console.log(this.articulo.estado);
      this.currentStep += 1
    },
    planAual() {
      this.articulo.estado = 365;
      console.log(this.articulo.estado);
      this.currentStep += 1

    },

    nextStep() {
      this.currentStep += 1
    },
    previusStep() {
      this.currentStep -= 1
    },
    finalizar() {
      // Acciones a realizar al finalizar el proceso
      console.log('Proceso finalizado')
    },

    generarserial() {
      // Genera un código aleatorio de 6 dígitos
      this.articulo.serial = Math.floor(Math.random() * 90000000 + 10000000).toString();
    },

    async generarCodigoSeguridad() {
      try {
        const encoder = new TextEncoder();
        const data = encoder.encode(this.serial);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        // Utiliza todo el hash generado
        this.codigoSeguridad = hashHex;
      } catch (err) {
        console.error("Error al generar el código de seguridad:", err);
        throw err;
      }
    },

    async validarCodigoSeguridadInternal(idBase, codigoSeguridad) {
      try {
        const encoder = new TextEncoder();
        const data = encoder.encode(idBase);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        // Compara todo el hash generado
        return hashHex === codigoSeguridad;
      } catch (err) {
        console.error("Error al validar el código de seguridad:", err);
        throw err;
      }
    },



    async validarCodigoSeguridad() {
      try {

        const isValid = await this.validarCodigoSeguridadInternal(this.articulo.serial, this.articulo.key);
        this.mensajeValidacion = isValid ? this.snackbar2 = true : this.snackbar = true;

        if (this.snackbar2 === true) {
          this.articulo = {
          serial: this.articulo.serial,
          key: this.articulo.key,
          estado: this.articulo.estado
          }
          var router = this.$router;
          api.post('/keyes', this.articulo)
          .then(() => {
            this.snackbar2 = true;
          })
          .catch(error => {
            this.snackbar = true;
            console.log(error);
          })
          };


      } catch (err) {
        console.error("Error al validar el código de seguridad:", err);
        this.mensajeValidacion = 'Ocurrió un error al validar el código de seguridad. Por favor, inténtalo de nuevo.';
      }
    },

  }
}
</script>
