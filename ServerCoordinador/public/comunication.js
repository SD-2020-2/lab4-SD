getserverinfo();
var buttonsa = new Vue({
  el: "#buttons",
  methods: {
    actualizar: () => {
      createInstance();
    },
  },
});

function createInstance() {
  let options = {
    method: "POST",
  };
  fetch("/instance", options)
    .then((response) => response.text())
    .then((obj) => alert("Instancia creada"))
    .catch((error) => console.log(error));
}

function getserverinfo() {
  console.log("hola");
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
