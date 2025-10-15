import { callApi } from "@/utils/callApi";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  return useQuery({
    queryKey: ["user-metadata"],
    queryFn: async () => {
      const res = await callApi.get("/auth/me");
      return res.data;
    },
    staleTime: Infinity,
  });
}
