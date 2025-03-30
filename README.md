# Marketplace con Vite + React

Esta aplicación es un **Marketplace** diseñado con Vite y React, que ofrece una arquitectura modular y de alto rendimiento. En ella, podrás encontrar una gran variedad de productos y aprovechar funcionalidades avanzadas como un chatbot integrado (basado en n8n) y una pasarela de pago segura con Wompi, proporcionando una experiencia de compra ágil y confiable.


## Características

- **Frontend moderno y rápido:** Utiliza Vite y React para un desarrollo ágil y una experiencia de usuario fluida.
- **Chatbot con n8n:** Integración de chatbot que aprovecha los potentes flujos de trabajo de [n8n](https://n8n.io/) para automatizar respuestas y mejorar la interacción con los usuarios, en este marketplace se utiliza para darle respuesta sobre los productos disponibles.
- **Pasarela de pago con Wompi:** Implementa la pasarela de pago Wompi para procesar transacciones de manera segura y eficiente, con integración dinámica del widget de pago.
- **Gestión de estado:** Uso de Redux Toolkit para un manejo centralizado y predecible del estado.
- **Notificaciones:** Implementa [React Toastify](https://fkhadra.github.io/react-toastify/) para proporcionar feedback inmediato a los usuarios.

## Tecnologías Utilizadas

- [Vite](https://vitejs.dev/) – Herramienta de construcción rápida para proyectos frontend.
- [React](https://reactjs.org/) – Biblioteca para construir interfaces de usuario.
- [Redux Toolkit](https://redux-toolkit.js.org/) – Gestión de estado en la aplicación.
- [n8n](https://n8n.io/) – Plataforma de automatización y chatbot.
- [Wompi](https://wompi.co/) – Pasarela de pago segura.
- [Axios](https://axios-http.com/) – Cliente HTTP para realizar solicitudes a la API.
- [React Router](https://reactrouter.com/) – Enrutamiento declarativo en React.
- [React Toastify](https://fkhadra.github.io/react-toastify/) – Biblioteca para mostrar notificaciones.

## Despliegue

Esta aplicación se despliega en **Netlify**([text](https://magicmarketplaces.netlify.app/)), lo que permite una integración continua y despliegues automáticos cada vez que se actualiza el repositorio.

## Variables de Entorno

La aplicación requiere que se configuren las siguientes variables de entorno para funcionar correctamente:

- `VITE_APP_N8N_URL` – URL de la instancia de n8n utilizada para el chatbot.
- `VITE_APP_WOMPI_PUBLIC_KEY` – Clave pública para la integración de la pasarela de pago Wompi.
- `VITE_BACKEND_URL` – URL del backend que provee la API para la aplicación.

Para configurar estas variables en tu entorno local, crea un archivo `.env` en la raíz del proyecto con el siguiente formato:

.env
VITE_APP_N8N_URL=tu_url_n8n
VITE_APP_WOMPI_PUBLIC_KEY=tu_clave_publica_de_wompi
VITE_BACKEND_URL=tu_url_backend

## Instalación y Configuración

- Requisitos
- Node.js (v14 o superior)
- npm o yarn

## Instalación
- Clona el repositorio: 
git clone https://github.com/jpbuelvas/frontend-marketplace
cd frontend-marketplace

## Ejecución en Desarrollo
npm run dev
# o
yarn dev
La aplicación estará disponible en http://localhost:5173 (o el puerto configurado).

## Compilación para Producción
npm run build
# o
yarn build

## Estructura del Proyecto
├── node_modules
├── public
├── src
│   ├── assets
│   ├── components
│   │   ├── banner
│   │   ├── cart
│   │   ├── chatbot
│   │   ├── filter
│   │   ├── footer
│   │   ├── input
│   │   ├── loader
│   │   ├── navbar
│   │   └── product
│   ├── constants
│   ├── hooks
│   ├── pages
│   │   ├── cart
│   │   ├── home
│   │   ├── login
│   │   ├── orders
│   │   ├── payment
│   │   ├── product
│   │   └── register
│   ├── redux
│   ├── utils
│   ├── App.jsx
│   └── main.jsx
├── .env
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── index.html
├── package.json
├── postcss.config.js
├── README.md
└── vite.config.js

## Integración del Chatbot con n8n
El chatbot está implementado aprovechando n8n, que permite crear flujos de trabajo automatizados. Con esta integración, el sistema puede responder a consultas de los usuarios y ejecutar procesos automatizados para mejorar la interacción y la eficiencia.

## Integración del Chatbot con n8n

La integración con Wompi se gestiona a través del componente WompiButton.jsx, que:

- Convierte el monto a centavos (ya que Wompi requiere el monto en centavos).
- Genera una referencia única utilizando la marca de tiempo.
- Solicita al backend una firma de integridad para validar la transacción.
- Crea e inyecta dinámicamente el script del widget de Wompi en el DOM.
- Configura parámetros como la clave pública, la moneda y la URL de redirección.
Asegúrate de configurar correctamente las variables de entorno para que la integración funcione sin problemas.




