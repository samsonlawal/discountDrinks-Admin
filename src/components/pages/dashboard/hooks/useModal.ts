import { useState } from "react";

const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const toggleClose = (): void => {
    document.body.classList.remove("h-screen");
    document.body.classList.remove("overflow-hidden");
    setShowModal(false);
  };

  const toggleOpen = (): void => {
    document.body.classList.add("h-screen");
    document.body.classList.add("overflow-hidden");
    setShowModal(true);
  };

  return { toggleOpen, toggleClose, showModal };
};

export { useModal };
