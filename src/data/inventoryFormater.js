import { 
    itemInfo, 
    itemBlacklist, 
    itemInformationStart 
} from "./ItemData";


//Permission check is done at page MaterialStorage
export function formatMaterialStorage( input ) {
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

    const newItems = [];
    let newMatStorage = {};
    
    input.forEach(element => {
        let elID = (element.id);
        let elCat = (element.category);
        
        if (!newMatStorage[elCat]) {
            newMatStorage[elCat] = [];
        };
        
        newMatStorage[elCat].push([
            elID,
            element.count
        ]);
        
        //Check for unknown items not on blacklist
        if (!itemInfo[element.id] && !itemBlacklist.includes([element.id])) {
            newItems.push(element.id);
        };
    });
    
    localStorage.setItem("materialStorage", JSON.stringify(newMatStorage));
    
    //If any unknown items are found, send them to dataHandler
    if (newItems.length > 0) {
        console.log(`MatStorage Module found ${newItems.length} new items`);
        itemInformationStart(newItems);
    };
    
    let newContent = [];
    //[0] name, [1] itemArray, [2] encoded name
    matStorageCategoryNames.map(key => {
        const encodedName = encodeURIComponent(`MS-${key[0]}`);

        newContent.push([key[1], newMatStorage[key[0]], encodedName]);
    });

    return newContent ;
};


//Permission check is done at page Bags
export function formatCharacterBags( character ) {

    let newItems = [];
    let emptyCount = 0;
    let characterBag = [];
  
    for(let bag in character.bags) {
        if(character.bags[bag]) {
            character.bags[bag].inventory.forEach(item => {
                if (item) {
                    characterBag.push( [
                        item.id,
                        item.charges ? item.charges : item.count
                        ] 
                    );
  
                    //Check for unknown items not on blacklist
                    if(!itemInfo[item.id] && !itemBlacklist.includes(item.id)) {
                        newItems.push(item.id);
                    };
                } 
                else if (item === null) {
                    emptyCount++;
                };
            });
        };
    };

    //Input the empty slots count into inventory array
    characterBag.unshift( ['EmptySlot', emptyCount] );
    
    //If any unknown items were found, they get sent to dataHandler module.
    if(newItems.length > 0) {
        console.log(`Character Module found ${newItems.length} new items`);
        itemInformationStart(newItems);
    };
    const encodedName = encodeURIComponent(`CHAR-${character.name}`)

    return [ character.name, characterBag, encodedName ];
};


//Permission check is done at page Bank
export function formatBank( inputBank ) {
    const newItems = [];
    let emptyCount = 0;
    let bankStorage = [];

    inputBank.forEach(item => {
      if (item) {
        bankStorage.push([
          item.id,
          item.charges ? item.charges : item.count
        ]);

        //Check for unknown items not on blacklist
        if (!itemInfo[item.id] && !itemBlacklist.includes(item.id)) {
          newItems.push(item.id);
        };
      }
      else if (item === null) {
        emptyCount++;
      };
    });

    //Input the empty slots count into inventory array
    bankStorage.unshift(['EmptySlot', emptyCount]);

    //Save bank data
    localStorage.setItem('bankStorage', JSON.stringify(bankStorage));

    //If any unknown items are found, send them to dataHandler
    if (newItems.length > 0) {
      console.log(`Bank Module found ${newItems.length} new items`);
      itemInformationStart(newItems);
      setTimeout(() => {
        return [ "Bank", bankStorage, "BANK-" ];
      },2000)
    };

    //[0] name, [1] itemArray, [2] encoded name
    return [ "Bank", bankStorage, "BANK-" ];
}