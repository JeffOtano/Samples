export * from './navigation';

export type SvgProps = {
  height: string;
  pathFill?: string;
  pathStroke?: string;
  svgFill?: string;
  svgStroke?: string;
  width: string;
};

export interface ThreeDotsMenuOptions {
  name: string;
  action: () => void;
  icon: JSX.Element;
}

export enum PlaybackSpeed {
  One = 1,
  OnePointTwo = 1.2,
  OnePointFive = 1.5,
  Two = 2,
}
