import { PopupBody, PopupFooter } from "@/components/overlay/popup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { overlay } from "@/stores/overlay-store";

type CellCopyPopupProps = {
  value: string;
};

/** 셀 값 복사 popup */
export function CellCopyPopup({ value }: CellCopyPopupProps) {

  // 클립보드 복사
  const handleCopy = async () => {

    try {
      await navigator.clipboard.writeText(value);
      overlay.close();
    } catch {
      await overlay.alert("복사하지 못했습니다.\n입력창의 값을 직접 복사해주세요.");
    }
  };

  return (
    <form
      className="contents"
      onSubmit={(e) => {
        e.preventDefault();
        void handleCopy();
      }}
    >
      <PopupBody>
        <Input
          autoFocus
          readOnly
          aria-label="복사할 값"
          value={value}
          onFocus={(e) => e.currentTarget.select()}
        />
      </PopupBody>
      <PopupFooter>
        <Button onClick={() => overlay.close()}>닫기</Button>
        <Button type="submit" variant="primary-solid">복사</Button>
      </PopupFooter>
    </form>
  );
}
