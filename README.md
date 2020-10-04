# Challenge-nodejs

## A continucion les presentare la solucion que se tomo para el reto de microservicios

Endpoints

Metodo http: # POST

* Crear microcredito
    * /api/create-microcredit

* Pagar microcredito
    * /api/pay-microcredit

* Pedir informacion sobre el microcredito
    * /api/info-microcredit

* Obtener movimientos (LOGS de seguridad)
    * /api/info-logs

## Descripcion de la solucion
La solución a continuación tiene mejor soluciones que se las explicare de manera de casos
* El crear crédito y pedir el información que será enviada por correo pudieron estar separados en un micro servicio como tal (proyecto exclusivo con su propia db), en esta ocasión fueron integrados los 4 request
* Para el envio de informacion a traves del correo electrónico, como solución pudo crear un micro servicio como tal (proyecto exclusivo con su propia db si así era necesario)
* Como normas de seguridad no implementamos jwt, son necesarios claro y aunque el enunciado no lo requeria, es responsabilidad de cada desarrollador implementar las normas de seguridad a los endpoints.
* La arquitectura dicta que cada microservicio tenga su propia db si asi lo requiere, no es buena práctica realizar lo siguiente
Suponga tiene un microservicio A, B y desea crear uno nuevo "C" que requiere información de A y B
Como solución podríamos pensar en realizar un request hacia A y luego hacia B, así se obtendrá la información, pero qué sucede si alguno de los 2 (A, B), deja de funcionar... errores en cadena.

Otra solución ** Sync ** y en esta ocasión suponga que vamos a evadir que se harán request hacia A y B, ahora nuestro servicio "C" tiene acceso a la DB de cada uno, por lo que se lograra solucionar en cierta manera, pero al final recaerá en no un microservicio en específico con su propia DB -> apuntamos al patrón de una db para cada microservicio

### Solución ** Async **, usamos el evento de bus, manejaremos cada vez que se dispare un evento en cualquiera de los microservicios A, B y C. Los pondremos a la escucha e inclusive los podremos manejar con prioridad en una pila de request como por ejemplo Rabbit MQ, NATS etc. Ahora cada microservicio tendrá su propia db y el Microservicio "C" también tendrá la informacion de A y B, debido al evento del bus que disparo acciones hacia el también, para realizar su operación en específico. Si eventualmente el microservicio A y B dejan de funcionar el seguirá avante.
* Ventajas
1- Microservicio más rápido 
2- No se tiene dependencias de otros 
* Desventaja 
1- Duplicación de información
