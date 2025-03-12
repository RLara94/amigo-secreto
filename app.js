document.addEventListener("DOMContentLoaded", () => {
    let participantes = [];

    // Capturar elementos del DOM
    const inputNombre = document.getElementById("nombre");
    const lista = document.getElementById("lista");
    const resultados = document.getElementById("resultados");
    const btnAgregar = document.getElementById("btnAgregar");
    const btnSortear = document.getElementById("btnSortear");

    // Función para agregar nombres a la lista
    function agregarParticipante() {
        let nombre = inputNombre.value.trim();
        if (!nombre) {
            mostrarMensaje("El nombre no puede estar vacío", "error");
            return;
        }
        if (participantes.includes(nombre)) {
            mostrarMensaje("Este nombre ya ha sido agregado", "error");
            return;
        }
        
        participantes.push(nombre);
        actualizarLista();
        inputNombre.value = "";
        mostrarMensaje("Participante agregado correctamente", "success");
    }

    // Función para actualizar la lista en la interfaz
    function actualizarLista() {
        lista.innerHTML = "";
        participantes.forEach(nombre => {
            let li = document.createElement("li");
            li.textContent = nombre;
            lista.appendChild(li);
        });
    }

    // Función para realizar el sorteo del Amigo Secreto
    function sortear() {
        if (participantes.length < 2) {
            mostrarMensaje("Se necesitan al menos 2 participantes para el sorteo", "error");
            return;
        }

        let asignaciones = {};
        let disponibles = [...participantes];

        participantes.forEach(participante => {
            let posibles = disponibles.filter(p => p !== participante);
            if (posibles.length === 0) {
                mostrarMensaje("No se puede realizar el sorteo correctamente. Inténtalo de nuevo.", "error");
                return;
            }
            let elegido = posibles[Math.floor(Math.random() * posibles.length)];
            asignaciones[participante] = elegido;
            disponibles = disponibles.filter(p => p !== elegido);
        });

        mostrarResultados(asignaciones);
        mostrarMensaje("Sorteo realizado con éxito", "success");
    }

    // Función para mostrar los resultados
    function mostrarResultados(asignaciones) {
        resultados.innerHTML = "";
        for (let participante in asignaciones) {
            let p = document.createElement("p");
            p.textContent = `${participante} -> ${asignaciones[participante]}`;
            p.classList.add("resultado-item");
            resultados.appendChild(p);
        }
    }

    // Función para mostrar mensajes de éxito o error
    function mostrarMensaje(mensaje, tipo) {
        const mensajeDiv = document.createElement("div");
        mensajeDiv.textContent = mensaje;
        mensajeDiv.classList.add("mensaje", tipo);
        document.body.appendChild(mensajeDiv);
        setTimeout(() => mensajeDiv.remove(), 3000);
    }

    // Asignar eventos a los botones
    btnAgregar.addEventListener("click", agregarParticipante);
    btnSortear.addEventListener("click", sortear);
});
