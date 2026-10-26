// 어드민 메뉴
export type AdminMenu = {
  menuId: string;             // 메뉴 ID
  parentId: string | null;    // 상위 메뉴 ID
  menuName: string;           // 메뉴명
  menuPath: string | null;    // 메뉴 경로
  sortOrder: number;          // 정렬 순서
  enabled: boolean;           // 사용 여부
  updatedAt: string;          // 수정일시
  children: AdminMenu[];      // 하위 메뉴
};

// 메뉴 등록 및 수정 요청
export type AdminMenuRequest = {
  menuId: string;             // 메뉴 ID
  parentId: string | null;    // 상위 메뉴 ID
  menuName: string;           // 메뉴명
  menuPath: string | null;    // 메뉴 경로
  sortOrder: number;          // 정렬 순서
  enabled: boolean;           // 사용 여부
};
