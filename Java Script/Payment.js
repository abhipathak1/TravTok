
function generateOTP() {
    let digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
}

function showOTPSection(otp) {
    const otpInputs = document.querySelectorAll('.otp-input');
    otpInputs.forEach((input, i) => {
        input.value = '';
        input.placeholder = otp[i];

        input.addEventListener('input', function () {
            if (this.value.length === this.maxLength) {
                const nextInput = document.getElementById(`otp-input-${i + 2}`);
                if (nextInput) {
                    nextInput.focus();
                }
            }
        });
    });
    document.getElementById('otp-section').style.display = 'block';
}

let otpG;
document.getElementById('generate-otp-btn').addEventListener('click', function () {
    otpG = generateOTP();
    showOTPSection(otpG);
});

document.getElementById('verify-otp-btn').addEventListener('click', function () {
    let otp = '';
    otp += document.getElementById('otp-input-1').value;
    otp += document.getElementById('otp-input-2').value;
    otp += document.getElementById('otp-input-3').value;
    otp += document.getElementById('otp-input-4').value;
    otp += document.getElementById('otp-input-5').value;
    otp += document.getElementById('otp-input-6').value;
});
document.getElementById('verify-otp-btn').addEventListener('click', function () {
    let enteredOTP = '';
    enteredOTP += document.getElementById('otp-input-1').value;
    enteredOTP += document.getElementById('otp-input-2').value;
    enteredOTP += document.getElementById('otp-input-3').value;
    enteredOTP += document.getElementById('otp-input-4').value;
    enteredOTP += document.getElementById('otp-input-5').value;
    enteredOTP += document.getElementById('otp-input-6').value;

    let generatedOTP = localStorage.getItem('otp');

    if (enteredOTP === otpG) {
        alert('Success! The entered OTP is correct! Have a Safe Journey.');
        location = '/index.html'
    } else {
        alert('Error! The entered OTP is incorrect.');
    }
});

let cont = document.getElementsByClassName('cont')[0]
let form = document.querySelector('form')

let otpDiv = document.getElementsByClassName('container')[0]
form.addEventListener('submit', (e) => {
    e.preventDefault()
    otpDiv.style.display = 'block'
    cont.style.opacity = '10%'
})
