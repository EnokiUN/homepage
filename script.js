let website_collection = document.getElementById("website-collection");
let data = `
Github
Github | https://github.com/
Pycord | https://github.com/Pycord-Development/pycord/
PSUP | https://github.com/EnokiUN/psup/
Rich | https://github.com/Textualize/rich/
---
Docs
Arch Wiki | https://wiki.archlinux.org/
Python | https://docs.python.org/
Rust | https://docs.rust-lang.org/
Pycord | https://docs.pycord.dev/
Typescript | https://typescriptlang.org/docs/
MDN | https://developer.mozilla.org/en-US/
Django | https://docs.djangoproject.com/
Pycord (Guide) | https://namantech.me/pycord/
Qtile | http://docs.qtile.org/
Oh My Zsh | https://github.com/ohmyzsh/ohmyzsh/
Vim | https://vim.org/docs.php
---
Entertainment
Youtube | https://youtube.com/
Discord | https://discord.com/app/
Revolt | https://app.revolt.chat/
Reddit | https://reddit.com/
9Anime | https://9anime.to/home/
itch.io | https://itch.io/
---
Useful Websites
Stackoverflow | https://stackoverflow.com/
AUR | https://aur.archlinux.org/
`.trim().replace(/\t/g, "");
let groups = data.split("---");

const refreshWebsites = (query = "") => {
  while (website_collection.firstChild) {
    website_collection.removeChild(website_collection.firstChild);
  }
  for (let i in groups) {
    let display = false;
    let div = document.createElement("div");
    div.classList.add("website-group");
    let group = groups[i].trim().split("\n");
    let title = group[0].trim();
    let title_element = document.createElement("h3")
    title_element.innerText = title;
    div.appendChild(title_element);
    for (let x in group ) {
      if ( x > 0 ) {
        let link = group[x].split('|');
        let name = link[0].trim();
        if ( name.toLowerCase().startsWith(query.toLowerCase()) ) {
          display = true;
          let url = link[1].trim();
          let url_element = document.createElement("a", {href: url});
          url_element.innerText = name;
          div.appendChild(url_element);
          let br = document.createElement("br");
          div.appendChild(br);
        }
      }
    }
    if ( display ) {
      website_collection.appendChild(div);
    }
  }
};

const showTime = () => {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    if (s < 10) { s = `0${s}`; }
    if (m < 10) { m = `0${m}`; }

    let time = `${h}:${m}:${s}`;
    let clock = document.getElementById("clock");
    clock.innerText = time;

    setTimeout(showTime, 1000);
};

const input = document.getElementById("search-bar");

input.addEventListener("keyup", (e) => {
  query = e.target.value;
  refreshWebsites(query);
  console.log(e);
  if (e.key == "Enter") {
    if (query.startsWith(":")) {
      commandHandler(query);
    } else {
      // Otherwise redirect to duckduckgo
      window.location.href = `https://duckduckgo.com/?q=${query}`;
    }
  }
});

refreshWebsites();
showTime();
