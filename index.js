async function hash12(string, digits) {
    digits = digits || 6;
    const m = Math.pow(10, digits + 1) - 1;
    const phi = Math.pow(10, digits) / 2 - 1;
    let n = 0;
    for (let i = 0; i < string.length; i++) {
        n = (n + phi * string.charCodeAt(i)) % m;
    }
    return n.toString();
}

document.getElementById("marvelForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let name = document.getElementById("usersName").value; // Normalization of name
    name = name.toLowerCase().trim(); // Normalize
    console.log(`name: ${name}`);

    const name_hash = CryptoJS.MD5(name).toString(CryptoJS.enc.Hex);
    console.log(`name_hash: ${name_hash}`);

    let your_Hero_id = await hash12(name_hash, 4);
    console.log(`your_Hero_id: ${your_Hero_id}`);

    const lengthOfResults = 1564;
    your_Hero_id %= lengthOfResults;

    const publicKey = "5e0d9e41a28b77598bbf3cf127e7f1bb";
    const privateKey = "f3fdf1d223338e7b335388875bb5a115329a8ea2";
    const ts = Date.now().toString();
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

    // Fetch the hero information
    const req = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=1&offset=${your_Hero_id}`;
    
    try {
        const response = await fetch(req);
        const data = await response.json();
        const heroInfo = data.data.results[0];

        let name_hero = document.getElementById("heroName");
        name_hero.innerText = heroInfo.name;

        let img = document.createElement("img");
        img.id = "hero_img";
        img.src = `${heroInfo.thumbnail.path}.${heroInfo.thumbnail.extension}`;
        img.height = 350;

        let card = document.getElementsByClassName("card");
        card[0].appendChild(img);

        // Hide the form after showing hero
        let form = document.getElementById("marvelForm");
        card[0].removeChild(form);

        let btn = document.createElement("button");
        btn.className = "button-75";
        btn.innerText = "Show comics with my hero";
        card[0].appendChild(btn);

        // Fetch comics when the button is clicked
        btn.addEventListener("click", async function(event) {
            event.preventDefault();

            const comicsReq = `https://gateway.marvel.com/v1/public/characters/${heroInfo.id}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
            
            try {
                const comicsResponse = await fetch(comicsReq);
                const comicsData = await comicsResponse.json();
                const comicsResults = comicsData.data.results;
                console.log("Comics:", comicsResults);

                // Clear previous hero image and button
                card[0].removeChild(img);
                card[0].removeChild(btn);
                card[0].id = "card";
                let ind = 0;

                if (comicsResults.length > 0) {
                    name_hero.innerText = `Comics`;
                    card[0].id = "card";

                    comicsResults.forEach(comics => {
                        if (comics.title && ind < 6) {
                            // Create a container div for each comic
                            let comicContainer = document.createElement("div");
                            comicContainer.className = "comic-container"; // Use this class for styling

                            // Create the image element
                            let img_comics = document.createElement("img");
                            img_comics.id = "comics_pict";
                            img_comics.src = `${comics.thumbnail.path}.${comics.thumbnail.extension}`;
                            if (img_comics.src.includes("image_not_found")) {
                                return;
                            }
                            img_comics.height = 150;

                            // Create the paragraph element for the title
                            let par = document.createElement("p");
                            par.id = "comics_title";
                            par.innerText = `${comics.title}`;

                            // Append the image and title to the container
                            comicContainer.appendChild(img_comics);
                            comicContainer.appendChild(par);

                            // Append the container to the card
                            card[0].appendChild(comicContainer);

                            ind++;
                        }
                    });
                } else {
                    name_hero.innerText = `No comics available for this hero.`;
                }

                // Add a refresh button
                let btn1 = document.createElement("button");
                btn1.className = "button-75";
                btn1.id = "refresh";
                btn1.innerText = "Refresh";
                card[0].appendChild(btn1);

                btn1.addEventListener("click", function(event) {
                    event.preventDefault();
                    window.location.reload();
                });
            } catch (error) {
                console.error('Error fetching comics:', error);
            }
        });
    } catch (error) {
        console.error('Error fetching hero data:', error);
    }
});
