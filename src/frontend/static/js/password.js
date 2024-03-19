let state = false;
let password = document.getElementById("password");
let passwordStrength = document.getElementById("password-strength");
let lowUpperCase = document.querySelector(".low-upper-case i");
let number = document.querySelector(".one-number i");
let specialChar = document.querySelector(".one-special-char i");
let eightChar = document.querySelector(".eight-character i");

password.addEventListener("keyup", function(){
    let pass = document.getElementById("password").value;
    checkStrength(pass);
});

function toggle(){
    if(state){
        document.getElementById("password").setAttribute("type","password");
        state = false;
    }else{
        document.getElementById("password").setAttribute("type","text")
        state = true;
    }
}

function myFunction(show){
    show.classList.toggle("fa-eye-slash");
}

function checkStrength(password) {
    let strength = 0;

    //If password contains both lower and uppercase characters
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
        strength += 1;
        lowUpperCase.classList.remove('fa-circle');
        lowUpperCase.classList.add('fa-check');
    } else {
        lowUpperCase.classList.add('fa-circle');
        lowUpperCase.classList.remove('fa-check');
    }
    //If it has numbers and characters
    if (password.match(/([0-9])/)) {
        strength += 1;
        number.classList.remove('fa-circle');
        number.classList.add('fa-check');
    } else {
        number.classList.add('fa-circle');
        number.classList.remove('fa-check');
    }
    //If it has one special character
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
        strength += 1;
        specialChar.classList.remove('fa-circle');
        specialChar.classList.add('fa-check');
    } else {
        specialChar.classList.add('fa-circle');
        specialChar.classList.remove('fa-check');
    }
    //If password is greater than 7
    if (password.length > 7) {
        strength += 1;
        eightChar.classList.remove('fa-circle');
        eightChar.classList.add('fa-check');
    } else {
        eightChar.classList.add('fa-circle');
        eightChar.classList.remove('fa-check');   
    }

    // If value is less than 2
    if (strength < 2) {
        passwordStrength.classList.remove('progress-bar-warning');
        passwordStrength.classList.remove('progress-bar-success');
        passwordStrength.classList.add('progress-bar-danger');
        passwordStrength.style = 'width: 10%';
    } else if (strength == 3) {
        passwordStrength.classList.remove('progress-bar-success');
        passwordStrength.classList.remove('progress-bar-danger');
        passwordStrength.classList.add('progress-bar-warning');
        passwordStrength.style = 'width: 60%';
    } else if (strength == 4) {
        passwordStrength.classList.remove('progress-bar-warning');
        passwordStrength.classList.remove('progress-bar-danger');
        passwordStrength.classList.add('progress-bar-success');
        passwordStrength.style = 'width: 100%';
    }
}


function togglePasswordVisibility() {
    var passwordInput = document.getElementById('password');
    var eyeIcon = document.querySelector('.show-password i');

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = "password";
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}



const passwordInput = document.getElementById("password");
const passwordCheck = document.getElementById("password-check");

passwordInput.addEventListener("input", function() {
    const password = passwordInput.value;

    const lowerUpperCaseRegex = /^(?=.*[a-z])(?=.*[A-Z])/;
    const oneNumberRegex = /^(?=.*\d)/;
    const oneSpecialCharRegex = /^(?=.*[!@#$%^&*])/;
    const eightCharacterRegex = /^(?=.{8,})/;

    document.getElementById("lower-upper-case").innerHTML = lowerUpperCaseRegex.test(password) ? '<i class="fas fa-check"></i> Lowercase & Uppercase' : '<i class="fas fa-times"></i> Lowercase & Uppercase';
    document.getElementById("one-number").innerHTML = oneNumberRegex.test(password) ? '<i class="fas fa-check"></i> Number (0-9)' : '<i class="fas fa-times"></i> Number (0-9)';
    document.getElementById("one-special-char").innerHTML = oneSpecialCharRegex.test(password) ? '<i class="fas fa-check"></i> Special Character (!@#$%^&*)' : '<i class="fas fa-times"></i> Special Character (!@#$%^&*)';
    document.getElementById("eight-character").innerHTML = eightCharacterRegex.test(password) ? '<i class="fas fa-check"></i> At least 8 Character' : '<i class="fas fa-times"></i> At least 8 Character';
});