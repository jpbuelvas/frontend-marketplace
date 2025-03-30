import { useEffect, useRef } from "react";
// eslint-disable-next-line import/no-unresolved
import "@n8n/chat/style.css";
import { createChat } from "@n8n/chat";

const Chatbot = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      createChat({
        webhookUrl: import.meta.env.VITE_APP_N8N_URL,
        webhookConfig: {
          method: "POST",
          headers: {},
        },
        target: "#n8n-chat",
        mode: "window",
        chatInputKey: "chatInput",
        chatSessionKey: "sessionId",
        metadata: {},
        showWelcomeScreen: false,
        defaultLanguage: "es",
        initialMessages: [
          "¡Hola! 👋",
          "Mi nombre es Juan. ¿En qué puedo ayudarte hoy?",
        ],
        i18n: {
          es: {
            title: "Asistente Virtual",
            subtitle:
              "Inicia una conversación. Estamos aquí para ayudarte 24/7.",
            footer: "",
            getStarted: "Nueva Conversación",
            inputPlaceholder: "Escribe tu pregunta...",
          },
        },
      });
      initialized.current = true;
    }
  }, []);

  return (
    <>
      <div id="n8n-chat" />
      <style>
        {`
          /* Forzamos el color del texto y fondo en el input y textarea del chat */
          #n8n-chat input,
          #n8n-chat textarea {
            color: #000 !important;
            background-color: #fff !important;
          }
        `}
      </style>
    </>
  );
};

export default Chatbot;
