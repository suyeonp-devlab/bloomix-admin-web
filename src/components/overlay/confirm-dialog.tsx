import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "@/components/ui/button";
import type { ConfirmOptions } from "@/stores/overlay.type";

type ConfirmDialogViewProps = {
  message: string;
  options: ConfirmOptions;
  onResult: (ok: boolean) => void;
};

/** 공통 confirm */
export function ConfirmDialogView({
  message,
  options,
  onResult,
}: ConfirmDialogViewProps) {

  const danger = options.tone === "danger";

  return (
    <AlertDialog.Root open onOpenChange={(open) => !open && onResult(false)}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-70 bg-black/40" />
        <AlertDialog.Content className="fixed inset-x-4 top-1/2 z-70 mx-auto max-w-sm -translate-y-1/2 rounded-md bg-surface shadow-overlay">
          <div className="px-5 pt-5 pb-4">
            <AlertDialog.Title className={options.title ? "mb-2 text-md font-medium" : "sr-only"}>
              {options.title ?? "확인"}
            </AlertDialog.Title>
            <AlertDialog.Description className="text-base whitespace-pre-line text-fg-secondary">
              {message}
            </AlertDialog.Description>
          </div>
          <div className="mx-5 flex justify-end gap-2 border-t border-line py-3">
            <AlertDialog.Cancel asChild>
              <Button variant="secondary">
                {options.cancelText ?? "취소"}
              </Button>
            </AlertDialog.Cancel>
            <Button variant={danger ? "danger-solid" : "primary"} onClick={() => onResult(true)}>
              {options.confirmText ?? "확인"}
            </Button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
