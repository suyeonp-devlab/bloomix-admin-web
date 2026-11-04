import type { UserListRequest } from "./user.type";

export const userKeys = {
  all: ["user"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (params: UserListRequest) => [...userKeys.lists(), params] as const,
  detail: (userId: string) => [...userKeys.all, "detail", userId] as const,
};
