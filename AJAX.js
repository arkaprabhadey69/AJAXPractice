let XMLHttpRequest=require("xmlhttprequest").XMLHttpRequest;
function showTime(){

}
function makeAjaxCall(methodType,url,callback,async=true,data=null){
    let xhr= new XMLHttpRequest();
    xhr.onreadystatechange= function(){
       // console.log(methodType+" State Change status"+xhr.status+"Ready state: "+xhr.readyState);
        if(xhr.readyState===4){
            if(xhr.status===200||xhr.status===201){
                callback(xhr.responseText)
            }
            else if(xhr.status>=400){
                console.log("Bad error");
            }
        }

    }
    xhr.open(methodType,url,async);
    if (data){
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(JSON.stringify(data));
    }
    else {
        xhr.send();
    }


    console.log(methodType+" request sent to Server");
}


const getURL="http://localhost:3000/contacts/1";
function getUser(data){
    console.log("Get user data: "+data);
}
makeAjaxCall("GET",getURL,getUser,true);

const deleteURL="http://localhost:3000/contacts/2";
function getUserData(data){
    console.log("User Deleted: "+data);
}
makeAjaxCall("DELETE",deleteURL,getUserData,true);

const postURL="http://localhost:3000/contacts";
const empDate= {
    "firstName": "Dyo",
    "lastName": "Das",
    "address": "IIEST Shibpur",
    "city": "Howrah",
    "state": "West Bengal",
    "zip": "700123",
    "number": "9999888800",
    "email": "ddas@gmail.com",
    "start": {
      "year": "2019",
      "month": "11",
      "day": "13" }};

function userAdded(data){
    console.log("User Deleted: "+data);
}
makeAjaxCall("POST",postURL,userAdded,true,empDate);