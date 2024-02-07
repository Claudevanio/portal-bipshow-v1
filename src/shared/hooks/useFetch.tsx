import { baseUrl } from '@/constants';
import { api, apiTokeUser } from "@/services";
import { useState } from "react";
import useSWR from "swr";

export function useFetch<Data = any>(path: string, typeInfo: "site" | "user") {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const url = `${baseUrl}/${path}`;

  const { data, error } = useSWR<Data, Error>(`${url}`, async () => {
      const { data } =
        typeInfo === "site"
          ? ((await api.get(path)) as { data: Data })
          : ((await apiTokeUser.get(path)) as { data: Data });
      
      setIsLoading(false)
      return data;
    },
    {
      errorRetryCount: 1,
      shouldRetryOnError: true,
      errorRetryInterval: 300,
    }
  );

  return { data, isLoading, error };
}
