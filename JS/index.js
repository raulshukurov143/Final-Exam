let BASE_JSON=` http://localhost:8500/Services`;
let row =document.querySelector("#row");
let searchInput=document.querySelector("#search");
let sort=document.querySelector("#sort");
let addBtn=document.querySelector("#add");
let loadMore=document.querySelector("#load");
let header=document.querySelector("header")
let goTop=document.querySelector("#go-top")
let barUl=document.querySelector("#bar-ul")
let barIcon=document.querySelector(".fa-bars")
let searchData=[]
let allData=[]
let maxLength=3

 function createCard(arr){
    row.innerHTML=``;
    arr.forEach(element => {
        row.innerHTML+=`
        <div class="col col-lg-4 col-12 my-3 col-md-6">
                    <div class="card" style="width: 16rem;">
                        <img src="${element.img}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${element.name}</h5>
                          <p class="card-text">${element.title}</p>
                          <p class="card-text">${element.price}</p>
                          <a href="add-edit.html?id=${element.id}" class="btn btn-success">Edit</a>
                          <button class="btn btn-primary">fav</button>
                          <button class="btn btn-danger" onclick=deleteFun(${element.id}) id=${element.id} >delete</button>

                        </div>
                      </div>
                </div> 
        `
        
    });
}

async function getAllData(){
    let res=await axios(BASE_JSON);
    let data=res.data;
    allData=data;
    searchData= searchInput.value ? searchData : allData;
    console.log(data);

    createCard(searchData.slice(0,maxLength));
}
getAllData();


async function deleteFun(id){
    await axios.delete(`${BASE_JSON}/${id}`)
}

loadMore.addEventListener("click",function(){
    maxLength+=3
    if(maxLength >= searchData.length){
        loadMore.style.display=`none`

    }if(searchData.length){
    createCard(searchData.slice(0,maxLength));
        
    }
    else{
        getAllData()

    }
})

sort.addEventListener("click",function(){
    if(sort.innerHTML==`ascending`){
        searchData=searchData.sort((a,b)=>a.price-b.price)
        sort.innerHTML=`descendig`
    }else if(sort.innerHTML==`descendig`){
        searchData=searchData.sort((a,b)=>b.price-a.price)
        sort.innerHTML=`default`
    }else{
        getAllData()
        sort.innerHTML=`ascending`
    }
    createCard(searchData.slice(0,maxLength))
 })

searchInput.addEventListener("input",function(e){


})
searchInput.addEventListener("input",function(e){
    searchData=allData;
    searchData=searchData.filter((element)=>element.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()))
createCard(searchData.slice(0,maxLength))
 })


 addBtn.addEventListener("click",function(){
    window.location.href=`../assets/add-edit.html`
 })




 function scrollFunction(){
    
    if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
        header.style.background=`black `
        header.style.opacity=`0.6`
        goTop.style.display=`block`;

    }else{
        header.style.background=``;
        goTop.style.display=`none`;


    }
}
window.onscroll = function () { scrollFunction() }
goTop.addEventListener("click",function(){
    document.body.scrollTop=0
    document.documentElement.scrollTop=0
})

barIcon.addEventListener("click",function(){
    barUl.style.display=`block`
})