<template>
<div class="row mt-3">
    <div class="col-md-6 offset-md-3">
        <div class="card">
            <div class="card-header bg-dark text-white text-center">
                Registrar Consignación
            </div>
            <div class="card-body">
                <form @submit.prevent="guardar">
                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="fa-solid fa-dollar-sign"></i></span>
                        <input type="number" v-model.number="valor" placeholder="Ingrese un valor" required class="form-control" id="valor">

                    </div>

                    <div class="d-grid col-6 mx-auto mb-3">
                        <button class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i> Consignar</button>
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
} from "../funcionescliente";

export default {
    data() {
        return {
            valor: '',
            url: 'http://localhost/cuentabancaria/public/api/clientes/consignacion',
            cargando: false,
        };
    },

    methods: {
        async guardar() {
            if (!this.valor || this.valor <= 0) {
                mostrarAlerta('Ingrese un valor válido', 'warning', 'valor');
            } else {
                const clienteId = JSON.parse(localStorage.getItem('cliente')).id;

                var parametros = {
                    valor: Number(this.valor),
                    cliente_id: clienteId
                }
                enviarSolicitud('POST', parametros, this.url, 'Proceso registrado!!')
            }
        },
    }
};
</script>
