const hobbyElements= document.getElementsByClassName('hobby')
  for (var i=0; i<hobbyElements.length; i++){
    const id = hobbyElements[i].getAttribute("data-hobby-id")
    hobbyElements[i].addEventListener('click',(e)=>{
      fetch('/api/hobbies/delete-hobby',{
        method:'DELETE',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
        })
      })
      .then(response => {
        e.target.remove()

      })
    })
    
  }