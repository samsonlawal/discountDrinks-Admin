"use client";
import { useState } from "react";
import { useOutsideClick } from "./useOutsideClick";

const useSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick(() => setIsOpen(false));
  const onOpen = () => setIsOpen(!isOpen);

  return { ref, onOpen, isOpen };
};

export { useSelect };
