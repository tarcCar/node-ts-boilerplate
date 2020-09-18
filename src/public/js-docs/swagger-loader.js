window.onload = function () {
  // Begin Swagger UI call region
  const ui = SwaggerUIBundle({
    url: "http://localhost:3001/swagger.json",
    dom_id: "#swagger-ui",
    deepLinking: true,
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
    plugins: [SwaggerUIBundle.plugins.DownloadUrl],
    layout: "StandaloneLayout",
  });
  // End Swagger UI call region

  window.ui = ui;
};
