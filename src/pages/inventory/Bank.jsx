import { itemInfo } from "../../data/ItemData";
import { accountInfo } from "../../data/AccountData";
import { itemInformationStart } from "../../data/ItemData";
import Category from "../../components/Category";
import { useState, useEffect } from "react";

export default function Bank() {
  if (!accountInfo.permissions.includes("inventories")) {
    return <h1>No permission.</h1>
  }

  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

  const [content, setContent] = useState([])
  const bankFetch =
    "https://api.guildwars2.com/v2/account/bank?access_token=" + accountInfo.id;

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

            if (!itemInfo[item.id]) {
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
        };

        const newContent = [];

        //ArrayKey 1 = name, ArrayKey 0 = category id

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

  return (
    <section className="d-flex justify-content-around flex-wrap">
      { content }
    </section>
  );
};