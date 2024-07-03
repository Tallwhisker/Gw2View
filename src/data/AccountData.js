const tokenURL = "https://api.guildwars2.com/v2/tokeninfo?access_token="
const accountURL = "https://api.guildwars2.com/v2/account?access_token="
let tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));

function getApiKey() {
  if (tokenInfo) return tokenInfo.id;
  return "";
};

function checkPermission( input ) {
  if (tokenInfo) return tokenInfo.permissions.includes(input);
  return false;
};


function getAccountData( apiKey ) {
  fetch(accountURL + apiKey)
  .then(res => {
    if (!res.ok) {
        throw Error(res.status);
    }
    return res.json();
})
  .then(data => {
    localStorage.setItem("accountInfo", JSON.stringify(data));
  })
  .catch(err => {
    console.log("AccountData Error: " + err);
})
};

function getAccountPermissions( apiKey ) {
  fetch(tokenURL + apiKey)
  .then(res => {
    if (!res.ok) {
        throw Error(res.status);
    }
    return res.json();
  })
  .then(data => {
    data.id = apiKey;
    localStorage.setItem("tokenInfo", JSON.stringify(data));
    tokenInfo = data;
  })
  .catch(err => {
    console.log("AccountPermission Error: " + err);
  })
};

export {
  checkPermission,
  getApiKey,
  getAccountData,
  getAccountPermissions,
}