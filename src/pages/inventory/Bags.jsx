import {
    useState,
    useEffect
} from "react";

import {
    checkPermission,
    getApiKey
} from "../../data/AccountData";

import { formatCharacterBags } from "../../data/inventoryFormater";

import Category from "../../components/Category";
import DropdownButton from "../../components/dropdownbutton";
import NoPermission from "../../components/NoPermission";

const toTop = [["Go to top", "root"], ["------", ""]];
export default function characterBags() {
    const [content, setContent] = useState([toTop, []]);

    if (!checkPermission("characters")) {
        return <NoPermission message="characters" />;
    };


    function updateContent(charName) {
        fetchCharacter(charName)
        .then(resolved => {
            const newCharacter = formatCharacterBags(resolved);
            let newContent = content.filter(() => true);

            newContent[0].push(newCharacter[0]);
            newContent[1].push(newCharacter[1]);
            setContent(newContent);
        })
    };

    useEffect(() => {
        try {
            fetchCharacterList()
            .then(resolved => {
                //Iterate over the list and get each character
                resolved.forEach(character => {
                    updateContent(character);
                })
            })
            //Catch errors passed up from Fetch functions
        } catch (err) {
            console.log("CharacterBags Error: " + err);
        };
    }, []);

    if (content.length == 0) {
        return (
            <section className="container p-4">
                <h3>Loading..</h3>
            </section>
        );
    };
    return (
        <section className="container d-flex flex-column align-items-center">
            <DropdownButton
                input={content[0]}
                menuName="Characters"
                classOptions="btn-group align-self-start sticky-top"
            />
            {content[1].map(category => {
                return <Category
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
        throw Error(response.status);
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
        throw Error(response.status);
    }

    return await response.json();
};