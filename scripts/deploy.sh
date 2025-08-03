#!/bin/bash

# Script para automatizar el despliegue a GitHub

echo "Iniciando despliegue automático..."

# Verificar si hay cambios
if [[ -z $(git status --porcelain) ]]; then
  echo "No hay cambios para commitear"
  exit 0
fi

# Agregar todos los cambios
echo "Agregando cambios..."
git add .

# Generar mensaje de commit
echo "Generando mensaje de commit..."
MESSAGE="Actualización del proyecto"

# Contar tipos de archivos modificados
JS_FILES=$(git status --porcelain | grep -E "\.js$" | wc -l)
CSS_FILES=$(git status --porcelain | grep -E "\.css$" | wc -l)
HTML_FILES=$(git status --porcelain | grep -E "\.html$" | wc -l)
MD_FILES=$(git status --porcelain | grep -E "\.(md|markdown)$" | wc -l)

if [ $JS_FILES -gt 0 ] || [ $CSS_FILES -gt 0 ] || [ $HTML_FILES -gt 0 ] || [ $MD_FILES -gt 0 ]; then
  MESSAGE_PARTS=()
  
  if [ $JS_FILES -gt 0 ]; then
    MESSAGE_PARTS+=("JS ($JS_FILES)")
  fi
  
  if [ $CSS_FILES -gt 0 ]; then
    MESSAGE_PARTS+=("CSS ($CSS_FILES)")
  fi
  
  if [ $HTML_FILES -gt 0 ]; then
    MESSAGE_PARTS+=("HTML ($HTML_FILES)")
  fi
  
  if [ $MD_FILES -gt 0 ]; then
    MESSAGE_PARTS+=("MD ($MD_FILES)")
  fi
  
  MESSAGE="Actualiza ${MESSAGE_PARTS[*]} archivos"
fi

# Hacer commit
echo "Haciendo commit con mensaje: $MESSAGE"
git commit -m "$MESSAGE"

# Hacer push (asumiendo que ya se ha configurado el repositorio remoto)
echo "Despliegue completado. Recuerda hacer push a GitHub con: git push origin master"