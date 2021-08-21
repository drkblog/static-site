---
title: Script de control de equipos encendidos
author: Leandro Fernandez
type: post
date: 2011-11-21T21:52:58+00:00
categories:
  - Tecnología
tags:
  - medio ambiente
  - red
  - sistema operativo

---
_¿Por qué utilizar un programa que controle las computadoras encendidas en un determinado momento del día?_

<img loading="lazy" class="alignright size-full wp-image-511" title="Ayudar a la tierra" src="http://blog.drk.com.ar/wp-content/uploads/2011/11/eco-earth.jpg" alt="" width="282" height="330" srcset="https://blog.drk.com.ar/wp-content/uploads/2011/11/eco-earth.jpg 282w, https://blog.drk.com.ar/wp-content/uploads/2011/11/eco-earth-256x300.jpg 256w" sizes="(max-width: 282px) 100vw, 282px" /> El consumo excesivo de electricidad tiene una consecuencia directa que se aprecia en la factura de la compañía de distribución de energía. Pero tiene también varias consecuencias indirectas que se reflejan, por ejemplo, en el medio ambiente y en la calidad del servicio en el área en que nos encontramos. En la Argentina existe además el Plan de Uso Racional de Energía (PURE) que ha servido para disminuir el consumo innecesario de luz y gas. Y que prevé la aplicación de sanciones para los usuarios que aumentan el consumo de alguno de los recursos mencionados.

Más allá del impacto económico, debemos ser conscientes de que la producción de energía eléctrica implica un impacto medioambiental, especialmente debido al uso de energías no renovables. Si bien no es posible modificar las plantas generadoras en uso, o el reemplazo no puede ocurrir la velocidad deseada. Los consumidores podemos colaborar ahorrando energía, y contribuyendo así una explotación más eficiente de las generadoras.

Desde la informática en las empresas podemos aportar nuestro grano de arena. Y no tengo la menor duda de que si todos hacemos el intento, el aporte que haríamos en conjunto puede ser significativo. Ya que una computadora promedio consume el equivalente a seis lamparas de filamento de 60 watts o a **veinticuatro lámparas de bajo consumo**. Por esto, en la organización en la que trabajo, decidimos implementar la política de apagado de equipos (computadoras) durante la noche. Esto quiere decir que existe una lista de equipos que deben apagarse al terminar la jornada y prenderse nuevamente al otro día. En la primera etapa esta política fue implementada mediante la colaboración de los empleados. Pero como el éxito fue parcial, desarrollamos una segunda etapa que establece un mecanismo más preciso. Esto es, un programa que controla a través de la red si los equipos indicados fueron apagados. La aplicación se activa a la noche o madrugada y realiza el control. Emite una lista de los equipos en infracción de la política y, opcionalmente, notifica a los usuarios en falta.

El desarrollo se hizo extremadamente simple. Un script de BASH que funciona en cualquier distribución de Linux y que se puede adaptar muy fácilmente a otros sistemas de la familia UNIX. El script debe agendarse para que sea ejecutado a una hora determinada, todos los días. Y debe proveerse además el listado de direcciones IP y de correo correspondientes a cada equipo. Compartimos este trabajo para que sea utilizado libremente por quien quiera colaborar con una causa que es de todos.

[bash]  
#!/bin/bash

\# DRK Eco Help v1.3 &#8212; Bash script  
\# Copyright (C) 2011 Leandro H. Fernández  
#  
\# Visit http://blog.drk.com.ar/2011/script-de-control-de-equipos-encendidos  
\# Buenos Aires, Argentina  
#  
\# This program is free software: you can redistribute it and/or modify  
\# it under the terms of the GNU General Public License as published by  
\# the Free Software Foundation, either version 3 of the License, or  
\# (at your option) any later version.  
#  
\# This program is distributed in the hope that it will be useful,  
\# but WITHOUT ANY WARRANTY; without even the implied warranty of  
\# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the  
\# GNU General Public License for more details.  
#  
\# You should have received a copy of the GNU General Public License  
\# along with this program.  If not, see <http://www.gnu.org/licenses/>.

