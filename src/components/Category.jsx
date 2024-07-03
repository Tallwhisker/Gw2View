import Item from "./Item.jsx";

let index = 0;
export default function Category({ input }) {
    ++index;

    //[0] name, [1] itemArray, [2] encoded name
    const categoryName = input[0]
    const collapseID = `${input[2]}${index}`

    const items = [];
    input[1].map(item => {
        items.push(<Item item={ item } />)
    });


    let divOptions = "categoryHeader collapse show px-2 ";
    return (
        <div id={input[2]} key={index+collapseID}>
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
}