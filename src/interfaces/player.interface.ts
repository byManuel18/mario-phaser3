export interface Player {
  life: number;
  bloked: boolean;
  state: "mini" | "giant" | "plumber";
  speed: number;
  jumpForce: number;
  gravity: number;
}
