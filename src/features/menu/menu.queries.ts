import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMenu, getMenus, getSidebarMenus, updateMenu } from "./menu.api";
import { menuKeys } from "./menu.keys";
import type { AdminMenuRequest } from "./menu.type";

/** 사이드바 메뉴 조회 query */
export function useSidebarMenusQuery() {

  return useQuery({
    queryKey: menuKeys.sidebar(),
    queryFn: getSidebarMenus,
    staleTime: 5 * 60_000,
  });
}

/** 전체 메뉴 조회 query */
export function useGetMenusQuery() {

  return useQuery({
    queryKey: menuKeys.lists(),
    queryFn: getMenus,
    meta: { loading: true },
  });
}

/** 메뉴 등록 mutation */
export function useCreateMenuMutation() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMenu,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: menuKeys.all }),
  });
}

/** 메뉴 수정 mutation */
export function useUpdateMenuMutation() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ menuId, body }: { menuId: string; body: AdminMenuRequest }) =>
      updateMenu(menuId, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: menuKeys.all }),
  });
}
