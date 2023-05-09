// AddEventListener for Page loads

let DashBoard = document.getElementById("DashBoard")
let Tours = document.getElementById("Tours")
let Users = document.getElementById("Users")

DashBoard.addEventListener("click",()=>{
  location.href = "admin.html";
})
Users.addEventListener("click",()=>{
 location.href="adminUsers.html";
})
Tours.addEventListener("click",()=>{
  location.href="adminTourPackages.html";
})



// indexRedirection

let indexRedirection = document.getElementById("indexRedirection");
indexRedirection.addEventListener("click", () => {
    location.href = "/index.html";
})

