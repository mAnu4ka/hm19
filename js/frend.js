const Createfrend = (arr) => {
    for (const item of arr.frends) {
        axios.get(`http://localhost:3001/user/${item}`)
            .then(function (response) {
                dolg(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

}
const dolg = (arr) => {
    let frend = document.querySelector('.frends')
    frend.innerHTML += ` <div class="frend">
    <div class="left">
            <img>
            <div class="text">
                <p>${arr.name}  ${arr.sername}</p>
                <span>${arr.crds.length}</span>
            </div>
        </div>
        <div class="raight">
            <svg width="27" height="7" viewBox="0 0 27 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="3.47143" cy="3.49975" r="3.47143" fill="black" />
                <circle cx="13.5" cy="3.49975" r="3.47143" fill="black" />
                <circle cx="23.5286" cy="3.49975" r="3.47143" fill="black" />
            </svg>
        </div>
        <div class="grey" id='${arr.id}'>
            <p>Удалить из друзей</p>
        </div>
    </div>`
    locksl(arr)
}

const locksl = (arr) => {
    let raight = document.querySelectorAll('.raight')
    for (const item of raight) {
        item.onclick = () => {
            let grey = item.nextSibling.nextSibling
            grey.classList.toggle('block')
            grey.onclick = () => {
                let id = grey.id
                let find = arr.frends.find(item => item == id)
                let idx = arr.frends.indexOf(find)
                arr.frends.splice(idx, 1)
                axios.patch(`http://localhost:3001/user/${arr.id}`, arr)
            }
        }
    }
}

export default Createfrend