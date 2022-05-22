import "./libs/kaboom.js";

kaboom({
  width: 512,
  height: 512,
  crisp: true,
  canvas: document.querySelector("#kaboom"),
  background: [127, 127, 255],
  font: "MidSim"
});

loadSprite("Sonic", "./sprites/SonicKaboom.png", {
  sliceX: 6,
  sliceY: 18,
  anims: {
      idle: {
          from: 0,
          to: 0,
          loop: false,
          speed: 6
      },
      bored: {
          from: 6,
          to: 7,
          loop: false,
          speed: 6
      },
      boredloop: {
          from: 8,
          to: 9,
          loop: true,
          speed: 6
      },
      up: {
          from: 18,
          to: 18,
          loop: false,
          speed: 6
      },
      down: {
          from: 24,
          to: 24,
          loop: false,
          speed: 6
      },
      jump: {
          from: 30,
          to: 30,
          loop: false,
          speed: 6
      },
      walk: {
          from: 36,
          to: 41,
          loop: true,
          speed: 6
      },
      stop: {
          from: 42,
          to: 43,
          loop: false,
          speed: 6
      },
      run: {
          from: 48,
          to: 51,
          loop: true,
          speed: 6
      },
      runStairs: {
          from: 54,
          to: 57,
          loop: true,
          speed: 6
      },
      roll: {
          from: 60,
          to: 63,
          loop: true,
          speed: 6
      },
      rollFull: {
          from: 64,
          to: 64,
          loop: false,
          speed: 6
      },
      push: {
          from: 66,
          to: 69,
          loop: true,
          speed: 6
      },
      drown: {
          from: 72,
          to: 72,
          loop: false,
          speed: 6
      },
      death: {
          from: 78,
          to: 78,
          loop: false,
          speed: 6
      },
      fall: {
          from: 84,
          to: 85,
          loop: true,
          speed: 6
      },
      glide: {
          from: 90,
          to: 90,
          loop: false,
          speed: 6
      },
      breath: {
          from: 96,
          to: 96,
          loop: false,
          speed: 6
      },
      trip: {
          from: 102,
          to: 103,
          loop: false,
          speed: 6
      },
  },
});
loadSprite("axe", "./sprites/blocks/axe.png");
loadSprite("chest", "./sprites/blocks/chest.png");
loadSprite("cobblestone", "./sprites/blocks/cobblestone.png");
loadSprite("craft", "./sprites/blocks/craft.png");
loadSprite("dandelion", "./sprites/blocks/dandelion.png");
loadSprite("dirt", "./sprites/blocks/dirt.png");
loadSprite("grass", "./sprites/blocks/grass.png");
loadSprite("lava", "./sprites/blocks/lava.png");
loadSprite("leaves", "./sprites/blocks/leaves.png");
loadSprite("pickaxe", "./sprites/blocks/pickaxe.png");
loadSprite("plank", "./sprites/blocks/plank.png");
loadSprite("rose", "./sprites/blocks/rose.png");
loadSprite("sand", "./sprites/blocks/sand.png");
loadSprite("shovel", "./sprites/blocks/shovel.png");
loadSprite("slime", "./sprites/blocks/slime.png");
loadSprite("stone", "./sprites/blocks/stone.png");
loadSprite("sword", "./sprites/blocks/sword.png");
loadSprite("water", "./sprites/blocks/water.png");
loadSprite("wood", "./sprites/blocks/wood.png");

addLevel([
  "=              =",
  "=              =",
  "=              =",
  "=              =",
  "=              =",
  "=              =",
  "=              =",
  "=              =",
  "=              =",
  "=              =",
  "=              =",
  "=              =",
  "=              =",
  "=              =",
  "=              =",
  "================",
], {
  // define the size of each block
  width: 32,
  height: 32,
  // define what each symbol means, by a function returning a component list (what will be passed to add())
  "=": () => [
      sprite("wood"),
      scale(2),
      area(),
      solid(),
  ],
})

const sonic = add([
  pos(80, 100),
  scale(2),
  area({
    height: 34,
    width: 20,
    offset: vec2(54, 40)
  }),
  body(),
  sprite("Sonic"),
  state("idle", [
    "idle", 
    "bored", 
    "jump", 
    "walk", 
    "run", 
    "roll", 
    "dead",
    "falling",
    "tripping"
  ]),
  {
    speed: 160,
    speedRun: 160,
    speedDash: 320
  }
])

// this callback will run once when enters "attack" state
sonic.onStateEnter("bored", () => {
  sonic.play("bored")
  wait(2, () => {
    sonic.play("boredloop")
  })
})

// this will run once when enters "idle" state
sonic.onStateEnter("idle", () => {
  console.log("Is In Idle");
  sonic.play("idle")
  wait(5, () => {
    sonic.enterState("bored")
    console.log("Is In Bored");
  })
})

sonic.onStateEnter("walk", (dir) => {
  sonic.play("walk", {flipX: dir});
})

sonic.enterState("idle");

var vel = 0;
onUpdate(() => {
  if (isKeyDown("left")) {
    if (vel > -1) vel -= 0.01;
    else if (vel <= 1) vel = -1;
    sonic.enterState("walk", true);
  } else if (isKeyDown("right")) {
    if (vel < 1) vel += 0.01;
    else if (vel >= 1) vel = 1;
    sonic.enterState("walk", false);
  } else {
    if (vel < 0) vel += 0.05;
    else if (vel > 0) vel -= 0.05;
    if (Math.abs(vel) <= 0.05) vel = 0;
  }
  sonic.move(sonic.speed * vel, 0)
})