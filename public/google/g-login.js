let backEndUrl = "https://soudharoon.wmdd4950.com";

const redirection_uri =
  "https://soudharoon.wmdd4950.com/Code-Flow/google/dashboard.html";

// change your redirect uri and backend service url above.

document.addEventListener("DOMContentLoaded", async function () {
  if (document.location.href.includes("code")) {
    // Retrieve code from url.
    let params = new URLSearchParams(location.search);
    let code = params.get("code");

    //  Make a call to backend service to verify code and exchange it for access token.
    let access_token = await getAccessToken(code);

    // WE RECEIVED THE TOKEN ON OUR FRONTEND, BUT THIS TIME THROUGH BACKEND SERVICE AND NOT IN A URL.

    // Call to resource server
    let json = await api_call(access_token);

    render_page(json);
  }
});

async function getAccessToken(code) {
  let api_result = await fetch(
    `${backEndUrl}/validateCode?code=${code}&uri=${redirection_uri}`
  );

  if (api_result.status == 200) {
    let response = await api_result.json();

    console.log(response);

    return response.access_token;
  } else if (api_result.status == 400) {
    let errorMessage = await api_result.json().message;
    alert(errorMessage);
  }
}

async function api_call(token) {
  if (token) {
    let api_result = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return await api_result.json();
  }
}

function render_page(myJson) {
  console.log(myJson);

  document.body.classList.add("loggedIn");

  userinfo.innerText = `Welcome, ${myJson.name}`;
  userpic.src = myJson.picture;
}
