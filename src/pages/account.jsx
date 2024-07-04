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

    // if (isValid) {
        return (
            <section className="container d-flex flex-column align-items-center">
                <AccountName />
                {apiForm(setValid)}
            </section>
        );
    // }
    // return (
    //     <>
    //     <section className="container d-flex flex-column align-items-center">
    //         {apiForm(setValid)}
    //     </section>
    //     </>
    // );
};

function apiForm(setValid) {
    const [ apiKey, setApiKey] = useState(getApiKey());

    const handleSubmit = (event) => {
        event.preventDefault();
        if (apiKey == "testmode") {
            alert('Not yet implemented.');
            getAccountData(apiKey);
            getAccountPermissions(apiKey);
            coldStart();
            setTimeout(() => {setValid(true)},1000);
            
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
                        setTimeout(() => {setValid(true)},1000);
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
            <div className="d-flex justify-content-between">
                <button 
                type="submit" 
                className="btn btn-primary"
                >
                    Submit
                </button>
                <ResetData setValid={setValid} />
            </div>
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
};

function ResetData({setValid}) {
    function Reset() {
        localStorage.clear();
        setValid(() => false)
    }

    return (
        <>
        <button type="button" class="btn btn-warning" 
        data-bs-toggle="modal" data-bs-target="#exampleModal">
        Reset data
        </button>
        <div class="modal fade" id="exampleModal" tabindex="-1" 
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Reset Data?</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" 
                aria-label="Close"></button>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" 
                data-bs-dismiss="modal">
                    Abort Mission!
                </button>

                <button type="button" class="btn btn-danger"
                data-bs-dismiss="modal" onClick={() => {Reset()}}>
                    RESET
                </button>
            </div>
            </div>
        </div>
        </div>
        </>

    );
}