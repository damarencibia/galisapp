<template>
  <v-btn
  variant="text"
  class="mx-5 mt-5 text-caption text-decoration-none text-balck"
  @click="$router.push('/')"
>
  Pagina Principal
</v-btn>
    <v-container class="d-flex justify-center align-center mt-5">
      <v-img
        class="mt-5 me-5"
        height="200"
        src="@/assets/galisHome.jpeg"
      />
      <v-card class="elevation-5" variant="elevated" style="width: 500px;">
        <v-card-text>
          <v-form ref="form" @submit.prevent="login">
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
              Contraseña
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
              color="primary"
              size="large"
              variant="tonal"
              block
              type="submit"
            >
              Iniciar Sesión
            </v-btn>

            <v-div class="text-caption text-decoration-none">
              No tienes Cuenta?
              <a
                href=""
                class="text-caption text-decoration-none text-blue"
                @click="$router.push('/register')"
              >
                Registrarse
              </a>
            </v-div>
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
    async login() {
      try {
        const response = await axios.post('https://laravel-railway-production-20f4.up.railway.app/api/login', this.user);
        const token = response.data.token;
        localStorage.setItem('authToken', token); // Almacena el token en localStorage
        alert('Inicio de sesión exitoso');
        this.$router.push('/home');
      } catch (error) {
        alert('Credenciales incorrectas');
      }
    },

    logout() {
      // Elimina el token de autenticación del localStorage
      localStorage.removeItem('authToken');
      // Muestra un mensaje de alerta al usuario indicando que se cerró la sesión correctamente
      alert('Sesión cerrada con éxito');
      // Redirige al usuario a la página de inicio de sesión o a otra página adecuada
      this.$router.push('/');
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    }
  },
};
</script>
