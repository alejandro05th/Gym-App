// Espera a que toda la página (HTML y SVG) se haya cargado
document.addEventListener('DOMContentLoaded', () => {

    console.log('¡Página cargada con el script sencillo!');

    // 1. "Atrapar" los elementos del panel
    const panelTitulo = document.querySelector('#panel-informacion h2');
    const panelParrafo = document.querySelector('#panel-informacion p');

    // 2. "Atrapar" TODOS los músculos
    const todosLosMusculos = document.querySelectorAll('svg path');

    // 3. Recorremos CADA músculo (uno por uno)
    todosLosMusculos.forEach(musculo => {
        
        // 4. A CADA músculo le conectamos el "interruptor" de clic
        musculo.addEventListener('click', () => {

            // === ¡AQUÍ ESTÁ LA SIMPLIFICACIÓN! ===

            // 5. PRIMERO: le quitamos el azul a TODOS
            // Recorremos la lista de músculos y les quitamos la clase "seleccionado"
            todosLosMusculos.forEach(m => {
                m.classList.remove('seleccionado');
            });

            // 6. LUEGO: le ponemos el azul SÓLO a este
            // "musculo" es aquel en el que acabamos de hacer clic
            musculo.classList.add('seleccionado');
            
            // 7. ACTUALIZAR PANEL:
            // Coge la información de las etiquetas 'data-...'
            const titulo = musculo.dataset.titulo || "Músculo";
            const info = musculo.dataset.info || "No hay información.";

            // 8. Pone esa información dentro del panel
            panelTitulo.textContent = titulo;
            panelParrafo.textContent = info;
        });
    });

});