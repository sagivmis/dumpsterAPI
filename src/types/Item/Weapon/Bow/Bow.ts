import { BowNames } from "../../../types"
import { Weapon } from "../Weapon"

export class Bow extends Weapon {
  constructor(
    name: BowNames,
    description: string,
    onEquip?: () => void,
    onRemove?: () => void,
    sideEffect?: () => void
  ) {
    super(name, description, "bow", onEquip, onRemove, sideEffect)
  }
}
