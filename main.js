let loginForm = document.getElementById("login")
if (loginForm) loginForm.addEventListener("submit", login);
function login(e) {
  e.preventDefault()
  let userName = document.getElementById("user").value
  let pswd = document.getElementById("pswd").value
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
