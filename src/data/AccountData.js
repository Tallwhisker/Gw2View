const accountURL = "https://wiki.guildwars2.com/wiki/API:2/account/materials"
const authToken = localStorage.getItem("authToken");

function getAccountData( token ) {

  localStorage.setItem("authToken", token);
};

function accountPermission(permission) {
  if (localStorage.getItem("accountData")) {

  }

}

const accountInfo = {
    "id": `${authToken}`,
    "name": "All permissions",
    "permissions": [
      "tradingpost",
      "characters",
      "pvp",
      "progression",
      "wallet",
      "guilds",
      "builds",
      "account",
      "inventories",
      "unlocks"
    ]
}

export {
    accountInfo
}