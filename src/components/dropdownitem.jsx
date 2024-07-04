export default function DropdownItem({ name, ID }) {
    return (
        <li><a 
            className="dropdown-item" 
            href={`#${ID}`}
        >
            {name}
        </a></li>
    );
}