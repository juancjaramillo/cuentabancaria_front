<template>
<div class="row">

    <table class="table table-bordered table-responsive table-hover">

        <colgroup>
            <col style="width: 5%;">
            <col style="width: 10%;">
            <col style="width: 20%;">
            <col style="width: 20%;">
            <col style="width: 20%;">
        </colgroup>

        <thead>
            <tr>
                <th colspan="5">
                    <h3>Bienvenido {{ nombreCuenta }} con Numero Cuenta: {{ numeroCuenta }} </h3>
                </th>
            </tr>
            <tr>
                <th colspan="5">
                    <hr>
                </th>

            </tr>
            <tr>
                <th colspan="5">
                    <h3>Saldo Total: ${{ saldoTotal }}</h3>
                </th>
            </tr>

            <tr>
                <th class="bg-dark text-white">#</th>
                <th class="bg-dark text-white">ID</th>
                <th class="bg-dark text-white">VALOR TRANSACCIÓN</th>
                <th class="bg-dark text-white">TIPO TRANSACCIÓN</th>
                <th class="bg-dark text-white">FECHA TRANSACCIÓN</th>

            </tr>

        </thead>

        <tbody class="table-group-divider" id="2conteido">

            <tr v-for="(proceso, index) in procesos" :key="index">
                <td v-text="index + 1"></td>
                <td v-text="proceso.id"></td>
                <td v-text="proceso.valor"></td>
                <td>
                    <!-- Mostrar "Retiro" si tipo_transaccion es 0, "Consignación" si es 1 -->
                    <template v-if="proceso.tipo_transaccion === 0">
                        Retiro
                    </template>
                    <template v-else-if="proceso.tipo_transaccion === 1">
                        Consignación
                    </template>
                    <template v-else>
                        Otro
                    </template>
                </td>
                <td v-text="new Date(proceso.created_at).toLocaleDateString('en-US')"></td>

            </tr>
        </tbody>
    </table>

</div>
</template>

<script>
import axios from "axios";
import {
    confirmar
} from "../funciones";
export default {
    data() {
        return {
            procesos: [],
            saldoTotal: 0,
            nombreCuenta: '',
            numeroCuenta: '',
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
                cli.valor.toString().includes(term) ||
                cli.documento.toLowerCase().includes(term) ||
                cli.numero_cuenta.toString().toLowerCase().includes(term)
            );
        },
    },

    mounted() {
        this.actualizarDatos();
        this.saldoTotal = JSON.parse(localStorage.getItem("cliente")).saldo;
        this.nombreCuenta = JSON.parse(localStorage.getItem("cliente")).nombre;
        this.numeroCuenta = JSON.parse(localStorage.getItem("cliente")).numero_cuenta;
       // this.procesos = JSON.parse(localStorage.getItem("procesos"));

        
    },

    methods: {
        async actualizarDatos() {
    const clienteId = JSON.parse(localStorage.getItem('cliente')).id;
    console.log(clienteId);
    axios.get(`http://localhost/cuentabancaria/public/api/clientes/cargar/${clienteId}`)
        .then((res) => {
            this.procesos = res.data.procesos;
            this.saldoTotal = res.data.saldoTotal;
            this.nombreCuenta = res.data.cliente.nombre;
            this.numeroCuenta = res.data.cliente.numero_cuenta;
            this.cargando = false;
        })
        .catch((error) => {
            console.error("Error al actualizar datos:", error);
            this.cargando = false;
        });
},


    },
};
</script>
