document.getElementById('generateNextBtn').addEventListener('click',()=>{
  window.location.replace('/page/users-page')
})
const likeBtn =document.getElementById('likeBtn')
const userId2 = likeBtn.getAttribute("data-user2Id")

likeBtn.addEventListener('click',()=>{
 fetch('/api/likes/add-likes',{
   method:'POST',
   headers:{
     'Content-Type': 'application/json'
   },
   body: JSON.stringify({
     userId2
   })
   
 })
 .then(response =>console.log(response))
 .catch( err => console.log(err))
  window.location.replace('/page/users-page')

 })


