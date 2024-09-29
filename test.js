const myform = document.querySelector("myForm");
const myname= document.querySelector("#Myname");
const myadress= document.querySelector("#Myadress");
const mynumber= document.querySelector("#Mynumber");
const myemail= document.querySelector("#Myemail");
const mywebsite= document.querySelector("#Mywebsite");
const button= document.querySelector("#createButton");
const tableBody= document.querySelector("#AllData");
const tableHeading= document.querySelector("#headings")

let openRequest  = indexedDB.open("contacts", 1)

window.onload = ()=> {
    let request =  window.indexedDB.open("contacts",1)
request.onerror= ()=> {
    console.log("Database Failed")
}

request.onsuccess= ()=> {
    console.log("Database Successful")
    db = request.result;
    displayData();

}
request.onupgradeneeded = (e)=>{
  let db = e.target.result;
  let objectStore = db.createObjectStore("contacts",{keyPath: "id", autoIncrement: true})
  
  objectStore.createIndex("name","name", {unique:false})
  objectStore.createIndex("adress", "adress", {unique:false})
  objectStore.createIndex("email", "mail", {unique:false})
  objectStore.createIndex("telephone", "tele", {unique:false})
  objectStore.createIndex("website", "site", {unique:false})
  console.log("Database set-up")

};

myform.onsubmit=(e) => {
    e.preventDefault();
    let newItem={
        name: myname.value,
        address : myadress.value,
        telephone : mynumber.value,
        email : myemail.value,
        website : mywebsite.value,
    }
    let trans = db.transaction([ contacts],"readwrite")
    let objectStore = trans.objectStore("contacts")
    let request = objectStore.add(newItem)
    request.onsuccess= () => {
        myname.value= " ";
        myadress.value= " ";
        mynumber.value= " ";
        myemail.value= " ";
        mywebsite.value= " ";
    }
    trans.oncomplete= () => {
        console.log("Transaction completed.")
        displayData();
    }
};
function displayData(){
    let objectStore = db.transaction("contacts").objectStore("contacts");
    objectStore.openCursor().success = (e) =>{
let cursor = e.target.result;
if(cursor){
    let tr= document.createElement("tr")
    let tdName=  document.createElement("td")
    let tdAdress= document.createElement("td")
    let tdNumber= document.createElement("td")
    let tdEmail= document.createElement("td")
    let tdWebsite= document.createElement("td")
    
    tr.appendChild(tdName)
    tr.appendChild(tdAdress)
    tr.appendChild(tdNumber)
    tr.appendChild(tdEmail)
    tr.appendChild(tdWebsite)
  tableBody.appendChild(tr);

     tdName.textContent = cursor.value.name;
     tdAdress.textContent= cursor.value.address;
     tdNumber.textContent= cursor.value.telephone;
     tdEmail.textContent= cursor.value.email;
     tdWebsite.textContent= cursor.value.website;

     tr.setAttribute("data-contacid",cursor.value.id)



    
    
}
    }
}

}

