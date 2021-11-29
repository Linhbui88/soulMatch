const form = document.getElementById('add-post')
  const storyInput = document.querySelector('.story')
 
  form.addEventListener('submit', e =>{
  e.preventDefault()
  const data = {
  story: storyInput.value
    }
    fetch('/page', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => console.log(response))
    
      .catch(err => console.log(err))
  })