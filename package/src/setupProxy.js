const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://dashboard-ecommerce-camping.onrender.com", // Thay thế bằng URL của server API thực tế
      changeOrigin: true,
    })
  );
};
