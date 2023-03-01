import Head from "next/head";
import {
    useEffect,
    useState,
    Children,
    isValidElement,
    cloneElement,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectUserState } from "@/redux/slices/userSlice";
// const selectUserInfo = (state) => state.user.userInfo;
// import useWindowDimensions from "@/utils/useWindowDimensions";
// import useScrollPosition from "@/utils/useScrollPosition";

import Header from "./Header";
import Footer from "./Footer";
import dynamic from "next/dynamic";
const CartIcon = dynamic(
    () => import("@/components/Buttons/CartIcon/CartIcon"),
    {
        ssr: false,
    }
);
// import CartIcon from "@/components/Buttons/CartIcon/CartIcon";
// import Cookies from "js-cookie";

export default function Layout({ children, ...pageProps }) {
    const [userInfo, setUserInfo] = useState(null);
    const [cookiesConfirm, setCookiesConfirm] = useState(false);
    // const [isSmallDevice, setIsSmallDevice] = useState(false);
    const [animationReady, setAnimationReady] = useState(false);

    // const dispatch = useDispatch();
    let user = useSelector(selectUserState);
    // const { width, height } = useWindowDimensions();
    // const { scrollTop } = useScrollPosition();

    // useEffect(() => {
    //     setUserInfo(selectedUserInfo);
    // }, []);

    //  useEffect(() => setUserInfo(selectedUserInfo), [selectedUserInfo]);

    useEffect(() => {
        // let userCookie = Cookies.get("userInfo")
        //     ? JSON.parse(Cookies.get("userInfo"))
        //     : undefined;
        // setUserInfo(userCookie);
        // console.log("userInfo:", userCookie);

        const timer = setTimeout(() => {
            setAnimationReady(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => (user ? setUserInfo(user) : setUserInfo(null)), [user]);
    // useEffect(
    //     () => (width > 550 ? setIsSmallDevice(false) : setIsSmallDevice(true)),
    //     [width]
    // );

    // function recursiveMap(children, fn) {
    //     return Children.map(children, (child) => {
    //         if (!isValidElement(child) || typeof child.type == "string") {
    //             return child;
    //         }
    //         if (child.props.children) {
    //             child = cloneElement(child, {
    //                 children: recursiveMap(child.props.children, fn),
    //             });
    //         }
    //         return fn(child);
    //     });
    // }
    // const childrenWithProps = recursiveMap(children, (child) => {
    //     if (isValidElement(child)) {
    //         return cloneElement(child, {
    //             scrollTop: scrollTop,
    //             width: width,
    //             height: height,
    //             isSmallDevice: isSmallDevice,
    //         });
    //     }

    //     return child;
    // });

    const renderAnimation = animationReady
        ? {
              transform: "translateY(0)",
              opacity: "1",
          }
        : {
              transform: "translateY(50px)",
              opacity: "0",
          };

    return (
        <>
            <Head>
                <meta
                    name="keywords"
                    content="usato, bambini, compro, negozio, articoli, seconda mano, giochi, abbigliamento, cavaion, verona"
                />
                <meta
                    name="description"
                    content="Negozio di accessori, passeggini, abbigliamento e giocattoli di seconda mano per bambini da 0 a 10 anni. Il nostro mercatino dell'usato è situato in Vicolo Teatro, 4, 37010 Cavaion Veronese, Verona, Italia"
                />

                <meta
                    property="og:description"
                    content="Negozio di accessori, passeggini, abbigliamento e giocattoli di seconda mano per bambini da 0 a 10 anni. Il nostro mercatino dell'usato è situato in Vicolo Teatro, 4, 37010 Cavaion Veronese, Verona, Italia"
                />

                <meta property="og:url" content="https://www.damamyamamy.com" />
                <meta property="og:image" content="/logo192.png" />
                <meta property="og:image:alt" content="Il nostro logo" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="manifest" href="/manifest.json" />
                <link
                    rel="apple-touch-icon"
                    sizes="192x192"
                    href="/logo192.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="512x512"
                    href="/logo512.png"
                />

                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta name="author" content="NGD - Nicola Gaioni Design" />
                <meta charSet="UTF-8" />
            </Head>

            <Header userInfo={userInfo} />
            <CartIcon />
            {children}
            <Footer />

            {!cookiesConfirm && (
                <div className="cookieWrap" style={renderAnimation}>
                    <p>
                        This website uses essential cookies to improve the user
                        experience.
                    </p>
                    <span onClick={() => setCookiesConfirm(true)}>
                        I understand
                    </span>
                </div>
            )}
        </>
    );
}
