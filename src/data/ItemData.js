import { startData } from "./startData";

let itemInfo = getStorageObject("itemInfo");

// Because arenanet can't keep track of their own items, implement blacklist.
const itemBlacklist = [
    83855, //Pearl Impaler (SPEAR)
    84192, //Pearl Impaler (SPEAR)
    95208, //Demo Gear Loot Box
    82258, //Unknown
    95496, //Turtle Mount Unlock
    101333, //Relic Chest (beta)
    95201, //Demo Gear Loot Box
    95195, //Demo Consumable Loot Box
    95207 //Demo Gear Loot Box
];

function coldStart() {
    localStorage.setItem("itemInfo", JSON.stringify(startData));
    itemInfo = startData;
    console.log("Imported starting data.")
};

//Item information request controller
let itemQueueSignal = 0;
const itemQueue = [];

//Queue creator, any unknown items go to this function.
async function itemInformationStart(inputArray) {
    inputArray.forEach(item => {

        //If item is not already in queue or blacklist, add it.
        if(!itemQueue.includes(item) && !itemBlacklist.includes(item)) {
            itemQueue.push(item);
        };
    });

    //If the "run signal" for the queueHandler is OFF, turn it on
    //It's to prevent triggering multiple intervals
    if(itemQueueSignal === 0) {
        itemQueueSignal = 1;
        itemQueueHandler();
    };
};


//Function to split itemQueue into bits to not overload API. Timed.
//Max 200 items per request & 300 requests per minute.
function itemQueueHandler() {

    //Primary interval
    const queueHandler = setInterval(() => {

        //If the queue is empty, turn itself off.
        if (itemQueue.length === 0) {
            itemQueueSignal = 0;
            clearInterval(queueHandler);
        }
            //If the queue is bigger than 200 items, send 200.
        else if(itemQueue.length > 200) {
            fetchItemInfo(itemQueue.splice(0, 200).toString());
        } 
            //If the queue is less than 200 items, send the remaining.
        else {
            fetchItemInfo(itemQueue.splice(0, itemQueue.length).toString());
        };

        //Interval number
    }, 1000); //1s
};

//Main function for fetching and saving new item data.
async function fetchItemInfo(items) {

    fetch(`https://api.guildwars2.com/v2/items?ids=${items}`)
    .then(response => {
        if (! response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    })
    .then(data => {
        data.forEach(item => {
            itemInfo[item.id] = {
                name : item.name,
                rarity : item.rarity,
                webIcon : item.icon,
                localIcon : ''
            };
        });

        //Saves data from recieved items to storage
        localStorage.setItem("itemInfo", JSON.stringify(itemInfo));
    })
    .catch(error => {
        console.log(error);
        console.log(`Error fetching items: ${items}`);
    });
};


//Flexible fetch and send to storage directly. Input target and key value for setStorage.
async function fetchToStorage(target, key) {
    fetch(`https://api.guildwars2.com/v2/${target}?access_token=${authToken}`)
    .then(response => {
        if(!response.ok) {
        throw new Error('FetchReturn Error');
    }
        return response.json();
    })
    .then(data => {
        setStorage(key, data);
    })
    .catch(error => {
        console.log(error);
    });
};

//Get localStorage from input 'key' and return OBJECT
function getStorageObject (key) {
    if(localStorage.getItem(key)) {
        let tempData = localStorage.getItem(key);
        return JSON.parse(tempData);
        // console.log(`No local data for ${key}`);
    };
    return {};
};

export {
    itemInfo,
    itemInformationStart,
    coldStart,
    getStorageObject,
    itemBlacklist
}