<template>
  <div class="d-flex justify-center mb-6 mt-6">
    <v-card class="elevation-3" style="width: 600px;">
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <v-btn :to="'/home'" icon="mdi-arrow-left" size="small" variant="text"></v-btn>

              Código Aleatorio</v-card-title>
            <v-text-field color="" v-model="codigoAleatorio"></v-text-field>
            <div class="d-flex justify-center mb-6">
              <v-btn variant="elevated" class="elevation-1" @click="generarCodigoAleatorio">Generar Aleatoriamente</v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>Código de Seguridad</v-card-title>
            <v-card-text>{{ codigoSeguridad }}</v-card-text>

            <!-- <v-text-field v-model="codigoSeguridad2"></v-text-field> -->
            <div class="d-flex justify-center mb-6">
              <v-btn variant="elevated" class="elevation-1" @click="generarCodigoSeguridad">Encriptar</v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <!-- <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>Validar Código de Seguridad</v-card-title>
            <v-card-text>{{ mensajeValidacion }}</v-card-text>
            <v-btn @click="validarCodigoSeguridad">Validar</v-btn>
          </v-card>
        </v-col>
      </v-row> -->
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      codigoAleatorio: '',
      codigoSeguridad: '',
      codigoSeguridad2: '',
      mensajeValidacion: ''
    };
  },
  methods: {
    generarCodigoAleatorio() {
      // Genera un código aleatorio de 6 dígitos
      this.codigoAleatorio = Math.floor(Math.random() * 90000000 + 10000000).toString();
    },

    async generarCodigoSeguridad() {
      try {
        const encoder = new TextEncoder();
        const data = encoder.encode(this.codigoAleatorio);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        // Utiliza todo el hash genezrado
        this.codigoSeguridad = hashHex;
      } catch (err) {
        console.error("Error al generar el código de seguridad:", err);
        throw err;
      }
    },

    async validarCodigoSeguridad() {
      try {
        const isValid = await this.validarCodigoSeguridadInternal(this.codigoAleatorio, this.codigoSeguridad2);
        this.mensajeValidacion = isValid ? 'Código válido.' : 'Código inválido.';
      } catch (err) {
        console.error("Error al validar el código de seguridad:", err);
        this.mensajeValidacion = 'Ocurrió un error al validar el código de seguridad. Por favor, inténtalo de nuevo.';
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
    }
  }
};
</script>
