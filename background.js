chrome.runtime.onInstalled.addListener(() => {
    console.log("Intentando registrar el protocolo ed2k...");
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.ed2kLink) {
      handleEd2kLink(message.ed2kLink);
    }
  });
  
  // Función personalizada para manejar enlaces ed2k
  function handleEd2kLink(url) {
    // Aquí decides qué hacer con el enlace:
    // Por ejemplo, mostrar una notificación, abrir un popup, o enviarlo a otro cliente
    console.log("Procesando enlace Background ed2k:", url);
  
    //chrome.notifications.create({
    //  type: "basic",
    //  title: "Enlace ed2k capturado",
    //  message: `El enlace capturado es: ${url}`
    //});
  
    // También puedes guardarlo en `chrome.storage` o enviarlo a una pestaña activa
    //chrome.storage.local.set({ lastEd2kLink: url });

    chrome.tabs.create({ url: "http://localhost:4711/default/footer.php?Submit=Download%20link&selectcat=Todo&ed2klink=" + encodeURIComponent(url) });

  }

  
  
