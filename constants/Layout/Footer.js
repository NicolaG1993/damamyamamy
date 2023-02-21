export default function Footer() {
    return (
        <>
            <footer>
                <div>
                    Da Mamy a Mamy
                    {/* <Nav />
                    <LegalInfos />
                    <ContactCard />
                    <SocialsIcons /> */}
                </div>
            </footer>
            <Copyrights />
        </>
    );
}

function Copyrights() {
    const currentYear = new Date().getFullYear();
    return (
        <div className={"copyrights"}>
            Da Mamy a Mamy, © {currentYear} • by{" "}
            <a
                href="https://nicogdesign.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                NGD
            </a>
        </div>
    );
}
