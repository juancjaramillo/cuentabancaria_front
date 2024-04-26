<template>
<div class="row mt-3">
    <div class="col-md-6 offset-md-3">
        <div class="card">
            <div class="card-header bg-dark text-white text-center">
                Registar Cliente
            </div>
            <div class="card-body">

                <div class="d-grid col-6 mx-auto mb-3">

                    <router-link :to="{path:'/home'}" class="btn btn-info">
                        <i class="fa-solid fa-arrow-left"></i> Regresar a la lista
                    </router-link>
                </div>
                <form v-on:submit="guardar">
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
                        <input type="text" v-model="documento" id="documento" placeholder="Ingrese su documento" required maxlength="50" class="form-control">
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="fa-solid fa-list"></i></span>
                        <input type="text" v-model="numero_cuenta" id="numero_cuenta" placeholder="Ingrese un número de cuenta" required maxlength="50" class="form-control">
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="fa-solid fa-check"></i></span>
                        <input type="text" v-model="direccion" id="direccion" placeholder="Ingrese una dirección" maxlength="50" class="form-control">
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="fa-solid fa-envelope"></i></span>
                        <input type="email" v-model="email" id="email" placeholder="Ingrese un email" required maxlength="100" class="form-control">
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="fa-solid fa-eye"></i></span>
                        <input type="password" v-model="password" id="password" placeholder="Ingrese un password" required maxlength="50" class="form-control">
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="fa-solid fa-dollar-sign"></i></span>
                        <input type="text" v-model="saldo" id="saldo" placeholder="Ingrese un saldo inicial" required maxlength="50" class="form-control" :class="{ 'is-invalid': !saldoValido }">
                        <div v-if="!saldoValido" class="invalid-feedback">
                            El saldo debe ser un valor numérico válido en pesos.
                        </div>
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="fa-solid fa-gift"></i></span>
                        <input v-on:change="previsualizarFoto" type="file" accept="image/png, image/jpeg, image/gif" required class="form-control">
                    </div>

                    <div class="d-grid col-6 mx-auto mb-3">
                        <button class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i> Registrar</button>
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
//import bcrypt from 'bcryptjs';
export default {
    data() {
        return {
            nombre: '',
            apellido: '',
            documento: '',
            numero_cuenta: '',
            foto: '',
            direccion: '',
            email: '',
            password: '',
            url: 'http://localhost/cuentabancaria/public/api/v1/clientes',
            saldo: '',
            saldoValido: true,
            cargando: false,
        };
    },

    watch: {
        saldo(newSaldo) {
            // Expresión regular para validar el formato numérico de pesos
            const regex = /^[1-9]\d*(?:\.\d{1,2})?$/;

            // Validar el nuevo valor de saldo con la expresión regular
            this.saldoValido = regex.test(newSaldo);
        },
    },

    methods: {
        guardar() {
            event.preventDefault();

            console.log('Datos a enviar:', {
                nombre: this.nombre.trim(),
                apellido: this.apellido.trim(),
                // Agrega más campos aquí según sea necesario
            });
            var miFoto = document.getElementById('fotoimg');
            this.foto = miFoto.src;

            if (this.nombre.trim() === '') {
                mostrarAlerta('Ingrese un nombre', 'warning', 'nombre');
            } else if (this.apellido.trim() === '') {
                mostrarAlerta('Ingrese un apellido', 'warning', 'apellido');
            } else if (this.email.trim() === '') { // Agregar validación para el email
                mostrarAlerta('Ingrese un email', 'warning', 'email');
            } else {
                //   const hashedPassword = await bcrypt.hash(this.password.trim(), 10);

                var parametros = {
                    nombre: this.nombre.trim(),
                    apellido: this.apellido.trim(),
                    documento: this.documento.trim(),
                    numero_cuenta: this.numero_cuenta.trim(),
                    foto: this.foto.trim(),
                    direccion: this.direccion.trim(),
                    email: this.email.trim(),
                    password: this.password.trim(),
                    saldo: this.saldo.trim()
                }

                enviarSolicitud('POST', parametros, this.url, 'Cliente registrado!!')
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
