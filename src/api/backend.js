import axios from "axios";

export function authorizeUser(authCode) {
  return axios({
    method: "POST",
    url: "/api/authorize",
    data: {
      auth_code: authCode,
    },
    headers: { "X-Requested-With": "XMLHttpRequest" },
  });
}
