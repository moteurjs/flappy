import { Animator } from "./systems/animator";
import { Game } from "moteur/core";
import { RenderContext, Camera, SpriteRenderer, Texture, Sprite } from "moteur/gfx";
import { Scene, SceneManager } from "moteur/scene";
import { Rectangle, Transform, Vector2 } from "moteur/math";
import { RigidBody, PhysicsEngine } from "moteur/physics";
import { Player } from "./components/player";
import { FrameAnimation, TextureScroll } from "./components/animations/texture";
import { WaveAnimation } from "./components/animations/transform";

export default class FlappyGame extends Game {
    public async init() {
        const context = new RenderContext("game-canvas");

        const texture = await Texture.fromFile(
            context.gl,
            "images/spritesheet.webp",
        );

        const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        const mainScene = new Scene({ name: "main" }).addEntity(
            new Camera(),
            new Transform({
                scale: new Vector2(0.01385, 0.01385),
            }),
        );

        const backgroundTextureRectangle = isDarkMode ? new Rectangle(146, 0, 144, 256) : new Rectangle(0, 0, 144, 256);
        const background = [
            new Sprite({
                texture: texture.resize(backgroundTextureRectangle),
            }),
            new Transform({
                scale: new Vector2(144.0, 256.0),
            }),
        ];
        mainScene.addEntity(...background);

        const floor = [
            new Sprite({
                texture: texture.resize(new Rectangle(292, 0, 144, 56)),
            }),
            new TextureScroll({
                xRange: [292, 305],
            }),
            new Transform({
                position: new Vector2(0, -100),
                scale: new Vector2(144.0, 56.0),
                depth: 1,
            }),
        ];
        mainScene.addEntity(...floor);

        const player = [
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
                depth: 1,
            }),
        ];
        mainScene.addEntity(...player);

        this.addSystem(
            new SceneManager({
                sceneName: "main",
            }),
        );
        [mainScene].forEach((scene) => this.addEntity(scene));

        this.addSystem(new SpriteRenderer()).addEntity(context);

        this.addSystem(new PhysicsEngine());

        this.addSystem(new Animator());
    }
}
