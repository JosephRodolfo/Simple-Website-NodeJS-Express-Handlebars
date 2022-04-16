console.log("client side javascript loaded!");

const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");


weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchValue = searchElement.value;


  fetch(`http://localhost:3000/weather?address=${searchValue}`).then(
    (response) => {
      messageOne.textContent = "Loading ... ";
      messageTwo.textContent = "";
      response
        .json()
        .then((data) => {
          if (data.error) {
            messageOne.textContent = "Sorry, there's been an error!"
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecastData.message;
  
          }
        })
        .catch(function (error) {
            messageOne.textContent = "Sorry, there's been an error!"


        });
    }
  );
});
