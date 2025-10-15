#!/bin/bash

# Función para crear carpetas numeradas
crear_carpetas() {
    local ruta=$1
    
    # Verificar si se proporcionó una ruta
    if [ -z "$ruta" ]; then
        echo "Error: Debes proporcionar una ruta"
        echo "Uso: ./crear_carpetas.sh /ruta/completa"
        exit 1
    fi
    
    # Crear el directorio base si no existe
    mkdir -p "$ruta"
    
    # Crear carpetas del 0 al 111
    for i in {0..111}; do
        mkdir -p "$ruta/$i"
        echo "✓ Carpeta creada: $ruta/$i"
    done
    
    echo ""
    echo "✓✓✓ Completado: 112 carpetas creadas en $ruta"
}

# Llamar a la función con el primer argumento
crear_carpetas "$1"