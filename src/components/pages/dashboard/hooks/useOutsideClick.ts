import { useEffect, useRef } from "react";

// export const useOutsideClick = <T>(callback: Function) => {
//   const ref = useRef<T | HTMLDivElement>(null);

export const useOutsideClick = (callback: Function) => {
  const ref = useRef<HTMLDivElement | HTMLButtonElement>(null);

  useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref]);

  return ref;
};
