# Instrucciones para agregar la canción

## Paso 1: Agregar el archivo de audio

1. Descarga o consigue el archivo MP3 de la canción que quieres usar
2. Renombra el archivo a `cancion.mp3`
3. Coloca el archivo en la carpeta `public/` del proyecto
   - La ruta final debe ser: `public/cancion.mp3`

## Paso 2: Configurar el link de Spotify

1. Abre el archivo `src/App.tsx`
2. Busca la línea que dice:
   ```tsx
   href="https://open.spotify.com/track/TU_TRACK_ID"
   ```
3. Reemplaza `TU_TRACK_ID` con el ID real de la canción en Spotify

### ¿Cómo obtener el link de Spotify?

1. Abre Spotify (web o app)
2. Busca la canción que quieres compartir
3. Haz clic derecho en la canción
4. Selecciona "Compartir" → "Copiar enlace de la canción"
5. El link se verá algo así: `https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp`
6. Copia ese link completo y reemplázalo en el código

## Ejemplo:

Si tu link de Spotify es:
```
https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp
```

Entonces en el código debe quedar:
```tsx
href="https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp"
```

## Formatos de audio soportados

- MP3 (recomendado)
- WAV
- OGG

Si tienes otro formato, puedes convertirlo a MP3 usando herramientas online como:
- https://cloudconvert.com/
- https://online-audio-converter.com/

## Nota importante

El archivo de audio debe estar en la carpeta `public/` para que sea accesible desde el navegador.
