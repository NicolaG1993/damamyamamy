import Head from "next/head";

export default function Page404() {
    return (
        <main id={"Page404"}>
            <Head>
                <title>Pagina non trovata 404 • Da Mamy a Mamy</title>
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="Pagina non trovata 404 • Da Mamy a Mamy"
                />
            </Head>
            <section className="page">
                <h1>404</h1>
                <div>
                    <p>Non troviamo la pagina che stai cercando.</p>
                </div>
            </section>
        </main>
    );
}
