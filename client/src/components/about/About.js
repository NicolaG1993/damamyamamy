export default function About(props) {
    console.log("props in About.js: ", props);

    return (
        <div className="aboutus-comp">
            <h1>Benvenuti da Mamy a Mamy</h1>
            <div className="aboutus-comp-div aboutus-box1">
                <div className="aboutus-box1-pic"></div>
                <div className="aboutus-box1-text">
                    <p>
                        {`You've asked for a JavaScript solution, so here's the shortest I can get it:`}
                    </p>
                </div>
            </div>
            <div className="aboutus-comp-div aboutus-box2">
                <div className="aboutus-box2-text">
                    <p>{`You can drop the semicolon at the end for one extra saved character, because JavaScript has "automatic semicolon insertion," a feature I normally despise and rail against, but in this specific use case it should be safe enough.`}</p>
                </div>
            </div>
            <div className="aboutus-comp-div aboutus-box3">
                <div className="aboutus-box3-text">
                    <p>{`It's important to note that this only works on browsers
                        where JavaScript is enabled. Ideally, this would be
                        better handled as an offline batch job (sed script on
                        *nix, etc.) once a year, but if you want the JavaScript
                        solution, I think that's as short as it gets. (Now I've
                        gone and tempted fate.)`}</p>
                </div>
                <div className="aboutus-box3-pic"></div>
            </div>
        </div>
    );
}
