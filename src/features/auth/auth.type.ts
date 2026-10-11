// 로그인 요청
export type LoginRequest = {
  adminId: string;     // 관리자 아이디
  password: string;    // 비밀번호
};

// 로그인 응답
export type LoginResponse = {
  adminId: string;     // 관리자 아이디
  adminName: string;   // 관리자 이름
};

// 내 정보 응답
export type MeResponse = {
  adminId: string;     // 관리자 아이디
  adminName: string;   // 관리자 이름
};
