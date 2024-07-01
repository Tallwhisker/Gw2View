

export function Item( { item } ) {
    const id = item[0];
    const count = item[1];

    return (
        <div className="">
            <ItemIcon itemId={ id } />
            <p>{ count }</p>
            <ItemName itemId={ id } />
        </div>
    );
};

function ItemName({ itemId }) {
    let itemName = `${itemId}: Unknown`;
    if(itemInfo[itemId]) {
        itemName = itemInfo[itemId].name;
    };

    return (
        <p>{ itemName }</p>
    );
};

function ItemIcon({ itemId }) {
    let iconURL = "/media/icons/spaghet.png";

    if (itemInfo[itemId]) {
        if (itemInfo[itemId].localIcon) {
            iconURL = `/media/icons/${itemInfo[itemId].localIcon}`;
        } 
        else {
            iconURL = itemInfo[itemId].webIcon;
        };
    } 

    return (
        <Image
        className={getItemRarity=(itemId)}
        src={iconURL}
        width={32}
        height={32}
        alt="Item Icon"
        />
    );
};


//Get item rarity
function getItemRarity(id) {
    let rarity = "";
    if(itemInfo[id]) {
        switch (itemInfo[id].rarity) {
            case "Junk": rarity.concat(" stone-500")
                break;
            case "Basic": rarity.concat(" stone-50")
                break;
            case "Fine": rarity.concat(" blue-500")
                break;
            case "Masterwork": rarity.concat(" lime-500")
                break;
            case "Rare": rarity.concat(" yellow-500")
                break;
            case "Exotic": rarity.concat(" amber-500")
                break;
            case "Ascended": rarity.concat(" fuchsia-500")
                break;
            case "Legendary": rarity.concat(" purple-500")
                break;
            default: 
                break;
        }
    }

    return rarity;
};