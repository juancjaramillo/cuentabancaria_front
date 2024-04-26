<template>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header bg-warning text-white">
                        <h5 class="card-title text-center">ACCESO CLIENTE</h5>
                      </div>
                    <div class="card-body">
                    <form @submit.prevent="login">
                        <div class="form-group mb-3">
                            <label for="email">Correo electrónico</label>
                            <input type="email" value="admin@gmailam.com" class="form-control" id="email" v-model="email" required />
                        </div>
                        <div class="form-group mb-3">
                            <label for="password">Contraseña</label>
                            <input type="password" value="123" class="form-control" id="password" v-model="password" required />
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
    <button class="btn btn-success mt-3" @click="$router.push({ name: 'home' })">Ingresar Administrador</button>
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
                const response = await axios.post("http://localhost/cuentabancaria/public/api/clientes/login", {
                    email: this.email,
                    password: this.password,
                    remember: this.rememberMe,
                });

                // Almacenar token en localStorage
                localStorage.setItem("token", response.data.token);

                // Obtener datos del cliente y procesos
                const cliente = response.data.cliente;
                const procesos = response.data.procesos;
                const saldototal = response.data.saldototal;

                // Almacenar datos del cliente y procesos en localStorage
                localStorage.setItem("cliente", JSON.stringify(cliente));
                localStorage.setItem("procesos", JSON.stringify(procesos));
                localStorage.setItem("saldototal", JSON.stringify(saldototal));

                // Redirigir a la página de inicio
                this.$router.push("/homeCliente");
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
