// here all the html that will be load at the time of the

// this function will create list of hero.cards that will be used to show the search list
// or favorite list.
let createList = function (list, home) {
  if (!list) return false;
  let htmlComponent = "";
  let favText = home === "home" ? "Favorite" : "UnFavorite";
  let favColor = home === "home" ? "" : "red";
  for (let i = 0; i < list.length; i++) {
    let hero = list[i];
    htmlComponent += `
        <div class = "hero-card"> 
        
                <img src=${hero.image.url} alt="IMAGE">
                <span class = "name">${hero.name}</span>
          
            <div>
                <div id = "fav-${i}" style = "background-color:${favColor}" class ="fav-btn btn">${favText}</div>
                <div id = "fav-${i}" style = "background-color:"blue" class ="hero-btn btn">more...</div>
            </div>
        </div>
        `;
  }
  return htmlComponent;
};

// this create the main page of the search page with the help of createlist function
let setSearchComponent = function (state) {
  console.log("SEARCH", state.searchList);
  let list = "";
  if (state.searchList.constructor === String) {
    list = `<h2> ${state.searchList}</h2>`;
  } else {
    list = createList(state.searchList, state.currentWindow);
  }
  console.log("fromt you", list);
  let htmlText = `
            <main>
                <div class="search">
                    <input type="text" id="search-input"><div id="search-btn" class = "btn">search</div>
                </div>
                ${list}

            </main>
   `;
  return htmlText;
};

// this function will return the main page of the favorite.
let setFavoriteComponent = function (state) {
  console.log("FAVORITE");
  let list = createList(state.favoriteHeroList, state.currentWindow);
  if (!list) {
    list = `<h2>Your favorite list is Empty</h2>`;
  }

  let htmlText = `<main>${list}</main>`;
  return htmlText;
};

// this will create main page of hero section.
let setHeroComponent = function ({ hero }) {
  let appearance = "",
    biography = "",
    powerstats = "",
    relations = "";
  for (let property in hero.appearance) {
    if (
      hero.appearance[property].constructor === String &&
      hero.appearance[property].length > 2
    ) {
      appearance += `<li>${property} : ${hero.appearance[property]}</li>`;
    } else if (parseInt(hero.appearance[property][1][0])) {
      appearance += `<li>${property} : ${hero.appearance[property][1]}</li>`;
    }
  }
  for (let property in hero.biography) {
    if (
      hero.biography[property].constructor === String &&
      hero.biography[property].length > 2
    ) {
      biography += `<li>${property} : ${hero.biography[property]}</li>`;
    }
  }
  for (let property in hero.relations) {
    if (
      hero.connections[property].constructor === String &&
      hero.connections[property].length > 2
    ) {
      connections += `<li>${property} : ${hero.connections[property]}</li>`;
    }
  }
  for (let property in hero.powerstats) {
    if (parseInt(hero.powerstats[property])) {
      powerstats += `<li>${property} : ${hero.powerstats[property]}</li>`;
    }
  }
  return `<main class="page">
    <header>
            <img src="${hero.image.url}" alt="No Image found">
            <h1>${hero.name}</h1>
   </header>
    
    <details>
        <summary>How ${hero.name} look like or appear </summary>
        ${appearance}
    </details>
    <details>
        <!-- also include the work -->
       <summary>Biography of ${hero.name}</summary>
       ${biography}
   </details>
   <details>
       <summary>Where ${hero.name}'s Power lie relative to other super heros.</summary>
       ${powerstats}
   </details>
   <details>
       <summary>Relations or comnections</summary>
       ${relations}
   </details>
   </main>`;
};

// this function is main controller which call the defferent page according to the currentwindow sected.

export let rootComponent = function (state) {
  let currentWindow = state.currentWindow;
  let homeColor = "",
    favColor = "";
  console.log("RENDER ");
  let callback = setHeroComponent;
  if (currentWindow === "home") {
    callback = setSearchComponent;
    homeColor = "salmon";
  }
  if (currentWindow === "favorite") {
    callback = setFavoriteComponent;
    favColor = "salmon";
  }
  if (currentWindow === "hero") callback = setHeroComponent;
  return `
            <header class="nav">
                <div id="home" style = "background-color:${homeColor}" class="btn">HOME</div>
                <div id="favorite" style = "background-color:${favColor}"  class = "btn">Favorite</div>
            </header>
            ${callback(state)}
        `;
};
