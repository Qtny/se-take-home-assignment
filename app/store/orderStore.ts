import { create } from "zustand";

export interface OrderState {
  pendingOrders: CustomerOrder[];
  completedOrders: CustomerOrder[];
  addOrder: (order: CustomerOrder) => void;
  addVipOrder: (order: CustomerOrder) => void;
  startOrder: (id: number) => void;
  completeOrder: (id: number) => void;
  cancelOrder: (id: number) => void;
}

export const useOrderStore = create<OrderState>()((set) => ({
  pendingOrders: [],
  completedOrders: [],
  addOrder: (order) =>
    set((state) => ({ pendingOrders: [...state.pendingOrders, order] })),
  addVipOrder: (order) =>
    set((state) => {
      return {
        pendingOrders: [
          ...state.pendingOrders.filter((o) => o.type === "vip"),
          order,
          ...state.pendingOrders.filter((o) => o.type === "normal"),
        ],
      };
    }),
  startOrder: (id) =>
    set((state) => {
      const target = state.pendingOrders.find((o) => o.id === id);
      const idx = state.pendingOrders.indexOf(target!);

      return {
        pendingOrders: [
          ...state.pendingOrders.slice(0, idx),
          {
            id: target!.id,
            status: "processing",
            type: target!.type,
          },
          ...state.pendingOrders.slice(idx + 1),
        ],
      };
    }),
  completeOrder: (id) =>
    set((state) => {
      const target = state.pendingOrders.find((o) => o.id === id);
      const idx = state.pendingOrders.indexOf(target!);

      return {
        pendingOrders: [
          ...state.pendingOrders.slice(0, idx),
          ...state.pendingOrders.slice(idx + 1),
        ],
        completedOrders: [
          ...state.completedOrders,
          {
            id: target!.id,
            status: "completed",
            type: target!.type,
          },
        ],
      };
    }),
  cancelOrder: (id) =>
    set((state) => {
      const target = state.pendingOrders.find((o) => o.id === id);
      const idx = state.pendingOrders.indexOf(target!);

      return {
        pendingOrders: [
          ...state.pendingOrders.slice(0, idx),
          {
            id: target!.id,
            status: "pending",
            type: target!.type,
          },
          ...state.pendingOrders.slice(idx + 1),
        ],
      };
    }),
}));
