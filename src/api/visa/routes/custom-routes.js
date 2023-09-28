module.exports = {
    routes: [
      {
        method: "GET",
        path: "/visas/generateqrcode/:id",
        handler: "visa.generateQR"
      }
    ]
  }