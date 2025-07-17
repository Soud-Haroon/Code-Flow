let g_client_id =
  "865031176566-ngpu8ter8qkaqqp01pftlebkbcucv3l8.apps.googleusercontent.com";

googleLogin.addEventListener("click", () => {
  // change your redirect uri here
  let redirect_uri = `http://localhost:5500/google/dashboard.html`;

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
