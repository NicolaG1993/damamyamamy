export default function Shop(props) {
    console.log("props in Shop.js: ", props);

    const products = [
        {
            id: 1,
            name: "Scarpe Nike",
            description: "Scarpe Nike da bambino (10 mesi)",
            price: "10€",
            tags: ["vestiti", "scarpe", "10 mesi", "Nike"],
        },
        {
            id: 2,
            name: "Passeggino Chicco",
            description:
                "Passeggino della Chicco in ottime condizioni, come nuovo",
            price: "75€",
            tags: ["passeggino", "Chicco"],
        },
        {
            id: 3,
            name: "Biberon Prenatal",
            description:
                "Biberon della Prenatal nuovo, prodotto mai aperto o utilizzato",
            price: "15€",
            tags: ["biberon", "nutrizione", "Prenatal"],
        },
        {
            id: 4,
            name: "Giocattolo",
            description: "Giocattolo per neonato",
            price: "5€",
            tags: ["giochi", "neonati"],
        },
    ];

    return (
        <div className={"shop"}>
            <h1>Shop</h1>
            <h3>Filtra risultati</h3>
            <div className={"products"}>
                {products &&
                    products.map((product) => (
                        <div className={"product-box"} key={product.id}>
                            <img src={product.pic_url || "default.png"} />
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>{product.price}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}
