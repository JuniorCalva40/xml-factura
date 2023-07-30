document
  .getElementById("file-input")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const xmlContent = event.target.result;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent, "text/xml");

      // Extraer los datos del archivo XML y almacenarlos en un objeto
      const invoiceData = {
        razonSocial: xmlDoc.querySelector("razonSocial").textContent,
        ruc: xmlDoc.querySelector("ruc").textContent,
        dirMatriz: xmlDoc.querySelector("dirMatriz").textContent,
        fechaEmision: xmlDoc.querySelector("fechaEmision").textContent,
        razonSocialComprador: xmlDoc.querySelector("razonSocialComprador")
          .textContent,
        identificacionComprador: xmlDoc.querySelector("identificacionComprador")
          .textContent,
        totalSinImpuestos:
          xmlDoc.querySelector("totalSinImpuestos").textContent,
        totalConImpuestos: xmlDoc.querySelector("totalImpuesto valor")
          .textContent,
        importeTotal: xmlDoc.querySelector("importeTotal").textContent,
        detalles: [],
      };

      const detalles = xmlDoc.querySelectorAll("detalles detalle");
      detalles.forEach((detalle) => {
        const codigoPrincipal =
          detalle.querySelector("codigoPrincipal").textContent;
        const descripcion = detalle.querySelector("descripcion").textContent;
        const cantidad = detalle.querySelector("cantidad").textContent;
        const precioUnitario =
          detalle.querySelector("precioUnitario").textContent;
        const precioTotalSinImpuesto = detalle.querySelector(
          "precioTotalSinImpuesto"
        ).textContent;
        const impuestoValor =
          detalle.querySelector("impuesto valor").textContent;

        invoiceData.detalles.push({
          codigoPrincipal,
          descripcion,
          cantidad,
          precioUnitario,
          precioTotalSinImpuesto,
          impuestoValor,
        });
      });

      // Llamar a la función para generar la factura con los datos extraídos
      generateInvoice(invoiceData, xmlDoc); // Pasar xmlDoc como argumento
    };

    reader.readAsText(file);
  });

// Combinar los valores en el número de factura deseado
function generateInvoice(data, xmlDoc) {
  const codDoc = xmlDoc.querySelector("codDoc").textContent;
  const estab = xmlDoc.querySelector("estab").textContent;
  const ptoEmi = xmlDoc.querySelector("ptoEmi").textContent;
  const secuencial = xmlDoc.querySelector("secuencial").textContent;

  // Combinar los valores en el número de factura deseado
  const numeroFactura = `FACT. ELECTRONICA No. ${codDoc}-${estab}-${ptoEmi}-${secuencial}`;
  const invoiceHTML = `
        <div class="invoice">
          <div class="water-logo">
            <!-- Aquí se generará el logo de agua potable -->
            <svg xmlns="http://www.w3.org/2000/svg" height="3em" viewBox="0 0 512 512">
              <path d="M192 96v12L96 96c-17.7 0-32 14.3-32 32s14.3 32 32 32l96-12 31-3.9 1-.1 1 .1 31 3.9 96 12c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 12V96c0-17.7-14.3-32-32-32s-32 14.3-32 32zM32 256c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H132.1c20.2 29 53.9 48 91.9 48s71.7-19 91.9-48H352c17.7 0 32 14.3 32 32s14.3 32 32 32h64c17.7 0 32-14.3 32-32c0-88.4-71.6-160-160-160H320l-22.6-22.6c-6-6-14.1-9.4-22.6-9.4H256V180.2l-32-4-32 4V224H173.3c-8.5 0-16.6 3.4-22.6 9.4L128 256H32z"/></svg>
            <!-- Puedes personalizar el diseño del logo aquí -->
          </div>
          <p class="text-razon">${data.razonSocial}</p>
          <p class="text-ruc">RUC: ${data.ruc}</p>
          <p>${data.dirMatriz}</p>
          <p>Fecha Emisión: ${data.fechaEmision}</p>
          <p>${numeroFactura}</p>
          <p>Usuario: ${data.razonSocialComprador}</p>
          <p>CED/RUC: ${data.identificacionComprador}</p>
          <p>Importe Total: $${data.importeTotal}</p>
          <h3>Detalles</h3>
<table>
  <thead>
    <tr>
      <th>Cantidad</th>
      <th>Descripción</th>
      <th>Precio Unitario</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${data.detalles[0].cantidad}</td>
      <td>${data.detalles[0].descripcion}</td>
      <td>$${data.detalles[0].precioUnitario}</td>
    </tr>
    <tr>
      <td colspan="3">-----------------------------------------</td>
    </tr>
    <tr>
      <td>-</td>
      <td>Precio sin impuesto</td>
      <td>$${data.detalles[0].precioTotalSinImpuesto}</td>
    </tr>
    <tr>
      <td>-</td>
      <td>Impuesto Valor</td>
      <td>$${data.detalles[0].impuestoValor}</td>
    </tr>
    <tr>
      <td>-</td>
      <td>Total</td>
      <td>$${data.detalles[0].precioTotalSinImpuesto}</td>
    </tr>
  </tbody>
</table>

        </div>
      `;

  const invoiceContainer = document.getElementById("facture-generate");
  invoiceContainer.innerHTML = invoiceHTML;
}

/*    Restart Button*/
const restartButton = document.querySelector(".btn.restart");
restartButton.addEventListener("click", function () {
  location.reload();
});

/*Print Button*/
const printButton = document.querySelector(".btn.print");
printButton.addEventListener("click", function () {
  // Call the print function to open the print dialog
  window.print();
});
