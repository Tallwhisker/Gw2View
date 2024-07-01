import Item from "./Item.jsx";


export default function Category({ catName, catArray, catID }) {

    const items = [];
    
    catArray.map(item => {
        items.push(<Item item={ item } />)
    })

    return (
        <div id={catID}>
            <h3 className="list-group text-light p-3">{ catName }</h3>
            <div className="categoryHeader">
                { items }
            </div> 
        </div>
    );
}