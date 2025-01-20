import express, { json } from "express";

const PORT = 3000;
const app = express();

app.use(json()); 

let memoryDB = [];
let id = 1;

// Adding new coffee menu
app.post("/coffee", (req, res) => {
    const { name, price } = req.body;
    const newMenu = {id : id++, name, price};
    memoryDB.push(newMenu);
    res.status(201).send({message : "New coffee menu added.", newMenu});
})

// Bulk Adding coffee menu
app.post("/coffee-bulk", (req, res) => {
    const { menus } = req.body;
    const newMenus = menus.map(menu => ({id : id++, ...menu}));
    memoryDB.push(...newMenus);
    res.status(201).send({message : "New coffee menus added.", newMenus});
});

// Getting all coffee menus
app.get("/coffee", (req, res) => {
    res.status(200).send(memoryDB);
})

// Getting coffee menu by id
app.get("/coffee/:id", (req, res) => {
    const { id } = req.params;
    const coffeeMenu = memoryDB.find(menu => menu.id === parseInt(id));
    if(!coffeeMenu) return res.status(404).send({message : "Menu not Found"});
    res.status(200).send(coffeeMenu);
})

// Updating coffee menu by id
app.put("/coffee/:id", (req, res) => {
    const { id } = req.params;
    const coffeeMenu = memoryDB.find(menu => menu.id === parseInt(id));
    if(!coffeeMenu) return res.status(404).send({message : "Menu not found"});

    const { name, price } = req.body;
    coffeeMenu.name = name;
    coffeeMenu.price = price;
    res.status(200).send({message : `Menu id ${id} is updated`});
})

// Deleting coffee menu by id
app.delete("/coffee/:id", (req, res) => {
    const { id } = req.params;
    const menuIndex = memoryDB.findIndex(menu => menu.id === parseInt(id));
    if(menuIndex===-1) return res.status(404).send({message : "Menu not found"});

    memoryDB.splice(menuIndex, 1);

    res.status(200).send({message : "Menu is destroyed."});
})

app.get("/", (req, res) => {
    res.send("Welcome to our new Coffee Shop.");
});

app.listen(PORT, () => {
    console.log("Coffee shop server is connected.");
});