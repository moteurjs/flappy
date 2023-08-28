import Animator from "./animations/animator";
import { FrameAnimation, TextureScroll } from "./animations/texture";
import { WaveAnimation } from "./animations/transform";
import Game from "./core/game";
import Player from "./core/player";
import Scene from "./core/scene";
import SceneManager from "./core/sceneManager";
import Camera from "./gfx/camera";
import Renderer, { RenderContext } from "./gfx/renderer";
import Sprite from "./gfx/sprite";
import Texture from "./gfx/texture";
import Rectangle from "./math/rectangle";
import Transform from "./math/transform";
import { Vector2 } from "./math/vector";
import PhysicsEngine from "./physics/physicsEngine";
import RigidBody from "./physics/rigidBody";
import "./style.css";

export default class FlappyGame extends Game {
    public async init() {
        const context = new RenderContext("game-canvas");

        const texture = await Texture.fromFile(
            context.gl,
            "images/spritesheet.webp",
        );

        const scenes = [
            new Scene({
                name: "main",
            })
                .addEntity(
                    new Camera(),
                    new Transform({
                        scale: new Vector2(0.01385, 0.01385),
                    }),
                )
                .addEntity(
                    new Sprite({
                        texture: texture.resize(new Rectangle(0, 0, 144, 256)),
                    }),
                    new Transform({
                        scale: new Vector2(144.0, 256.0),
                    }),
                )
                .addEntity(
                    new Sprite({
                        texture: texture.resize(new Rectangle(292, 0, 144, 56)),
                    }),
                    new TextureScroll({
                        xRange: [292, 305],
                    }),
                    new Transform({
                        position: new Vector2(0, 100),
                        scale: new Vector2(144.0, 56.0),
                        depth: -1,
                    }),
                )
                .addEntity(
                    new Player(),
                    new Sprite({
                        texture: texture.resize(new Rectangle(3, 488, 17, 17)),
                    }),
                    new WaveAnimation({
                        amplitude: 5,
                    }),
                    new FrameAnimation({
                        positions: [
                            new Vector2(3, 488),
                            new Vector2(31, 488),
                            new Vector2(59, 488),
                            new Vector2(31, 488),
                        ],
                    }),
                    new RigidBody({
                        acceleration: new Vector2(0.0, 0.0),
                    }),
                    new Transform({
                        scale: new Vector2(17.0, 17.0),
                        depth: -1,
                    }),
                ),
        ];

        this.addSystem(
            new SceneManager({
                sceneName: "main",
            }),
        );
        scenes.forEach((scene) => this.addEntity(scene));

        this.addSystem(new Renderer()).addEntity(context);

        this.addSystem(new PhysicsEngine());

        this.addSystem(new Animator());
    }
}

async function main() {
    const game = new FlappyGame();

    await game.boot();
    requestAnimationFrame((timestamp) => game.loop(timestamp));
}

main();
