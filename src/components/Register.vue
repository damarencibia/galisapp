<template>

  <v-container class="d-flex justify-center align-center mt-5">
    <v-img
        class="mt-5 me-5"
        height="200"
        src="@/assets/galisHome.jpeg"
      />
    <v-card class="elevation-5" variant="elevated" style="width: 500px;">
      <v-card-text>
        <v-form ref="form" @submit.prevent="register">
          <v-div class="text-caption text-decoration-none">
            Usuario
          </v-div>
          <v-text-field
          class="mb-3"
          v-model="user.name"
          placeholder="Usuario"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          :rules="[v => !!v || 'El usuario es requerido']"
          required
          ></v-text-field>

          <v-div class="text-caption text-decoration-none">
            Contrsaseña
          </v-div>
          <v-text-field
          class="mb-5"
          v-model="user.password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          placeholder="Contraseña"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          :rules="[v => !!v || 'El La contraseña es requerida']"
          required
          ></v-text-field>

          <v-btn
          class="mb-8"
          color="rgb(0,120,84)"
          size="large"
          variant="tonal"
          block
          type="submit"
          >
          Registrarse
          </v-btn>

        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        name: '',
        password: '',
      },
      visible: false,
    };
  },
  methods: {
    async register() {
      try {
        // const response = await axios.post('https://laravel-railway-production-20f4.up.railway.app/api/login', this.user);
        const response = await axios.post('http://127.0.0.1:8000/api/register', this.user);
        const token = response.data.token;
        localStorage.setItem('authToken', token); // Almacena el token en localStorage
        alert('Cuenta creada exitosamente.');
        this.$router.push('/');
      } catch (error) {
        alert('Ha ocurrido un error.');
      }
    },
  },
};
</script>
