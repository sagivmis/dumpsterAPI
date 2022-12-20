import { SwordNames } from "../../../types"
import { Weapon } from "../Weapon"

export class Sword extends Weapon {
  constructor(
    name: SwordNames,
    description: string,
    onEquip?: () => void,
    onRemove?: () => void,
    sideEffect?: () => void
  ) {
    super(name, description, "sword", onEquip, onRemove, sideEffect)
  }
}
