document.addEventListener('DOMContentLoaded', () => {

    console.log('¡Página cargada con el script sencillo!');

    // --- 0. Mostrar SVG del coach seleccionado ---
    const selectedCoach = localStorage.getItem("selectedCoach");

    // Ocultar todos los SVGs de coaches por defecto
    const coachSVGs = document.querySelectorAll('.coach-svg');
    coachSVGs.forEach(svg => svg.style.display = 'none');

    let currentSVG = null;
    if (selectedCoach) {
        currentSVG = document.getElementById('svg-' + selectedCoach.toLowerCase());
        if (currentSVG) currentSVG.style.display = 'block';
    }

    if (!currentSVG) return; // Si no hay SVG, no hacemos nada más

    // --- 1. "Atrapar" los elementos del panel ---
    const panelTitulo = document.querySelector('#panel-informacion h2');
    const panelParrafo = document.querySelector('#panel-informacion p');

    // --- 2. "Atrapar" SOLO los músculos del SVG visible ---
    const todosLosMusculos = currentSVG.querySelectorAll('path');

    // --- 3. Recorremos CADA músculo ---
    todosLosMusculos.forEach(musculo => {
        musculo.addEventListener('click', () => {

            // Quitar azul de todos
            todosLosMusculos.forEach(m => m.classList.remove('seleccionado'));

            // Poner azul solo a este
            musculo.classList.add('seleccionado');

            // Actualizar panel
            const titulo = musculo.dataset.titulo || "Músculo";
            const info = musculo.dataset.info || "No hay información.";
            panelTitulo.textContent = titulo;
            panelParrafo.textContent = info;
        });
    });

});
