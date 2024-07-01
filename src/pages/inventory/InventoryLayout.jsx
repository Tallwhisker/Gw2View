import { Link } from "react-router-dom";

export default function InventoryLayout() {
    return (
      <>
        <nav >
            <h2>Inventory: </h2>    
            <Link to="../bags">Bags</Link>
            <Link to="../bank">Bank</Link>
            <Link to="../materialstorage">Material Storage</Link>
        </nav>
      </>
    );
};
