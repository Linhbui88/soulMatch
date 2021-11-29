const listItem= document.getElementsByClassName('list-group-items')
  for (var i=0; i<listItem.length; i++){

    const id = listItem[i].getAttribute("data-hobby-id")
    listItem[i].addEventListener('click',(e)=>{
     e.target.classList.add('selected')


    fetch('/api/hobbies/add-hobbies',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          hobby: id,
        })
        
      })
      .then(response =>console.log(response))
      
    })
  }
  