import { Outlet, Link } from "react-router-dom";


export function Header() {
    return (
        <header>
            <nav>
                <Link href="/inventory">Inventory</Link>
                <Link href="/bltp">Trading Post</Link>
                <Link href="/search">Search</Link>
            </nav>
        </header>
    );
}