import DropdownItem from "./dropdownitem";

export default function DropdownButton({ input, menuName, classOptions }) {

    //Entries to go back up
    let items = [
    <DropdownItem 
        key={`${menuName}-GoTop`}
        name = "Go to top"
        ID = ""
    />,
    <DropdownItem 
        key={`${menuName}-Divider`}
        name = "--------"
        ID = ""
    />,
    ];

    input.forEach(item => {
        items.push(
            <DropdownItem 
            key={`${menuName}-${item[2]}`}
            name = {item[0]}
            ID = {item[2]}
            />
        );
    });

    return (
    <>
        <div 
            className={"btn-group align-self-start sticky-top z-3" + classOptions}>
        <button type="button" 
            className="btn btn-info dropdown-toggle m-2 mt-3 px-4" 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
        >
            {menuName}
        </button>
            <ul className="dropdown-menu">
                {items}
            </ul>
        </div>
    </>
    );
};