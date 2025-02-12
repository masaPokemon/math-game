// Canvasの設定
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

// プレイヤーの設定
const player1 = {
    x: 100,
    y: 300,
    width: 50,
    height: 100,
    color: 'blue',
    dx: 0,
    dy: 0,
    speed: 5,
    jumping: false,
    health: 100,
    attack: { punch: false, kick: false, magic: false },
    isAttacking: false,
    animationFrame: 0
};

const player2 = {
    x: 650,
    y: 300,
    width: 50,
    height: 100,
    color: 'red',
    dx: 0,
    dy: 0,
    speed: 5,
    jumping: false,
    health: 100,
    attack: { punch: false, kick: false, magic: false },
    isAttacking: false,
    animationFrame: 0
};

// キーの設定
const keys = {
    left1: false,
    right1: false,
    up1: false,
    punch1: false,
    kick1: false,
    magic1: false,
    left2: false,
    right2: false,
    up2: false,
    punch2: false,
    kick2: false,
    magic2: false
};

// 衝突判定
function checkCollision(player1, player2) {
    return !(player1.x + player1.width < player2.x || 
             player1.x > player2.x + player2.width || 
             player1.y + player1.height < player2.y || 
             player1.y > player2.y + player2.height);
}

// プレイヤーの攻撃処理
function handleAttacks() {
    // プレイヤー1の攻撃
    if (keys.punch1 && !player1.isAttacking) {
        player1.isAttacking = true;
        player1.attack.punch = true;
        setTimeout(() => { player1.attack.punch = false; player1.isAttacking = false; }, 500);
    }

    if (keys.kick1 && !player1.isAttacking) {
        player1.isAttacking = true;
        player1.attack.kick = true;
        setTimeout(() => { player1.attack.kick = false; player1.isAttacking = false; }, 500);
    }

    if (keys.magic1 && !player1.isAttacking) {
        player1.isAttacking = true;
        player1.attack.magic = true;
        setTimeout(() => { player1.attack.magic = false; player1.isAttacking = false; }, 1000);
    }

    // プレイヤー2の攻撃
    if (keys.punch2 && !player2.isAttacking) {
        player2.isAttacking = true;
        player2.attack.punch = true;
        setTimeout(() => { player2.attack.punch = false; player2.isAttacking = false; }, 500);
    }

    if (keys.kick2 && !player2.isAttacking) {
        player2.isAttacking = true;
        player2.attack.kick = true;
        setTimeout(() => { player2.attack.kick = false; player2.isAttacking = false; }, 500);
    }

    if (keys.magic2 && !player2.isAttacking) {
        player2.isAttacking = true;
        player2.attack.magic = true;
        setTimeout(() => { player2.attack.magic = false; player2.isAttacking = false; }, 1000);
    }

    // 攻撃中の衝突判定
    if (player1.attack.punch && checkCollision(player1, player2)) {
        player2.health -= 10;
    }
    if (player1.attack.kick && checkCollision(player1, player2)) {
        player2.health -= 15;
    }
    if (player1.attack.magic && checkCollision(player1, player2)) {
        player2.health -= 20;
    }

    if (player2.attack.punch && checkCollision(player2, player1)) {
        player1.health -= 10;
    }
    if (player2.attack.kick && checkCollision(player2, player1)) {
        player1.health -= 15;
    }
    if (player2.attack.magic && checkCollision(player2, player1)) {
        player1.health -= 20;
    }
}

// ヘルスバーの表示
function drawHealthBar(player, x, y) {
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, 200, 20); // 背景
    ctx.fillStyle = 'green';
    ctx.fillRect(x, y, 200 * (player.health / 100), 20); // ヘルスバー
}

// プレイヤーのアニメーション
function update() {
    handleAttacks();

    // プレイヤー1の移動
    if (keys.left1) player1.x -= player1.speed;
    if (keys.right1) player1.x += player1.speed;
    if (keys.up1 && !player1.jumping) {
        player1.dy = -15;
        player1.jumping = true;
    }

    // プレイヤー2の移動
    if (keys.left2) player2.x -= player2.speed;
    if (keys.right2) player2.x += player2.speed;
    if (keys.up2 && !player2.jumping) {
        player2.dy = -15;
        player2.jumping = true;
    }

    // 重力処理
    player1.dy += 1;
    player2.dy += 1;

    // プレイヤーの位置更新
    player1.y += player1.dy;
    player2.y += player2.dy;

    // 地面との衝突判定
    if (player1.y >= 300) {
        player1.y = 300;
        player1.dy = 0;
        player1.jumping = false;
    }
    if (player2.y >= 300) {
        player2.y = 300;
        player2.dy = 0;
        player2.jumping = false;
    }

    // 描画
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // プレイヤー1の描画
    ctx.fillStyle = player1.color;
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);

    // プレイヤー2の描画
    ctx.fillStyle = player2.color;
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);

    // ヘルスバーの描画
    drawHealthBar(player1, 10, 10);
    drawHealthBar(player2, canvas.width - 210, 10);

    requestAnimationFrame(update);
}

// キーの押下イベント
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') keys.left1 = true;
    if (e.key === 'ArrowRight') keys.right1 = true;
    if (e.key === 'ArrowUp') keys.up1 = true;
    if (e.key === ' ') keys.punch1 = true; // パンチ
    if (e.key === 'x') keys.kick1 = true; // キック
    if (e.key === 'z') keys.magic1 = true; // 魔法

    if (e.key === 'a') keys.left2 = true;
    if (e.key === 'd') keys.right2 = true;
    if (e.key === 'w') keys.up2 = true;
    if (e.key === 'j') keys.punch2 = true; // パンチ
    if (e.key === 'k') keys.kick2 = true; // キック
    if (e.key === 'l') keys.magic2 = true; // 魔法
});

// キーの離すイベント
document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') keys.left1 = false;
    if (e.key === 'ArrowRight') keys.right1 = false;
    if (e.key === 'ArrowUp') keys.up1 = false;
    if (e.key === ' ') keys.punch1 = false;
    if (e.key === 'x') keys.kick1 = false;
    if (e.key === 'z') keys.magic1 = false;

    if (e.key === 'a') keys.left2 = false;
    if (e.key === 'd') keys.right2 = false;
    if (e.key === 'w') keys.up2 = false;
    if (e.key === 'j') keys.punch2 = false;
    if (e.key === 'k') keys.kick2 = false;
    if (e.key === 'l') keys.magic2 = false;
});

// ゲーム開始
update();
