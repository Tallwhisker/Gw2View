import { useState, useEffect } from "react";
import { itemInfo, itemInformationStart } from "../../data/ItemData";
import { accountInfo } from "../../data/AccountData";
import Category from "../../components/Category";


let characters = {};
export default function characterBags() {
    if (!accountInfo.permissions.includes("characters")) {
        return <h1>No permission.</h1>
    }

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    const [content, setContent] = useState([])
    const characterFetch =  "https://api.guildwars2.com/v2/characters"
    
    useEffect(() => {
      
        fetch(`${characterFetch}?access_token=${accountInfo.id}`)
        .then(res => {
          if (!res.ok) {
            throw Error(res.status);
          }
          return res.json();
        })
        .then(data => {
          data.forEach(char => {
            fetchCharacterData(encodeURIComponent(char), char);
          });
        })
        .catch(err => {
          console.log("Characters Error: " + err);
        })
    }, [])
    console.log(content)
    return (
      <>
          <section className="d-flex justify-content-around flex-wrap">
              {content}
              <p>WHY</p>
          </section>
      </>
  );

    function fetchCharacterData(inputName, char) {
      fetch(`${characterFetch}/${inputName}?access_token=${accountInfo.id}`)
      .then(res => {
        if (!res.ok) {
            throw Error(res.status);
        }
        return res.json();
    })
      .then(data => {
        characters[char] =  data ;
        localStorage.setItem("characters", JSON.stringify(characters));
        let charInventory = characterInventory( data );
        const newContent = content;

        newContent.push(
          <Category
            catName={char}
            catArray={charInventory}
            catID={`CHAR-${char}`}
          />
        );
        setContent(newContent);
      })
      .catch(err => {
        console.log("Characters Error: " + err);
      })
    }
    console.log("before return")

}

function characterInventory( data ) {
  let newCharacter = [];
  let newItems = [];
  let emptyCount = 0;

  for(let bag in data.bags) {
      if(data.bags[bag]) {
          data.bags[bag].inventory.forEach(item => {
              if (item) {
                newCharacter.push( [
                      item.id,
                      item.charges ? item.charges : item.count
                      ] 
                  );

                  if(!itemInfo[item.id]) {
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
  newCharacter.unshift( ['EmptySlot', emptyCount] );

  //If any unknown items were found, they get sent to dataHandler module.
  if(newItems.length > 0) {
      console.log(`Character Module found ${newItems.length} new items`);
      // itemInformationStart(newItems);
  };

  return newCharacter;
}