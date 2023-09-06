import { Animation } from ".";
import { Vector2 } from "moteur/math/vector";

export interface TextureScrollProps {
    xRange: [number, number];
}

export class TextureScroll extends Animation {
    public readonly xRange: [number, number];
    public x: number;

    public constructor(props: TextureScrollProps) {
        super();

        this.xRange = props.xRange;
        this.x = props.xRange[0];
    }
}

export interface FrameAnimationProps {
    positions: Vector2[];
}

export class FrameAnimation extends Animation {
    public readonly positions: readonly Vector2[];

    public constructor(props: FrameAnimationProps) {
        super();

        this.positions = props.positions;
    }
}
