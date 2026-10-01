import { useEffect, useState, useCallback } from "react";
import { readLocation } from "../lib/routes";
const readRoute = () => {
  const { pathname, searchParams } = readLocation();
  return {
    page:
      pathname === "/students"
        ? "students"
        : pathname === "/calendar"
          ? "calendar"
          : "home",
    studentName: searchParams.get("student"),
  };
};
export default function useNavigation() {
  const [route, setRoute] = useState(readRoute);
  useEffect(() => {
    const sync = () => setRoute(readRoute());
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);
  const navigate = useCallback((url) => {
    history.pushState({}, "", import.meta.env.BASE_URL + "#" + url);
    setRoute(readRoute());
  }, []);
  const goPage = useCallback(
    (page) => {
      navigate(page === "home" ? "/" : "/" + page);
      window.scrollTo(0, 0);
    },
    [navigate],
  );
  return { ...route, navigate, goPage };
}
