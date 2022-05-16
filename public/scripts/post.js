let form = document.getElementById("postBox");
form.addEventListener('submit', addPost);


function addPost(e) {
 
  e.preventDefault();
  let myPostText = document.getElementById("postText").value;
  
  console.log(myPostText);
  let li = document.createElement('li');
  li.className = 'feedPost';
  li.appendChild(document.createTextNode(myPostText));
  posts.appendChild(li);
  
  // let videoBtn = document.createElement("button");
  // videoBtn.className = "postBottom";
  // let x = document.createTextNode("video")
  // videoBtn.appendChild(x);
  // li.appendChild(videoBtn);



  let deleteBtn = document.createElement("button");
  deleteBtn.addEventListener('click', deleteNote);
  deleteBtn.className = "button delete";
  let x = document.createTextNode("X");
  deleteBtn.appendChild(x);
  li.appendChild(deleteBtn);

  document.getElementById("postText").value = "";
}

function deleteNote(e) {
  let li = e.target.parentElement;
  posts.removeChild(li);
}

