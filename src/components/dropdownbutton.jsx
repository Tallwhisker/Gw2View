import DropdownItem from "./dropdownitem";

export default function DropdownButton({ input, menuName, classOptions }) {
    console.log(input);

        let items = [];
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
                { items }
                {/* { input.map((item) => {
                    return (
                        <li key={item[1]+input.indexOf(item[1])}><a 
                            className="dropdown-item" 
                            href={`#${item[1]}`}
                        >
                            {item[0]}
                        </a></li>
                    );
                })} */}
            </ul>
        </div>
    </>
    );
};