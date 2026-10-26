import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "@/components/ui/button";
import type { AlertOptions } from "@/stores/overlay.type";

type AlertDialogViewProps = {
  message: string;
  options: AlertOptions;
  onClose: () => void;
};

/** 공통 alert */
export function AlertDialogView({
  message,
  options,
  onClose,
}: AlertDialogViewProps) {

  return (
    <AlertDialog.Root open onOpenChange={(open) => !open && onClose()}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-70 bg-black/40" />
        <AlertDialog.Content className="fixed inset-x-4 top-1/2 z-70 mx-auto max-w-sm -translate-y-1/2 rounded-md bg-surface shadow-overlay">
          <div className="px-5 pt-5 pb-4">
            <AlertDialog.Title className={options.title ? "mb-2 text-md font-medium" : "sr-only"}>
              {options.title ?? "알림"}
            </AlertDialog.Title>
            <AlertDialog.Description className="text-base whitespace-pre-line text-fg-secondary">
              {message}
            </AlertDialog.Description>
          </div>
          <div className="mx-5 flex justify-end border-t border-line py-3">
            <AlertDialog.Action asChild>
              <Button variant="primary-solid">
                {options.confirmText ?? "확인"}
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
