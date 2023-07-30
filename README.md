## Generador de Facturas Electrónicas

Este proyecto es un generador de facturas electrónicas a partir de archivos XML que contienen información de facturas con el Software sriyyoenlinea.sri.gob.ec . El usuario puede cargar un archivo XML y el sistema extraerá los datos necesarios para generar una factura en formato HTML.

## Cómo utilizar

1. Clona o descarga este repositorio.

2. Abre el archivo `index.html` en tu navegador web.

3. Haz clic en el botón "Seleccionar archivo" para cargar un archivo XML de factura ejemplo en los documentos

4. Una vez seleccionado el archivo, el sistema procesará el contenido XML y mostrará la factura generada en pantalla.

5. Puedes imprimir la factura haciendo clic en el botón "Imprimir".

6. Si deseas generar una nueva factura, puedes hacer clic en el botón "Reiniciar".

## Estructura del archivo XML

El archivo XML debe tener la siguiente estructura:

`xml
<factura>
  <razonSocial>Nombre de la empresa</razonSocial>
  <ruc>1234567890</ruc>
  <dirMatriz>Dirección de la matriz</dirMatriz>
  <fechaEmision>2023-07-29</fechaEmision>
  <codDoc>01</codDoc>
  <estab>001</estab>
  <ptoEmi>100</ptoEmi>
  <secuencial>000000077</secuencial>
  <razonSocialComprador>Nombre del comprador</razonSocialComprador>
  <identificacionComprador>123456789</identificacionComprador>
  <totalSinImpuestos>100.00</totalSinImpuestos>
  <totalImpuesto>
    <valor>12.00</valor>
  </totalImpuesto>
  <importeTotal>112.00</importeTotal>
  <detalles>
    <detalle>
      <codigoPrincipal>001</codigoPrincipal>
      <descripcion>Producto 1</descripcion>
      <cantidad>2</cantidad>
      <precioUnitario>50.00</precioUnitario>
      <precioTotalSinImpuesto>100.00</precioTotalSinImpuesto>
      <impuesto>
        <valor>12.00</valor>
      </impuesto>
    </detalle>
  </detalles>
</factura>`
