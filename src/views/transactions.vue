<template>
<div class="container">
    <div class="row mt-3">
        <div class="col-md-12">
            <h2>Mis transacciones</h2>
            <div v-if="transactions.length === 0">
                <p>No hay transacciones recientes.</p>
            </div>
            <table class="table table-bordered table-hover" v-else>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Tipo</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="transaction in transactions" :key="transaction.id">
                        <td>{{ transaction.created_at | formatDate }}</td>
                        <td>
                            <span v-if="transaction.tipo_transaccion === 0">Retiro</span>
                            <span v-else>Consignación</span>
                        </td>
                        <td>{{ transaction.valor.toFixed(2) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import {
    formatDate
} from "../filters/formatDate";

export default {
    data() {
        return {
            transactions: [],
        };
    },
    mounted() {
        this.fetchTransactions();
    },
    methods: {
        async fetchTransactions() {
            try {
                const response = await axios.get("/api/v1/procesos");
                this.transactions = response.data.data;
            } catch (error) {
                console.error("Error al obtener transacciones:", error);
            }
        },
    },
    filters: {
        formatDate,
    },
};
</script>

<style scoped>
  </style>
