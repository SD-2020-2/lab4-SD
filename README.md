# Proyecto 1. Sistemas distribuidos

## Contenido

- [Arquitectura](#arquitectura)
- [Enunciado](#enunciado)
- [¿ Cómo usar este proyecto ?](#usar-este-proyecto)
  - [Construir el proyecto](#construir-el-proyecto)
- [Dependencias](#dependencias)
- [Desarrolladores](#desarrolladores)

## Arquitectura

## Enunciado

Berkeley

1. Cada cliente por medio de una pagina puede visualizar su reloj en el formato hh:mm:ss (usando websockets) y cada cliente tiene un servidor con una hora propia ese servidor debe estar en una instancia(docker o vm).

2. El cliente puede cambiar la hora de su reloj (esta hora no tendrá que ver con la hora del computador).

3. Hay servidor coordinador que consulta la hora de un servicio externo y realiza el algoritmo de promedio y ajuste (Berkeley). Hacer un dashboard del coordinador donde se muestre las instancias conectadas.

4. En cada cliente se actualiza la hora cada minuto (usando websockets) y se guarda un registro en la tabla, con hora local, ajuste y nueva hora, también cuando se ajuste manualmente se lleva el registro.

5. Hacer el ejercicio con mínimo tres clientes, el sistema debe tener la disponibilidad de agregar n instancias sin tener datos quemados, es decir registrarse en el servidor coordinador y empezar a ser parte del grupo de sincronización.

Documentar los servicios web http con Swagger y los de websockets con asyncapi.

## Usar este proyecto

Paso a paso para usar el proyecto:

### Construir el proyecto

Construir ...

## Dependencias

```

```

## Desarrolladores

- [Mati Rodriguez](https://github.com/limarosa29)
- [Christian Chamorro](https://github.com/cris2014971130)
- [Oscar Rojas](https://github.com/augusticor)
