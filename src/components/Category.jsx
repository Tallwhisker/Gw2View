import Item from "./Item.jsx";

let index = 0;
export default function Category({ catName, catArray, catID, containerClass="" }) {
    ++index;
    const items = [];
    const collapseID = `${catID}${index}`
    catArray.map(item => {
        items.push(<Item item={ item } />)
    })

    let divOptions = "categoryHeader collapse show px-2 " + containerClass;
    return (
        <div id={catID} key={index+collapseID}>
            <h3 
                className="list-group text-light p-3"
                data-bs-toggle="collapse"
                href={`#${collapseID}`}
                role="button"
                aria-expanded="false"
                aria-controls={`collapse${collapseID}`}
            >
                { catName }
            </h3>
            <div 
                className={divOptions}
                id={collapseID}
            >
                { items }
            </div> 
        </div>
    );
}