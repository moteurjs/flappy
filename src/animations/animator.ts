import System from "../ecs/system";
import Sprite from "../gfx/sprite";
import Transform from "../math/transform";
import { FrameAnimation, TextureScroll } from "./texture";
import { WaveAnimation } from "./transform";

export default class Animator extends System {
    public async update(timestamp: number) {
        this.entities
            .query(Sprite, TextureScroll)
            .forEach(([sprite, animation]) => {
                animation.x += 1;
                if (animation.x >= animation.xRange[1])
                    animation.x = animation.xRange[0];
                sprite.texture.view.x = animation.x;
            });

        this.entities
            .query(Transform, WaveAnimation)
            .forEach(([transform, animation]) => {
                if (animation.basePosition === undefined)
                    animation.basePosition = transform.position.y;

                transform.position.y =
                    animation.basePosition +
                    Math.cos(timestamp * 0.005) * animation.amplitude;
            });

        this.entities
            .query(Sprite, FrameAnimation)
            .forEach(([sprite, animation]) => {
                const v =
                    animation.positions[
                        Math.floor(timestamp * 0.005) %
                            animation.positions.length
                    ];

                sprite.texture.view.x = v.x;
                sprite.texture.view.y = v.y;
            });
    }
}
