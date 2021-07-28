import { db }from "./data/db.js"
import { cache } from "./data/cache.js"
/* this contains the indecies of sorted by percentage will be used to 
    db.js is an array contain all the studets with district wise and then school wise where these are increasing order of roll no.
        where one student holds following key in json object.
            db = [.........,{   "school":"##","name":"##",
                                "roll_no":"##", "fname":"##",
                                "mname":"##", "percent":"##",
                                "marks":"##", "district":"##",
                                "id":"##","s-code":"##"},.............]
    cache.js is object where keys are -->> "sorted", "district", "district-code","school-code", all the district codes for school names
        "sorted" --> [array of all student]
        "district" --> {district-code: [ array of all students in district]
        district-code --> {school-code: [ array of all students in school]
        "district-code" -->{district-code:district_name}
        "school-code" --> {district-code:{school-code:school_name}}
*/
let count = 0;
// variable used to create single page on the view
let current_id = "";

// input fielsd
let inputDistrict = document.getElementById("select-district");
let inputSchool = document.getElementById("select-school");
let inputMin = document.getElementById("min-range");
let inputMax = document.getElementById("max-range");


// ******************INITIALIZATION**************
window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    let roll_no = 1500000;
    let school = 0;
    let percent = 0;
    for(let index in db){
        let deli1 = db[index].indexOf(" ");
        let deli2 = db[index].indexOf(" ",deli1+1);
        roll_no = roll_no + parseInt(db[index].substring(5,deli1));
        if(parseInt(db[index].substring(1+deli1,deli2))!=0) school = parseInt(db[index].substring(1+deli1,deli2))+1000000;  
        percent = parseInt(db[index].substring(0,3))
        if(percent!=100) percent/=10;
        db[index] = [
            percent,
            db[index].substring(deli2+1),
            roll_no,
            parseInt(db[index].substring(3,5))+90,
            school,
                    ]
    }
    console.log(db[0]);
    
  });
// adding option to the select-district and select-school;
console.log(db[0],cache["district-code"]);


let distOption = '<option value="">--------   none   --------</option>';
let keys = Object.keys(cache["district-code"])
for(let key of keys){
    distOption+=`<option value=${key}>${cache["district-code"][key]}</option>`
}
inputDistrict.innerHTML = distOption
// value of schools will be selected as district-select will change.
inputDistrict.addEventListener('change', () => {
    console.log(inputDistrict.value)
    let schOption =  `<option value="">--------   none   --------</option>`;
    keys = Object.keys(cache["school-code"][inputDistrict.value])
    for(let key of keys){
        schOption+=`<option value=${key}>${cache["school-code"][inputDistrict.value][key]}</option>`
    }
    inputSchool.innerHTML = schOption
  });
// fuction for creating pages and single post

// this function create single post.
let createPost = async function(student){
    let post = `<div class="feature">
          <h3>${student[1]}(${student[2]})</h3>
          <b>percent : ${student[0]}%</b>
          <p>school</p>
          <small>${cache["school-code"][student[3]][student[4]]} </small>
        </div>`;
    let feature = document.querySelector(".features");
    feature.innerHTML+=post;
}
// this will create page for array of index.
let createPage = async function(posts){
    // console.log(posts,start);
    console.log("post creation start");
    let count = 0;
    if(posts.length>0){
        current_id = setInterval(function(){
            createPost(db[posts[count]])
            count++;
            if(count>posts.length){
                clearInterval(current_id);
            }
            console.log(count)
        },100)
        console.log("post creation end")
    } else console.log(" array has 0 items so page wont create.")
}

