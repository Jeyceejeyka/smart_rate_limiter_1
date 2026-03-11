import { apiRequest } from "./apiClient";

export async function loginClient(name: string) {
  return apiRequest<string>(`/auth/login?name=${encodeURIComponent(name)}`, {
    method: "POST",
  });
}
