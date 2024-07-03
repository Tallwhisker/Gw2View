import './App.css';

export default function Home() {
    return (
        <section className="container p-4">
            <h1>GuildWars 2 Inventory Viewer</h1>
            <p className="my-4 fs-5">Unofficial webapp to fetch and display account
                inventories from in-game via the official ArenaNet API.
            </p>
            <p className="my-4 fs-5">You need an API key from a GuildWars 2 account to use this website. 
                <br/>Alternatively input the key "testmode" as the key to use sample data.
            </p>
            <p className="my-4 fs-5">Permissions needed: "characters", "inventory"
                <br/> Items that have no data have default icon & name. Unless the API has no data they will fix themselves next render.
                <br/> Some start data is provided to reduce the load on the API. It holds icons, names & IDs.
            </p>

            <br/><a href="https://account.arena.net/applications">https://account.arena.net/applications</a>
            <p className="text-body-secondary fs-6">© ArenaNet LLC. All rights reserved. NCSOFT, ArenaNet, Guild Wars, Guild Wars 2, GW2,
                Guild Wars 2: Heart of Thorns, Guild Wars 2: Path of Fire, Guild Wars 2: End of Dragons,
                and Guild Wars 2: Secrets of the Obscure and all associated logos, designs, and composite marks
                are trademarks or registered trademarks of NCSOFT Corporation.</p>
        </section>
    );
};

