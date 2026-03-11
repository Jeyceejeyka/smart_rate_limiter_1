import type { ClientRequest, ClientResponse } from "@/types/api";
import { apiRequest } from "./apiClient";

export async function createClient(payload: ClientRequest, token: string) {
  return apiRequest<ClientResponse>("/clients", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}
