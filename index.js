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

const gravity = 0.2;

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
}

animate();
