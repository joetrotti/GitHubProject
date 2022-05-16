let form = document.getElementById("postBox");
form.addEventListener('submit', addPost);


function addPost(e) {
//    e.preventDefault();
//   const ul = document.querySelector('ul');
//   ul.innerHTML = `
//     <ul>
//     <div class="post">
//     <div class="postTop">
//         <img class="userAvatar" src="images/avatar2.png" alt="profile avatar">
//         <form id="postBox">
//             <input type="text" class="post_input" id="postText" placeholder="Got Something to say? ">
//             <div class="postOption">
//                 <input type="submit" value="Post">
//             </div>

//         </form>
//     </div>
//     <div class="postBottom">
//         <div class="postOption">
//             <span style="color: red;" class="material-icons">play_circle</span>
//             <h3>Video</h3>
//         </div>

//         <div class="postOption">
//             <span style="color: green;" class="material-icons">photo_library</span>
//             <h3>Photo</h3>
//         </div>

//         <!-- <div class="postOption">
//             <span style="color: orange;" class="material-icons">send</span>
//             <h3>Feeling</h3>
//         </div> -->

//     </div>
// </div>
//     </ul>
//   `;
 
 
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

