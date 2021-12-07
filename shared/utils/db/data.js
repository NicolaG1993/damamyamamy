//not in use, this is only the db architecture
//use only psql tables

const data = {
    products: [
        {
            name: "Free Shirt",
            slug: "free-shirt",
            category: "Shirts",
            image: "/images/shirt1.jpg",
            price: 70,
            brand: "Nike",
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: "A popular shirt",
        },
        {
            name: "Fit Shirt",
            slug: "fit-shirt",
            category: "Shirts",
            image: "/images/shirt2.jpg",
            price: 40,
            brand: "Adidas",
            rating: 4,
            numReviews: 10,
            countInStock: 20,
            description: "A fit shirt",
        },
        {
            name: "Casual Shoes",
            slug: "casual-shoes",
            category: "Shoes",
            image: "/images/shoes1.jpg",
            price: 130,
            brand: "Nike",
            rating: 4.1,
            numReviews: 10,
            countInStock: 20,
            description: "Some casual shoes",
        },
    ],
    users: [],
    orders: [],
};

export default data;
