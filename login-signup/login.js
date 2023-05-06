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
	alert('SignUp successful');
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
// let user1=[{
// 	name:"Anshu",
// 	email:"anshu123@gmail.com",
// 	password:"anshu123"
// },
// {
// 	name:"Abhishek",
// 	email:"abhi@gmail.com",
// 	password:"abhi123"
// },
// {
// 	name:"Vamsi",
// 	email:"vamsi@gmail.com",
// 	password:"vamsi123"
// },
// {
// 	name:"Rutik",
// 	email:"rutik123@gmail.com",
// 	password:"rutik123"
// }

// ]
  fetch('https://64521317bce0b0a0f73bef09.mockapi.io/Users')
    .then(response => response.json())
    .then(data => {
      const loggedInUser = data.find(u => u.email === user.email && u.password === user.password);
      if (loggedInUser) {
        console.log('Login successful!', loggedInUser);
		window.location.href = "/"
        localStorage.setItem('user', JSON.stringify(loggedInUser));
      } else {
        // console.log('Invalid email or password')
		alert('Invalid email or password');
      }
    })
    .catch(error => console.error('Error logging in:', error));
});
