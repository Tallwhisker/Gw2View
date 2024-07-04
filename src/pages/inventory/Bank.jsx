import {
    useState,
    useEffect
} from "react";

import {
    checkPermission,
    getApiKey,
    isDemoMode
} from "../../data/AccountData";

import { formatBank } from "../../data/inventoryFormater";

import NoPermission from "../../components/NoPermission";
import Category from "../../components/Category";


export default function Bank() {
    const [content, setContent] = useState([]);

    if (!checkPermission("inventories") && !isDemoMode) {
        return <NoPermission message="inventories" />;
    }

    useEffect(() => {
        try {
            fetchBank()
            .then(resolved => {
                setContent(formatBank(resolved));
            })
        } catch (err) {
            console.log("MatStorage Error: " + err);
        };
    }, []);

    if (content.length < 1) {
        return (
            <section className="container p-4">
                <h3>Loading..</h3>
            </section>
        );
    };

    return (
        <section className="container d-flex flex-column align-items-center">
            <Category
                input={content}
            />
        </section>
    );
};

async function fetchBank() {
    let bankFetch =
        "https://api.guildwars2.com/v2/account/bank?access_token="
        + getApiKey();
    if (isDemoMode) bankFetch = "./testdata/demo_bank.json";

    const response = await fetch(bankFetch);
    if (!response.ok) {
        throw Error(response.status);
    }

    return await response.json();
};