// range will be handled by this only 
let rangeHandler = async function(indexArray,min,max,type,district,school){
    // console.log("rangeHandler is started",indexArray.length,min,max,type,district,school)
    let posts = []
    for(let index of indexArray){
        let per = db[index][0];
        // console.log("for loop index is",!isNaN(parseFloat(per)), parseFloat(per)<=max,"post is ",posts)
        // console.log(per.length>2, !isNaN(parseFloat(per)), parseFloat(per)<=max,per.length>2 && !isNaN(parseFloat(per)) && parseFloat(per)<=max)
        if(per <= max){
            if(per < min) break
            posts.push(index);            
        }
    }
    console.log("newe arr is ",posts);
    let first_post="";
    console.log(first_post,type==1,type==2,type==3)
    if(type==1){
        console.log(" first post type is ", type)
        first_post = `<div class="feature">
                    <p>Total students</p>
                    <h1>${posts.length}</h1>
                    <p>District</p>
                    <h3>${cache["district-code"][district]} </h3>
                    <p>School</p>
                    <small>${cache["school-code"][district][school]} </small>
                    </div>`;
        document.querySelector(".features").innerHTML = first_post;
    }else if(type ==2){
        console.log(" first post type is ", type)
        let first_post = `<div class="feature">
                    <h3>Total students</h3>
                    <h1>${posts.length}</h1>
                    <p>District </p>
                    <h1> ${cache["district-code"][district]} </h1>
                    </div>`;
        document.querySelector(".features").innerHTML = first_post;
    }else if(type==3){
        console.log(" first post type is ", type)
        let first_post = `<div class="feature">
                    <h3>Total students</h3>
                    <h1>${posts.length}</h1>
                    <p>Rajasthan</p>
                    <h1> science student </h1>
                    </div>`;
        document.querySelector(".features").innerHTML = first_post;
    }
    createPage(posts);
}


// this is event listner and also validate wrong inputs here
document.getElementById("get-result").addEventListener('click',function(){
    clearInterval(current_id);
    let minRange = parseFloat(inputMin.value);
    let maxRange = parseFloat(inputMax.value);
    let school = inputSchool.value;
    let district = inputDistrict.value;
// cases1 range is 0 to 100;
    if(!isNaN(minRange) && minRange<=36 && !isNaN(maxRange) && maxRange===100 && district){
        //subcase1: if schooland district is selected
        if(school && district){
            if(cache[district] && cache[district][school]){
                console.log("schooland district is selected")
                // creating total count set
                let posts = cache[district][school]
                let first_post = `<div class="feature">
                    <p>Total students</p>
                    <h1>${posts.length}</h1>
                    <p>District</p>
                    <h3>${cache["district-code"][district]} </h3>
                    <p>School</p>
                    <small>${cache["school-code"][district][school]} </small>
                    </div>`;
                document.querySelector(".features").innerHTML = first_post;
                createPage(posts);
            }else console.log("school or district is wrong")
        //subcase2: if only district is selected
        }else if(district){
            if(cache["district"][district]){
                console.log("only district is selected");
                let posts = cache["district"][district];
                let first_post = `<div class="feature">
                    <h3>Total students</h3>
                    <h1>${posts.length}</h1>
                    <p>District </p>
                    <h1> ${cache["district-code"][district]} </h1>
                    </div>`;
                document.querySelector(".features").innerHTML = first_post;
                createPage(posts);
            }else console.log("wrong district")
        //subcase3: if nothing is selected
        }else console.log("district is not selected")
    }
// case2: if range is variable;
    else if( minRange && maxRange){
        if(minRange>maxRange){
            console.log("min range is higher then max range");
            minRange = maxRange;
        }
        console.log("if range is variable")
        // subcase1: range/dist/school all are given
        if(school && district){
            if(cache[district] && cache[district][school]){
                console.log("school /district/range is selected")
                // creating total count set
                rangeHandler(cache[district][school],minRange,maxRange,1,district,school);
            }else console.log("school or district is wrong")
        //subcase2: if range and district is selected
        }else if(district){
            if(cache["district"][district]){
                console.log("range and district is selected");
                rangeHandler(cache["district"][district],minRange,maxRange,2,district);
            }else console.log("wrong district")
        //subcase3: if nothing is selected
        }else{
            console.log("range is given")
            rangeHandler(cache["sorted"],minRange,maxRange,3);
        }    
    }
    else{
        console.log("some technical issue is occured")
    }
})




