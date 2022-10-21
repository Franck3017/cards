const card = document.getElementById('tarjeta'),
  btnAbrirFormulario = document.getElementById('btn-abrir-formulario'),
  formulario = document.getElementById('formulario-tarjeta'),
  numeroTarjeta = document.querySelector('#tarjeta .numero'),
  nombreTarjeta = document.querySelector('#tarjeta .nombre'),
  firmaTarjeta = document.querySelector('#tarjeta .firma p'),
  mesExpiracion = document.querySelector('#tarjeta #expiracion .mes'),
  yearExpiracion = document.querySelector('#tarjeta #expiracion .year'),
  ccv = document.querySelector('#tarjeta .ccv'),
  logoMarca = document.querySelector('#logo-marca'),
  dateNow = new Date().getFullYear()

const logoCards = [
  '../img/logos/visa.png',
  '../img/logos/mastercard.png'
]

card.addEventListener('click', () => {
  card.classList.toggle('active')
})

btnAbrirFormulario.addEventListener('click', () => {
  btnAbrirFormulario.classList.toggle('active')
  formulario.classList.toggle('active')
})

// Select Mes generado dinamicamente
for (let i = 1; i <= 12; i++) {
  let option = document.createElement('option')
  option.value = i
  option.innerText = i

  formulario.selectMes.append(option)
}

// Select Año generado dinámicamente
for (i = dateNow; i <= dateNow + 10; i++) {
  let option = document.createElement('option')
  option.value = i
  option.innerText = i

  formulario.selectYear.append(option)
}

// Input numero de tarjeta

formulario.inputNumero.addEventListener('keyup', e => {
  let inputValue = e.target.value

  formulario.inputNumero.value = inputValue
    .replace(/\D/g, '')
    .replace(/([0-9]{4})/g, '$1 ')
    .trim()

  numeroTarjeta.textContent = inputValue

  if (inputValue === '') {
    numeroTarjeta.textContent = '#### #### #### ####'
    logoMarca.innerHTML = ''
  }

  if (inputValue.at(0) == 4) {
    logoMarca.innerHTML = ''
    const image = document.createElement('img')
    image.className = 'logo-marca__img'
    image.src = logoCards[0]

    logoMarca.append(image)
  }

  if (inputValue.at(0) == 5) {
    logoMarca.innerHTML = ''
    const image = document.createElement('img')
    image.className = 'logo-marca__img'
    image.src = logoCards[1]

    logoMarca.append(image)
  }

  mostrarFrente()
})

// Input nombre de tarjeta

formulario.inputNombre.addEventListener('keyup', e => {
  let inputValue = e.target.value

  formulario.inputNombre.value = inputValue
    .replace(/\d/g, '')

  nombreTarjeta.textContent = inputValue
  firmaTarjeta.textContent = inputValue

  if (inputValue === '') {
    nombreTarjeta.textContent = 'Jhon Doe'
  }

  mostrarFrente()
})

// Retora el valor del selectMes de la option seleccionada

formulario.selectMes.addEventListener('change', e => {
  mesExpiracion.textContent = e.target.value

  mostrarFrente()
})

// Retorna el valor del selectYear de la option seleccionada

formulario.selectYear.addEventListener('change', e => {
  let selectValue = e.target.value

  formulario.selectYear.value = selectValue

  yearExpiracion.textContent = selectValue.slice(2)

  mostrarFrente()
})

// Retorna el valor del inputCCV y volteamos la tarjeta para mostrar el CCV

formulario.inputCCV.addEventListener('keyup', e => {
  let inputCCV = e.target.value
  formulario.inputCCV.value = inputCCV
    .replace(/\D/g, '')

  ccv.textContent = inputCCV

  mostrarAtras()

  if (inputCCV === '') mostrarFrente()
})

formulario.addEventListener('submit', e => {
  e.preventDefault()

  setTimeout(() => {
    formulario.innerHTML = `
      <div class="exito">
        <h1 class="mg-b">Gracias por tu compra</h1>
        <p class="text-center">Tu compra se ha realizado con éxito</p>
      </div>
    `
  }, 500)
})

const mostrarFrente = () => {
  if (card.classList.contains('active')) {
    card.classList.remove('active')
  }
}

const mostrarAtras = () => {
  if (!card.classList.contains('active')) {
    card.classList.toggle('active')
  }
}