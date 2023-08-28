import Component from "../ecs/component";
import Texture from "./texture";

export interface SpriteProps {
    texture: Texture;
}

export default class Sprite extends Component {
    public readonly texture: Texture;

    public constructor(props: SpriteProps) {
        super();

        this.texture = props.texture;
    }
}
