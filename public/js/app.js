if ("serviceWorker" in navigator){
    navigator.serviceWorker.register("/serviceworker.js")
    .then(function(registration){
      console.log("Service WOrker register with scope:", registration.scope);
    }).catch(function(err){
      console.log("Service worker registration failed:", err);
    });
  }
  console.log("app.js")