import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product) =>
        set((state) => {
          const isAlreadyAdded = state.cart.some(
            (item) => item.id === product.id
          );
          if (isAlreadyAdded) return state;
          return { cart: [...state.cart, product] };
        }),
      increaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0), // 0 quantity means remove from cart
        })),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "insight-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useCartStore;
