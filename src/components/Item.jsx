import { itemInfo } from "../data/ItemData";

export default function Item( { item } ) {
    const id = item[0];
    let count = item[1];

    let itemName = `${id}: Unknown`;
    if(itemInfo[id]) {
        itemName = itemInfo[id].name;
    };    

    if (count > 1000) {
        count = `${count / 1000}k`
    }

    return (
        <div 
        key={id+count}
        className="list-group-item p-2 text-center itemTooltip"
        data-bs-toggle="tooltip" 
        data-bs-placement="top"
        data-bs-custom-class="custom-tooltip"
        data-bs-title={itemName}
        >
             <ItemIcon itemId={ id } />
             <p className="text-light mb-2">{ count }</p>
             {/* <ItemName itemId={ id } /> */}
        </div>
    );
};


//SUPPORT FUNCTIONS
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