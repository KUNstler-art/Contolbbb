// 将此设置为您的开发板屏幕上显示的数字。
let boardURL = "https://a660-158-223-166-66.eu.ngrok.io";

function setup() {
createCanvas(400, 400);

// 创建您将使用的所有按钮
ledONbutton = createButton("LEDON");
// 设置按下时将运行的功能
ledONbutton.mousePressed(ledON);
// 设置它的位置
ledONbutton.position(0, 0);

// 对其他按钮执行相同操作
ledOFFbutton = createButton("LEDOFF");
ledOFFbutton.mousePressed(ledOFF);
ledOFFbutton.position(0, 25);

ledONbutton = createButton("Servo 0 ");
ledONbutton.mousePressed(servo0);
ledONbutton.position(0, 50);

ledOFFbutton = createButton("Servo 180 ");
ledOFFbutton.mousePressed(servo180);
ledOFFbutton.position(0, 75);

  // 添加新按钮，用于使LED保持打开15秒钟
  ledON15sButton = createButton("LED ON 15s");
  ledON15sButton.mousePressed(ledON15s);
  ledON15sButton.position(0, 100);
}


function draw() {
background(255);
}

// 打开LED的按钮
function ledON() {
// 这是发送给Pico的HTTP请求
httpGet("http://" + boardURL + "/ledOn", function (response) {
// 现在我们只记录响应，但如果我们要求一些特定信息，我们可以在这里对其执行其他操作。
console.log(response);
});
}

function ledOFF() {
httpGet("http://" + boardURL + "/ledOff", function (response) {
console.log(response);
});
}
function servo0() {
httpGet("http://" + boardURL + "/servo?pos=0", function (response) {
console.log(response);
});
}
function servo180() {
httpGet("http://" + boardURL + "/servo?pos=180", function (response) {
console.log(response);
});
}

// 保持LED打开15秒的按钮
function ledON15s() {
  httpGet("http://" + boardURL + "/ledOn", function (response) {
    console.log(response);
  });
  setTimeout(function () {
    httpGet("http://" + boardURL + "/ledOff", function (response) {
      console.log(response);
    });
  }, 15000); // 15000毫秒 = 15秒
}