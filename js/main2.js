import anim from './modal.js'
axios.get('http://localhost:3001/user')
    .then(function (response) {
        cheks(response.data)
    })
    .catch(function (error) {
        console.log(error);
    })

let name = document.querySelector('.name')
let strelka = document.querySelector('.strelka2')
let strelka2 = document.querySelector('.streka')
const cheks = (arr) => {
    let num = +localStorage.getItem('user')
    let find = arr.find(item => item.id == num)
    name.innerText = find.name
    if (find.crds.length == 0) {
        strelka.style.display = 'none'
        strelka2.style.display = 'none'
    } else {
        strelka.style.display = 'bloke'
        strelka2.style.display = 'bloke'
    }
    anim(find)
    axios.get(`http://localhost:3001/user/${find.id}`)
        .then(function (response) {
            tupofuncriya(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
}
const tupofuncriya = (arr) => {
    let cards = document.querySelector('.cards')
    for (const item of arr.crds) {
        cards.innerHTML += `<div class = "item">
        <p class="visa">${item.visa}</p><h1> 280 451 сум </h1> <p class="num">${item.numcard} </p><span> ${arr.name}</span><span class="cvv"> ${item.cvv} </span> </div >`
    }
}