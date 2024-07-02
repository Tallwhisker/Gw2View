import Category from "../../components/Category";
import DropdownButton from "../../components/dropdownbutton";
import { accountInfo } from "../../data/AccountData";
import { useState, useEffect } from "react";
import { itemInfo } from "../../data/ItemData";

const matStorageCategoryNames = [
    [6, 'Basic Crafting Materials'],
    [29, 'Intermediate Crafting Materials'],
    [37, 'Advanced Crafting Materials'],
    [46, 'Ascended Materials'],
    [30, 'Gemstones and Jewels'],
    [5, 'Cooking Materials'],
    [49, 'Cooking Ingredients'],
    [50, 'Scribing Materials'],
    [38, 'Festive Materials']
];

let categoryList = [];
export default function MaterialStorage() {
    if (!accountInfo.permissions.includes("inventories")) {
        return <h1>No permission.</h1>
    }

    const [content, setContent] = useState([])
    const matStorageFetch =
        "https://api.guildwars2.com/v2/account/materials?access_token=" + accountInfo.id;

    useEffect(() => {
        categoryList = [];

        fetch(matStorageFetch)
            .then(res => {
                if (!res.ok) {
                    throw Error(res.status);
                }
                return res.json();
            })
            .then(data => {
                const newItems = [];
                let newMatStorage = {};
                data.forEach(element => {
                    let elID = (element.id);
                    let elCat = (element.category);

                    if (!newMatStorage[elCat]) {
                        newMatStorage[elCat] = [];
                    };

                    newMatStorage[elCat].push([
                        elID,
                        element.count
                    ]);

                    //Check for unknown items
                    if (!itemInfo[element.id]) {
                        newItems.push(element.id);
                    };
                });

                //Save data to localstorage
                localStorage.setItem("materialStorage", JSON.stringify(newMatStorage));

                //If any unknown items are found, send them to dataHandler
                if (newItems.length > 0) {
                    console.log(`MatStorage Module found ${newItems.length} new items`);
                    itemInformationStart(newItems);
                    setTimeout(refreshSelf(),4000);
                };

                const newContent = [];
                //ArrayKey 1 = name, ArrayKey 0 = category id
                matStorageCategoryNames.map(key => {
                    const encodedName = encodeURIComponent(`MS-${key[0]}`);

                    //Push into list, [0] name , [1] ID
                    categoryList.push( [ key[1], encodedName ])

                    newContent.push(<Category
                        catName={key[1]}
                        catArray={newMatStorage[key[0]]}
                        catID={encodedName}
                    />)

                });
                setContent(newContent);
            })
            .catch(err => {
                console.log("MatStorage Error: " + err);
            })
    }, [])
    if (content == []) {
        return (
            <>
                <section className="d-flex flex-column flex-wrap">
                    <h3>Loading..</h3>
                </section>
            </>
        );
    }
    return (
        <>
            <DropdownButton 
                input={categoryList}
                menuName="Categories" 
            />
            <section className="d-flex flex-column flex-wrap">
                    {content}
            </section>
        </>
    );

    function refreshSelf() {
        const refreshContent = content.slice();
        setContent(refreshContent);
    }
};
