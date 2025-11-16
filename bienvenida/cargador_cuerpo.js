// Esto se ejecuta en cuanto la página 'cuerpo.html' termina de cargar
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Leemos los datos que 'index.html' guardó
    const coach = localStorage.getItem("selectedCoach");
    const bodyType = localStorage.getItem("selectedBodyType");

    // Si no hay datos, volvemos a la página de selección
    if (!coach || !bodyType) {
        // CORREGIDO: ../ para subir a la carpeta raíz
        window.location.href = "../index.html"; 
        return;
    }

    // 2. Actualizamos el título de la página
    document.getElementById("titulo-coach").innerText = `Entrenando con ${coach}`;

    // 3. Definimos qué archivos cargar
    let baseFile = '';
    let skinFile = '';

    if (bodyType === 'hombre') {
        // CORREGIDO: Ruta y nombre de tu archivo base
        baseFile = '../cuerpo_svg.svg'; 
        
        if (coach === 'Marco') {
            // CORREGIDO: Ruta
            skinFile = '../skin_marco.svg'; // (Asegúrate de que 'skin_marco.svg' existe en la raíz)
        } else if (coach === 'Hugo') {
            // CORREGIDO: Ruta y nombre de tu archivo skin
            skinFile = '../hugocuerpo.svg'; 
        }
    } else if (bodyType === 'mujer') {
        // CORREGIDO: Ruta (Asegúrate de tener este archivo en la raíz)
        baseFile = '../cuerpo_base_mujer.svg'; 
        
        if (coach === 'Mayá') {
            // CORREGIDO: Ruta
            skinFile = '../skin_maya.svg'; 
        } else if (coach === 'Aura') {
            // CORREGIDO: Ruta
            skinFile = '../skin_aura.svg'; // (Debes crear este archivo)
        }
        // ...etc. para las otras coaches
    }

    // 4. Si tenemos los archivos, iniciamos la carga
    if (baseFile && skinFile) {
        cargarBaseYSkin(baseFile, skinFile);
    } else {
        // Añadí una pequeña ayuda para depurar si falta un archivo
        console.error("No se pudo determinar baseFile o skinFile. Revisar lógica.", "Coach:", coach, "BodyType:", bodyType);
        document.getElementById("contenedor-svg").innerHTML = "Error al cargar datos del entrenador.";
    }
});

/**
 * Función que carga el SVG base (el cuerpo) y LUEGO carga el skin (la cara)
 */
async function cargarBaseYSkin(baseFile, skinFile) {
    try {
        // --- Carga el Cuerpo Base ---
        const responseBase = await fetch(baseFile);
        if (!responseBase.ok) throw new Error(`No se encontró ${baseFile}. Revisa la ruta y el nombre.`);
        const svgText = await responseBase.text();
        
        const contenedor = document.getElementById("contenedor-svg");
        contenedor.innerHTML = svgText;

        // ¡Éxito! El cuerpo base está en la página.
        // Ahora, podemos cargar el skin.
        await cargarSkin(skinFile);

        // EXTRA: Hacemos que los músculos sean clicables
        añadirClicsMusculos();

    } catch (error) {
        console.error("Error cargando el SVG base:", error);
        document.getElementById("contenedor-svg").innerHTML = `Error al cargar el personaje: ${error.message}`;
    }
}

/**
 * Función que carga un archivo de SKIN y lo "pega"
 * dentro del SVG base que ya está cargado.
 */
async function cargarSkin(urlDelSkin) {
    try {
        const respuesta = await fetch(urlDelSkin);
        if (!respuesta.ok) throw new Error(`No se encontró el skin ${urlDelSkin}. Revisa la ruta y el nombre.`);
        const textoSVG = await respuesta.text();

        const parser = new DOMParser();
        const docSkin = parser.parseFromString(textoSVG, "image/svg+xml");
        const elementosSkin = docSkin.documentElement.children;

        // Busca el "hueco" en tu SVG base
        const contenedorSkin = document.getElementById("contenedor-skin");
        
        if (!contenedorSkin) {
            throw new Error('No se encontró el <g id="contenedor-skin"> en tu SVG base. Revísalo en Inkscape.');
        }

        contenedorSkin.innerHTML = ""; // Limpia el skin anterior
        for (let elemento of Array.from(elementosSkin)) {
            contenedorSkin.appendChild(elemento.cloneNode(true));
        }
    } catch (error) {
        console.error("Error al cargar el skin:", error);
    }
}

/**
 * Función que busca todos los músculos clicables y les añade un 'listener'
 */
function añadirClicsMusculos() {
    // (Asegúrate de que tus IDs en Inkscape sean "musculo_pectoral", "musculo_biceps", etc.)
    const musculos = document.querySelectorAll('svg [id^="musculo_"]');

    musculos.forEach(musculo => {
        musculo.classList.add('musculo-clicable'); // Añade la clase CSS para el efecto :hover
        
        musculo.addEventListener('click', () => {
            const nombreMusculo = musculo.id.replace('musculo_', ''); // 'pectoral'
            
            // CORREGIDO: Ruta a tu carpeta de músculos (que está en la raíz)
            window.location.href = `../musculos/${nombreMusculo}.html`;
        });
    });

    // AÑADIDO: Un buscador para los músculos que NO tienen el prefijo "musculo_"
    // (Basado en tu estructura de archivos, por si acaso)
    const otrosMusculos = document.querySelectorAll('svg [id="abdominales"], svg [id="pectoral"], svg [id="biceps"], svg [id="cuadriceps"], svg [id="gemelos"], svg [id="hombros"], svg [id="oblicuos"], svg [id="trapecios"]');
    
    otrosMusculos.forEach(musculo => {
        musculo.classList.add('musculo-clicable');
        
        musculo.addEventListener('click', () => {
            const nombreMusculo = musculo.id; // ej: 'abdominales'
            // CORREGIDO: Ruta a tu carpeta de músculos
            window.location.href = `../musculos/${nombreMusculo}.html`;
        });
    });
}