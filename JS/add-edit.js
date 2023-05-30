let form = document.querySelector("#form");
let imgInput = document.querySelector("#img");
let titleInput = document.querySelector("#title");
let nameInput = document.querySelector("#name");
let priceInput = document.querySelector("#price");
let addBtn = document.querySelector("#addBtn");

let BASE_JSON = `http://localhost:8500/Services`;

let id = new URLSearchParams(window.location.search).get("id");
if (id) {
  addBtn.innerHTML = `Edit`;
  addBtn.style.background=`green`
  axios(`${BASE_JSON}/${id}`).then((res) => {
    (nameInput.value = res.data.name),
      (titleInput.value = res.data.title),
      (priceInput.value = res.data.price);
  });
}
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let obj = {
    id: Date.now(),
    img: `../img/${imgInput.value.split("\\")[2]}`,
    title: titleInput.value,
    name: nameInput.value,
    price: priceInput.value,
  };
  if (!id) {
  await  axios.post(BASE_JSON, obj);

    window.location.href = `../assets/index.html`;
  } else {
   await axios.patch(`${BASE_JSON}/${id}`, obj);

    window.location.href = `../assets/index.html`;
  }
});
