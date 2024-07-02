import { useState } from "react";
import { 
    getAccountData, 
    getAccountPermissions, 
    getApiKey, 
    checkPermission
} from "../data/AccountData";

export default function Account() {
    const accountInfo = JSON.parse(localStorage.getItem("accountInfo"));
    const [ isValid, setValid ] = useState(checkPermission("account"));

    if (!isValid) {
        return (
            <>
            <section className="container d-flex flex-column">
                {apiForm()}
            </section>
            </>
        );
    }
    return (
        <>
        <section className="container d-flex flex-column align-items-center">
            <h3
            className="px-5 py-4 m-4 border">
                {accountInfo.name}
            </h3>
            {apiForm()}
        </section>
        </>
    );
};

function apiForm() {
    const [ apiKey, setApiKey] = useState(getApiKey());

    const handleSubmit = (event) => {
        event.preventDefault();
        if (apiKey.length < 70) {
            alert('Key too short, try again');
        }
        else if (apiKey == "test") {
            //implement testdata
        } else {
            getAccountData(apiKey);
            getAccountPermissions(apiKey);
        }
    }

    return (
        <>
            <form 
            onSubmit={handleSubmit}
            className="m-4 px-5 py-4 border"
            >
                <div className="mb-3 mt-3">
                    <label htmlFor="authToken" className="form-label">API Key</label>
                    <input 
                    className="form-control px-5" 
                    id="authToken" 
                    // placeholder="API Key" 
                    type="text" 
                    value={apiKey}
                    // name="token"
                    onChange={(e) => setApiKey(e.target.value)}
                    />
                </div>
                <button 
                type="submit" 
                className="btn btn-primary">Submit</button>
            </form>
        </>
    );
};

