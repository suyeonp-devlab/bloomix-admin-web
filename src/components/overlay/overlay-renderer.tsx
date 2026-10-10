"use client";

import { useOverlayStore } from "@/stores/overlay-store";
import { AlertDialogView } from "./alert-dialog";
import { ConfirmDialogView } from "./confirm-dialog";
import { PopupView } from "./popup";

/**
 * overlay 렌더링
 * - z-index: popup 50 < loading 60 < alert/confirm 70
 */
export function OverlayRenderer() {

  const items = useOverlayStore((s) => s.items);
  const remove = useOverlayStore((s) => s.remove);

  return items.map((item) => {
    switch (item.type) {
      case "alert":
        return (
          <AlertDialogView
            key={item.id}
            message={item.message} options={item.options}
            onClose={() => item.resolve()}
          />
        );
      case "confirm":
        return (
          <ConfirmDialogView
            key={item.id}
            message={item.message} options={item.options}
            onResult={(ok) => item.resolve(ok)}
          />
        );
      case "popup":
        return (
          <PopupView
            key={item.id}
            title={item.title} content={item.content} options={item.options}
            onClose={() => remove(item.id)}
          />
        );
    }
  });
}
