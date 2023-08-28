import Component from "../ecs/component";
import { Vector2 } from "./vector";

export interface TransformProps {
    position?: Vector2;
    rotation?: number;
    depth?: number;
    scale?: Vector2;
}

export default class Transform extends Component {
    public position: Vector2;
    public rotation: number;
    public depth: number;
    public scale: Vector2;

    public constructor(props?: TransformProps) {
        super();

        this.position = props?.position ?? new Vector2();
        this.rotation = props?.rotation ?? 0;
        this.depth = props?.depth ?? 0;
        this.scale = props?.scale ?? new Vector2(1, 1);
    }
}
