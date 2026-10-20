import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createGroup, getGroup, getOptions, searchGroups, updateGroup } from "./code.api";
import { codeKeys } from "./code.keys";
import type { CommonCodeGroupListRequest, CommonCodeGroupRequest } from "./code.type";

/** 코드 그룹 목록 조회 query */
export function useSearchGroupsQuery(params: CommonCodeGroupListRequest) {

  return useQuery({
    queryKey: codeKeys.list(params),
    queryFn: () => searchGroups(params),
    placeholderData: keepPreviousData,
    meta: { loading: true },
  });
}

/** 코드 그룹 상세 조회 query */
export function useGetGroupQuery(groupCode: string) {

  return useQuery({
    queryKey: codeKeys.detail(groupCode),
    queryFn: () => getGroup(groupCode),
    meta: { loading: true },
  });
}

/** 코드 그룹 + 코드 일괄 등록 mutation */
export function useCreateGroupMutation() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGroup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: codeKeys.lists() }),
  });
}

/** 코드 그룹 + 코드 일괄 수정 mutation */
export function useUpdateGroupMutation() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ groupCode, body }: { groupCode: string; body: CommonCodeGroupRequest }) =>
      updateGroup(groupCode, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: codeKeys.all }),
  });
}

/** 셀렉트박스용 코드 조회 query */
export function useGetOptionsQuery(groupCode: string) {

  return useQuery({
    queryKey: codeKeys.option(groupCode),
    queryFn: () => getOptions(groupCode),
    staleTime: 5 * 60_000,
  });
}
