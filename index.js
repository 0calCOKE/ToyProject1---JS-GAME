/**
 * index.html의 <canvas\>를 const로 지정
 */
const canvas = document.querySelector("canvas");

/**
 * HTML의 <canvas>의 드로잉 컨텍스트를 반환. canvas를 다수 call할 것이기에 줄여쓰기위함.
 */
const c = canvas.getContext("2d");

// width와 height는 16:9의 종횡비. 가장 알맞다고 생각되어 사용.
canvas.width = 1024;
canvas.height = 576;

/**
 * 자바스크립트의 fillRect() 메서드는 HTML5 캔버스 API의 일부분으로, 특정한 사각형 영역을 채우는 데 사용됩니다.
 * 이 메서드는 2D 렌더링 컨텍스트를 통해 호출됩니다.
 * fillRect()는 사각형의 시작 좌표 (x, y), 그리고 너비와 높이를 매개변수로 받아 해당 영역을 현재의 fillStyle로 채웁니다.
 * 기본 문법 : context.fillRect(x, y, width, height);
 */
c.fillRect(0, 0, canvas.width, canvas.height);

// 중력
const gravity = 0.7;

/**
 * 플레이어와 적을 생성하는 class
 */
class Sprite {
  /**
   *
   * @param {*} param0
   */
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.lastKey;
  }

  /**
   * draw메서드는 player를 렌더링하는 것. 예를 들어, 생성자에 전달된 x, y좌표에 가로50픽셀, 세로 150픽셀의 player를 생성하는 메서드임.
   */
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, 50, this.height);
  }

  /**
   *
   */
  update() {
    this.draw();

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }
}

/**
 * {}로 감싸 x좌표와 y좌표를 Sprite class에 전달하여 플레이어 생성
 */
const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 10,
  },
});

const enemy = new Sprite({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

console.log(player);

/**
 * 부드러운 움직임을 구현하기 위함.
 */
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
};

/**
 * requestAnimationFrame() 메서드는 브라우저가 다음 리페인트(repaint) 전에 실행할 애니메이션을 호출할 수 있도록 콜백을 등록하는 데 사용되는 자바스크립트 함수입니다.
 * 이 메서드를 사용하면 브라우저의 화면 갱신 주기에 맞춰 애니메이션을 효율적으로 실행할 수 있습니다.
 * 이는 CPU와 GPU 자원을 더 효율적으로 사용하여 부드러운 애니메이션을 구현하는 데 도움이 됩니다.
 * + 추가로, 이 메서드는 우리가 애니메이션 프레임을 요청하는 동안 계속해서 개체를 프렝미별로 애니메이션화 해준다.
 * 기본 문법: window.requestAnimationFrame(callback);
 */
function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // 플레이어 움직임
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -3;
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 3;
  }

  // enemy 움직임
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -3;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 3;
  }
}

animate();

/**
 * 브라우저에서 플레이어가 어떤 key를 누르고 있는지 반환, 움직임을 구현
 * keydown은 누르고 있는동안 움직이기 keyup은 키를 떼면 움직임 멈춤.
 */
window.addEventListener("keydown", (event) => {
  console.log(event.key);
  switch (event.key) {
    //player1의 움직임
    case "d":
      keys.d.pressed = true;
      player.lastKey = "d";
      break;
    case "a":
      keys.a.pressed = true;
      player.lastKey = "a";
      break;
    case "w":
      player.velocity.y = -20;
      break;

    // player2(enemy)의 움직임
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      enemy.velocity.y = -20;
      break;
  }
  console.log(event);
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;

    // player2(enemy)의 움직임
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
  console.log(event);
});
