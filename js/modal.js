const createmobile = (input, arr, shit) => {
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
        REGEX(arr, num, shit)
    }
    form.append(buton)
    anim()
}

const closeModal = () => {
    let course_modal = document.querySelector('.course-modal')
    let bg_modal = document.querySelector('.bg-modal')
    let body = document.body
    bg_modal.style.opacity = "0"
    course_modal.style.opacity = "0"
    course_modal.style.width = "0px"
    course_modal.style.height = '0px'
    body.style.overflow = 'scroll'
    setTimeout(() => {
        bg_modal.style.display = "none"
        course_modal.style.display = "none"
        course_modal.classList.remove('mobail-modal')
    }, 100);
}

const showModal = (width, haight, input, text, arr, data_del, shit) => {
    let course_modal = document.querySelector('.course-modal')
    let bg_modal = document.querySelector('.bg-modal')
    let body = document.body
    bg_modal.style.display = "block"
    course_modal.style.display = "flex"
    body.style.overflow = 'hidden'
    course_modal.style.width = width
    course_modal.style.height = haight
    setTimeout(() => {
        bg_modal.style.opacity = "1"
        course_modal.style.opacity = "1"
    }, 100);

    setTimeout(() => {
        course_modal.classList.add('mobail-modal')
    }, 150);

    createmobile(input, arr, shit)
}

const anim = (arr) => {
    let butns = document.querySelectorAll('button[data-but]')
    for (const but of butns) {
        but.onclick = () => {
            let valueinnrTEXT = but.innerText
            let data_del = but.getAttribute('data-del')
            let width = but.getAttribute('data-with')
            let haight = but.getAttribute('data-haight')
            let input = but.getAttribute('data-input')
            let shit = but.getAttribute('data-shit')
            showModal(width, haight, input, valueinnrTEXT, arr, data_del, shit)
        }
    }
}

const REGEX = (finds, num, shit) => {
    console.log(shit);
    let form = document.querySelector('form')
    form.onsubmit = () => {
        event.preventDefault()
        let fm = new FormData(form)
        let Create_New_Task = {
            id: Math.random()
        }
        fm.forEach((a, b) => {
            Create_New_Task[b] = a
        });
        if (shit == 'delete') {
            let find = finds.crds.find(item => item.id == +num)
            let idx = finds.crds.indexOf(find)
            finds.crds.splice(idx, 1)
            anims('Изменения успешно удалена!')
        } else if (shit == 'upgret') {
            let find = finds.crds.find(item => item.id == +num)
            let idx = finds.crds.indexOf(find)
            finds.crds[idx] = Create_New_Task
            anims('Изменения успешно обновлены!')
        } else {
            finds.crds.push(Create_New_Task)
            anims('Карта была успешно добавлена!')
        }
        let slep = setTimeout(function () {
            axios.patch(`http://localhost:3001/user/${finds.id}`, finds)
        }, 500);
        closeModal()
    }
}
const anims = (aa) => {
    let animss = document.querySelector('.anims')
    let animssd = document.querySelector('.text__amin')
    animssd.innerText = aa
    animss.style.display = 'block'
}
export default anim