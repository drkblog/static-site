---
title: Disparar cámara Canon con Arduino por Infrarrojo
author: Leandro Fernandez
type: post
date: 2016-05-28T02:02:44+00:00
categories:
  - Electrónica
tags:
  - arduino
  - circuito
  - fotografía
---
_Esta es una nota de aplicación relacionada con varios artículos del blog en los cuales traté el tema de control remoto con LEDs infrarrojos. Por ser sólo una nota de aplicación no se presentan detalles de la teoría de funcionamiento. En cambio hay enlaces a las notas que proveen el conocimiento necesario para realizar el experimento._

Algunos modelos de cámaras Canon tiene la capacidad de ser disparadas en forma remota de dos maneras. Utilizando un cable con un switch conectado a la cámara. O con un control remoto infrarrojo. En este video se puede ver el experimento funcionando donde, al pasar la mano por delante del fotoresistor, el Arduino envía la señal infrarroja adecuada para que la cámara tome una fotografía.

{{< youtube IgX8g3iz6O0 >}}

Para realizar el experimento adquirí un control remoto genérico compatible con el Canon RC-6. Este control tiene un pulsador y un switch trasero que permite elegir entre dos señales. Una que toma una fotografía instantáneamente, y otra que inicia un temporizador de diez segundos. Utilizando un detector infrarrojo y un osciloscopio obtuve la información de la señal de disparo instantáneo. Se trata de dos pulsos de ~33kHz y de duración de 600µs separados por unos 7ms. Con esa información escribí un programa muy simple que utiliza la función **tone()** para reproducir esta señal en la salida digital 2. Para ver la teoría de funcionamiento leer [el artículo sobre control remoto con Arduino][2]. Luego conecté un led infrarrojo de 940nm con una resistencia de 1kΩ. Luego agregué un fotoresistor genérico y una resistencia de 22kΩ en forma de divisor resistivo entre Vcc y GND. Y conecté el punto medio a la entrada analógica A11. El programa mide constantemente la tensión en A11 y si esta supera un valor límite ajustable en tiempo de compilación, envía el disparo a la cámara. Por eso en el video la cámara dispara cuando paso mi mano por encima del fotoresistor. Además el programa espera cinco segundos después de hacer un disparo antes de volver al lazo de medición. Esto evita que se hagan disparos repetidos. Este experimento podría convertirse fácilmente en un sistema de trampa para fotografía animales, por ejemplo.

![canon-remote](/2016/05/canon-remote.jpg)

El código fuente es muy simple. Es importante destacar que LIGHT_THRESHOLD debe ser ajustada según la luz del ambiente donde se realiza la prueba. Se puede iniciar el programa y ver el valor que muestra en la consola serie cuando está sin ser tapada. Y luego poner este valor en un número un poco más alto que esa lectura. Con un par de intentos se llega a un valor estable que dispare cuando tapamos el fotoresistor y que no dispare el resto del tiempo.

Los tiempos T1 y T2 representan aproximadamente 600µs en al Arduino que yo utilicé. Es posible que sea necesario modificar estos valores en otros modelos o marcas de Arduino ya que por ser valores muy pequeños están afectados por el resto de instrucciones alrededor de la llamada a **tone()**.

{{< highlight cpp "linenos=table">}}
#define LED 2  
#define IN A11  
#define LIGHT_THRESHOLD 600  
#define FREQUENCY 33000  
#define PAUSE 7000  
#define T1 220  
#define T2 220

void setup() {  
  Serial.begin(19200);  
  pinMode(LED, OUTPUT);  
  pinMode(IN, INPUT);  
  Serial.println("Listo");  
}

void loop() {  
  // Leemos la tensión en el fotoresistor  
  int light = analogRead(IN);  
  Serial.println(light);
  
  // Si es superior al límite, disparamos  
  if (light > LIGHT_THRESHOLD) {
  
    // Enviamos los dos pulsos  
    Serial.println("Disparo&#8230;");  
    tone(LED, FREQUENCY);  
    delayMicroseconds(T1);  
    noTone(LED);  
    delayMicroseconds(PAUSE);  
    tone(LED, FREQUENCY);  
    delayMicroseconds(T2);  
    noTone(LED);
    
    // Esperamos 5 segundos para evitar un disparo  
    // inmediato  
    delay(5000);  
  }  
}  
{{< /highlight >}}

Aquí se puede ver una de las fotografías tomadas por la cámara.

![foto-arduino](/2016/05/foto-arduino.jpg)

Y aquí el video que muestra el control remoto y el circuito que usado para medir la señal en el osciloscopio.

{{< youtube v4WNV29Epcw >}}

 [1]: /control-remoto-infrarrojo-con-arduino
