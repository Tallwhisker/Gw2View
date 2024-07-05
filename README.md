# Gw2View
A remake of my first InventoryViewer project https://github.com/Tallwhisker/GW2Site in React and Bootstrap.

A Guild Wars 2 Fan project.


View your account data via the ArenaNet official API for GuildWars 2.
The project runs entirely client-side utilizing localStorage and Fetch


## Pages

### Home
Landing page, about project and Copyright notice.

### Account
Page for inserting the user API key and deleting all their data, should they want that.
Validates the key and should it pass, sends it to functions to fetch the account and token data.
The key "testmode" can also be used to demo the website, this will fetch server-stored demo data instead of user-specific account data.

### Inventories
#### Bags, Bank, Material Storage
These sub-pages fetch their respective inventory type, formats it and categorizes it by container name.


## Internals
I built the modules in such a way that they are independent of each other and indifferent to *where* the data comes from, as long as it is formated correctly.
For example, the **formatCharacterBags** function takes a complete character object from the API and **returns** the organized inventory as well as the character name.
This made implementing a **testmode** very easy as all I had to do was create a tag & exported variable to trigger a redirect at the first fetch and the rest is automatic. 

### data/AccountData
Module for fetching and sharing account data and permissions.

### data/inventoryFormater
Module for formating different data to a standard format for other functions/components.
If there are any unknown items they get sent to ItemData module for processing.

### data/ItemData
Module for fetching, formating and sharing item data.
Also holds a blacklist for some items because the API returns no data. (Usually happens for beta/event items)

### data/startData
Holds some starting data to populate the **itemInfo** variable exported by the ItemData module.
Used to reduce the otherwise quite massive 1300+ item + image API requests at startup and uses locally stored images instead.
(Material Storage is at the time of writing 655 items, which equates to 655 items and 655 icons for a single page)

### public/media
Holds icons for the itemInfo

### public/testdata
Holds the data for **testmode**

## ReactComponents

### Category > Item
Requires input in [ CategoryName , ItemArray, URIname ] format. (Which is what the format< iventory > functions return)
Container with a H3 title that triggers a collapsible grid container for Items.
Each Item element checks against the **itemInfo** variable for item data via the provided item ID.

### DropdownButton > DropdownItem
Takes the same input as Category and creates a dropdown-button for navigating to the different categories.
Used where there's more than one category.



## Copyright

© ArenaNet LLC. All rights reserved. NCSOFT, ArenaNet, Guild Wars, Guild Wars 2, GW2, Guild Wars 2: Heart of Thorns, Guild Wars 2: Path of Fire, Guild Wars 2: End of Dragons, and Guild Wars 2: Secrets of the Obscure and all associated logos, designs, and composite marks are trademarks or registered trademarks of NCSOFT Corporation.


> https://www.arena.net/en/legal/content-terms-of-use


I do not allow any redistribution of the project, in parts or in its entirety.