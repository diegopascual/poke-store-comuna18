# PokéShop 🛒✨ - Simulador de E-commerce de Pokémon

![screenshot](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXQ5cHZpYTczYTdxYmYyZG5rdHk0NTh1aW5lb3Rpb2Nvem5vaWo4ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yv55rpbfZ11zoFi3gN/giphy.gif)

## 📜 Descripción

**PokéShop** es una aplicación web interactiva desarrollada como solución a un reto técnico. Simula una tienda de comercio electrónico donde los usuarios pueden "comprar" Pokémon. La aplicación es puramente **frontend**, gestionando todo el estado (carrito, billetera y Pokémon adquiridos) en el lado del cliente a través del **Local Storage** del navegador.

Este proyecto demuestra la capacidad de consumir APIs de terceros, gestionar un estado complejo y crear una experiencia de usuario fluida y dinámica sin necesidad de un backend.

## 🔗 Demo en Vivo

Prueba la aplicación funcionando en el siguiente enlace:

**[https://poke-store-comuna18.vercel.app/](https://poke-store-comuna18.vercel.app/)**

---

## 🚀 Características Principales

| Característica               | Descripción                                                                                                   |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------ |
| **🛍️ Catálogo Dinámico**     | Carga Pokémon desde `PokeAPI` con **infinite scroll** para una navegación sin fin.                            |
| **🔍 Búsqueda**              | Formulario de busqueda para encontrar un Pokémon.                                                             |
| **💰 Sistema Multi-Moneda**  | Cada Pokémon tiene un precio aleatorio en una de 5 divisas (USD, EUR, MXN, JPY, GBP).                         |
| **💱 Conversión de Divisas** | El carrito de compras utiliza una API para convertir todos los precios a **MXN** en tiempo real.              |
| **👛 Billetera y Compras**   | Gestiona un saldo virtual, descuenta las compras y evita que adquieras Pokémon repetidos.                     |
| **💾 Persistencia de Datos** | Todo tu progreso (saldo, compras, carrito) se guarda en **Local Storage** para que no lo pierdas al recargar. |

## 🛠️ Tecnologías y APIs Utilizadas

- **Lenguaje:** JavaScript (ES6+)
- **Framework/Librería:** React, TanStack Router, TanStack Query
- **APIs Externas:**
  - [**PokeAPI**](https://pokeapi.co/): Para obtener los datos e imágenes de los Pokémon.
  - [**Frankfurter**](https://frankfurter.dev/): Para la conversión de tasas de cambio de divisas.
- **Estilos:** Tailwind CSS
- **Almacenamiento del Navegador:** Local Storage.

---

## ⚙️ Instrucciones de Instalación y Uso

Sigue estos pasos para ejecutar el proyecto en tu máquina local.

### **Pre-requisitos**

Asegúrate de tener [Node.js](https://nodejs.org/) instalado. Esto te permitirá usar `npm` (Node Package Manager).

### **Instalación**

1.  **Clona el repositorio:**
    Abre tu terminal y ejecuta el siguiente comando para clonar el proyecto.

    ```bash
    git clone https://github.com/diegopascual/poke-store-comuna18.git
    ```

2.  **Navega al directorio del proyecto:**

    ```bash
    cd poke-store-comuna18
    ```

3.  **Instala las dependencias:**

    ```bash
    npm install
    ```

4.  **Ejecuta el proyecto:**

    ```bash
    npm start
    ```

    ¡Después de ejecutar el comando, la aplicación debería abrirse automáticamente en tu navegador en una dirección como `http://localhost:3000`\!

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

- **GitHub:** [@diegopascual](https://github.com/diegopascual)
- **LinkedIn:** [Diego Pascual](https://www.linkedin.com/in/diegopascualh/)
