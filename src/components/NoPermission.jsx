import { Link } from "react-router-dom";

export default function NoPermission( { message }) {
    return (
        <section className="container">
            <h3 className="px-5 py-4 m-4 border">
                Permission for "{message}" missing.
            </h3>
            <Link 
                className="btn btn-warning px-4 py-2 mx-5" 
                to="../account">
                Account
            </Link>
        </section>);
}