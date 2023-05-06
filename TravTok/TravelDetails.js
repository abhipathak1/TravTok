
let main_section = document.querySelector(".container")
let lsdata = JSON.parse(localStorage.getItem("trvale")) || []
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

    search.addEventListener("input", () => {

        let f = data2.filter(function (el) {
            if (el.Title.toUpperCase().includes(search.value.toUpperCase()) === true) {
                return true
            }
            else {
                return false
            }
        })
        // console.log(f)
        appends(f)
    })

    // SortByprice
    document.getElementById("sort-low-to-high").addEventListener("click", () => {
        data.sort((a, b) => a.Price - b.Price)
        appends(data)
    })

    document.getElementById("sort-high-to-low").addEventListener("click", () => {
        data.sort((a, b) => b.Price - a.Price)
        appends(data)
    })


    // SearchBylocation
    let searchbylocation = document.querySelector(".location")
    searchbylocation.addEventListener("input", () => {

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
    })


    // filter by seasons
    let season = document.getElementById("button4")
    let day = document.getElementById("button5")
    let time = document.getElementById("button6")

    season.addEventListener("click", (e) => {
        e.preventDefault()
        let filterdata = data2.filter((el) => {
            return (el.Open.includes("season"))
        })
        appends(filterdata)
    })
    day.addEventListener("click", (e) => {
        e.preventDefault()
        let filterdata = data2.filter((el) => {
            return (el.Open.includes("Days"))
        })
        appends(filterdata)
    })
    time.addEventListener("click", (e) => {
        e.preventDefault()
        let filterdata = data2.filter((el) => {
            return (el.Open.includes("Daily"))
        })
        appends(filterdata)
    })


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

    bt.addEventListener("click", (e) => {
        e.preventDefault()
        lsdata.push(data)
        localStorage.setItem("trvale", JSON.stringify(lsdata))

    })

    let images = document.createElement("div")
    images.classList.add("images")
    let img = document.createElement("img")
    img.src = data.images

    images.append(img)

    card.append(images, Information)
    return card
}