import { Enemy } from "../../entities/enemy";
import { Block } from "../../scenary/block";

export const setFloorCallBackCollider = (enemy: Enemy, block: Block) => {
  const { left, right } = enemy.body!.touching;
  const { left: leftBlock, right: rightBlock } = block.body!.touching;
  if ((left && rightBlock) || (right && leftBlock)) {
    enemy.changeDirectionEnemy();
  }
};

export const setEnemyCallBackCollider = (enemya: Enemy, enemyb: Enemy) => {
  const { left, right } = enemya.body!.touching;
  const { left: leftGoomba, right: rightGoomba } = enemyb.body!.touching;
  if ((left && rightGoomba) || (right && leftGoomba)) {
    enemya.changeDirectionEnemy();
    enemyb.changeDirectionEnemy();
  }
};
