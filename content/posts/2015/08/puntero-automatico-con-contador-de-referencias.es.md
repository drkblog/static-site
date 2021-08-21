---
title: Puntero automático con contador de referencias
author: Leandro Fernandez
type: post
date: 2015-08-15T03:44:15+00:00
categories:
  - Programación
tags:
  - C/C++
  - manejo de memoria
  - puntero automático

---
**C++** es un lenguaje que no tiene manejo automático de memoria incorporado en su versión más pura. Es decir, en los compiladores o IDEs más populares entre quienes se dedican a este lenguaje. Existen algunas implementaciones de _garbage collectors_ para C++ y las versiones más nuevas del estándar incluyen una implementación de puntero automático en la biblioteca de plantillas STL. Pero consideraría correcta la afirmación general de que el manejo de memoria en el lenguaje es manual.

La semana pasada estaba pensando en un ejercicio muy simple que requiriese conocimiento de varios aspectos del lenguaje en una cantidad de líneas reducida. Y se me ocurrió que programar un puntero automático podría cumplir con la premisa. Este es el resultado.

La definición de puntero automático en el lenguaje es &#8220;_Un **auto_ptr** es un objecto que actúa igual que un puntero, excepto que automáticamente destruye el objeto apuntado cuanto el **auto_ptr** es destruido_&#8220;. A pesar de la simpleza de la definición conceptual, llevar esta idea a la práctica le costó mucho trabajo a quienes definen el estándar. A través del tiempo encontraron muchas dificultades en las implementaciones y las fueron corrigiendo para que el objeto se comporte normalmente en distintos escenarios complejos. Ya que el usuario del objeto necesita que éste se comporte como un puntero al objeto destino, pero en realidad es un objeto que simula serlo aprovechando la posibilidad del lenguaje de sobre escribir operadores.

El código que presento a continuación **no pretende equipararse** con las distintas implementaciones del **auto_ptr** del estándar. No cubre la cantidad de situaciones que éste prevé. Y no está probado como para ser utilizado, tal como está, en aplicaciones que pretendan realizar trabajo crítico. Aunque los lectores tienen la libertad de hacer con este código lo que deseen, bajo su propia responsabilidad.

[code language=&#8221;cpp&#8221;]  
template <class T>  
class AutoPointer {  
protected:  
T * pointer;  
int * refcount;

public:  
/**  
* Crea un nuevo puntero automático  
* Inicializa el puntero interno y el contador de referencias  
*/  
AutoPointer(T * p) : pointer(p), refcount(new int) {  
*refcount = 1;  
};  
/**  
* Destruye el puntero automático  
* si se trata del último que apunta al objeto destino,  
* destruye el objeto y libera la memoria propia  
*/  
~AutoPointer() {  
&#8211;(*refcount);  
if (!*refcount) {  
delete pointer;  
delete refcount;  
}  
};

/**  
* Exposición del objeto apuntado  
*/  
T& operator \* () { return \*pointer; };  
T* operator-> () { return pointer; };

/**  
* Copia un puntero automático  
* El nuevo puntero copia los valores del original  
*/  
AutoPointer(const AutoPointer<T> &r) {  
pointer = r.pointer;  
refcount = r.refcount;  
++(*refcount);  
};  
/**  
* Asigna un puntero automático con otro  
* Primero se comporta como si se estuviese destruyendo el puntero  
* y luego toma los valores del orginal (como en la copia)  
*/  
AutoPointer<T>& operator= (const AutoPointer<T> &r) {  
&#8211;(*refcount);  
if (!*refcount) {  
delete pointer;  
delete refcount;  
}  
pointer = r.pointer;  
refcount = r.refcount;  
++(*refcount);  
return *this;  
};  
};  
[/code]

La clase AutoPointer presentada permite crear punteros automáticos que cuentan la cantidad de referencias que tiene el objeto apuntado. Es decir, la cantidad de objetos AutoPointer que existen que apuntan a ese mismo objeto. Claro que para su funcionamiento, los punteros automáticos deben construirse como copias del primer puntero creado. En cuanto a la destrucción, el último puntero destruido (de todos los que apuntan a un mismo objeto) es el encargado de destruir al objeto destino independientemente de cual fue el puntero original.

Para utilizar la clase, el primer paso es crear un objeto y obtener el puntero automático al mismo. Por ejemplo:

[code language=&#8221;cpp&#8221;]  
void test(AutoPointer<Dummy> s) {  
std::cout << "Value " << s->getValue() << std::endl;  
}

int main(int argc, char ** argv)  
{  
AutoPointer<Dummy> my_autopointer(new Dummy(0));  
test(my_autopointer);

return 0;  
}  
[/code]

Esta línea ejecutará el constructor de la clase AutoPointer que recibe un puntero a un objeto del tipo de instanciación de la plantilla. El puntero llamado **my_autopointer** se crea en el stack y será destruido automáticamente cuando el hilo de ejecución salga del alcance actual. En las líneas 12 y 13 de la definición del puntero podemos observar que se inicializa el miembro **pointer** para que apunte al objeto recibido (en este caso del tipo Dummy) y se pone en uno el contador de referencias. Ya que existe sólo un puntero —este que se acaba de crear— que hace referencia al objeto.

La llamada a la función **test** pasa el puntero por copia. Es decir que el objeto llamado **s** en la función es una copia idéntica de **my_autopointer** que existe a través de la llamada al constructor de copia definido en las líneas 38 a 42. Donde podemos ver claramente que el puntero recién creado copia el valor del puntero del original, y también apunta al mismo contador de referencias. Es decir que los punteros automático de este tipo, creados por copia, comparten un contador de referencia único. Vale destacar que el código no cuenta con ningún de protección para concurrencia. Y ese sería un punto crítico que tendría muchas posibilidades de generar problemas de ese tipo. Finalmente el constructor de copia incrementa el contador para reflejar la cantidad de referencias existentes (en este caso dos).

Cuando la función **test** termina, se destruye el puntero **s** creado por el pasaje del argumento. El destructor decrementa el contador de referencias, que queda con valor uno, lo lo que no hace más nada.

Cuando la vida de la variable **my_autopointer** llegue a su fin se ejecutará el destructor, líneas 20 a 26, que decrementará el contador de referencias. Luego verificará que llegó a cero y entonces sabrá que este es el último puntero al objeto, por lo que destruirá al objeto. Adicionalmente liberará la memoria reservada para el contador de referencias. Y así todos los recursos reservados habrán sido debidamente devueltos.

Esto es todo por el momento. En una segunda parte de este artículo realizaremos más pruebas y detallaremos el funcionamiento de esta clase.