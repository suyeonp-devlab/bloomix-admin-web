import { useQuery } from "@tanstack/react-query";
import { getSidebarMenus } from "./menu.api";
import { menuKeys } from "./menu.keys";

/** 사이드바 메뉴 조회 query */
export function useSidebarMenusQuery() {

  return useQuery({
    queryKey: menuKeys.sidebar,
    queryFn: getSidebarMenus,
    staleTime: 5 * 60_000,
  });
}
