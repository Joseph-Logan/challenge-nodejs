# Challenge-nodejs

## A continucion les presentare la solucion que se tomo para el reto de microservicios

Endpoints

Metodo http: # GET
* Get Token
    * ## /api/get-token
    Devolvera el token, el cual debera ser inyectado en las cabeceras
    Authorization: <token>, sin agregar comillas o bearer, solamente el token

Metodo http: # POST

* Crear microcredito
    * ## /api/create-microcredit
    * ## /api/create-microcredit?lg=es -> español
    * Se debe inyectar un header -> Content-Type: application-json
    * raw -> JSON {
      name: <name>,
      email: <example@gmail.com>,
      totalIngress: <4000>,
      sector: 1, -> 1 para publico, 2 privado
      workYears: 3,
      amount: 1260,
      frecuency: 2, -> 1 mensual , 2 quincenal
      payTime: 6
    }

* Pagar microcredito
    * ## /api/pay-microcredit
    * Se debe inyectar un header -> Content-Type: application-json
    * Raw -> JSON:  {
      planId: <'6df64e2c-10', recuerda obtenerlo cuando creas el microprestamo>,
      amount: 1700
    }
* Pedir informacion sobre el microcredito
    * ## /api/info-microcredit
    * Se debe inyectar un header -> Content-Type: application-json
    * Raw -> JSON: Los mismos datos de crear credito

* Obtener movimientos (LOGS de seguridad)
    * ## /api/info-logs
    * Se debe inyectar un header -> Content-Type: application-json
    * Raw -> JSON: {
        email: <example@gmail.com> -> email con el que se solicito el microprestamo
    }

## Descripcion de la solucion
La solución a continuación tiene mejor soluciones que se las explicare de manera de casos
* El crear crédito y pedir el información que será enviada por correo pudieron estar separados en un micro servicio como tal (proyecto exclusivo con su propia db), en esta ocasión fueron integrados los 4 request
* Para el envio de informacion a traves del correo electrónico, como solución pudo crear un micro servicio como tal (proyecto exclusivo con su propia db si así era necesario)
* Como normas de seguridad implementamos jwt, son necesarios claro y aunque el enunciado no lo requeria, es responsabilidad de cada desarrollador implementar las normas de seguridad a los endpoints.
* La arquitectura dicta que cada microservicio tenga su propia db si asi lo requiere, no es buena práctica realizar lo siguiente
Suponga tiene un microservicio A, B y desea crear uno nuevo "C" que requiere información de A y B
Como solución podríamos pensar en realizar un request hacia A y luego hacia B, así se obtendrá la información, pero qué sucede si alguno de los 2 (A, B), deja de funcionar... errores en cadena.

Otra solución ** Sync ** y en esta ocasión suponga que vamos a evadir que se harán request hacia A y B, ahora nuestro servicio "C" tiene acceso a la DB de cada uno, por lo que se lograra solucionar en cierta manera, pero al final recaerá en no un microservicio en específico con su propia DB -> apuntamos al patrón de una db para cada microservicio

### Solución ** Async **, usamos el evento de bus, manejaremos cada vez que se dispare un evento en cualquiera de los microservicios A, B y C. Los pondremos a la escucha e inclusive los podremos manejar con prioridad en una pila de request como por ejemplo Rabbit MQ, NATS etc. Ahora cada microservicio tendrá su propia db y el Microservicio "C" también tendrá la informacion de A y B, debido al evento del bus que disparo acciones hacia el también, para realizar su operación en específico. Si eventualmente el microservicio A y B dejan de funcionar el seguirá avante.
Lo mas evidente
* Ventajas
    * 1- Microservicio más rápido 
    * 2- No se tiene dependencias de otros 
* Desventaja 
    * 1- Duplicación de información

## Carpeta test
Dentro de ella encontrarán una serie de métodos que realice para unit testing. Para probarlos es necesario descargar el proyecto de manera local y ejecutar npm test
Tambien es requerido el .env con las credenciales, en este caso cualquier cosa me las solicitan. 