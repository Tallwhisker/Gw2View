import { useState } from "react";
import { coldStart } from "../data/ItemData";
import { 
    getAccountData, 
    getAccountPermissions, 
    getApiKey, 
    checkPermission
} from "../data/AccountData";

export default function Account() {
    const [ isValid, setValid ] = useState(checkPermission("account"));

    if (isValid) {
        return (
            <section className="container d-flex flex-column align-items-center">
                <AccountName />
                {apiForm(setValid)}
            </section>
        );
    }
    return (
        <>
        <section className="container d-flex flex-column align-items-center">
            {apiForm(setValid)}
        </section>
        </>
    );
};

function apiForm(setValid) {
    const [ apiKey, setApiKey] = useState(getApiKey());

    const handleSubmit = (event) => {
        event.preventDefault();
        if (apiKey == "testmode") {
            alert('Not yet implemented.');
            //implement testdata
            
        } else if (apiKey.length < 70) {
            alert('Key too short, try again');

        } else {
            try {
                checkAPIKey(apiKey)
                .then(resolved => {
                    if (resolved == "ok") {
                        getAccountData(apiKey);
                        getAccountPermissions(apiKey);
                        coldStart();
                        setTimeout(() => {setValid(true)},1000)
                        return;
                    };

                    alert(`Error code: ${resolved}`)
                })
            } catch(err) {
                alert(err);
                console.log("catch?");
            };
        }
    };

    return (
        <form 
        onSubmit={handleSubmit}
        className="m-4 px-5 py-4 border"
        >
            <div className="mb-3 mt-3">
                <label htmlFor="authToken" className="form-label">API Key</label>
                <input 
                className="form-control px-5" 
                id="authToken" 
                type="text" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                />
            </div>
            <button 
            type="submit" 
            className="btn btn-primary">Submit</button>
        </form>
    );
};

async function checkAPIKey( apiKey ) {
    const response = await fetch("https://api.guildwars2.com/v2/tokeninfo?access_token="+apiKey);
    if (response.status == 401) return "Invalid token";
    if (response.ok) return "ok";
    
    return response.status;
};


function AccountName() {
    if (localStorage.getItem("accountInfo")) {
        const accountInfo = JSON.parse(localStorage.getItem("accountInfo"));
        
        return (
            <h3
            className="px-5 py-4 m-4 border">
                { accountInfo.name }
            </h3>
        );
    } else return ;
}