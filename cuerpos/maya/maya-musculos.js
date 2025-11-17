document.addEventListener('DOMContentLoaded', () => {

    console.log("JS cargado para Maya");

    // 1. Seleccionar los músculos del SVG
    const musculos = document.querySelectorAll('.musculos-maya');

    // 2. Colores del músculo seleccionado
    const colorRelleno = "#ffffff";    // blanco
    const colorStroke = "#000000";     // borde negro

    // 3. Lista de músculos emparejados
    const parejas = {
        "pectoral_izq": ["pectoral_izq", "pectoral_der"],
        "pectoral_der": ["pectoral_izq", "pectoral_der"],

        "trapecio_izq": ["trapecio_izq", "trapecio_der"],
        "trapecio_der": ["trapecio_izq", "trapecio_der"],

        "hombro_izq": ["hombro_izq", "hombro_der"],
        "hombro_der": ["hombro_izq", "hombro_der"],

        "biceps_izq": ["biceps_izq", "biceps_der"],
        "biceps_der": ["biceps_izq", "biceps_der"],

        "antebrazo_izq": ["antebrazo_izq", "antebrazo_der"],
        "antebrazo_der": ["antebrazo_izq", "antebrazo_der"],

        "cuadriceps_izq": ["cuadriceps_izq", "cuadriceps_der"],
        "cuadriceps_der": ["cuadriceps_izq", "cuadriceps_der"],

        "gemelo_izq": ["gemelo_izq", "gemelo_der"],
        "gemelo_der": ["gemelo_izq", "gemelo_der"]
    };

    // 4. Resetear todos
    function resetColores() {
        musculos.forEach(m => {
            m.classList.remove("seleccionado");
            m.style.fill = "";
            m.style.stroke = "";
        });
    }

    // 5. Pintar un músculo específico
    function pintar(id) {
        const objetivo = document.getElementById(id);
        if (objetivo) {
            objetivo.style.fill = colorRelleno;
            objetivo.style.stroke = colorStroke;
            objetivo.classList.add("seleccionado");
        }
    }

    // 6. Interceptar clics en los <a> que contienen músculos
    document.querySelectorAll('a').forEach(a => {
        const path = a.querySelector('.musculos-maya');
        if (!path) return;

        a.addEventListener("click", (e) => {
            e.preventDefault(); // evita navegación instantánea

            const id = path.id;

            resetColores();

            // musculatura emparejada
            if (parejas[id]) {
                parejas[id].forEach(p => pintar(p));
            } else {
                pintar(id);
            }

            // abrir el enlace después de pintar
            setTimeout(() => {
                const url = a.getAttribute("href") || a.getAttribute("xlink:href");
                if (url) window.location.href = url;
            }, 200);
        });
    });

});
