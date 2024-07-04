const demo_resources = [
    "./testdata/demo_account.json",
    "./testdata/demo_tokenin.json",
    "./testdata/demo_bank.json",
    "./testdata/demo_materials.json",
    "./testdata/demo_char1.json",
    "./testdata/demo_char2.json",
    "./testdata/demo_char3.json"
];


export default function TestMode() {

};


async function fetchDemoData( url ) {
    const response = await fetch(url)
    if (!response.ok) {
        throw Error(response.status);
    }

    return await response.json();
};

//Fetch demo_account
//Fetch demo_bank
//Fetch demo_char1
//Fetch demo_char2
//Fetch demo_char3
//Fetch demo_materials
//Fetch demo_bank
//Fetch demo_tokeninfo
