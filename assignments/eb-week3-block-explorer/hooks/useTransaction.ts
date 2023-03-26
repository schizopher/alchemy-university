import { useQuery } from "@tanstack/react-query";
import apiClient from "~/lib/apiClient";

export default function useTransaction(hash: string) {
  const query = useQuery(["transaction", hash], () =>
    apiClient.getTransaction(hash)
  );
  return query;
}
