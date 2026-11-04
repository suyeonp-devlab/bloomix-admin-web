import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, searchUsers, updateUserStatus } from "./user.api";
import { userKeys } from "./user.keys";
import type { UserListRequest, UserStatusRequest } from "./user.type";

/** 회원 목록 조회 query */
export function useSearchUsersQuery(params: UserListRequest) {

  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => searchUsers(params),
    placeholderData: keepPreviousData,
    meta: { loading: true },
  });
}

/** 회원 상세 조회 query */
export function useGetUserQuery(userId: string) {

  return useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => getUser(userId),
    meta: { loading: true },
  });
}

/** 회원 상태 변경 mutation */
export function useUpdateUserStatusMutation() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, body }: { userId: string; body: UserStatusRequest }) =>
      updateUserStatus(userId, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: userKeys.all }),
  });
}
