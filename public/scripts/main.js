let loginForm = document.getElementById("login")
if (loginForm) loginForm.addEventListener("submit", login);
function login(e) {
  e.preventDefault()
  let userName = document.getElementById("user").value
  let pswd = document.getElementById("pswd").value

  fetchData('/users/login', {username: user, password: pswd}, "POST")
  .then((data) => {
    if(!data.message) {
      setCurrentUser(data);
      window.location.href = "index.html";
    }
  })
  .catch((error) => {
    const errText = error.message;
    document.querySelector("#login p.error").innerHTML = errText;
    document.getElementById("pswd").value = "";
    console.log(`Error! ${errText}`)
  });
  console.log(userName)
}

let registerForm = document.getElementById("register")
if (registerForm) registerForm.addEventListener("submit", register);
function register(e) {
  e.preventDefault()
  let fname = document.getElementById("fname").value 
  let lname = document.getElementById("lname").value
  let user = document.getElementById("user").value
  let pswd = document.getElementById("pswd").value
  let date = document.getElementById("date").value
  let newUser = new User(12345, user, pswd)

  fetchData('/users/register', {username: user, password: pswd, firstname: fname, lastname: lname, enterdate: date}, "POST")
  .then((data) => {
    if(!data.message) {
      setCurrentUser(data);
      window.location.href = "index.html";
    }
  })
  .catch((error) => {
    const errText = error.message;
    document.querySelector("#register p.error").innerHTML = errText;
    document.getElementById("pswd").value = "";
    console.log(`Error! ${errText}`)
  });

  console.log(newUser)
}

class User {
    constructor(id, userName, pswd) {
      this.userId = id;
      this.userName = userName;
      this.setUserPassword(pswd);
    }
    //get methods
    getUserId() {
      return this.userId;
    }
    getUserName() {
      return this.userName;
    }
    getUserPassword() {
      return this.userPassword;
    }
    //set methods
    setUserId(id) {
      this.userId = id;
    }
    setUserName(userName) {
      this.userName = userName;
    }
    setUserPassword(pswd) {
      if(this.validPassword(pswd)) {
        this.userPassword = pswd;
      } else {
        console.log("Password must have at least 1 uppercase letter, 1 symbol, 2 numbers," 
          + "and have a length of at least 8 characters.");
      }
    }
    //valid password method
    validPassword(pswd) {
      if(pswd.length >= 8) {
        let upper = 0;
        let numbers = 0;
        let symbols = 0;
        
        for(let i = 0; i<pswd.length; i++) {
          if(this.isDigit(pswd[i])) {
            numbers++;
          } else if(!this.isLetterOrDigit(pswd[i])) {
            symbols++;
          } else if(this.isUpperCase(pswd[i])) {
            upper++;
          }
        }
  
        if(upper >= 1 && numbers >= 2 && symbols >= 1) {
          return true;
        }
      }
      return false;
    }
    //returns if character is a letter
    isUpperCase(char) {
      return (/[A-Z]/).test(char)
    }
    //returns if character is a digit
    isDigit(char) {
      return (/[1-9]/).test(char)
    }
    //returns if character is a letter or digit
    isLetterOrDigit(char) {
      return ((/[a-zA-Z]/).test(char) || (/[1-9]/).test(char))
    }
}


// Fetch method implementation:
export async function fetchData(url = '', data = {}, methodType) {
  const response = await fetch(`http://localhost:3000${url}`, {
    method: methodType, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  if(response.ok) {
    return response.json(); // parses JSON response into native JavaScript objects
  } else {
    throw await response.json();
  }
}

export function setCurrentUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function removeCurrentUser() {
  localStorage.removeItem('user')
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

export const logoutBtn = document.getElementById("logout");
if(logoutBtn) logoutBtn.addEventListener('click', logout)

export function logout() {
  removeCurrentUser();
  window.location.href = "login.html";
}
