const createmobile = (input, arr, shit, element1, element2) => {
    let form = document.querySelector('form')
    let arr_name_for_inp = ['numcard', 'cvv', 'visa']

    form.innerHTML = ' '
    let inputmobail
    let h1mobil = document.createElement('h3')
    let h2mobil = document.createElement('h4')
    let buton = document.createElement('button')
    buton.innerText = 'Создать'
    let code = ` <div class="item">
    <p class="visa">VISA</p>
    <h1>**** сум</h1>
    <p class="num">**** **** **** ****</p>
    <span >Daler Ravshanov</span>
    <span class="cvv">**/**</span>
    </div>`
    form.innerHTML = code
    if (shit == 'delete' || shit == 'upgret') {
        let p = document.createElement('p')
        for (const item of arr.crds) {
            p.innerHTML += `${item.id},`
        }
        form.append(p)
    }
    for (let i = 0; i < input; i++) {
        inputmobail = document.createElement('input')
        inputmobail.setAttribute('type', 'text')
        inputmobail.setAttribute('name', arr_name_for_inp[i])
        form.append(inputmobail)
    }
    let num = inputmobail.value
    inputmobail.onkeyup = () => {
        num = inputmobail.value
        REGEX(arr, num, shit, element1, element2)
    }
    form.append(buton)
    anim()
}

const closeModal = (element1, element2) => {
    let body = document.body
    element2.style.opacity = "0"
    element1.style.opacity = "0"
    element1.style.width = "0px"
    element1.style.height = '0px'
    body.style.overflow = 'scroll'
    setTimeout(() => {
        element2.style.display = "none"
        element1.style.display = "none"
        element1.classList.remove('mobail-modal')
    }, 100);
}

const showModal = (width, haight, input, text, arr, data_del, shit, element1, element2, arr_full) => {
    let body = document.body
    element2.style.display = "block"
    element1.style.display = "flex"
    body.style.overflow = 'hidden'
    element1.style.width = width
    element1.style.height = haight
    setTimeout(() => {
        element2.style.opacity = "1"
        element1.style.opacity = "1"
    }, 100);

    setTimeout(() => {
        element1.classList.add('mobail-modal')
    }, 150);
    if (shit == 'frend') {
        createFrend(element1, element2, arr_full, shit, arr)
    } else createmobile(input, arr, shit, element1, element2)
}

const anim = (arr, arr_full) => {
    let course_modal_2 = document.querySelector('.course-modal-2')
    let bg_modal_2 = document.querySelector('.bg-modal-2')
    let course_modal = document.querySelector('.course-modal')
    let bg_modal = document.querySelector('.bg-modal')
    let butns = document.querySelectorAll('button[data-but]')
    for (const but of butns) {
        but.onclick = () => {
            let valueinnrTEXT = but.innerText
            let data_del = but.getAttribute('data-del')
            let width = but.getAttribute('data-with')
            let haight = but.getAttribute('data-haight')
            let input = but.getAttribute('data-input')
            let shit = but.getAttribute('data-shit')
            if (shit == 'frend') showModal(width, haight, input, valueinnrTEXT, arr, data_del, shit, course_modal_2, bg_modal_2, arr_full)
            else showModal(width, haight, input, valueinnrTEXT, arr, data_del, shit, course_modal, bg_modal)
        }
    }
}

const REGEX = (finds, num, shit, element1, element2, id) => {
    let form = document.querySelectorAll('form')
    for (const item of form) {
        item.onsubmit = () => {
            event.preventDefault()
            let fm = new FormData(item)
            let Create_New_Task = {
                id: Math.random()
            }
            fm.forEach((a, b) => {
                Create_New_Task[b] = a
            });
            if (shit == 'delete') {
                if (finds.crds.length == 0) {
                    anims('Поплните масив', 'red')
                } else {
                    let find = finds.crds.find(item => item.id == +num)
                    let idx = finds.crds.indexOf(find)
                    finds.crds.splice(idx, 1)
                    anims('Изменения успешно удалена!')
                }
            } else if (shit == 'upgret') {
                if (finds.crds.length == 0) {
                    anims('Поплните масив', 'red')
                } else{
                    let find = finds.crds.find(item => item.id == +num)
                    let idx = finds.crds.indexOf(find)
                    finds.crds[idx] = Create_New_Task
                    anims('Изменения успеxшно обновлены!')
                }
            } else if (shit == 'frend') {
                finds.frends = id
                anims('Anis был успешно добавлен в друзья')
            } else {
                finds.crds.push(Create_New_Task)
                anims('Карта была успешно добавлена!')
            }

            let slep = setTimeout(function () {
                axios.patch(`http://localhost:3001/user/${finds.id}`, finds)
            }, 500);

            closeModal(element1, element2)
        }
    }
}

const anims = (aa, red) => {
    let animss = document.querySelector('.anims')
    let animssd = document.querySelector('.text__amin')
    animssd.innerText = aa
    animss.style.display = 'block'
    if (red == 'red') {
        animss.style.background = '#AE0202'
    }
}

const createFrend = (element1, element2, arr_full, shit, arr) => {
    let mainap = document.querySelector('.main-push')

    for (const item of arr_full) {
        mainap.innerHTML += `<div class="frend">
        <div class="left">
        <img>
        <div class="text">
        <p>${item.name}  ${item.sername}</p>
        <span>${item.crds.length}</span>
        </div>
        <div class="raight"  id='${item.id}'><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 1V11" stroke="black" stroke-linecap="round"/>
        <path d="M11 6L1 6" stroke="black" stroke-linecap="round"/>
        </svg>
        </div>`
    }

    let raight = document.querySelectorAll('.raight')
    let id = []
    for (const item of raight) {
        item.onclick = () => {
            let item_id = +item.getAttribute('id')
            id.push(item_id)
            REGEX(arr, 12, shit, element1, element2, id)
        }
    }
}

export default anim