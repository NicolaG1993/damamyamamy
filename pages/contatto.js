import ContactForm from "@/components/Forms/ContactForm";
import Head from "next/head";

export default function Contatto() {
    return (
        <>
            <Head>
                <title>Contatto • Da Mamy a Mamy</title>
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Contatto • Da Mamy a Mamy" />
            </Head>

            <main>
                <section className="page">
                    <h1>Contatto</h1>
                    <ContactForm />
                </section>
            </main>
        </>
    );
}
