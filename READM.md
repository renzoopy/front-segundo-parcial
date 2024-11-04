# Tu Proyecto

¡Bienvenido! Este proyecto tiene como objetivo facilitar la gestión de [especifica brevemente el propósito, como "productos", "categorías" y "ventas"]. Aquí encontrarás el código fuente y la documentación para ponerlo en marcha en tu máquina local.

## 🚀 Comenzando

Estos son los pasos necesarios para configurar y ejecutar el proyecto

## 📋 Requisitos previos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

- [Node.js](https://nodejs.org/en/download/package-manager) versión 14 o superior
- npm (que viene con Node.js)
- [JDK 11](https://www.oracle.com/java/technologies/downloads/#java11-windows)
- React Native CLI (si estás usando React Native) `npm install -g react-native-cli`
- [Android Studio](https://developer.android.com/studio?hl=es-419): sdk, sdk plataform, NDK(Side by side), CMake, SDK Tools & virtual device (AVD)
- Git (opcional, para clonar el repositorio)

## 🛠 Instalación

Luego de instalar las herramientas necesarias de Android Studio configuremos las variables de sistema necesarias.

1. Presiona las teclas Win+R
2. Escribe sysdm.cpl y presiona enter
3. Clic en la pestaña `Opciones avanzadas` y luego en `Variables de entorno`
4. Necesitamos agregar dos:

```bash
ANDROID_HOME: C:\Users\USUARIO\AppData\Local\Android\Sdk
JAVA_HOME: C:\Program Files\Android\Android Studio\jbr
```

Clona el repositorio

En la terminal ejecuta el siguiente comando para clonar el repositorio en tu máquina:

```bash
git clone https://github.com/renzoopy/front-segundo-parcial.git
```

Navega a la carpeta del proyecto

```bash
cd ../front-segundo-parcial
```

Ejecuta el siguiente comando para instalar todas las dependencias del proyecto:

```bash
npm install
```

Ejecuta json-server

```bash
json-server --watch db.json --port 3000
```

Ejecuta el servidor

```bash
npm start -- --reset-cache
```

Si estás usando React Native, ejecuta:

```bash
npm run android # Para Android
npm run ios # Para iOS
```

### 🎉 ¡Listo!

Tu aplicación debería estar corriendo ahora en http://localhost:3000 (o el puerto que hayas configurado). Abre tu navegador y empieza a explorar.
