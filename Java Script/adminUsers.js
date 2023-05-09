let api = "https://64521317bce0b0a0f73bef09.mockapi.io/Users"


window.addEventListener("load", ()=>{
    fetchData()
   
});
  
  // Fetch the data from the API
  async function fetchData() {
    try {
        let res = await fetch(`${api}`);
        let data = await res.json();
        //console.log(data)
       
        renderData(data);
    } catch (error) {
      console.log(error)
    }
  }

  // Render the data in the table
  function renderData(data) {
    
    tbody.innerHTML = ""; 
  
    data.forEach((el) => {
      // Create the table row and cells
      let row = document.createElement("tr");
      let idCell = document.createElement("td");
      let nameCell = document.createElement("td");
      let emailCell = document.createElement("td");
      let passwordCell = document.createElement("td");
      let deleteCell = document.createElement("td");
  
       // Create the id element and set its text
       let id = document.createElement("p");
       id.innerText = el.id;

      // Create the name element and set its text
      let name = document.createElement("p");
      name.innerText = el.name;
  
      // Create the email element and set its text
      let email = document.createElement("p");
      email.innerText = el.email;
  
      // Create the password element and set its text
      let password = document.createElement("p");
      password.innerText = el.password;
  
      // Create the delete button and set its properties and event listener
      let deleteButton = document.createElement("button");
      deleteButton.classList.add("card-delete");
      deleteButton.innerText = "Delete";
     
    deleteButton.addEventListener("click", async () => {
      try {
        //let deletedData = deleteObjectFromArray(data, el.id);
        //console.log("Deleted data:", deletedData);
        let response = await fetch(`${api}/${el.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        });
        alert("User Deleted From Server")

      } catch (error) {
        console.error("Error updating API data:", error);
      }

      fetchData()
    });
       
       
        // appending data
        idCell.append(id)
        nameCell.append(name)
        emailCell.append(email)
        passwordCell.append(password)
      
        deleteCell.append(deleteButton)
        row.append(idCell,nameCell,emailCell,passwordCell,deleteCell)
        tbody.append(row)
        
    });
  
  }
  

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
