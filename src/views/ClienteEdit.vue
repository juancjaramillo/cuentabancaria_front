<template>
<div class="row mt-3">
    <div class="col-md-6 offset-md-3">
        <div class="card">
            <div class="card-header bg-dark text-white text-center">
                Editar Cliente
            </div>
            <div class="card-body">
                <div class="d-grid col-6 mx-auto mb-3">

                    <router-link :to="{ path: '/home' }" class="btn btn-info">
                        <i class="fa-solid fa-arrow-left"></i> Regresar a la lista
                    </router-link>
                </div>
                <form v-on:submit="actualizar">
                    <div class="d-grid col-6 mx-auto mb-3">
                        <img v-if="this.foto" height="100" :src="this.foto" id="fotoimg" class="img-thumbnail" alt="">
                        <img v-else height="100" src="https://cdn2.iconfinder.com/data/icons/user-23/512/User_Customers.png" id="fotoimg" alt="" />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                        <input type="text" v-model="nombre" id="nombre" placeholder="Ingrese su nombre" required maxlength="50" class="form-control">
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                        <input type="text" v-model="apellido" id="apellido" placeholder="Ingrese su apellido" required maxlength="50" class="form-control">
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="fa-solid fa-file"></i></span>
                        <label v-text="documento" class="form-control"></label>
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="fa-solid fa-list"></i></span>
                        <label v-text="numero_cuenta" class="form-control"></label>
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="fa-solid fa-check"></i></span>
                        <input type="text" v-model="direccion" id="direccion" placeholder="Ingrese una dirección" maxlength="50" class="form-control">
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="fa-solid fa-envelope"></i></span>
                        <label v-text="email" class="form-control"></label>
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="fa-solid fa-dollar-sign"></i></span>
                        <label v-text="saldo" class="form-control"></label>
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="fa-solid fa-gift"></i></span>
                        <input v-on:change="previsualizarFoto" type="file" accept="image/png, image/jpeg, image/gif" required class="form-control">
                    </div>

                    <div class="d-grid col-6 mx-auto mb-3">

                        <button class="btn btn-warning"><i class="fa-solid fa-refresh"></i> Guardar Cambios</button>
                    </div>

                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mostrarAlerta,
    enviarSolicitud
} from "../funciones";
import {
    useRoute
} from 'vue-router';
import axios from 'axios';

export default {
    data() {
        return {
            id: 0,
            nombre: '',
            apellido: '',
            nombre: '',
            documento: '',
            numero_cuenta: '',
            foto: '',
            direccion: '',
            url: 'http://localhost/cuentabancaria/public/api/v1/clientes',
            saldo: '',
            cargando: false,
        };
    },
    mounted() {
        const route = useRoute();
        this.id = route.params.id;
        this.url += '/' + this.id;
        this.getCliente();
    },
    methods: {
        getCliente() {
            axios.get(this.url).then(
                res => {

                    this.nombre = res.data.data.nombre;
                    this.apellido = res.data.data.apellido;
                    this.foto = res.data.data.foto;
                    this.saldo = res.data.data.saldo;
                    this.email = res.data.data.email;
                    this.documento = res.data.data.documento;
                    this.numero_cuenta = res.data.data.numero_cuenta;
                    this.direccion = res.data.data.direccion;

                }
            );

        },
        actualizar() {
            event.preventDefault();
            var miFoto = document.getElementById('fotoimg');
            this.foto = miFoto.src;

            if (this.nombre.trim() === '') {
                mostrarAlerta('Ingrese un nombre', 'warning', 'nombre');
            } else if (this.apellido.trim() === '') {
                mostrarAlerta('Ingrese un apellido', 'warning', 'apellido');
            } else {
                var parametros = {
                    nombre: this.nombre.trim(),
                    apellido: this.apellido.trim(),
                    documento: this.documento.trim(),
                    numero_cuenta: this.numero_cuenta.trim(),
                    foto: this.foto.trim(),
                    direccion: this.direccion.trim(),
                    saldo: this.saldo.trim()
                }
                enviarSolicitud('PUT', parametros, this.url, 'Cliente actualizado!!')
            }

        },
        previsualizarFoto(event) {
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = function () {
                var miFoto = document.getElementById('fotoimg');
                miFoto.src = reader.result;
                this.foto = miFoto.src;
            }
        }
    }
};
</script>
