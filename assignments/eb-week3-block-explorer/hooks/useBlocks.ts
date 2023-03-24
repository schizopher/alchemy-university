import { useQuery } from "@tanstack/react-query";
import apiClient from "~/lib/apiClient";

export default function useBlocks() {
  const query = useQuery(["blocks"], () => apiClient.getBlocks(), {
    keepPreviousData: true,
  });
  return query;
}
