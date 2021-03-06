import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../components/Shop/style/Shop.module.css";

// REDUX
import { useDispatch } from "react-redux";
import { setupShop } from "../redux/ShopData/shopData.actions";
// import { fetchCart } from "../redux/Cart/cart.actions";
import prisma from "../shared/libs/prisma";
import { formatJSDate } from "../shared/utils/convertTimestamp";

// const loadData = (state) => state.shopData.data; // a noi data non interessa qua
// const getCategories = (state) => state.shopData.categories;

const ItemsList = dynamic(
    () => import("../components/Shop/ItemsList/ItemsList"),
    {
        ssr: false,
    }
);
const ItemsCount = dynamic(
    () => import("../components/Shop/ItemsList/ItemsCount"),
    {
        ssr: false,
    }
);
const Filter = dynamic(() => import("../components/Shop/Filter/Filter"), {
    ssr: false,
});
const PageNav = dynamic(() => import("../components/Shop/PageNav/PageNav"), {
    ssr: false,
});

// import CategoriesMenu from "./CategoriesMenu/CategoriesMenu";

export default function Shop({ products, categories }) {
    const router = useRouter();
    const { research } = router.query;
    // console.log("research", research);

    const dispatch = useDispatch();

    useEffect(() => dispatch(setupShop({ products, categories })), []);
    /*
    let data = useSelector(loadData, shallowEqual);
     useEffect(() => {
        // console.log("SHOP RENDERS");

        if (!data) {
            dispatch(setupShop(products));
        }

        dispatch(fetchCategories());
        // anche se abbiamo gia data in redux!
    }, []); 

    useEffect(() => data && dispatch(fetchHighestValue()), [data]);
    */

    const ShopUI = () => (
        <>
            <Filter research={research} fallback={<div className="loader" />} />
            <ItemsCount />
            <PageNav />
            <ItemsList fallback={<div className="loader" />} />
            <PageNav />
            {/* <div>
                <h4>Categories:</h4>
                <CategoriesMenu />
            </div> */}
        </>
    );

    return (
        <div id={styles["Shop"]}>
            <Head>
                <title>Shop - Da Mamy a Mamy</title>
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Shop - Da Mamy a Mamy" />
            </Head>
            <div className={styles["shop-wrap"]}>
                <h1>In negozio</h1>
                <ShopUI />
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    let feed = await prisma.products.findMany({
        where: { count_in_stock: { gt: 0 } },
    });

    let allCategories = [];
    feed.map((el) => {
        allCategories = allCategories.concat(el.categories);
        console.log("el", el);
    });
    const uniqueCategories = [...new Set(allCategories)].sort();

    feed.map((el) => {
        el.price = Number(el.price);
        el.created_at = formatJSDate(el.created_at);
        return el;
    }); //not serializible data
    console.log("products", feed);

    return { props: { products: feed, categories: uniqueCategories } };
}

/* 
POSTGRESQL VERSION
export async function getServerSideProps() {
    const { data } = await axios.get("http://localhost:3000/api/products");
    // const { data } = await axios.get("https://damamyamamy/api/products");
    //getServerSideProps runs on build time, it does not receive data that???s only available during request time, such as query parameters or HTTP headers as it generates static HTML
    //per il deploy dovr?? renderlo dinamico in base al host dell'API, localhost funziona solo local
    // console.log("data ????", data);
    return {
        props: { products: data.products, categories: data.categories },
    };
}
*/

// vogliamo essere sicuri di avere data per shop prima di fare il render dei filters
// perch?? alcuni reducer hanno bisogno di data (vedi fetchHighestValue e priceRange)
