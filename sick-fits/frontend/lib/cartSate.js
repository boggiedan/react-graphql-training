import { createContext, useCallback, useContext, useState } from 'react';

const defaultValue = {
  isOpen: false,
  toggle: () => null,
  open: () => null,
  close: () => null,
};

const CartLocalStateContext = createContext(defaultValue);

const CartLocalStateProvider = CartLocalStateContext.Provider;

const CartStateProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => setIsOpen((current) => !current), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <CartLocalStateProvider
      value={{
        isOpen,
        toggle,
        open,
        close,
      }}
    >
      {children}
    </CartLocalStateProvider>
  );
};

// Make a custom hook for accessing the cart local state
export const useCart = () => useContext(CartLocalStateContext);

export default CartStateProvider;
