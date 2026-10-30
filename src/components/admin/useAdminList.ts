"use client";

import { useCallback, useEffect, useState } from "react";
import { apiRequest, toQueryString, type Paginated } from "@/lib/api-client";

/**
 * Loads one page of an admin list endpoint and reloads whenever the query changes.
 * Stale responses from superseded queries are discarded.
 */
export function useAdminList<T>(
  endpoint: string,
  params: Record<string, string | number | undefined>,
  onError: (error: unknown) => void
) {
  const query = toQueryString(params);
  const [data, setData] = useState<Paginated<T> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isCurrent = true;
    setIsLoading(true);

    apiRequest<Paginated<T>>(`${endpoint}${query}`)
      .then((result) => {
        if (isCurrent) setData(result);
      })
      .catch((error) => {
        if (isCurrent) onError(error);
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
    // onError is intentionally excluded so an inline callback doesn't refetch every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, query, reloadKey]);

  const reload = useCallback(() => setReloadKey((key) => key + 1), []);

  return { data, isLoading, reload };
}
