import { useQuery } from "@tanstack/react-query";
import apiClient from "~/lib/apiClient";

export default function useLatestBlock() {
  const query = useQuery(
    ["blocks", "latest"],
    () => apiClient.getLatestBlock(),
    { keepPreviousData: true }
  );
  return query;
}
