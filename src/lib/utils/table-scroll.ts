// 표 최대 표시 행 수 (넘으면 세로 스크롤)
export const TABLE_MAX_ROWS = 20;

// 표 헤더 높이(px)
const HEADER_HEIGHT = 36;

// 표 최대 높이(px) (헤더 + 최대 표시 행 수)
export function tableMaxHeight(rowHeight: number) {
  return HEADER_HEIGHT + rowHeight * TABLE_MAX_ROWS;
}
