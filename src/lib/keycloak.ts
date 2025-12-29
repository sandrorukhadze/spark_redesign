import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  realm: import.meta.env.VITE_APP_REALM,
  clientId: import.meta.env.VITE_APP_CLIENT_ID,
  url: import.meta.env.VITE_APP_KEY_CLOAK_URL,
});

export default keycloak;
