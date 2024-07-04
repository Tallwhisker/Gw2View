const tokenURL = "https://api.guildwars2.com/v2/tokeninfo?access_token="
const accountURL = "https://api.guildwars2.com/v2/account?access_token="
let tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));

function getApiKey() {
    if (tokenInfo) return tokenInfo.id;
    return "";
};

function checkPermission(input) {
    if (tokenInfo) return tokenInfo.permissions.includes(input);
    return false;
};

function getAccountData(apiKey) {
    let target = accountURL + apiKey;
    if (apiKey == "testmode") {
        target="./testdata/demo_account.json";
    }

    fetch(target)
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

function getAccountPermissions(apiKey) {
    let target = tokenURL + apiKey;
    if (apiKey == "testmode") {
        target="./testdata/demo_tokeninfo.json";
    }

    fetch(target)
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

const isDemoMode = checkPermission("testmode"); //Defaults to false.
const demo_resources = [
    "./testdata/demo_account.json",
    "./testdata/demo_tokenin.json",
    "./testdata/demo_bank.json",
    "./testdata/demo_materials.json",
    "./testdata/demo_char1.json",
    "./testdata/demo_char2.json",
    "./testdata/demo_char3.json"
];

export {
    checkPermission,
    getApiKey,
    getAccountData,
    getAccountPermissions,
    isDemoMode
}