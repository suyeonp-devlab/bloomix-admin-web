import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** className 관련 유틸 */

// 커스텀 class token 등록
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["xs", "sm", "base", "md", "lg", "xl"] }],
    },
  },
});

// className 조합 (충돌 시 뒤의 값 우선)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
