import {
    useState,
    useEffect
} from "react";

import {
    checkPermission,
    getApiKey
} from "../../data/AccountData";

import { formatBank } from "../../data/inventoryFormater";

import Category from "../../components/Category";
import NoPermission from "../../components/NoPermission";


export default function Bank() {
    const [content, setContent] = useState([]);

    if (!checkPermission("inventories")) {
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
    const bankFetch =
        "https://api.guildwars2.com/v2/account/bank?access_token="
        + getApiKey();

    const response = await fetch(bankFetch);
    if (!response.ok) {
        throw Error(response.status);
    }

    return await response.json();
};