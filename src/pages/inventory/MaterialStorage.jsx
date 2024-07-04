import { 
    useState, 
    useEffect 
} from "react";

import { 
    checkPermission, 
    getApiKey,
    isDemoMode
} from "../../data/AccountData";

import { formatMaterialStorage } from "../../data/inventoryFormater";

import DropdownButton from "../../components/dropdownbutton";
import NoPermission from "../../components/NoPermission";
import Category from "../../components/Category";


export default function MaterialStorage() {
    const [content, setContent] = useState([]);


    if (!checkPermission("inventories") && !isDemoMode) {
        return <NoPermission message="inventories" />;
    }

    useEffect(() => {
        try {
            fetchMaterialStorage()
            .then(resolved => {
                setContent(formatMaterialStorage(resolved));
            })
        } catch(err) {
            console.log("MatStorage Error: " + err);
        };
    }, [])

    if (content.length <= 1) {
        return (
            <>
                <section className="container p-4">
                    <h3>Loading..</h3>
                </section>
            </>
        );
    };
    
    //[0] name, [1] itemArray, [2] encoded name
    return (
        <section className="container d-flex flex-column align-items-center">
            <DropdownButton
                key={"matCategoriesButton"}
                input={content}
                menuName="Categories"
                classOptions="" 
            />
            {content.map(category => {
                return <Category
                    key={"KeyMS-" + category[2]}
                    catID={category[2]} 
                    input={category} 
                />
            })}
        </section>
    );
};

async function fetchMaterialStorage() {
    let matStorageURL =
        "https://api.guildwars2.com/v2/account/materials?access_token="
        + getApiKey();

    if (isDemoMode) matStorageURL = "./testdata/demo_materials.json";

    const response = await fetch(matStorageURL)
    if (!response.ok) {
        throw Error(response.status);
    }

    return await response.json();
};