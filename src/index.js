document.addEventListener('click', (event) =>{ console.log(event.target)})

const toyFormContainer = document.querySelector(".container")
const addBtn = document.querySelector("#new-toy-btn")

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener('click', (e) =>{

})
const toyCollection = document.querySelector('#toy-collection')
fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toys => {console.log(toys)
  
    let toysHTML = toys.map(function(toy){
      return `<div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>4 ${toy.likes} </p>
      <button data-id="${toy.id}"class="like-btn" id="[toy_id]">Like <3</button>
    </div>`
  
      })
        toyCollection.innerHTML = toysHTML.join('')
  })

  toyFormContainer.addEventListener("submit", function(e){
    e.preventDefault()
    console.log(e.target.name)

    const toyName = e.target.name.value
    const toyImage = e.target.image.value
    
    fetch("http://localhost:3000/toys", {
      method:  "POST",
      headers:
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body:  JSON.stringify({
        name: toyName,
        image: toyImage,
        likes: 99
      })

    })
    .then(response => response.json())
    .then(newToy => {
      
      let newToyHTML = `<div class="card">
      <h2>${newToy.name}</h2>
      <img src=${newToy.image} class="toy-avatar" />
      <p>4 ${newToy.likes} </p>
      <button date-id="${newToy.id}class="like-btn" id="[toy_id]">Like <3</button>
    </div>`
      
      toyCollection.innerHTML += newToyHTML
      console.log(e.target.reset())
    })

  })

  toyCollection.addEventListener("click", (e) =>{
    if (e.target.className === "like-btn"){
      
      let currentLikes = 
      parseInt(e.target.previousElementSibling.innerText)
      let newLikes = currentLikes + 1
      e.target.previousElementSibling.innerText = newLikes + " likes"

      fetch(`http://localhost:3000/toys
      ${e.target.dataset.id}`, {
        method:  "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: newLikes
        })
      })
    }
  })