const canvas = document.getElementById("jsCanvas");

const ctx = canvas.getContext("2d");
//cavas의 형태를 2d로 만들어줌

const colors = document.getElementsByClassName("jsColor");

const range = document.getElementById("jsRange");

const mode = document.getElementById("jsMode");

const saveBtn = document.getElementById("jsSave");

ctx.strokeStyle = "#2c2c2c";
//strokeStyle : 선긋기 색깔

ctx.fillStyle = "#2c2c2c";

ctx.lineWidth = 2.5;
//lineWidth : 라인굵기

canvas.width = canvas.offsetWidth;
//canvas의 offsetWidth와 offsetHeight를 지정해줘야한다.
canvas.height = canvas.offsetHeight;
//canvas의 offsetWidth와 offsetHeight를 지정해줘야한다.
let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
  } else {
    painting = true;
  }
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  //event 값 clientX 와 offsetX는 clientX의 경우 브라우저창 전채에서의 위치를 의미하고 offsetX는 canvas의 X축을 의미한다. 따라서 필요한것은 offsetX와 offsetY

  //painting false , filling = false
  if (!painting) {
    //paiting === false
    ctx.beginPath(); // 경로의 시작을 알림,
    //즉 클릭전 마우스의 위치가 경로의 시작임
    //새로운 경로를 만듭니다. 경로가 생성됬다면, 이후 그리기 명령들은 경로를 구성하고 만드는데 사용하게 됩니다.

    ctx.moveTo(x, y);
    //x에서 y의 경로 만큼 선이 그어짐
    //moveTo -> 새로운 하위경로를 시작
  } else {
    // painting === true // 마우스 클릭 했을때
    ctx.lineTo(x, y);
    //현재의 드로잉 위치에서 x와 y로 지정된 위치까지 라인을 지정합니다.
    ctx.stroke();
    //라인에 맞춰서 그립니다.
  }
}

if (canvas) {
  //canvas === true
  canvas.addEventListener("mousemove", onMouseMove);
  //마우스를 움직일때 발생하는 event

  canvas.addEventListener("mousedown", startPainting);
  //마우스를 클릭하고 누를때 발생하는 event

  canvas.addEventListener("mouseup", stopPainting);
  //마우스를 클릭하고 땟을때 발생하는  event

  canvas.addEventListener("mouseleave", stopPainting);
  //마우스가 Canvas화면에서 벗어났을때 event
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const value = event.srcElement.value;
  //event.target.value
  ctx.lineWidth = value;
}

function handleModeChange(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerHTML = "Paint";
  }
}

function handleSaveClick() {
  const image = canvas.toDataURL(); //default png
  //canvas의 화면을 URL로 나타냄
  const link = document.createElement("a");
  link.href = image; //linke의 href에 url을 넣고
  link.download = "PaintJS"; //PaintJS.png로 download 이름을 지정해놓는다. ""안의 이름은 아무거나 상관없음 어차피 href를 다운로드 받는것이기 때문에

  link.click(); // 속성 download를 클릭하여 다운로드 받게함

  console.log(image);
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeChange);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

console.log(Array.from(colors));

//Array.from(colors)는 object로부터 array를 만들수 있다.
