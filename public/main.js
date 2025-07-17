let g_client_id = "";

googleLogin.addEventListener("click", () => {
  // change your redirect uri here
  let redirect_uri = `https://soudharoon.wmdd4950.com/Code-Flow//google/dashboard.html`;

  let auth_url = `https://accounts.google.com/o/oauth2/v2/auth`;
  let scopes = ["email", "profile", "openid"];

  let params = [
    `client_id=${g_client_id}`,
    `redirect_uri=${redirect_uri}`,
    `response_type=code`,
    `scope=${scopes.toString().replaceAll(",", " ")}`,
    `prompt=consent select_account`,
  ].join("&");

  document.location.href = `${auth_url}?${params}`;
});
