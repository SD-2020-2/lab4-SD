#!/bin/bash

echo "Creando instancia ... "

# Obtener el puerto de el ultimo contenedor (servidor) creado
latest_port=$(docker port $(docker ps -q -l --filter ancestor=server))

# Substring del puerto (extraer el puerto de 8080/tcp -> 0.0.0.0:8082)
latest_port=$(echo "$latest_port" | cut -c 21-24)

# Puerto incrementado
incremented_port=$(("$latest_port + 1"))

# Numero de server
server_num=$(echo "$incremented_port" | cut -c 4)

# Crear el contenedor en puerto calculado, si no habia antes ninguno crea el primero
if [[ -n $server_num ]]; then
    docker run -d -p "$incremented_port":8080 --name server"$server_num" server
    echo "Instancia "$server_num" creada y corriendo en el puerto "$incremented_port" !"
else
    echo ""
    echo "No existen contenedores SERVER, creando el primero ..."
    docker run -d -p 8081:8080 --name server1 server
    echo "Instancia 1 creada y corriendo en el puerto 8081 !"
fi

echo "-------------------------------------------------"

# Detener todos los contenedores
#docker stop $(docker ps -q)

# Eliminar todos los contenedores detenidos
#docker rm $(docker ps -a -q)

# Ver los puertos de los contenedores
#docker ps --format "table {{.Names}}\t{{.Ports}}\t{{.State}}"