import React, { useEffect, useRef } from "react";
import axios from "axios";

const WompiButton = ({ amount }) => {
  const buttonContainerRef = useRef(null);
  const publicKey = import.meta.env.VITE_APP_WOMPI_PUBLIC_KEY;
  useEffect(() => {
    const loadWompiWidget = async () => {
      // Convertimos el monto a centavos (Wompi espera el monto en centavos)
      const amountInCents = parseInt(amount, 10) * 100;
      // Generamos una referencia única basada en la fecha actual
      const reference = Date.now().toString();

      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/wompi/integrity-signature`,
          {
            reference,
            amountInCents,
            currency: "COP",
          }
        );
        console.log(data, "data");
        // Creamos el elemento script para cargar el widget de Wompi
        const script = document.createElement("script");
        script.src = "https://checkout.wompi.co/widget.js";
        script.setAttribute("data-render", "button");
        script.setAttribute("data-public-key", publicKey);
        script.setAttribute("data-currency", "COP");
        script.setAttribute("data-amount-in-cents", amountInCents.toString());
        script.setAttribute("data-reference", reference);
        script.setAttribute("data-signature:integrity", data);
        script.setAttribute(
          "data-redirect-url",
          `${window.location.origin}/payment/result`
        );
        // Marcamos el script como asíncrono para que no bloquee la carga de la página
        script.async = true;

        buttonContainerRef.current.innerHTML = "";
        buttonContainerRef.current.appendChild(script);
      } catch (error) {
        console.error("Error cargando el widget de wompi:", error);
      }
    };

    loadWompiWidget();
  }, [amount, publicKey]);

  return <div ref={buttonContainerRef} className="my-3"></div>;
};

export default WompiButton;
