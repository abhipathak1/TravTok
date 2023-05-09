let lsdata = JSON.parse(localStorage.getItem("trvalsdata")) || []
let main_sectio= document.querySelector(".card")
console.log(lsdata)
appends()
function appends(){

    main_sectio.innerHTML=""
    lsdata.forEach(element => {
    
  
    let h4=document.createElement("h4")
    h4.textContent=element.Title
    
   
    let sapn =document.createElement('button')
    sapn.textContent="+"
    sapn.className="q"
    sapn.addEventListener("click",()=>{
        if(element.quantity<5){
            element.quantity++
            
           localStorage.setItem("trvalsdata", JSON.stringify(lsdata));
           appends();
           appends1()
            }
       })
    
    let h3 =document.createElement("span")
    h3.textContent=element.quantity
   
    let sapn2 =document.createElement('button')
    sapn2.textContent="-"
    sapn2.addEventListener("click",()=>{
        if(element.quantity>1){
        element.quantity--
        
       localStorage.setItem("trvalsdata", JSON.stringify(lsdata));
       appends();
       appends1()
        }
      })
     
   
    
    let span=document.createElement("span")
    span.textContent=element.Price*element.quantity
    span.className="price"
    h4.append( sapn,h3,sapn2,span)
    main_sectio.append(h4)
});
}
let main=document.querySelector(".b")
appends1()
function appends1(){

    main.innerHTML=""
    let sum=0
    lsdata.forEach(element => {
         sum=sum+element.Price*element.quantity
    });
    main.append(sum)
}


let bt=document.querySelector(".m")
bt.addEventListener("click",()=>{
    
   a()
})
function a(){
   let  m=document.querySelector(".cc")
   let div='ashdfjsbfhasfjknajkfnajksnf'
   m.append(div)
}
