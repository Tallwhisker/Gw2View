import { 
  itemInfo, 
  itemBlacklist, 
  itemInformationStart 
} from "../../data/ItemData";

import { getApiKey, checkPermission } from "../../data/AccountData";
import Category from "../../components/Category";
import { useState, useEffect } from "react";

export default function Bank() {
  if (checkPermission("inventories")) {
    return <h1>No permission.</h1>
  }

  const [content, setContent] = useState([])
  const bankFetch =
    "https://api.guildwars2.com/v2/account/bank?access_token=" + getApiKey();

  useEffect(() => {
    fetch(bankFetch)
      .then(res => {
        if (!res.ok) {
          throw Error(res.status);
        }
        return res.json();
      })
      .then(data => {
        const newItems = [];
        let emptyCount = 1;
        let bankStorage = [];
        data.forEach(item => {
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

        //Save bank data
        bankStorage.unshift(['EmptySlot', emptyCount]);
        localStorage.setItem('bankStorage', JSON.stringify(bankStorage));

        //If any unknown items are found, send them to dataHandler
        if (newItems.length > 0) {
          console.log(`Bank Module found ${newItems.length} new items`);
          itemInformationStart(newItems);
          setTimeout(refreshSelf(),4000);
        };

        const newContent = [];

        //Doesn't really need a unique ID since there's only 1
        newContent.push(<Category
          catName={"Bank"}
          catArray={bankStorage}
          catID={`BANK-0`}
        />)
        setContent(newContent);
      })
      .catch(err => {
        console.log("Bank Error: " + err);
      })
  }, [])

  if (content == []) {
    return (
      <section className="d-flex justify-content-around flex-wrap">
        <h3>Loading..</h3>
      </section>
    ); 
  }

  return (
    <section className="d-flex justify-content-around flex-wrap">
      { content }
    </section>
  );

  function refreshSelf() {
    const refreshContent = content.slice();
    setContent(refreshContent);
  }
};