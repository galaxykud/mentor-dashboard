export const readLocation = () => {
  // Hash routes let GitHub Pages serve direct links without a server fallback.
  const route = window.location.hash.startsWith("#/")
    ? window.location.hash.slice(1)
    : window.location.pathname + window.location.search;
  const url = new URL(route, window.location.origin);
  return { pathname: url.pathname, searchParams: url.searchParams };
};
