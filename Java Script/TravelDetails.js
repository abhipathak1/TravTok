
let main_section = document.querySelector(".container")
let lsdata = JSON.parse(localStorage.getItem("trvalsdata")) || []
let data = "https://64521317bce0b0a0f73bef09.mockapi.io/TravelDetails"

let data2 = []

let itemsPerPage = 4 // Number of items to show per page
let currentPage = 1 // Current page number

fetchdata()

function fetchdata() {
    fetch(data)
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            data2 = data
            appends(data)
        })
        .catch((error) => { console.log(error) })
}

function appends(data) {
    console.log("append")
    main_section.innerHTML = ""
    let card_list = document.createElement('div')
    card_list.id = "card_list"

    // Calculate the start and end index of the current page
    let startIndex = (currentPage - 1) * itemsPerPage
    let endIndex = startIndex + itemsPerPage

    // Get the current page items
    let currentData = data.slice(startIndex, endIndex)

    currentData.forEach(element => {
        let card = creating(element)
        card_list.append(card)
    });

    main_section.append(card_list)

    // Calculate the total number of pages
    let totalPages = Math.ceil(data.length / itemsPerPage)

    // Create the pagination buttons
    let paginationButtons = document.querySelector('.pagination')
    paginationButtons.innerHTML = ''

    for (let i = 1; i <= totalPages; i++) {
        let button = document.createElement('button')
        button.textContent = i

        if (i === currentPage) {
            button.classList.add('active')
        }

        button.addEventListener('click', () => {
            currentPage = i
            appends(data)
        })

        paginationButtons.appendChild(button)
    }

    // MainINput

    let search = document.querySelector(".inputtext")

    search.oninput = () => {
        let f = data2.filter(function (el) {
            if (el.Title.toUpperCase().includes(search.value.toUpperCase()) === true) {
                return true
            }
            else {
                return false
            }
        })
        appends(f)
    }

    // SortByprice
    document.getElementById("sort-low-to-high").onclick = () => {
        data.sort((a, b) => a.Price - b.Price)
        appends(data)
    }
    document.getElementById("sort-high-to-low").onclick = () => {
        data.sort((a, b) => b.Price - a.Price)
        appends(data)
    }


    // SearchBylocation
    let searchbylocation = document.querySelector(".location")
    searchbylocation.oninput = () => {

        let f2 = data2.filter(function (el) {
            if (el.Location.toUpperCase().includes(searchbylocation.value.toUpperCase()) === true) {
                return true
            }
            else {
                return false
            }
        })
        // console.log(f)
        appends(f2)
    }


    // filter by seasons
    let season = document.getElementById("button4")
    let day = document.getElementById("button5")
    let time = document.getElementById("button6")
    season.onclick = (e) => {
        e.preventDefault()
        let filterdata = data2.filter((el) => {
            return (el.Open.includes("season"))
        })
        appends(filterdata)
    }
    day.onclick = (e) => {
        e.preventDefault()
        let filterdata = data2.filter((el) => {
            return (el.Open.includes("Days"))
        })
        appends(filterdata)
    }
    time.onclick = (e) => {
        e.preventDefault()
        let filterdata = data2.filter((el) => {
            return (el.Open.includes("Daily"))
        })
        appends(filterdata)
    }
}


function creating(data) {

    let card = document.createElement("div")
    card.classList.add("card")

    let Information = document.createElement("div")
    Information.id = "Information"

    let title = document.createElement("p")
    title.classList.add("name")
    title.textContent = data.Title

    let description = document.createElement("p")
    description.classList.add("description")
    description.textContent = data.Description

    let location = document.createElement("p")
    location.classList.add("location")
    location.textContent = `Location : ${data.Location}`

    let Time = document.createElement("p")
    Time.classList.add("Time")
    Time.textContent = `Time : ${data.Open}`

    let price = document.createElement("p")
    price.classList.add("price")
    price.textContent = `${"$"}${data.Price}.00/per adult`

    let bt = document.createElement("button")
    bt.id = "button"
    bt.textContent = "Book"

    Information.append(title, description, location, Time, price, bt)


    // forBookNowDiv
    bt.addEventListener("click", (e) => {
        if (checkAvalible(data) === false) {
            lsdata = []
            lsdata.push({ ...data, quantity: 1 });
            localStorage.setItem("trvalsdata", JSON.stringify(lsdata))
        }
        forBookNowDiv()
    })

    let images = document.createElement("div")
    images.classList.add("images")
    let img = document.createElement("img")
    img.src = data.images

    images.append(img)

    card.append(images, Information)
    return card
}



