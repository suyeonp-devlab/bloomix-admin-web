import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import type { PopupOptions } from "@/stores/overlay.type";

type PopupViewProps = {
  title: string;
  content: ReactNode;
  options: PopupOptions;
  onClose: () => void;
};

type PopupContentProps = {
  className?: string;
  children: ReactNode;
};

/** 공통 popup */
export function PopupView({
  title,
  content,
  options,
  onClose,
}: PopupViewProps) {

  const size = options.size ?? "md";
  const customWidth = typeof size === "number";

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 sm:p-10">
          <Dialog.Content
            aria-describedby={undefined}
            onInteractOutside={(e) => e.preventDefault()}
            style={customWidth ? { maxWidth: size } : undefined}
            className={cn(
              "flex max-h-full w-full flex-col rounded-md bg-surface shadow-overlay",
              !customWidth && SIZE_CLASS[size],
            )}
          >
            <div className="flex h-12 shrink-0 items-center justify-between border-b border-line pr-2 pl-5">
              <Dialog.Title className="truncate text-md font-medium">
                {title}
              </Dialog.Title>
              <Dialog.Close
                aria-label="닫기"
                className="flex size-8 items-center justify-center rounded-sm text-fg-muted hover:bg-subtle hover:text-fg"
              >
                <X size={16} aria-hidden="true" />
              </Dialog.Close>
            </div>
            {content}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/** 공통 popup content > 본문 (스크롤 영역) */
export function PopupBody({ className, children }: PopupContentProps) {

  return (
    <div className={cn("min-h-0 flex-1 overflow-y-auto px-5 py-4", className)}>
      {children}
    </div>
  );
}

/** 공통 popup content > 하단 (고정) */
export function PopupFooter({ className, children }: PopupContentProps) {

  return (
    <div className={cn("flex shrink-0 justify-end gap-2 border-t border-line px-5 py-3", className)}>
      {children}
    </div>
  );
}

// popup 크기별 className
const SIZE_CLASS: Record<"sm" | "md" | "lg", string> = {
  sm: "max-w-sm",
  md: "max-w-xl",
  lg: "max-w-3xl",
};
