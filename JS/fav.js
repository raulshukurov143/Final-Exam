let row=document.querySelector("#fav-row")
let BASE_JSON=` http://localhost:8500/Services`;



function favCard(arr){
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
              
              
              <button class="btn btn-danger" onclick=deleteFun(${element.id}) id=${element.id} >delete</button>

            </div>
          </div>
    </div> 
        `
        
    });

}
async function getData(){
let res=await axios(BASE_JSON);
let data=res.data;

}
