console.log('Client side javascript file is loaded!')

const get_location_and_forcast = (city) => {
    fetch(` http://localhost:3000/weather?address=${city}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                first_output.textContent = data.error
                second_output.textContent = ''
                console.log(data.error)
            } else {
                first_output.textContent = data.location
                second_output.textContent = data.forcast
                console.log(data.location)
                console.log(data.forcast)
            }
        })
    })

}
const first_output = document.querySelector('#error_msg')
const second_output = document.querySelector('#valid_output')

const form = document.querySelector('form')
const input = document.querySelector('input')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = input.value
    get_location_and_forcast(location)
    console.log(location)
    console.log('kjdsf')

})