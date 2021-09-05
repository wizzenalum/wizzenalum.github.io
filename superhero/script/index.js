import {rootComponent} from "./Component.js";
import {token} from "./token.js"
let state = {
    currentWindow : "home",         // value can be "home", "favorite", "hero","loading"
    favoriteHeroList : [],   // store all favorited heros
    searchList : [],      // store searched list.
    hero:{}                 //this the hero which will be present in the page.    
} 
let listenerIds = []; // this for listenrs removal.

// all events are handled here.
export const handleXMLRequest = function(event,state){
    // this will handle the loaded responce of the search.
    if(event && event.target && event.target.response){
        let data = JSON.parse(event.target.response);
        console.log(data.results,state.searchList);
        if(data.results) state.searchList = data.results;
    }
}
function handleSearchClick(){
    // make a ajax request and as soon as userr click on search btn
    const inputBtn = document.getElementById("search-input")
    let searchText = inputBtn.value;
    let heroReq = new XMLHttpRequest();
    heroReq.addEventListener("load",(e)=>{
        let searchList = handleXMLRequest(e,state);
        if(state.searchList.length>0) render();
        });
    heroReq.open("GET",`https://www.superheroapi.com/api.php/${token}/search/${searchText}`)
    heroReq.send();
}  
const handleToggleFavorite = function(event){
    // this function handle the favorite button and unfavorite button listner.
    console.log("click", event.target.id, event.target);
    let id = event.target.id.substring(4);
    
    if(state.currentWindow==="home"){
        state.favoriteHeroList.push(state.searchList[Number(id)])
        state.searchList.splice(id,1);
        render();
    }
    if(state.currentWindow==="favorite"){
        let id = event.target.id.substring(4);
        // state.searchList.push(state.favoriteHeroList[Number(id)])
        state.favoriteHeroList.splice(id,1);
        render();
    }  
}
const handleToggleHero = function(event){
    // when user click on more at that time this function change the state accordingly. 
    const id = event.target.id.substring(4);
    if(state.currentWindow ==="home"){
        state.hero = state.searchList[id];
    }
    if(state.currentWindow==="favorite"){
        state.hero = state.favoriteHeroList[id]
    }
    if(event.target.id=="home" || event.target.id ==="favorite"){
        state.currentWindow = event.target.id;
    }else state.currentWindow = "hero"
    render();
}
const handleNavigation = function(event){
    // hnadle the click on home and favorite navigation.
    console.log(event.target.id);
    if(state.currentWindow!=event.target.id){
        state.currentWindow = event.target.id;
        render();
    }
}

// setting the all event listeners here
let rootListenrers = function(){
    // it will set the listernes need in all the 3 pages
    const homeNav = document.getElementById("home");
    const favNav = document.getElementById("favorite");
    let a= homeNav.addEventListener('click',handleNavigation);
    favNav.addEventListener('click',handleNavigation);
}
let searchListners = function(){
    // setting the listners when search page is loads

    const searchBtn = document.getElementById("search-btn");
    searchBtn.addEventListener('click',handleSearchClick);
    if( state.searchList && state.searchList.length>0){
        const favbtn = document.querySelectorAll(".fav-btn");
        const  more = document.querySelectorAll(".hero-btn");
        for(let i = 0;i<favbtn.length;i++){
            more[i].addEventListener('click',handleToggleHero);
            favbtn[i].addEventListener('click',handleToggleFavorite);
          }
    }
}
let favoriteListners = ()=>{
    // setting the listeners when favorite page is laods
    if(state.favoriteHeroList.length>0){
        const favbtn = document.querySelectorAll(".fav-btn");
        const  more = document.querySelectorAll(".hero-btn");
        for(let i = 0;i<favbtn.length;i++){
            more[i].addEventListener('click',handleToggleHero);
            favbtn[i].addEventListener('click',handleToggleFavorite);
          }
    }

}
let manageListners = ()=>{
    // this control specific listners at specific pages.
    for(let id of listenerIds){
        removeEventListener(id);
    }
    rootListenrers();
    if(state.currentWindow==="home"){
        searchListners();
    }else if(state.currentWindow==="favorite"){
        favoriteListners();
    }
}

let content = document.body;
const render = ()=>{
    // render the page 
    console.log("current state",state);
    content.innerHTML = rootComponent(state);
    manageListners();
}
render()


