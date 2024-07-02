import DropdownItem from "./dropdownitem";

export default function DropdownButton({ input, menuName }) {
    let items = [];
    input.forEach(item => {
        items.push(
            <DropdownItem 
            name = {item[0]}
            ID = {item[1]}
            />
        );
    });

    return (
    <>
        <div 
        key={"key"+menuName}
        className="btn-group">
        <button type="button" 
        className="btn btn-info dropdown-toggle m-2 px-4" 
        data-bs-toggle="dropdown" 
        aria-expanded="false">
            {menuName}
        </button>
            <ul className="dropdown-menu">
                { items }
            </ul>
        </div>
    </>
    );
}