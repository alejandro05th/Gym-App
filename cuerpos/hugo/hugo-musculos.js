document.addEventListener('DOMContentLoaded', () => {
  const introOverlay = document.getElementById('intro-overlay');
  const introVideo = document.getElementById('intro-video');
  const mainContent = document.getElementById('main-content');

  if (introOverlay && introVideo && mainContent) {
    // Cuando el video termine
    introVideo.addEventListener('ended', () => {
      introOverlay.style.display = 'none';
      mainContent.style.display = 'block';
    });

    // Click para saltar video
    introOverlay.addEventListener('click', () => {
      introVideo.pause();
      introOverlay.style.display = 'none';
      mainContent.style.display = 'block';
    });

    // Seguridad: si el evento 'ended' no se dispara
    setTimeout(() => {
      if (introOverlay.style.display !== 'none') {
        introOverlay.style.display = 'none';
        mainContent.style.display = 'block';
      }
    }, 10000);
  }

  // Código de selección de músculos
  const musculos = document.querySelectorAll('.musculos-hugo');
  const colorRelleno = "#ffffff";
  const colorStroke = "#000000";
  const parejas = {
    "pectoral_izq": ["pectoral_izq","pectoral_der"],
    "pectoral_der": ["pectoral_izq","pectoral_der"],
    "trapecio_izq": ["trapecio_izq","trapecio_der"],
    "trapecio_der": ["trapecio_izq","trapecio_der"],
    "hombro_izq": ["hombro_izq","hombro_der"],
    "hombro_der": ["hombro_izq","hombro_der"],
    "biceps_izq": ["biceps_izq","biceps_der"],
    "biceps_der": ["biceps_izq","biceps_der"],
    "antebrazo_izq": ["antebrazo_izq","antebrazo_der"],
    "antebrazo_der": ["antebrazo_izq","antebrazo_der"],
    "cuadriceps_izq": ["cuadriceps_izq","cuadriceps_der"],
    "cuadriceps_der": ["cuadriceps_izq","cuadriceps_der"],
    "gemelo_izq": ["gemelo_izq","gemelo_der"],
    "gemelo_der": ["gemelo_izq","gemelo_der"]
  };

  function resetColores() {
    musculos.forEach(m => {
      m.classList.remove("seleccionado");
      m.style.fill = "";
      m.style.stroke = "";
    });
  }

  function pintar(id) {
    const objetivo = document.getElementById(id);
    if (objetivo) {
      objetivo.style.fill = colorRelleno;
      objetivo.style.stroke = colorStroke;
      objetivo.classList.add("seleccionado");
    }
  }

});
