import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { RequestOptions } from "@/lib/api/api.type";
import { LOGIN_PATH } from "@/lib/utils/redirect";
import { getMe, login, logout } from "./auth.api";
import { authKeys } from "./auth.keys";

/** 내 정보 조회 query */
export function useMeQuery(options: RequestOptions = {}) {

  return useQuery({
    queryKey: authKeys.me,
    queryFn: () => getMe(options),
    staleTime: 5 * 60_000,
    meta: { loading: options.loading ?? true },
  });
}

/** 로그인 mutation */
export function useLoginMutation() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (me) => queryClient.setQueryData(authKeys.me, me),
  });
}

/** 로그아웃 mutation */
export function useLogoutMutation() {

  return useMutation({
    mutationFn: logout,
    onSuccess: () => window.location.replace(LOGIN_PATH),  // 캐시·store 초기화
  });
}
