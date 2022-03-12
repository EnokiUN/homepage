let website_collection = document.getElementById("website-collection");
let data = `
Github
Github | https://github.com/
Pycord | https://github.com/Pycord-Development/pycord/
Homepage | https://github.com/EnokiUN/homepage/
---
Docs
Arch Wiki | https://wiki.archlinux.org/
Python | https://docs.python.org/
Rust | https://docs.rust-lang.org/
Typescript | https://typescriptlang.org/docs/
MDN | https://developer.mozilla.org/en-US/
---
Entertainment
Youtube | https://youtube.com/
Discord | https://discord.com/app/
Revolt | https://app.revolt.chat/
Reddit | https://reddit.com/
9Anime | https://9anime.to/home/
itch.io | https://itch.io/
4chan | https://4chan.org/
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

  let date_text = `${date.toLocaleDateString("en-UK", { weekday: 'long' } )} ${date.getUTCDate()} ${date.toLocaleDateString("en-UK", { month: 'long' } )}`;
  let date_element = document.getElementById("date");
  date_element.innerText = date_text

  setTimeout(showTime, 1000);
};

const input = document.getElementById("search-bar");

input.addEventListener("keyup", (e) => {
  query = e.target.value;
  refreshWebsites(query);
  // I have to check for "Go" to make it work on mobile.
  if (e.key == "Enter" || e.key == "Go") {
    if (query.startsWith(":")) {
      var command = query.substring(1);
      commandHandler(command);
    } else {
      let encoded = encodeURI(query);
      window.location.href = `https://duckduckgo.com/?q=${encoded}`;
    }
  }
});

const commandHandler = (command) => {
  let idx = command.indexOf(" ");
  if ( idx === -1) {
    var cmd = command;
    var args = "";
  } else {
    var cmd = command.substring(0, idx);
    var args = command.substring(idx + 1);
  }
  cmd = cmd.toLowerCase();
  // TODO: Add more commands
  switch (cmd) {
    case "github":
    case "gh":
      if (args === "") {
        window.location.href = "https://github.com";
        break;
      }
      window.location.href = `https://github.com/${args}`;
      break;
    case "ghsearch":
      if (args === "") {
        window.location.href = "https://github.com/search";
        break;
      }
      var encoded = encodeURI(args);
      window.location.href = `https://github.com/search/?q+${encoded}`;
    case "youtube":
    case "yt":
      if (args === "") {
        window.location.href = "https://youtube.com";
        break;
      }
      var encoded = encodeURI(args);
      window.location.href = `https://youtube.com/results?search_query=${encoded}`;
      break;
    case "subreddit":
    case "sub":
      if (args === "") {
        window.location.href = "https://reddit.com/search";
        break;
      }
      window.location.href = `https://reddit.com/r/${args}`;
      break;
    case "reddit":
    case "rd":
      if (args === "") {
        window.location.href = "https://reddit.com";
        break;
      }
      var encoded = encodeURI(args);
      window.location.href = `https://reddit.com/search/?q=${encoded}`;
      break;
    case "stackoverflow":
    case "so":
      if (args === "") {
        window.location.href = "https://stackoverflow.com";
        break;
      }
      var encoded = encodeURI(args);
      window.location.href = `https://stackoverflow.com/search?q=${encoded}`;
      break;
    case "aur":
    case "arch":
      if (args === "") {
        window.location.href = "https://aur.archlinux.org";
        break;
      }
      var encoded = encodeURI(args);
      window.location.href = `https://aur.archlinux.org/packages?K=${encoded}`;
      break;
    default:
      console.log(cmd)
      showError(`Command not found: ${cmd}`);
      break;
  }
};

const showError = (error) => {
  console.log(error);
  let error_element = document.getElementById("error");
  if (error_element.style.display === "") {
    error_element.style.display = "block";
  }
  error_element.innerText = error;
};

refreshWebsites();
showTime();
input.focus()
