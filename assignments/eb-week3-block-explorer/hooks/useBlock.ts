import { useQuery } from "@tanstack/react-query";
import apiClient from "~/lib/apiClient";

export default function useBlock(blockNumber: number) {
  const query = useQuery(["block", blockNumber], () =>
    apiClient.getBlock(blockNumber)
  );
  return query;
}
