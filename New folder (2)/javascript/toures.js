let main_section=document.querySelector(".container") 
let lsdata=JSON.parse(localStorage.getItem("trvale"))||[]
let data="https://64521317bce0b0a0f73bef09.mockapi.io/TravelDetails"
fetchdata()
let data2=[]
function fetchdata(){
    fetch(data)
    .then(res=>res.json())
    .then((data)=>{
        console.log(data)
        data2=data
        appends(data)
    })
    .catch((error)=>{console.log(error)})
}
function appends(data){
    main_section.innerHTML=""
   let card_list=document.createElement('div')
   card_list.id="card_list"
   data.forEach(element => {
    let card=creating(element)
    let hl=document.createElement("div")
     hl.id="hl"
    card_list.append(card,hl)
   });
   
   main_section.append(card_list,)
   
}

function creating(data){

    let card=document.createElement("div")
    card.id="card"
    
    let card2=document.createElement("div")
    card2.id="card2"
    let p1=document.createElement("p")
    p1.id="name"
    p1.textContent=data.Title
   
    
    let p2=document.createElement("p")
    p2.id="description"
    p2.textContent=data.Description

    let p3=document.createElement("p")
    p3.id="Ages"
    p3.textContent="Ages: all age groups"
    let p4=document.createElement("p")
    p4.id="location"
    p4.textContent=`location - ${data.Location}`

    let p5=document.createElement("p")
    p5.id="time"
    p5.textContent=`Time - ${data.Open}`
    
    let price=document.createElement("p")
    price.id="price"
    price.textContent=`${"$"}${data.Price}`

    let div=document.createElement("div")
    div.id="div"
    let bt=document.createElement("button")
    bt.id="button"
    bt.textContent="Book"
     
    let a=document.createElement("a")
    a.id="ancer"
    a.href="#"
    a.textContent="Payment"
   div.append(bt,a)
    card2.append(p1,p4,p2,p3,p5,price,div)

    bt.addEventListener("click",(e)=>{
    e.preventDefault()
    lsdata.push(data)
    localStorage.setItem("trvale",JSON.stringify(lsdata))

    })
   
    let images=document.createElement("div")
     images.id="images"
    let img=document.createElement("img")
    img.src=data.images

    let hl=document.createElement("div")
    hl.id="hl"

    images.append(img)

    card.append(card2,images)
     return card
}

let search=document.querySelector(".inputtext")
let search_button=document.querySelector(".button")
search.addEventListener("input",()=>{

    let f=data2.filter(function(el){
     if(el.Title.toUpperCase().includes(search.value.toUpperCase())===true){
        return true
     }
     else{
        return false
     }
    })
   // console.log(f)
    appends(f)
})
search_button.addEventListener("click",()=>{

    let f=data2.filter(function(el){
     if(el.Title.toUpperCase().includes(search.value.toUpperCase())===true){
        return true
     }
     else{
        return false
     }
    })
   // console.log(f)
    appends(f)
})
let lowToHigh=document.querySelector(".button2")
let HighToLow=document.querySelector(".button3")

lowToHigh.addEventListener("click",(e)=>{
    e.preventDefault()
    let sortdata=data2.sort((a,b)=>{
      return a.Price-b.Price
    })
    appends(sortdata)
})

HighToLow.addEventListener("click",(e)=>{
    e.preventDefault()
    let sortdata2=data2.sort((a,b)=>{
      return b.Price-a.Price
    })
    appends(sortdata2)
})