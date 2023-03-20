import React, { useEffect, useState } from "react";
import Riddle from "./components/riddle";
import { categories } from "./helpers/quotes-categories";

// import { blake } from "./helpers/blake";
// import { dickinson } from "./helpers/dickinson";
// import { haiku } from "./helpers/haiku";
// import { keats } from "./helpers/keats";
// import { shelley } from "./helpers/shelley";

const App = () => {
    const resetApplication = () => {
        document.getElementsByClassName("main")[0].classList.remove("active");
        Promise.resolve()
        .then(() => setLoading(true))
        .then(() => {
          fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
            method: "GET", // or 'PUT'
            headers: {
              'X-Api-Key': 'cOpou8DlOiJIYL0rHTHzhA==nFU5umKipIVZy8nE'
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("Success:", data[0]);
                setRiddle({
                  author: data[0].author,
                  lines: [data[0].quote]
                });
                setLoading(false);
            })
            .catch(error => {
                console.error("Error:", error);
            });
        })
    };
    // const AB = Math.random() * 2;
    const category = categories[Math.floor(Math.random() * categories.length)];
    // let selected = {};
    const [riddle, setRiddle] = useState({});
    const [loading, setLoading] = useState(true);

    // dickinson[Math.floor(Math.random() * dickinson.length)];
    // if (AB > 0 && AB < 0.33) {
    //     selected = haiku[Math.floor(Math.random() * haiku.length)];
    //     riddle = {
    //         author: selected.author,
    //         lines:
    //             selected.haikus[
    //                 Math.floor(Math.random() * selected.haikus.length)
    //             ].lines
    //     };
    // }
    // if (AB >= 0.34 && AB < 0.66)
    //     riddle = blake[Math.floor(Math.random() * blake.length)];
    // if (AB >= 0.67 && AB < 1.33)
    //     riddle = keats[Math.floor(Math.random() * keats.length)];
    // if (AB >= 1.34 && AB < 1.66)
    //     riddle = shelley[Math.floor(Math.random() * shelley.length)];

    useEffect(() => {
        fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
            method: "GET", // or 'PUT'
            headers: {
                "X-Api-Key": "cOpou8DlOiJIYL0rHTHzhA==nFU5umKipIVZy8nE"
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("Success:", data[0]);
                setRiddle({
                    author: data[0].author,
                    lines: [data[0].quote]
                });
                setLoading(false);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }, []);

    return (
        <div>
            <h1>Cryptogram</h1>
            <button onClick={() => resetApplication()} className="reset">
                RESET
            </button>
            {!loading && <Riddle category={category} riddle={riddle} />}
        </div>
    );
};

export default App;
