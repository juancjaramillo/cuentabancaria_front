import Swal from "sweetalert2";
import axios from "axios";

export function mostrarAlerta(titulo, icono, foco = "") {
  if (foco != "") {
    document.getElementById(foco).focus();
  }

  Swal.fire({
    title: titulo,
    icon: icono,
    customClass: { confirmButton: "btn btn-primary", popup: "animated zoonIn" },
    buttonsStyling: false,
  });
}

export function confirmar(urlConSlash, id, titulo, mensaje) {
  var url = urlConSlash + id;
  const swalWithBootstrapButton = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success me-3",
      cancelButton: "btn btn-danger",
    },
  });

  swalWithBootstrapButton
    .fire({
      title: titulo,
      text: mensaje,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: '<i class="fa-solid fa-check"></i> Si, Eliminar',
      cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar',
    })
    .then((res) => {
      if (res.isConfirmed) {
        enviarSolicitud("DELETE", { id: id }, url, "Eliminado con éxito");
      } else {
        mostrarAlerta("Operacion cancelada", "info");
      }
    });
}

export function enviarSolicitud(metodo, parametros, url, mensaje) {
  axios({ method: metodo, url: url, data: parametros })
    .then(function (res) {
      var estado = res.status;
      if (estado == 200) {
        mostrarAlerta(mensaje, "success");
        window.setTimeout(function () {
          window.location.href = "/home";
        }, 1000);
      } else {
        mostrarAlerta("No se recupera la respuesta", "error");
      }
    })
    .catch(function (error) {
      if (error.response) {
        if (error.response.status === 400) {
          mostrarAlerta("Documento, cuenta y/o correo ya existen", "info");
        } else {
          mostrarAlerta("Documento, cuenta y/o correo ya existen", "info");
        }
      } else if (error.request) {
        mostrarAlerta("No se pudo comunicar con el servidor", "error");
      } else {
        mostrarAlerta("Error desconocido", "error");
      }
    });
}

