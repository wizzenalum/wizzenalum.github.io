var screenStack  = [];
var screenText = null;
var numberText = null;
var onScreenObj = document.getElementById("screen");
function showOnScreen(){
    onScreenObj.innerText = screenText;
}
function operand(bits){
    if(numberText===null) numberText = bits;
    else numberText+=bits;
    if(screenText===null) screenText = bits;
    else screenText+=bits;
    showOnScreen();
}
function operator(bits){

    if(screenText===null) screenText = bits;
    else screenText+=bits;
    if(numberText!=null)screenStack.push(parseFloat(numberText));
    screenStack.push(bits);
    numberText = null;
    showOnScreen();
}

function clean(){
    screenStack.splice(0);
    screenText =null;
    numberText= null;
    showOnScreen();
}

function calculate(){
    // putting last number in the stack.
    if(numberText!=null){
        screenStack.push(parseFloat(numberText));
    }
    var result = solveExp();
    // var result = null;
    // screenStack.forEach(function(ele){
    //     if(typeof(ele)==="number"){
    //         if(result==null) result = ele;
    //         else{
    //             // console.log(result);
    //             result +=ele;
    //         }
    //     }
    // });
    screenText = result;
    numberText = result;
    showOnScreen();
}

function solveExp(){
    var st = [];
    for(var i = 0; i<screenStack.length;i++){
        if(screenStack[i]==='('){
            st.push(i);
        }else if(screenStack[i]===')'){
            if(st.length==0){ // taking care of bracket balancing
                console.log("wrong answer");
            }else{
                var preIndex = st.pop();
                console.log("in", preIndex,i)
                var partialResult = calc(preIndex,i);
                console.log(partialResult);
                if(typeof(screenStack[preIndex-1])=="number" && typeof(screenStack[i+1])=="number"){
                    screenStack.splice(preIndex,0,"*",partialResult,"*");
                }else if(typeof(screenStack[preIndex-1])=="number"){
                    screenStack.splice(preIndex,0,"*",partialResult);
                }else if(typeof(screenStack[i+1])=="number"){
                    screenStack.splice(preIndex,0,partialResult,"*");
                }else screenStack.splice(preIndex,0,partialResult);
            }
        } 
    }
    screenStack.splice(0,0,"(");
    screenStack.push(")")
    return calc(0,screenStack.length-1); 
}
function calc(i,j){

    // divisions
    if(screenStack[i+1]=="/" || screenStack[i+1]=="*" ){
        console.log("/ or * is at wrong place");
        return NaN;
    }
    for(var temp = i+2;temp<j;temp++){
        if(screenStack[temp]=="/"){
            if(typeof(screenStack[temp-1]) == "number" && typeof(screenStack[temp+1]) == "number"){
                var res = screenStack[temp-1]/screenStack[temp+1];
                screenStack.splice(temp-1,3,res);
                j-=2;
            }
            else{console.log("/ is at wrong place");
            return NaN;}
        }
    }
    // for multiplication operator
    for(var temp = i+2;temp<j;temp++){
        if(screenStack[temp]=="*"){
            if(typeof(screenStack[temp-1]) == "number" && typeof(screenStack[temp+1]) == "number"){
                var res = screenStack[temp-1]*screenStack[temp+1];
                screenStack.splice(temp-1,3,res);
                j-=2;
            }
            else{console.log("* is at wrong place");
            return NaN;}
        }
    }

    // for summation and substraction
    // step one combining the operator and operand 
    for(var temp = i+1;temp<j;temp++){
        if(typeof(screenStack[temp]) != "number"){
            if(typeof(screenStack[temp+1])=="number"){
                if(screenStack[temp]=="-"){
                    screenStack[temp+1] = -1*screenStack[temp+1];
                }
                screenStack.splice(temp,1);
                j--;
            }else{
                console.log("+ or - is at wrong place");
                return NaN;
            }
        }
    }
    // step2 findind the result of this sub XPathExpression.
    var find = 0;
    for(var temp = i+1;temp<j;temp++){
        find += screenStack[temp];
    }
    screenStack.splice(i,j-i+1);
    return find;
}



// var c = document.querySelectorAll(".operand-button, .operator-button");
//  function print(value){
// //    console.log(value);
// 	 screenText = value;
// 	 showOnScreen();
//  }

// for(var i = 0;i<c.length;i++){
// 	var str = c[i].innerText;
//   c[i].addEventListener("click",function(){print(str)});
// }