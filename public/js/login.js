const logInBtn = document.getElementById('logInBtn')
const emailInput = document.getElementById('email-Login')
const passwordInput = document.getElementById('password-Login')


logInBtn.addEventListener('click', async (e) => {
  e.preventDefault()

  const userLogin = {
    email: emailInput.value.trim(),
    password: passwordInput.value.trim()
  }
  if (userLogin.email && userLogin.password) {

    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userLogin)
    })

    const data = await response.json()
    console.log(data)
    if (data.user) {
     
      window.location.replace('/page/users-page/')
    } else {
      alert('Incorrect email or password. Please try again!')
    }
  }
})

  //setup account
