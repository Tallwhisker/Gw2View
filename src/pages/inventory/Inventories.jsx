import InventoryLayout from "./InventoryLayout";
import MaterialStorage from "./MaterialStorage";
import Bank from "./Bank";
import Bags from "./Bags";

import { Routes, Route, Outlet } from "react-router-dom";


export default function Inventories() {
    return (
        <>
        <Routes>
            <Routes path='/' element={<InventoryLayout />}>
                <Route path='MaterialStorage' element={<MaterialStorage />}/>
                <Route path='Bank' element={<Bank />}/>
                <Route path='Bags' element={<Bags />}/>
            </Routes>
        </Routes>
      <p>Inv Home</p>
      </>
    );
}