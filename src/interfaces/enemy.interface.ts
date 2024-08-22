export interface IEnemy{
    velocity: number;
    isDead: boolean;

    killEnemy: ()=> void;
    moveEnemy: ()=> void;
    changeDirectionEnemy: ()=> void;
}