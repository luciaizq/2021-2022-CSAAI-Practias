Para la interfaz se usará un fichero HTML y otro de estilo CSS, el código Javascript estará en otro fichero separado. 

La calculadora tendrá botones para introducir los dígitos 0,1...9, un display donde se muestra lo introducido, los botones para realizar las operaciones: suma, resta, producto y división, y el botón de = para calcular el resultado. 

Deberá haber un botón de AC para llevar la calculadora al estado inicial (Reset). 

Habrá un botón de DEL para borrar el último carácter introducido.

La calculadora deberá disponer de un controlador básico que impida introducir expresiones erróneas como por ejemplo "1++2". 

Todas las expresiones a calcular deberán ser de la forma `<Número> <Operador> <Número>`. 

Es decir, las operaciones siempre serán sólo entre dos números. 

Así, la expresión "1+2+3" no es válida. 

Para calcularla habrá que hacer primero "1+2" y darle al igual. 

A este resultado ahora ya le podemos sumar el 3. 

El controlador se encargará de no permitir que se introduzcan otras expresiones.

