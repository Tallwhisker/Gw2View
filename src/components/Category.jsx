import Item from "./Item.jsx";

let index = 0;
export default function Category({ input, catID="", options="" }) {

    //[0] name, [1] itemArray, [2] encoded name
    const categoryName = input[0]
    const collapseID = `ColID-${input[2]}`

    const items = [];
    input[1].map(item => {
        index++
        items.push(<Item item={ item } key={`${input[2]}-I-${item[0]}${index}`} />)
    });


    let divOptions = "categoryHeader collapse show px-2 " + options;
    return (
        <div id={catID}>
            <h3 
                className="list-group text-light p-3"
                data-bs-toggle="collapse"
                href={`#${collapseID}`}
                role="button"
                aria-expanded="false"
                aria-controls={`collapse${collapseID}`}
            >
                { categoryName }
            </h3>
            <div 
                className={divOptions}
                id={collapseID}
            >
                { items }
            </div> 
        </div>
    );
};