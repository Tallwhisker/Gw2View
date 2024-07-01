import { itemInfo } from "../data/ItemData";



export default function Item( { item } ) {
    const id = item[0];
    const count = item[1];

    let itemName = `${id}: Unknown`;
    if(itemInfo[id]) {
        itemName = itemInfo[id].name;
    };    

    return (
        <div className="list-group-item p-2 text-center"
        data-bs-toggle="tooltip" data-bs-placement="top"
        data-bs-custom-class="custom-tooltip"
        data-bs-title={itemName}
        >
             <ItemIcon itemId={ id } />
             <p className="text-light">{ count }</p>
             {/* <ItemName itemId={ id } /> */}
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
    let rarity = getItemRarity(itemId);
    return (
        <img
        className={rarity}
        src={iconURL}
        width={50}
        height={50}
        alt="Item Icon"
        />
    );
};


//Get item rarity
function getItemRarity(id) {
    let rarity = "";

    if(itemInfo[id]) {
        let itemRarity = itemInfo[id].rarity
        rarity = rarity.concat(` ${itemRarity}`)
    }

    return rarity;
};