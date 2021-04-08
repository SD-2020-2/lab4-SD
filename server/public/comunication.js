var clock = new Vue({
  el: "#app",
  data: {
    hour: 0,
    minutes: 0,
    seconds: 0,
    ampm: " ",
    diaSemana: " ",
    dia: 0,
    mes: " ",
    year: 0,
  },
  created() {
    var self = this;
    setInterval(function () {
      self.actualizarTiempo();
    }, 1000);
  },
  methods: {
    actualizarTiempo() {
      var fecha = new Date(Date.now());
      this.hour = fecha.getHours();
      this.minutes = fecha.getMinutes();
      this.seconds = fecha.getSeconds();
      this.diaSemana = fecha.getDay();
      this.dia = fecha.getDate();
      this.mes = fecha.getMonth();
      this.year = fecha.getFullYear();

      if (this.hour >= 12) {
        this.hour = this.hour - 12;
        this.ampm = "PM";
      } else {
        this.ampm = "AM";
      }

      // Detectamos cuando sean las 0 AM y transformamos a 12 AM
      if (this.hour == 0) {
        this.hour = 12;
      }

      var semana = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
      ];
      this.diaSemana = semana[this.diaSemana];

      //  Obtenemos el Mes y año y lo mostramos
      var meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
      this.mes = meses[this.mes];
      if (this.minutes < 10) {
        this.minutes = "0" + this.minutes;
      }
      if (this.seconds < 10) {
        this.seconds = "0" + this.seconds;
      }
    },
  },
  computed: {
    getHora() {
      return this.hour + ":" + this.minutes;
    },
  },
});

var buttonsa = new Vue({
  el: "#buttons",
  methods: {
    actualizar: () => {
      cambiarHora();
    },
  },
});

function cambiarHora() {
  console.log("holiwi");
  fetch("/change")
    .then((response) => response.text())
    .catch((error) => console.log(error));
  alert("Informacion Actualizada");
}

// tabla
function getserverinfo() {
  fetch("/instance")
    .then((response) => response.json())
    .then((obj) => (servidores.serversList = obj))
    .catch((error) => console.log(error));
}

var servidores = new Vue({
  el: "#servidoresinfo",
  data() {
    return {
      serversList: [],
    };
  },
});
