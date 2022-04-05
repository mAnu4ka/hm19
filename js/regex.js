const REGEX = (api) => {
    let counter_have_to
    let counter = 0
    let Create_New_Task
    let good
    let regexes = {
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        number: /^[0-9]+$/,
        name: /^[a-z ,.'-]+$/i,
        password: /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/
    }

    const set_field_success = (element) => {
        element.classList.remove('bad')
        element.classList.add('nice')
        element.getAttribute('class', 'nice')
    }


    const set_field_error = (element, text) => {
        element.classList.remove('nice')
        element.classList.add('bad')
        element.getAttribute('class', text)
    }
    let form = document.querySelector('form')
    form.onsubmit = () => {
        event.preventDefault()
        let fm = new FormData(form)
        Create_New_Task = {
            id: Math.random(),
            crds:[]
        }
        counter = 0
        fm.forEach((a, b) => {
            let field = form.querySelector('*[name=' + b + ']')
            counter_have_to = form.querySelectorAll('*[name]').length
            if (field.getAttribute('data-required') !== null) {
                if (field.value.trim().length == 0) {
                    set_field_error(field, 'bad')
                    counter--
                    return
                } else if (field.getAttribute('data-regex')) {
                    if (regexes[field.getAttribute('data-regex')].test(field.value) == true) {
                        set_field_success(field, 'nice')
                        Create_New_Task[b] = a
                        counter++
                        return
                    } else {
                        set_field_error(field, 'bad')
                        counter--
                        return
                    }
                }
                set_field_success(field, 'nice')
                Create_New_Task[b] = a
                counter++
                return
            } else {
                set_field_success(field, 'nice')
                Create_New_Task[b] = a
                counter++
                return
            }
        })
        if (counter == counter_have_to) {
            axios.post(api, Create_New_Task)
            let num = Create_New_Task.id.toString()
            console.log(num);
            localStorage.setItem('user', num)
            document.location = './index2.html'
        }
    }
}


export default REGEX