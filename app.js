const cl = console.log;

//create student

const form = document.getElementById("form");
const submit = document.getElementById("submit");
const update = document.getElementById("update");
const userInfoTable = document.getElementById("userInfoTable");

// const fName = document.getElementById("fName")
// const lName = document.getElementById("lName")
// const email = document.getElementById("email")
// const contact = document.getElementById("contact")



update.style.display = "none"
let userArray = [];

function uuid() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}


function getUserData() {
    if (localStorage.getItem("setUserInfo")) {
        return JSON.parse(localStorage.getItem("setUserInfo"))
    }
}

function onCreate(e) {
    e.preventDefault();
    let userObj = {
        FirstName: fName.value,
        LastName: lName.value,
        EmailId: email.value,
        Contact: contact.value,
        Id: uuid()
    };
    userArray.push(userObj);
    this.reset();
    localStorage.setItem("setUserInfo", JSON.stringify(userArray));
    userArray = getUserData()
    templating(userArray);
}



form.addEventListener("submit", onCreate);

//edit

function onEdit(e) {
    let getId = e.getAttribute("data-id");
    localStorage.setItem("setId", getId);
    update.style.display = "inline-block"
    submit.style.display = "none"
    let getLocalData = getUserData();
    cl(getLocalData)
    let getObj = getLocalData.filter(e => {
        return e.Id === getId
    })
    cl(getObj)
    fName.value = getObj[0].FirstName
    lName.value = getObj[0].LastName
    email.value = getObj[0].EmailId
    contact.value = getObj[0].Contact
}

//update

function onUpdate() {
    // cl("hello")
    let getId = localStorage.getItem("setId");
    // cl(getId)
    let getLocalData = getUserData()
    // cl(getLocalData)
    getLocalData.forEach(e => {
        if (e.Id === getId) {
            e.FirstName = fName.value;
            e.LastName = lName.value;
            e.EmailId = email.value;
            e.Contact = contact.value;
        }
        // cl(e)
        localStorage.setItem("setUserInfo", JSON.stringify(getLocalData))
        form.reset();
        update.style.display = "none";
        submit.style.display = "inline-block";
        templating(getLocalData);
    })
}

update.addEventListener("click", onUpdate)

//delete

function onDelete(e) {
    // cl("hello")
    let getId = e.getAttribute("data-id")
    // cl(getId);
    let setArray = getUserData();
    // cl(setArray);
    setArray=setArray.filter(e => {
    return e.Id != getId
})
// cl(setArray)
localStorage.setItem("setUserInfo",JSON.stringify(setArray))
templating(setArray);
}

function templating(e) {
    let result = ``;
    e.forEach((user, i) => {
        result += `<tr>
        <td>${i + 1}</td>
        <td>${user.FirstName}</td>
        <td>${user.LastName}</td>
        <td>${user.EmailId}</td>
        <td>${user.Contact}</td>
        <td><button class="btn btn-success" data-id=${user.Id} onclick="onEdit(this)">Edit</button></td>
        <td><button class="btn btn-danger" data-id=${user.Id} onclick="onDelete(this)">Delete</button></td>
        </tr>`
    });
    userInfoTable.innerHTML = result;
}


