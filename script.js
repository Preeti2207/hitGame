var lastLoopRun = 0;
var enemies = new Array();
var score = 0;

function createSprite(element, x, y, w, h) {
      var result = new Object();
      result.element = element;
      result.x = x;
      result.y = y;
      result.w = w;
      result.h = h;
      return result;
}

function ensureBounds(sprite) {
      if (sprite.x + sprite.w > background.width ) {
        sprite.x = background.width - sprite.w;
      }
      if (sprite.y + sprite.h > background.height) {
            sprite.y = background.height - sprite.h;
      }
}

function setPosition(sprite) {
  var e = document.getElementById(sprite.element);
  e.style.left = sprite.x + 'px';
  e.style.top = sprite.y + 'px';
}

function removeFromBottom(){
    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].y + enemies[i].h >= 635) {
              var element = document.getElementById(enemies[i].element);
               element.style.visibility = 'hidden';
               element.parentNode.removeChild(element);
               enemies.splice(i, 1);
      i--;
    }
    }
}

function showSprites() {
      for (var i = 0; i < enemies.length; i++) {
        setPosition(enemies[i]);
      }
}

function updatePositions() {
      for (var i = 0; i < enemies.length; i++) {
        enemies[i].y += 4;
        enemies[i].x += getRandom(7) - 3;
        ensureBounds(enemies[i]);
  }
}

function addEnemy() {
      if (getRandom(20) == 0) {
            var elementName = 'enemy' + getRandom(10000000);
            var enemy = createSprite(elementName, getRandom(1200), -30, 20, 20);

            var element = document.createElement('div');
            element.id = enemy.element;
            element.className = 'enemy';
            element.addEventListener("click", function(){
                this.style.display = 'none';
                score = score +1
                document.getElementById("score_count").innerHTML = score;

            });
        document.children[0].appendChild(element);

    enemies[enemies.length] = enemy;
  }
}

function getRandom(maxSize) {
      return parseInt(Math.random() * maxSize);
}



function loop() {
  if (new Date().getTime() - lastLoopRun > 40) {
    updatePositions();
    removeFromBottom();
    addEnemy();

    showSprites();
    lastLoopRun = new Date().getTime();
  }
  setTimeout('loop();', 2);
}

loop();
