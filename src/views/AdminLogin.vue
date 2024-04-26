<!-------------------------------------------------------------------------------------------
    'Descripción        :  Visualiza el formulario de inicio de sesión para el módulo de administración
                           y gestión bancaria, con validación de credenciales y manejo de errores.
    'Autor      	    	: Juan Jaramillo . Locatel - Colombia.
    'Fecha de Creación  :     Marzo 25/2024
    'Fecha de Modificación  : Marzo 25/2024
    '-------------------------------------------------------------------------------------------
    '	Propósito :	Permite que los usuarios administradores inicien sesión en el sistema
    '				      
    '				
    '	............................................................................
    '	Entradas :  Correo electrónico y contraseña del usuario administrador
    '	............................................................................
    '	Proceso  :	Validar las credenciales ingresadas y redirigir al usuario a la página de inicio
    '............................................................................
    'Modifcaciones : -  Mejorar diseño y presentación del formulario
    'Consideraciones :
    -->

<template>
<div class="container">
    <div class="row justify-content-center mt-5">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header bg-success text-white">
                    <h5 class="card-title text-center">ADMIN GESTIÓN BANCARIA</h5>
                  </div>
                <div class="card-body">
                    <form @submit.prevent="login">
                        <div class="form-group mb-3">
                            <label for="email">Correo electrónico</label>
                            <input type="email" class="form-control" id="email" v-model="email" required />
                        </div>
                        <div class="form-group mb-3">
                            <label for="password">Contraseña</label>
                            <input type="password" class="form-control" id="password" v-model="password" required />
                        </div>
                        <div class="form-group mb-3" v-if="errors.length > 0">
                            <div class="alert alert-danger" role="alert">
                                <ul>
                                    <li v-for="error in errors" :key="error">
                                        {{ error }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="rememberMe" v-model="rememberMe" />
                                <label class="form-check-label" for="rememberMe">
                                    Recordarme
                                </label>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Iniciar sesión</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="text-center">
    <button class="btn btn-warning mt-3" @click="$router.push({ name: 'loginC' })">Ingresar Sección Cliente</button>
</div>
</div>
</template>

  
<script>
import axios from "axios";

export default {
    data() {
        return {
            email: "",
            password: "",
            rememberMe: false,
            errors: [],
        };
    },
    methods: {
        async login() {
            this.errors = []; // Limpiar errores anteriores
            try {
                const response = await axios.post("http://localhost/cuentabancaria/public/api/login", {
                    email: this.email,
                    password: this.password,
                    remember: this.rememberMe,
                });

                // Almacenar token en localStorage
                localStorage.setItem("token", response.data.token);

                // Redirigir a la página de inicio
                this.$router.push("/home");
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.errors = ["Credenciales inválidas. Inténtelo nuevamente."];
                } else {
                    console.error("Error:", error);
                    this.errors = ["Ocurrió un error inesperado. Inténtelo nuevamente."];
                }
            }
        },
    },
};
</script>
