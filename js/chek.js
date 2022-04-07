const chek = (arr) => {
    let Create_New_Task

    const set_field_success = (element) => {
        if (element.getAttribute('class') == 'nice') {
            element.classList.remove('bad')
        }
        element.classList.add('nice')
    }


    const set_field_error = (element) => {
        if (element.getAttribute('class') == 'nice') {
            element.classList.remove('nice')
        }
        element.classList.add('bad')
    }
    let form = document.querySelector('form')
    form.onsubmit = () => {
        event.preventDefault()
        let fm = new FormData(form)
        Create_New_Task = {
            id: Math.random(),
            crds: []
        }
        fm.forEach((a, b) => {
            let field = form.querySelector('*[name=' + b + ']')
            let counter_have_to = form.querySelectorAll('*[name]')
            Create_New_Task[b] = a
            for (const item of arr) {
                if (Create_New_Task.email == item.email && Create_New_Task.password == item.password) {
                    form.setAttribute('action', 'index2')
                    document.location = './index2.html'
                    let num = item.id.toString()
                    localStorage.setItem('user', num)
                    for (const items of counter_have_to) {
                        set_field_success(items, 'nice')
                    }
                } else {
                    for (const items of counter_have_to) {
                        set_field_error(items, 'bad')
                    }
                }
            }
        })
    }
}

export default chek