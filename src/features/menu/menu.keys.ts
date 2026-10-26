export const menuKeys = {
  all: ["menu"] as const,
  sidebar: () => [...menuKeys.all, "sidebar"] as const,
  lists: () => [...menuKeys.all, "list"] as const,
};
