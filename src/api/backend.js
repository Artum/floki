import axios from "axios";

import store from "../redux/store";

export function isUserAuthorized() {
  return axios({
    method: "GET",
    url: "/api/user/authorize",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: `Bearer ${store.getState().userAuthentication.accessToken}`,
      "content-type": "application/json",
    },
  });
}

export function authorizeUser(authCode) {
  return axios({
    method: "POST",
    url: "/api/user/authorize",
    data: {
      auth_code: authCode,
    },
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: `Bearer ${store.getState().userAuthentication.accessToken}`,
      "content-type": "application/json",
    },
  });
}

export function loginUser(userId, idToken, fullName, firstName, lastName, email) {
  return axios({
    method: "POST",
    url: "/api/user/login",
    data: {
      user_id: userId,
      id_token: idToken,
      full_name: fullName,
      first_name: firstName,
      last_name: lastName,
      email,
    },
    headers: { "X-Requested-With": "XMLHttpRequest", "content-type": "application/json" },
  });
}


export function getDocuments() {
  return axios({
    method: "GET",
    url: "/api/document/",
    headers: {
      "Authorization": `Bearer ${store.getState().userAuthentication.accessToken}`,
    },  
  });

}


export function getDocument(id) {
  return axios({
    method: "GET",
    url: `/api/document/${id}`,
    headers: {
      "Authorization": `Bearer ${store.getState().userAuthentication.accessToken}`,
    },  
  });
}

export function getDocumentContent(id) {
  return axios({
    method: "GET",
    url: `/api/document/${id}/content`,
    headers: {
      "Authorization": `Bearer ${store.getState().userAuthentication.accessToken}`,
    },  
  });
}

export function uploadDocument(file, onUploadProgress) {
  let formData = new FormData();

  formData.append("file", file);

  return axios({
    method: "POST",
    url: "api/document/upload", 
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${store.getState().userAuthentication.accessToken}`,
    },
    onUploadProgress: onUploadProgress,
  });
}