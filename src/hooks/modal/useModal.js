// useModal.js
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function useModal() {
  const openModal = (modalId) => {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
      modalInstance.show();
    }
  };

  const closeModal = (modalId) => {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      // Usa getOrCreateInstance para asegurarte de obtener la instancia del modal
      const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
      modalInstance.hide();
    }
  };

  return { openModal, closeModal };
}
