import {
    useState,
    useEffect
} from "react";

import {
    checkPermission,
    getApiKey
} from "../../data/AccountData";

import { formatCharacterBags } from "../../data/inventoryFormater";

import DropdownButton from "../../components/dropdownbutton";
import NoPermission from "../../components/NoPermission";
import Category from "../../components/Category";

const toTop = [["Go to top", "root"], ["------", ""]];
export default function characterBags() {
    const [ content, setContent ] = useState([]);

    if (!checkPermission("testmode")) {}

    if (!checkPermission("characters")) {
        return <NoPermission message="characters" />;
    };

    const characters = {};
    useEffect(() => {
    try {
        fetchCharacterList()
        .then(resolved => {
            //Iterate over the list and get each character
            resolved.forEach(characterName => {
                fetchCharacter(characterName)
                .then(resolved => {
                    if (resolved.flags.includes("Beta")) {
                        console.log("Beta character ignored.")
                    } else {
                        const charName = resolved.name;
                        characters[charName] = resolved;

                        localStorage.setItem("characters",JSON.stringify(characters));
                        let newContent = content;
                        newContent.push(formatCharacterBags(resolved));
                        setContent([...newContent]);
                    };
                })
            })
        })
        //Catch errors passed up from Fetch functions
    } catch (err) {
        console.log("CharacterBags Error: " + err);
    };
    }, []);


    if (content.length <= 1) {
        return (
            <section className="container p-4">
                <h3>Loading..</h3>
            </section>
        );
    };

    //[0] name, [1] itemArray, [2] encoded name
    return (
        <section className="container d-flex flex-column align-items-center">
            <DropdownButton 
                key={"CharactersButton"}
                input={content}
                menuName="Characters"
                classOptions="" 
            />
            {content.map(category => {
                return <Category
                    key={"KeyChar-" + category[2]}
                    catID={category[2]}
                    input={category}
                />
            })}
        </section>
    );
};


async function fetchCharacterList() {
    const charactersURL =
        "https://api.guildwars2.com/v2/characters?access_token="
        + getApiKey();

    const response = await fetch(charactersURL);
    if (!response.ok) {
        console.log(response.status);
    }

    return await response.json();
};

async function fetchCharacter(charName) {
    const URIname = (encodeURIComponent(charName));
    const characterURL =
        `https://api.guildwars2.com/v2/characters/${URIname}?access_token=`
        + getApiKey();

    const response = await fetch(characterURL);
    if (!response.ok) {
        console.log(response.status);
    }

    return await response.json();
};