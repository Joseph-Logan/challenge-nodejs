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
La solucion a continuacion tiene mejor soluciones que se las explicare de manera de casos

* 1- El crear credito y pedir el informacion que sera enviada por correo pudieron estar separados en un micro servicio como tal (proyecto exclusivo con su propia db), en esta ocasion fueron integrados los 4 request 
* 2- Para el envio de informacion atraves del correo electronico, como solucion pudo crear un micro servicio como tal (proyecto exclusivo con su propia db si asi era necesario)
* 3- Como normas de seguridad no implementamos jwt, son necesarios claro y aunque el enunciado no lo pedia, es responsabilidad de cada desarrollador implementar las normas de seguridad a los endpoints.
* 4- La arquitectura dicta que cada microservicio tenga su propia db si asi lo require, no es buena practica realizar lo siguiente
    * Suponga tiene un microservicio A, B y desea crear uno nuevo 'C' que require informacion  de A y B
    * Como solucion podriamos pensar en realizar un request hacia A y luego hacia B, asi se obtendria la infomacion, pero que sucede si alguno de los 2 (A, B), deja de funcionar... errores en cadena
    * Otra solucion ** Sync ** y en esta ocasion suponga que vamos a evadir que se haran request hacia A y B, ahora nuestro servicio 'C' tiene acceso a la DB de cada uno, por lo que se lograria solucionar en cierta manera, pero al final recaera en no un microservicio en especifico con su propia DB -> apuntamos al patron de una db para cada microservicio
    * Solucion ** Async **, usamos el evento de bus, manejaremos cada vez que se dispare un evento en cualquiera de lo microservicios A, B y C. Los pondremos a la escucha e inclusive los podremos manejar con prioridad en una pila de request como por ejemplo Rabbit MQ, NATS etc
    Ahora cada microservicio tendra su propia db y el Microservicio 'C' tambien obtendra la informacion de A y B para realizar su operacion en especifico, Si eventualmente el microservicio A y B dejan de funcionar el seguira avante.
        ** Ventajas **
            1- Microservicio mas rapido
            2- No se tiene dependencias de otros
        ** Desventaja **
            1- Duplicacion de informacion
