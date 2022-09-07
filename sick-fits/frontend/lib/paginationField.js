import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // Tells Apollo we will take care of everything

    read(existing = [], { args, cache }) {
      // First thing it does when it runs is asks the read function for those items
      // We can either do one of two things:
      // First thing we can do is return the items because they are already in the cache
      // The other thing we can do is to return false from here (network request)

      const { skip, first } = args;
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      const items = existing.slice(skip, skip + first).filter((x) => x);

      if (items.length && items.length !== first && page === pages) {
        return items;
      }

      if (items.length !== first) {
        return false;
      }

      if (items.length) {
        return items;
      }

      return false;
    },
    merge(existing, incoming, { args }) {
      // This runs when the Apollo client comes back from the network with our product

      const { skip, first } = args;
      const merged = existing ? existing.slice(0) : [];

      for (let i = skip; i < skip + incoming.length; i++) {
        merged[i] = incoming[i - skip];
      }

      return merged;
    },
  };
}
