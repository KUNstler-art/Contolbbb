let boardURL = "b4f8-148-252-133-208.eu.ngrok.io";
let lastRequestedURL = '';

function setup() {
  createCanvas(400, 400);
  createButtons();
}

function draw() {
  displayLastRequestedURL();
}

function createButtons() {
  const buttonConfig = [
    { label: "LEDON", action: ledON, y: 0 },
    { label: "LEDOFF", action: ledOFF, y: 25 },
    { label: "Servo 0", action: servo0, y: 50 },
    { label: "Servo 180", action: servo180, y: 75 },
    { label: "LED ON 15s", action: ledON15s, y: 100 },
  ];

  buttonConfig.forEach((config) => {
    const button = createButton(config.label);
    button.mousePressed(config.action);
    button.position(0, config.y);
  });
}

function displayLastRequestedURL() {
  background(255);
  textSize(12);
  text("Last Requested URL: " + lastRequestedURL, 10, height - 10);
}
function sendRequest(url) {
  lastRequestedURL = url;

  url += (url.includes('?') ? '&' : '?') + 't=' + new Date().getTime();

  fetch(url, {
    mode: 'no-cors',
    headers: {
      'ngrok-skip-browser-warning': '1', // 添加请求头
    },
  })
    .then((response) => {
      if (response.type === 'opaque') {
        console.log('Request sent successfully');
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .catch((error) => console.error('Error:', error));
}



function ledON() {
  sendRequest("https://" + boardURL + "/ledOn");
}

function ledOFF() {
  sendRequest("https://" + boardURL + "/ledOff");
}

function servo0() {
  sendRequest("https://" + boardURL + "/servo?pos=0");
}

function servo180() {
  sendRequest("https://" + boardURL + "/servo?pos=180");
}

function ledON15s() {
  sendRequest("https://" + boardURL + "/ledOn");
  setTimeout(function () {
    sendRequest("https://" + boardURL + "/ledOff");
  }, 15000);
}
