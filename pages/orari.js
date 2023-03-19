import Head from "next/head";

export default function Orari() {
    //================================================================================
    // Render UI
    //================================================================================
    return (
        <>
            <Head>
                <title>Orari di apertura • Da Mamy a Mamy</title>
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="Orari di apertura • Da Mamy a Mamy"
                />
            </Head>

            <main id="Contact">
                <section className="page">
                    <h1>Orari di apertura</h1>
                    <div>
                        <p>09:00 - 14:00 | Lunedí, Venerdí e Sabato</p>
                        <p>09:00 - 18:30 | Martedí, Mercoledí e Giovedí</p>
                    </div>
                </section>
            </main>
        </>
    );
}