// login_SignUpRedirection

let login_SignUpRedirection = document.getElementById("login_SignUpRedirection");
login_SignUpRedirection.addEventListener("click", () => {
    location.href = "login_SignUp.html";
})


let resetFilter = document.getElementById("resetFilter")
resetFilter.onclick = (e) => {
    appends(data2)
}

// forfilteSection

let filteringDiv = document.querySelector('.filters');
let filterButtons = document.querySelectorAll('.filterButtons');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        toggleFilteringDiv();
    });
});

function toggleFilteringDiv() {
    filteringDiv.style.display = filteringDiv.style.display === 'none' ? 'block' : 'none';
}





// ToptobottomPart

var backToTopBtn = document.querySelector("#back-to-topbtn");

window.addEventListener("scroll", function () {
    if (window.pageYOffset > 100) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
});

backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});




function checkAvalible(product) {
    for (let i = 0; i < lsdata.length; i++) {
        if (product.id === lsdata[i].id) {
            return true;
        }
    }
    return false;
}
let mainbody=document.getElementById("main")


function forBookNowDiv() {

    mainbody.style.opacity ="10%"

    let lsdata2 = JSON.parse(localStorage.getItem("trvalsdata")) || []
    console.log(lsdata2)
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    let main_sectio = document.querySelector(".cards")

    appends2()
    function appends2() {

        lsdata2.forEach(element => {
            main_sectio.innerHTML = ""
            // console.log(element)
            let tr = document.createElement("tr")
            let td1 = document.createElement("td")

            td1.textContent = element.Title
            td1.className="BooknowDivtitle"
            let td2 = document.createElement("td")
            td2.className = "q"
            let increment = document.createElement('button')
            increment.className = "increment"
            increment.innerHTML = '<i class="fas fa-plus"></i>';
            increment.addEventListener("click", () => {
                if (element.quantity < 5) {
                    element.quantity++

                    localStorage.setItem("trvalsdata", JSON.stringify(lsdata2));
                    appends2();
                    appends1()
                }
            })

            let h3 = document.createElement("span")
            h3.textContent = element.quantity

            let decrement = document.createElement('button')
            decrement.innerHTML = '<i class="fa-solid fa-minus"></i>';
            decrement.className = "decrement"
            decrement.addEventListener("click", () => {
                if (element.quantity > 1) {
                    element.quantity--

                    localStorage.setItem("trvalsdata", JSON.stringify(lsdata2));
                    appends2();
                    appends1()
                }
            })


            td2.append(decrement, h3, increment)
            tr.append(td1, td2)
            main_sectio.append(tr)
        });
    }
    let main = document.querySelector(".b")

    appends1()

    function appends1() {
        main.innerHTML = ""
        let sum = 0
        lsdata2.forEach(element => {
            sum = sum + element.Price * element.quantity
        });
        main.append("$ "+sum)
    }


    span.onclick = function () {
        mainbody.style.opacity="100%"
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    modal.style.display = "block";


}

let b = document.querySelector(".bt3")
b.onclick = function () {
    location.href = "payment.html";
}




let indexRedirection = document.getElementsByClassName("indexRedirection");
for (let i = 0; i < indexRedirection.length; i++) {
    indexRedirection[i].addEventListener("click", () => {
        location.href = "/index.html";
    });
}

