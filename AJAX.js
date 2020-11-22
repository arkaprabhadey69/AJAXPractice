let XMLHttpRequest=require("xmlhttprequest").XMLHttpRequest;
//Using callback
function makeAjaxCall(methodType,url,callback,async=true,data=null){
    let xhr= new XMLHttpRequest();
    xhr.onreadystatechange= function(){
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
//Using promise
function makePromiseCall(methodType,url,async=true,data=null){
    return new Promise(function(resolve,reject){
        let xhr= new XMLHttpRequest();
        xhr.onreadystatechange= function(){
            if(xhr.status.toString().match('^[2][0-9]{2}$')){
                resolve(xhr.responseText);
            }
            else if(xhr.status.toString().match('^[4,5][0-9]{2}$')){
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText 
                });
                console.log("XHR Failed");
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


    });
}


const getURL="http://localhost:3000/contacts/1";
function getUser(data){
    console.log("Get user data: "+data);
}
makeAjaxCall("GET",getURL,getUser,true);
//Using Promise
makePromiseCall("GET",getURL,true)
    .then(response=>{
        console.log("Get user data using promise:"+response)
    })
    .catch(error=>console.log("Get error status: "+JSON.stringify(error)));

const deleteURL="http://localhost:3000/contacts/7";
function getUserData(data){
    console.log("User Deleted: "+data);
}
makeAjaxCall("DELETE",deleteURL,getUserData,false);

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