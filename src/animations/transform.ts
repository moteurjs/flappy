import Animation from ".";

export interface WaveAnimationProps {
    amplitude: number;
}

export class WaveAnimation extends Animation {
    public readonly amplitude: number;
    public basePosition: number = undefined as any as number;

    public constructor(props: WaveAnimationProps) {
        super();

        this.amplitude = props.amplitude;
    }
}
