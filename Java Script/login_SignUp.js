let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");

signup.addEventListener("click", () => {
  slider.classList.add("moveslider");
  formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
  slider.classList.remove("moveslider");
  formSection.classList.remove("form-section-move");
});





// Get the form elements
const nameInput = document.querySelector('.name');
const emailInput = document.querySelector('.email');
const passwordInput = document.querySelector('.password');

const signupEmailInput = document.querySelector('.signEmail');
const signupPasswordInput = document.querySelector('.signPassword');

// Add a click event listener to the signup button
const signupButton = document.querySelector('.signbtn');
signupButton.addEventListener('click', () => {

  const newUser = {
    name: nameInput.value,
    email: signupEmailInput.value,
    password: signupPasswordInput.value
  };




  fetch('https://64521317bce0b0a0f73bef09.mockapi.io/Users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  })
    .then(response => response.json())
    .then(data => {
      // Save the new user object to local storage
      localStorage.setItem('user', JSON.stringify(data));
      console.log('User saved to local storage:', data);
      alert('SignUp Successful');
      location.reload()
    })
    .catch(error => console.error('Error creating user:', error));
});


// Add a click event listener to the login button
const loginButton = document.querySelector('.logbtn');
loginButton.addEventListener('click', () => {
  let user = {
    email: emailInput.value,
    password: passwordInput.value
  };

  fetch('https://64521317bce0b0a0f73bef09.mockapi.io/Users')
    .then(response => response.json())
    .then(data => {
      const loggedInUser = data.find(u => u.email === user.email && u.password === user.password);

      if (user.email === "admin1" && user.password === "naughty") {
        location.href = "admin.html";
      } else if (loggedInUser) {
        console.log('Login successful!', loggedInUser);
        window.location.href = "/index.html";
        localStorage.setItem('user', JSON.stringify(loggedInUser));
      } else {
        alert('Invalid email or password');
      }
    })
    .catch(error => console.error('Error logging in:', error));
})


// for Appending The logo

const travtok = document.getElementById("travtok");
const text = "TravTok";
let currentIndex = 0;

function appendNextLetter() {
  if (currentIndex < text.length) {
    const nextLetter = text[currentIndex];
    const span = document.createElement("span");
    span.textContent = nextLetter;
    travtok.appendChild(span);

    span.getBoundingClientRect();
    span.style.opacity = "1";
    currentIndex++;
    setTimeout(appendNextLetter, 800); // Adjust the delay (in milliseconds) between each letter
  }
}
appendNextLetter();

// indexRedirection
travtok.addEventListener("click", () => {
  location.href = "/index.html";
})

// EyeButtonInInput

let toggle = document.querySelector("#aajaDekhle");
let input = document.querySelector(".password");

toggle.addEventListener("click", () => {
  if (input.type === "password") {
    input.type = "text";
    document.getElementById('passwordIcon').classList.remove('fa-eye');
    document.getElementById('passwordIcon').classList.add('fa-eye-slash');
  } else {
    input.type = "password";
    document.getElementById('passwordIcon').classList.remove('fa-eye-slash');
    document.getElementById('passwordIcon').classList.add('fa-eye');
  }
});

