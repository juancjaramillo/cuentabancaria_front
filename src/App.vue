<template>
<nav class="navbar navbar-expand-lg" :class="{ 'navbar-dark bg-warning': isCliente, 'navbar-dark bg-success': !isCliente }" v-if="!isLoginPage">

    <div class="container-fluid">
        <a class="navbar-brand" href="#" v-if="isCliente">GESTIÓN BANCARIA (CLIENTE)</a>
        <a class="navbar-brand" href="#" v-else>GESTIÓN BANCARIA - (ADMINISTRACIÓN)</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">

            <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="isCliente">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/homeCliente">Inicio </a>
                </li>

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="color: red;">
                       <b> Transacciones</b>
                    </a>

                    <ul class="dropdown-menu">
                        <li>
                            <router-link class="dropdown-item" to="/ConsignaC">Realizar Consignación</router-link>
                        </li>

                        <li>
                            <router-link class="dropdown-item" to="/RetiraC">Realizar Retiro</router-link>
                        </li>
                    </ul>
                </li>
            </ul>

            <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-else>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/home">Inicio</a>
                </li>

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="color: yellow;">
                    <b>  Clientes</b>
                    </a>

                    <ul class="dropdown-menu">
                        <li>
                            <router-link class="dropdown-item" to="/home">Listar Clientes</router-link>
                        </li>

                        <li>
                            <router-link class="dropdown-item" to="/createC">Registrar Nuevo</router-link>
                        </li>
                    </ul>
                </li>
            </ul>

            <!-- Botón de salida -->
            <button class="btn btn-danger" @click="logout">Salir</button>

        </div>
    </div>
</nav>
<div class="container-fluid">
    <router-view />
</div>
</template>

<script>
export default {
    computed: {
        isLoginPage() {
            return this.$route.name === 'loginAdmin' || this.$route.name === 'loginC'; // 'loginAdmin' es el nombre de la ruta de inicio de sesión
        },

        isCliente() {
            return this.$route.name === 'homeCliente' || this.$route.name === 'ConsignaC' || this.$route.name === 'RetiraC'; // 'homeCliente' es el nombre de la ruta de inicio de sesión
        },

    },

    methods: {
        logout() {
            // Limpiar token del almacenamiento local
            localStorage.removeItem('token');
            // Redirigir al usuario a la página de inicio de sesión correspondiente
            this.$router.push({
                name: 'loginAdmin'
            }); // O el nombre de la ruta de inicio de sesión correspondiente
        }

    }
}
</script>
