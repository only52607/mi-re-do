import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
} from "vue-router";
import routes from "./routes";
import path from "path-browserify";

export function filterRoutes(routes: RouteRecordRaw[], baseUrl = "") {
  return routes
    .filter((route: RouteRecordRaw) => {
      return true;
    })
    .map((route: RouteRecordRaw) => {
      if (!route.meta) route.meta = {};
      route.meta!.fullPath = route.path.startsWith("/")
        ? route.path
        : path.resolve(baseUrl, route.path);
      if (!route.meta!.title && route.name) {
        route.meta!.title = route.name.toString();
      }
      if (route.children) {
        route.children = filterRoutes(route.children, route.meta.fullPath);
      }
      return route;
    });
}

export function flatternRoutes(routes: RouteRecordRaw[]) {
  const result: RouteRecordRaw[] = [];
  routes
    .filter((route: RouteRecordRaw) => {
      if (route.meta?.hiddien && route.meta?.hiddien == true) return false;
      return true;
    })
    .forEach((route: RouteRecordRaw) => {
      if (
        route.meta?.flattened &&
        route.meta?.flattened == true &&
        route.children &&
        route.children.length != 0
      ) {
        result.push(...flatternRoutes(route.children));
      } else {
        result.push(route);
      }
    });
  return result;
}

export const filtedRoutes = filterRoutes(routes);

export { filtedRoutes as routes };

// 使用hash模式方便无服务器部署
export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), //createWebHistory(import.meta.env.BASE_URL),
  routes: filtedRoutes,
});