################  
\# Configuración

\# Mail del administrador  
CFG\_ADMINMAIL="mi\_direccion@mi_empresa.com"  
\# 1. No emite salida a la terminal (para el cron)  
CFG_SILENCIOSO=0

\# Enviar mail al usuario  
CFG_ADVERTIR=0  
\# Asunto del mensaje al usuario  
U_TITULO="Control de uso de energía eléctrica"  
\# Mensaje al usuario  
U_MENSAJE="Su equipo debe apagarse al finalizar cada jornada laboral"

################ No modificar nada debajo de esta línea ################

if [ $CFG_SILENCIOSO -eq 0 ]; then  
echo -e "Comenzado verificación de infractores\n"  
fi

LISTA=""

for L in \`cat ips\_a\_controlar.csv\`; do  
\# datos[0] es la IP y datos[1] es el mail  
datos=(${L//,/ })  
if [ $CFG_SILENCIOSO -eq 0 ]; then  
echo -e "Comprobando ${datos[0]}"  
fi  
ping -c 1 ${datos[0]} > /dev/null  
if [ $? -eq 0 ]; then  
LISTA=$LISTA"${datos[0]} &#8211; ${datos[1]}\n"  
if [ $CFG_ADVERTIR == 1 -a ${datos[1]} != "" ]; then  
echo -e "$U\_MENSAJE.\n\n\`date\`" | mail ${datos[1]} -s "$U\_TITULO"  
fi  
fi  
done

if [ "$LISTA" != "" ]; then  
echo -e "\`date\`\n\nSe encontraron los siguientes infractores:\n$LISTA" | mail $CFG\_ADMINMAIL -s "$U\_TITULO"  
fi  
[/bash]

La configuración es muy simple, ya que consta de cuatro parámetros:

  * CFG_ADMINMAIL: La dirección de mail a la que se envía el listado de infractores.
  * CFG_ADVERTIR: 1 Para activar la notificación al usuario, 0 para desactivarla.
  * U_TITULO: El asunto que aparecerá en los mensajes de correo.
  * U_MENSAJE: El texto que recibirán los infractores notificados, si se activó la opción.

La lista de direcciones IP y de correo debe ser un archivo de texto con una línea por equipo. Primero la dirección IP y luego la de correo, separadas por una coma. El archivo debe llamarse **ips\_a\_controlar.csv** y estar en el mismo directorio que el script:

<pre>10.0.20.55,juan@empresa.com.ar
10.0.110.3,ramiro@empresa.com.ar
...</pre>

Cabe aclarar que el script presentado aquí no pretende ser una solución integral, y que su eficacia depende de las condiciones técnicas y los equipos utilizados. Este artículo tiene como objetivo incentivar el cuidado del medio ambiente, partiendo de una concepto extremadamente simple. Que puede ser implementado de muchas maneras, y este script es tan sólo una de ellas.

## Versiones

1.0 Primera publicada en el blog  
1.1 Corrección para soporte de direcciones de mail vacías.  
1.2 Envío de mail al administrador sólo si hubo infractores.  
1.3 Corrección de error. Y modo silencioso.

**Alternativas**

Un amigo, [@niqueco][1], propuso como alternativa a esta solución configurar los equipos para que pasen al modo de bajo consumo después de un tiempo dado de inactividad. Esta solución conocida en la jerga como _hibernación_, si puede ser utilizada, provee varias ventajas: ahorro de consumo también durante el día, mantenimiento descentralizado, y es proactiva. El motivo por el cual no opté por esta alternativa es que no todas las combinaciones de hardware y software responden de manera aceptable a esa configuración. Y como contrapartida, en mi caso, el costo de administrar la lista de equipos a controlar es bajo.

 [1]: https://twitter.com/#!/niqueco