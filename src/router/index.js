/**  Rutas para sección de administración **/

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ClienteNew from "../views/ClienteNew.vue";
import ClienteEdit from "../views/ClienteEdit.vue";
import ClienteView from "../views/ClienteView.vue";
import ClienteLogin from "../views/ClienteLogin.vue";
import AdminLogin from "../views/AdminLogin.vue";
import HomeCliente from "../views/HomeCliente.vue";

import ClienteConsigna from "../views/ClienteConsigna.vue";
import ClienteRetira from "../views/ClienteRetira.vue";

const routes = [
  {
    path: "/",
    name: "loginAdmin",
    component: AdminLogin,
  },

  {
    path: "/loginC",
    name: "loginC",
    component: ClienteLogin,
  },

  {
    path: "/home",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true, isAdmin: true },
  },

  {
    path: "/createC",
    name: "createC",
    component: ClienteNew,
    meta: { requiresAuth: true, isAdmin: true },
  },

  {
    path: "/editC/:id",
    name: "editC",
    component: ClienteEdit,
    meta: { requiresAuth: true, isAdmin: true },
  },

  {
    path: "/viewC/:id",
    name: "viewC",
    component: ClienteView,
    meta: { requiresAuth: true, isAdmin: true },
  },

  /*****  VISTAS PARA ACCESO DEL CLIENTE  *****/
  {
    path: "/homeCliente",
    name: "homeCliente",
    component: HomeCliente,
    meta: { requiresAuth: true, isClient: true },
  },

  {
    path: "/ConsignaC",
    name: "ConsignaC",
    component: ClienteConsigna,
    meta: { requiresAuth: true, isClient: true },
  },

  {
    path: "/RetiraC",
    name: "RetiraC",
    component: ClienteRetira,
    meta: { requiresAuth: true, isClient: true },
  },

  /*****  FIN VISTAS PARA ACCESO DEL CLIENTE  *****/
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Guardia de navegación
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin"); // Agregar el tipo de usuario al almacenamiento local

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      // Si no hay token, redirigir al inicio de sesión correspondiente
      if (to.meta.isAdmin && isAdmin !== "true") {
        next({ name: "loginAdmin" });
      } else if (to.meta.isClient && isAdmin !== "false") {
        next({ name: "loginC" });
      } else {
        next(); // Continuar con la navegación si es una ruta pública
      }
    } else {
      next(); // Continuar con la navegación si está autenticado
    }
  } else {
    next(); // Rutas públicas, no requieren autenticación
  }
});

export default router;
