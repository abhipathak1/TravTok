let api = "https://64521317bce0b0a0f73bef09.mockapi.io/TravelDetails";
let tbody = document.getElementById("tbody")
let paginationwrapper = document.getElementById("pagination-wrapper");







// Get the edit modal
var editmodal = document.getElementById("edit-price-modal");

window.addEventListener("load", () => {
  fetchData(1)
  fetchDataPagination()
});
let update_price = document.getElementById("product-price-input")

// Fetch the data from the API
async function fetchData(pageNumber) {
  try {
    let res = await fetch(`${api}?limit=5&page=${pageNumber}`);
    let data = await res.json();
    renderData(data);
  } catch (error) {
    console.log(error)
  }
}
//   fetching data for pagination 
async function fetchDataPagination() {
  try {
    let res = await fetch(api);
    let data = await res.json();
    let Total = data.length
    showPagination(Total, 5)


  } catch (error) {
    console.log(error)
  }
}
function showPagination(totalItems, limit) {
  const numOfButtons = Math.ceil(totalItems / limit);
  // console.log(numOfButtons)
  paginationwrapper.innerHTML = null;

  for (let i = 1; i <= numOfButtons; i++) {
    paginationwrapper.append(getAButton(i, i))
    console.log(getAButton(i, i))
  }
}

function getAButton(text, pageNumber) {
  let btn = document.createElement('button');
  btn.classList.add('pagination-button');
  btn.setAttribute('data-page-number', pageNumber);
  btn.textContent = text;

  btn.addEventListener('click', function (e) {
    let pageNumber = e.target.dataset['pageNumber'];

    fetchData(pageNumber);
  })

  return btn;


}

// Render the data in the table
function renderData(data) {

  tbody.innerHTML = "";

  data.forEach((el) => {
    // for(let el=0;el<data.length;i++){
    // Create the table row and cells
    let row = document.createElement("tr");
    let imageCell = document.createElement("td");
    let titleCell = document.createElement("td");
    let locationCell = document.createElement("td");
    let openCell = document.createElement("td");
    let priceCell = document.createElement("td");
    let editCell = document.createElement("td");
    let deleteCell = document.createElement("td");

    // Create the image element and set its properties
    let image = document.createElement("img");
    image.classList.add("card-img");
    image.src = el.images;

    // Create the title element and set its text
    let title = document.createElement("p");
    title.innerText = el.Title;

    // Create the location element and set its text
    let location = document.createElement("p");
    location.innerText = el.Location;

    // Create the open element and set its text
    let open = document.createElement("p");
    open.innerText = el.Open;

    // Create the price element and set its text
    let price = document.createElement("p");
    price.innerText = `${el.Price}$`;

    // Create the edit button and set its properties
    let editButton = document.createElement("button");
    editButton.classList.add("card-edit");
    editButton.innerText = "Edit";


    editButton.onclick = function () {
      editmodal.style.display = "block";
      update_price.setAttribute("value", el.Price)
      // Updating API 
      let editsubmitbtn = document.getElementById("edit-price-form");
      editsubmitbtn.addEventListener("submit", function (event) {
        event.preventDefault();
        edit_fetchdate(el);
        console.log(el)
      })


    }





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
        }
        );
        alert("Deleted Successfull...")
        location.reload()
      } catch (error) {
        console.error("Error updating API data:", error);
      }

      fetchData(stack[stack.length - 1])

    });

    // appending data
    titleCell.append(title)
    locationCell.append(location)
    openCell.append(open)
    priceCell.append(price)
    imageCell.append(image)
    editCell.append(editButton)
    deleteCell.append(deleteButton)
    row.append(imageCell, titleCell, locationCell, openCell, priceCell, editCell, deleteCell)
    tbody.append(row)

  }
  );

}



// ****************pop code ************************************
let addbtn = document.getElementById("Tours-Add-btn")
// Get the modal
let modal = document.getElementById("add-product-modal");

// Get the button that opens the modal
let btn = document.getElementById("add-product-btn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
// Get input elements in model

let title = document.getElementById("product-title");
let img = document.getElementById("product-image");
let loc = document.getElementById("product-location");
let open = document.getElementById("product-open");
let price = document.getElementById("product-price");
let des = document.getElementById("product-description");
let id = document.getElementById("product-id");

let submitbtn = document.getElementById("product-submit")


// When the user clicks the button, open the modal
addbtn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    editmodal.style.display = "none";
  }
}

submitbtn.addEventListener("click", async () => {
  let obj = {
    Title: title.value,
    images: img.value,
    Location: loc.value,
    Description: des.value,
    Open: open.value,
    Price: price.value,
    id: id.value
  }
  try {
    let res = await fetch(`${api}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj)
    })
    let data = await res.json();
    console.log(data)
    fetchData()

  } catch (error) {
    console.log(error)
  }
})



//  javascript for edit

// Get the <span> element that closes the modal
var editspan = document.getElementsByClassName("edit-close")[0];


//When the user clicks on <span> (x), close the modal
editspan.onclick = function () {
  editmodal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == editmodal) {
    editmodal.style.display = "none";
  }
}


async function edit_fetchdate(el) {
  let object = {
    ...el,
    Price: update_price.value
  }
  try {
    let res = await fetch(`${api}/${el.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      }, body: JSON.stringify(object)
    });
    let data = await res.json()
    console.log(data)

    alert("Price Successfully Updated")
    location.reload()

  } catch (error) {
    console.error("Error updating API data:", error);
  }
}

// AddEventListener for Page loads

let DashBoard = document.getElementById("DashBoard")
let Tours = document.getElementById("Tours")
let Users = document.getElementById("Users")

DashBoard.addEventListener("click", () => {
  location.href = "admin.html";
})
Users.addEventListener("click", () => {
  location.href = "adminUsers.html";
})
Tours.addEventListener("click", () => {
  location.href = "adminTourPackages.html";
})
