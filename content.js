
function interceptEd2kLinks() {
    const anchors = document.querySelectorAll('a[href^="ed2k://"]');
  
    anchors.forEach((anchor) => {
      if (!anchor.dataset.ed2kIntercepted) {
        anchor.dataset.ed2kIntercepted = "true"; // Marca como procesado para evitar duplicados
  
        anchor.addEventListener("click", (event) => {
          event.preventDefault(); // Evita que se abra el enlace
  
          const ed2kLink = anchor.href;
          console.log("Enlace ED2K capturado:", ed2kLink);
  
          // Envía el enlace al background para procesarlo
          chrome.runtime.sendMessage({ ed2kLink }, (response) => {
            console.log("Respuesta del background:", response);
          });

        });
      }
    });
  }

// Patrón para identificar enlaces ed2k
const ed2kPattern = /ed2k:\/\/\|file\|[^\s|]+\|\d+\|[A-F0-9]+\|/g;

// Función para crear el panel HTML flotante
function createPanel(links) {
    // Verifica si ya existe un panel para no duplicarlo
    if (document.getElementById("ed2kPanel")) return;
  
    // Crear el contenedor del panel
    const panel = document.createElement("div");
    panel.id = "ed2kPanel";
    panel.style.position = "fixed";
    panel.style.top = "10px";
    panel.style.right = "10px";
    panel.style.width = "300px";
    panel.style.maxHeight = "400px";
    panel.style.overflowY = "auto";
    panel.style.backgroundColor = "white";
    panel.style.border = "2px solid #ccc";
    panel.style.borderRadius = "8px";
    panel.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    panel.style.zIndex = "9999";
    panel.style.padding = "10px";
  
    // Título del panel
    const title = document.createElement("h3");
    title.innerText = "Enlaces ED2K";
    title.style.marginTop = "0";
    panel.appendChild(title);
  
    // Lista de enlaces clicables
    const list = document.createElement("ul");
    links.forEach((link) => {
      const listItem = document.createElement("li");
      const anchor = document.createElement("a");
      anchor.href = link;
      anchor.textContent = link;
      //anchor.target = "_blank"; // Abre en nueva pestaña
      anchor.style.color = "blue";
      listItem.appendChild(anchor);
      list.appendChild(listItem);
    });
    panel.appendChild(list);
  
    // Botón de cerrar
    const closeButton = document.createElement("button");
    closeButton.innerText = "Cerrar";
    closeButton.style.display = "block";
    closeButton.style.marginTop = "10px";
    closeButton.style.backgroundColor = "#f44336";
    closeButton.style.color = "white";
    closeButton.style.border = "none";
    closeButton.style.padding = "5px 10px";
    closeButton.style.borderRadius = "5px";
    closeButton.style.cursor = "pointer";
  
    closeButton.addEventListener("click", () => {
      panel.remove(); // Elimina el panel
    });
  
    panel.appendChild(closeButton);
  
    // Agregar el panel al body
    document.body.appendChild(panel);
  }
  
  // Función para capturar y procesar los enlaces del textarea
  function processTextarea(textarea) {
    // Escuchar cambios en el contenido del textarea
    //textarea.addEventListener("input", () => {
      const content = textarea.value;
      const links = content.split("\n").filter((line) => line.startsWith("ed2k://"));
      if (links.length > 0) {
        createPanel(links);
      }

      interceptEd2kLinks();

    //});
  }
  
  // Observador para esperar a que el textarea aparezca
  const observer = new MutationObserver(() => {
    const textarea = document.getElementById("ELINKSLIST");
    if (textarea) {
      console.log("Textarea encontrado. Iniciando observación...");
      processTextarea(textarea);
      observer.disconnect(); // Detener la observación una vez encontrado
    }
  });
  
  // Configuración del MutationObserver
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
  