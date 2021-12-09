//not in use, this is only the db architecture
//use only psql tables

const data = {
    products: [
        {
            name: "Maglietta",
            slug: "maglietta",
            categories: ["Maglie", "Abbigliamento", "Bambina"],
            tags: ["Abbigliamento", "Nike", "Scarpe", "Bambina"],
            images: ["/images/shirt1.jpg", "/images/shoes1.jpg"],
            price: 70,
            brand: "Nike",
            count_in_stock: 1,
            description: "A popular shirt",
            infos: "Infos vanno qua",
            condition: "new",
            related_products: [2],
        },
        {
            name: "Scarpe",
            slug: "scarpe",
            categories: ["Scarpe", "Abbigliamento", "Bambino"],
            tags: ["Abbigliamento", "Nike", "Scarpe", "Bambino"],
            images: ["/images/shoes1.jpg"],
            price: 40,
            brand: "Nike",
            count_in_stock: 1,
            description: "Some casual shoes",
            infos: null,
            condition: "used",
            related_products: [1, 3],
        },
        {
            name: "Game Boy",
            slug: "game-boy",
            categories: ["Giocattoli", "Videogiochi", "Elettronica"],
            tags: ["Giocattoli", "Videogiochi", "Game-Boy"],
            images: ["/images/gameboy.jpg"],
            price: 130,
            brand: "Nintendo",
            count_in_stock: 2,
            description: "Gameboy color come nuovo",
            infos: null,
            condition: "new",
            related_products: null,
        },
    ],
    users: [],
    orders: [],
};

export default data;
