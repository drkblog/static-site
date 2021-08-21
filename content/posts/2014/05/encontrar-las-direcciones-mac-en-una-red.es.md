---
title: Encontrar las direcciones MAC en una red
author: Leandro Fernandez
type: post
date: 2014-06-01T00:59:09+00:00
categories:
  - Programación
tags:
  - estándar
  - ethernet
  - ip
  - linux
  - red
  - sistema operativo

---
Cuando una red **_ethernet_** es suficientemente grande como para que el administrador no pueda tener a la mano todas las bocas de conexión, la simplicidad de conexión de esta topología se puede convertir en un problema. Descubrir los dispositivos que se encuentran conectados en un momento determinado, puede resultar complejo. Y es algo que debí solucionar más de una vez. Pero en la última ocasión se me presentó el requerimiento adicional de automatizar el control. Así que tras buscar infructuosamente una solución adecuada terminé programando una pequeña herramienta que obtiene **las direcciones MAC de todos los dispositivos conectados en la red** (siempre y cuando implementen el protocolo IP). Y compara el resultado con un listado de direcciones autorizadas, indicando aquellas encontradas en la red pero no listadas.

La topología _ethernet_ se caracteriza, entre otras cosas, por su facilidad de conexión. De hecho agregar un equipo a la red sólo implica conectarlo físicamente. El protocolo eléctrico y la capa de enlace están diseñadas para que ninguna configuración extra sea necesaria. Ya que cada dispositivo posee una dirección física única ([MAC address][1]) en todo el mundo, no existe posibilidad de colisiones en la identidad del dispositivo. Pero esta ventaja que simplifica la administración representa también un inconveniente de seguridad. Cualquier persona con acceso físico a una terminal de la red puede conectar un dispositivo a ella. Lo que implica desde potenciales conflictos a nivel de capas superiores —como por ejemplo [direcciones IP][2] repetidas—, hasta el compromiso de seguridad de la información.

En ocasiones anteriores cuando necesitaba descubrir los dispositivos en una red (desde un equipo con Linux) solía utilizar la combinación de la herramienta **nmap** y el cache del protocolo ARP. Primero ejecutaba un comando en **nmap** que enviaba un paquete ICMP a cada dirección IP de un rango dado. Y luego exponía el contenido de la memoria cache de ARP en pantalla o en un archivo. Este método funciona según mi experiencia. Pero resulta poco directo y, en ocasiones, implica instalar una herramienta extra que no resuelve el trabajo por sí sola. Más aún en el caso que comenté al inicio del artículo, automatizar este proceso cuya efectividad es dudosa —ya que en algún punto los resultados pueden depender del espacio de cache que el protocolo ARP tiene disponible— no parece una buena solución.

[findMACs][3] es una pequeña herramienta que resuelve este requerimiento en forma consolidada. Dado un rango de direcciones IP en formato IP/CIDR este programa envía un pedido ARP a cada dirección y espera la respuesta. Mostrando en pantalla la dirección MAC obtenida para cada dirección IP consultada. Opcionalmente esta salida puede ser filtrada para que sólo aparezcan las direcciones MAC que no se encuentran en un listado provisto en forma de archivo de texto. Así se puede crear una lista de direcciones autorizadas en la red y obtener salida sólo cuando aparece una dirección extraña.

Para utilizarla hay que descargar el código fuente que consta de un sólo archivo y compilarlo con la siguiente línea:

    $ gcc findmacs.c -o findmacs

Cabe aclarar que sólo compila y corre en Linux.

Si quisiéramos obtener todas las direcciones MAC de las primeras dieciséis direcciones a partir de 192.168.0.1 ejecutaríamos:

    $ sudo ./findmacs -r 192.168.0.1/28 eth0
    00:63:54:e3:c1:91       192.168.0.1
    00:13:99:48:5b:54       192.168.0.4
    00:22:13:db:b2:88       192.168.0.6
    00:21:4d:38:04:05       192.168.0.7
    00:21:11:c3:cc:2d       192.168.0.10
    00:19:9a:83:5d:31       192.168.0.12
    00:19:93:83:21:7e       192.168.0.15

 [1]: http://es.wikipedia.org/wiki/Direcci%C3%B3n_MAC "Dirección MAC"
 [2]: http://es.wikipedia.org/wiki/Direcci%C3%B3n_IP
 [3]: http://www.drk.com.ar/findmacs-discover-mac-addresses.php