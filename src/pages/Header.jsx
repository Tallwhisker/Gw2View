import { Outlet, Link } from "react-router-dom";

export default function Header() {
    
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="">Inventory Viewer</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link disabled" to="">Account</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Inventories
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="../bags">Bags</Link></li>
                                    <li><Link className="dropdown-item" to="../bank">Bank</Link></li>
                                    <li><Link className="dropdown-item" to="../materialstorage">Material Storage</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link disabled" to="bltp">Trading Post</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link disabled" to="search">Search</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
}