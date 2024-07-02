export default function DropdownItem({ name, ID }) {
    return (
        <li
            key={ID+ID}
        ><a 
            class="dropdown-item" 
            href={`#${ID}`}
        >
            {name}
        </a></li>
    );
}