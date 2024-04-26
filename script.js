const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.classList.add("error");
  small.textContent = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  if (formControl.classList.contains("error")) {
    formControl.classList.remove("error");
  }
  formControl.classList.add("success");
}

// Check email is valid
function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, `Email is not valid`);
  }
}

// Get the field name of each input
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (!input.value.trim()) {
      showError(input, `${getFieldName(input)} is required!`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.trim().length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.trim().length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Check password matching
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input1, "Passwords do not match!");
    showError(input2, "Passwords do not match!");
  }
}

// Event Listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
