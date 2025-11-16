document.addEventListener('DOMContentLoaded', () => {

    console.log('¡Página cargada con el script sencillo!');

    // --- 0. Mostrar SVG del coach seleccionado ---
    const selectedCoach = localStorage.getItem("selectedCoach");

    const coachSVGs = document.querySelectorAll('.coach-svg');
    coachSVGs.forEach(svg => svg.style.display = 'none');

    let currentSVG = null;
    if (selectedCoach) {
        currentSVG = document.getElementById('svg-' + selectedCoach.toLowerCase());
        if (currentSVG) currentSVG.style.display = 'block';
    }

    if (!currentSVG) return;

    // --- 1. Panel de información ---
    const panelTitulo = document.querySelector('#panel-informacion h2');
    const panelParrafo = document.querySelector('#panel-informacion p');

    // --- 2. SOLO los músculos del SVG actual ---
    const todosLosMusculos = currentSVG.querySelectorAll('path');

    // --- 3. Función para pintar músculos pareja ---
    function pintarPareja(ids) {
        ids.forEach(id => {
            const musculo = currentSVG.querySelector(`#${id}`);
            if (musculo) {
                musculo.style.fill = "#1e90ff";
                musculo.style.stroke = "#003f87";
            }
        });
    }

    // --- 4. Click en cada músculo ---
    todosLosMusculos.forEach(musculo => {
        musculo.addEventListener('click', () => {

            // 🟦 Reset de color para TODOS los músculos
            todosLosMusculos.forEach(m => {
                m.style.fill = "";
                m.style.stroke = "";
            });

            // --- Lista de parejas de músculos ---
            const parejas = {
                'pectoral_izq': ['pectoral_izq', 'pectoral_der'],
                'pectoral_der': ['pectoral_izq', 'pectoral_der'],

                'trapecio_izq': ['trapecio_izq', 'trapecio_der'],
                'trapecio_der': ['trapecio_izq', 'trapecio_der'],

                'hombro_izq': ['hombro_izq', 'hombro_der'],
                'hombro_der': ['hombro_izq', 'hombro_der'],

                'biceps_izq': ['biceps_izq', 'biceps_der'],
                'biceps_der': ['biceps_izq', 'biceps_der']
            };

            if (parejas[musculo.id]) {
                // Pinta ambos músculos de la pareja
                pintarPareja(parejas[musculo.id]);
            } else {
                // Pinta solo el músculo seleccionado
                musculo.style.fill = "#1e90ff";
                musculo.style.stroke = "#003f87";
            }

            // --- 5. Actualizar panel info ---
            const titulo = musculo.dataset.titulo || "Músculo";
            const info = musculo.dataset.info || "No hay información.";
            panelTitulo.textContent = titulo;
            panelParrafo.textContent = info;
        });
    });
});

