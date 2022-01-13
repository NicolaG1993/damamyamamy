import { useRouter } from "next/router";
import { useState, useEffect } from "react";

// import { fetchCart } from "../redux/Cart/cart.actions";
import axios from "axios";
import prisma from "../shared/libs/prisma";
import { formatJSDate } from "../shared/utils/convertTimestamp";

export default function DbTest({ catNewItems, cat1, cat2 }) {
    console.log("catNewItems", catNewItems);
    console.log("cat1", cat1);
    console.log("cat2", cat2);

    return (
        <div>
            <h1>DB TEST</h1>
        </div>
    );
}

export async function getServerSideProps() {
    let feedNew = await prisma.products.findMany({
        where: { count_in_stock: { gt: 0 } },
        orderBy: {
            created_at: "asc",
        },
        take: 20,
    });
    let feedA = await prisma.products.findMany({
        where: {
            count_in_stock: { gt: 0 },
            categories: {
                has: "Abbigliamento",
            },
        },
        orderBy: {
            created_at: "asc",
        },
        take: 20,
    });
    let feedB = await prisma.products.findMany({
        where: {
            count_in_stock: { gt: 0 },
            categories: {
                has: "Giocattoli",
            },
        },
        orderBy: {
            created_at: "asc",
        },
        take: 20,
    });

    const validateFeeds = (arr) =>
        arr.map((el) => {
            el.price = Number(el.price);
            el.created_at = formatJSDate(el.created_at);
            return el;
        });

    return {
        props: {
            catNewItems: validateFeeds(feedNew),
            cat1: validateFeeds(feedA),
            cat2: validateFeeds(feedB),
        },
    };
}
