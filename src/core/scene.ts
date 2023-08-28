import Component from "../ecs/component";

export interface SceneProps {
    name: string;
}

export default class Scene extends Component {
    public readonly name: string;
    public readonly entities: Component[][];

    public constructor(protected props: Readonly<SceneProps>) {
        super();

        this.name = props.name;
        this.entities = [];
    }

    public addEntity(...components: Component[]): this {
        this.entities.push(components);

        return this;
    }
}
