export default function authUserHeader() {
  const userHeader = JSON.parse(localStorage.getItem("user"));

  if (userHeader && userHeader.accessToken) {
    // checks if the JSON access token comes from the Node.js Back-end server and if it is valid.
    return { "x-access-token": userHeader.accessToken };
  } else {
    return {};
  }
}
