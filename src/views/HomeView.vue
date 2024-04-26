<template>
<div class="row mt-3">
    <div class="d-grid col-8 mx-auto mb-3">
        <div class="input-group input-group-sm bg-light">
            <span class="input-group-addon"><b>Buscar</b>&nbsp;</span>
            <input v-model="busqueda" type="text" class="form-control form-control-sm" placeholder="Ingrese la palabra que desea buscar...">
        </div>
    </div>
</div>

<div class="row">

    <table class="table table-bordered table-responsive table-hover">
        <thead>
            <tr>
                <th class="bg-dark text-white">#</th>
                <th class="bg-dark text-white">ID</th>
                <th class="bg-dark text-white">FOTO</th>
                <th class="bg-dark text-white">NOMBRE</th>
                <th class="bg-dark text-white">APELLIDO</th>
                <th class="bg-dark text-white">DOCUMENTO</th>
                <th class="bg-dark text-white">DIRECCION</th>
                <th class="bg-dark text-white">NUMERO CUENTA</th>
                <th class="bg-dark text-white">SALDO</th>
                <th class="bg-dark text-white">REGISTRO</th>
                <th class="bg-dark text-white"></th>
            </tr>

        </thead>

        <tbody class="table-group-divider" id="2conteido">
            <tr v-if="!cargando" v-for="(cli, i) in clientesFiltrados" :key="cli.id">
                <td v-text="i + 1"></td>
                <td v-text="cli.id"></td>
                <td>
                    <img v-if="cli.foto" style="width: 150px !important" :src="cli.foto" class="img-thumbnail" alt="" />
                    <img v-else style="width: 150px !important" src="https://cdn2.iconfinder.com/data/icons/user-23/512/User_Customers.png" alt="" />
                </td>
                <td v-text="cli.nombre"></td>
                <td v-text="cli.apellido"></td>
                <td v-text="cli.documento"></td>
                <td v-text="cli.direccion"></td>
                <td v-text="cli.numero_cuenta"></td>
                <td v-text="cli.saldo"></td>
                <td v-text="new Date(cli.created_at).toLocaleDateString('en-US')"></td>

                <td>
                    <div class="btn-group btn-group-sm" role="group">
                        <router-link :to="{ path: 'viewC/' + cli.id }" class="btn btn-info mr-1">
                            <i class="fa-solid fa-eye"></i>
                        </router-link>
                        <router-link :to="{ path: 'editC/' + cli.id }" class="btn btn-warning mr-1">
                            <i class="fa-solid fa-edit"></i>
                        </router-link>
                        <button class="btn btn-danger" @click="($event) => eliminar(cli.id, cli.nombre)">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>

            </tr>
        </tbody>
    </table>

</div>
</template>

<script>
import axios from "axios";
import {   confirmar} from "../funciones";
export default {
    data() {
        return {
            clientes: null,
            cargando: false,
            busqueda: '', // Nuevo campo de búsqueda
        };
    },

    computed: {
        clientesFiltrados() {
            if (!this.clientes || !this.busqueda.trim()) {
                return this.clientes;
            }
            const term = this.busqueda.trim().toLowerCase();
            return this.clientes.filter(cli =>
                cli.nombre.toLowerCase().includes(term) ||
                cli.documento.toLowerCase().includes(term) ||
                cli.numero_cuenta.toString().toLowerCase().includes(term)
            );
        },
    },

    mounted() {
        this.getClientes();
    },
    methods: {
        getClientes() {
            this.cargando = true;
            axios.get("http://localhost/cuentabancaria/public/api/v1/clientes")
                .then((res) => {
                    this.clientes = res.data;
                    this.cargando = false;
                });
        },
        eliminar(id, nombre) {
            confirmar(
                "http://localhost/cuentabancaria/public/api/v1/clientes/",
                id,
                "Eliminar registro",
                "Desea elimnar a " + nombre + "?"
            );
            this.cargando = false;
        },
    },
};
</script>
