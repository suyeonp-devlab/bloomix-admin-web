import type { ReactNode } from "react";
import { create } from "zustand";
import type {
  AlertItem,
  AlertOptions,
  ConfirmItem,
  ConfirmOptions,
  OverlayItem,
  PopupItem,
  PopupOptions,
} from "./overlay.type";

// overlay 식별자 순번
let seq = 0;

type OverlayState = {
  items: OverlayItem[];               // 열린 overlay 목록
  add: (item: OverlayItem) => void;   // overlay 추가
  remove: (id: number) => void;       // overlay 제거
};

/** overlay store */
export const useOverlayStore = create<OverlayState>((set) => ({
  items: [],
  add: (item) => set((s) => ({ items: [...s.items, item] })),
  remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
}));

/** overlay */
export const overlay = {
  // alert 표출
  alert(message: string, options: AlertOptions = {}): Promise<void> {

    const { add, remove } = useOverlayStore.getState();

    return new Promise((resolve) => {
      const id = ++seq;
      const item: AlertItem = {
        id, type: "alert", message, options,
        resolve: () => { remove(id); resolve(); },
      };
      add(item);
    });
  },

  // confirm 표출
  confirm(message: string, options: ConfirmOptions = {}): Promise<boolean> {

    const { add, remove } = useOverlayStore.getState();

    return new Promise((resolve) => {
      const id = ++seq;
      const item: ConfirmItem = {
        id, type: "confirm", message, options,
        resolve: (ok) => { remove(id); resolve(ok); },
      };
      add(item);
    });
  },

  // popup 표출
  open(title: string, content: ReactNode, options: PopupOptions = {}): number {
    const id = ++seq;
    const item: PopupItem = { id, type: "popup", title, content, options };
    useOverlayStore.getState().add(item);
    return id;
  },

  // popup 닫기 (id 없으면 가장 위 popup)
  close(id?: number) {
    const { items, remove } = useOverlayStore.getState();
    const target = id ?? items.findLast((i) => i.type === "popup")?.id;
    if (target !== undefined) remove(target);
  },
};
