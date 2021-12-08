//not in use, this is only the db architecture
//use only psql tables

const data = {
    products: [
        {
            name: "Maglietta",
            slug: "maglietta",
            categories: ["Maglie", "Abbigliamento", "Bambina"],
            image: "/images/shirt1.jpg",
            price: 70,
            brand: "Nike",
            countInStock: 1,
            description: "A popular shirt",
        },
        {
            name: "Scarpe",
            slug: "scarpe",
            categories: ["Scarpe", "Abbigliamento", "Bambino"],
            image: "/images/shoes1.jpg",
            price: 40,
            brand: "Nike",
            countInStock: 1,
            description: "Some casual shoes",
        },
        {
            name: "Game Boy",
            slug: "game-boy",
            categories: ["Giocattoli", "Videogiochi", "Elettronica"],
            image: "/images/gameboy.jpg",
            price: 130,
            brand: "Nintendo",
            countInStock: 2,
            description: "Gameboy color come nuovo",
        },
    ],
    users: [],
    orders: [],
};

export default data;
