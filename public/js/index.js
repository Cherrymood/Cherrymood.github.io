function hash12(string, digits) {
    digits = digits || 6;
    var m = Math.pow(10, digits + 1) - 1;
    var phi = Math.pow(10, digits) / 2 - 1;
    var n = 0;
    for (var i = 0; i < string.length; i++) {
      n = (n + phi * string.charCodeAt(i)) % m;
    }
    return n.toString();
  }

document.getElementById("marvelForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("usersName").value;

    let name_hash = CryptoJS.MD5(name);
    let your_Hero_id = Math.abs(name_hash.words[0]);

    if(your_Hero_id >= 1564) {
        while(your_Hero_id > 1564) {
            your_Hero_id /= 10;
        }
    }

    console.log(name_hash.words[0]);
    console.log(your_Hero_id);

    const publicKey = "5e0d9e41a28b77598bbf3cf127e7f1bb";
    const privateKey = "f3fdf1d223338e7b335388875bb5a115329a8ea2";
    const ts = Date.now().toString();
    const hash = CryptoJS.MD5(ts + privateKey + publicKey);

    const req = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=1&offset=${your_Hero_id}`;
    const req1 = `http://gateway.marvel.com/v1/public/characters/${your_Hero_id}/comics`;

    fetch(req)
    .then((response) => response.json())
    
    .then((data => {

        const heroInfo = data.data.results[0];
        console.log(heroInfo);

        let name_hero = document.getElementById("heroName");
        name_hero.innerText = heroInfo.name;

        let img = document.createElement("img");
        img.id = "hero_img";
        img.src = `${heroInfo.thumbnail.path}.${heroInfo.thumbnail.extension}`;
        img.height = 350;

        let card = document.getElementsByClassName("card");
        card[0].appendChild(img);

        let form = document.getElementById("marvelForm");
        card[0] = form.parentElement;
        card[0].removeChild(form);

        let btn = document.createElement("button");
        btn.type = "submit";
        btn.className = "button-75";
        btn.innerText = "Show comics with my hero";
        card[0].appendChild(btn);

        document.getElementsByClassName("button-75")[0].addEventListener("click", function(event) {
            event.preventDefault();
    
            fetch(req1)
            .then((response) => response.json())
            .then((data) => {
    
            const rdComicsIndex = Math.abs(Math.random() * results.Length);
    
            const comics = data.data.results[rdComicsIndex];
    
            let card = document.getElementsByClassName("card");
            let img = document.getElementsById("hero_img");
            let btn = document.getElementsByClassName("button-75");
    
            card[0] = img.parentElement;
            card[0] = btn[0].parentElement;
            card[0].removeChild(img);
            card[0].removeChild(btn[0]);
    
            name_hero.innerText = `${comics.title}`;
            console.log(comics.title);
    
            
    
    
    
    
            })
        })

    }))
    .catch((error) => {
        console.error('Error fetching the hero data:', error);
    });
})