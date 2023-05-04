let lsdata=JSON.parse(localStorage.getItem("trvale"))||[]
let main_section=document.querySelector(".container") 

display(lsdata)
function display(data){
    data.forEach((element,i) => {
        
        let card=document.createElement("div")
        card.id="card"
        let images=document.createElement("div")
        images.id="img"
        let img=document.createElement("img") 
        img.src=element.images
        images.append(img)
        let body=document.createElement("div")
        body.id="body"
        let h1=document.createElement("h1")
        h1.id="text" 
        h1.textContent=element.Title  
        let price=document.createElement("p")
        price.id='price'
        price.textContent=`${"$"} ${element.Price}`

        body.append(h1,price)
        card.append(images,body)
        main_section.append(card)
        
        })
    
    
}
