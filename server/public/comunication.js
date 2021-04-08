var buttonsa = new Vue({
	el: '#buttons',
	methods: {
		actualizar: () => {
			actualizarInfo();
		},
	},
});

function actualizarInfo() {
	console.log('holiwi');
	fetch('/change')
		.then((response) => response.text())
		.catch((error) => console.log(error));
	alert('Informacion Actualizada');
}
