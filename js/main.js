import REGEX from './regex.js'
import chek from './chek.js'

let form = document.querySelector('form')
let main = document.querySelector('main')
form.onsubmit = () => {
    event.preventDefault()
    REGEX('http://localhost:3001/user')
}

let log = document.querySelector('.log')

log.onclick = () => {
    main.innerHTML = `<form action='index2'>
                            <h1>Вход</h1>
                            <input type="text" placeholder="Email" name="email" data-regex='email' data-required>
                            <input type="password" placeholder="Пароль" data-required data-regex="password" name="password">
                            <button class="reg">Регистрация</button>
                        </form>`
    form = document.querySelector('form')
    axios.get('http://localhost:3001/user')
        .then(function (response) {
            chek(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
}