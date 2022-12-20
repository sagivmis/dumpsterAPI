import { WandNames } from "../../../types"
import { Weapon } from "../Weapon"

export class Wand extends Weapon {
  constructor(
    name: WandNames,
    description: string,
    onEquip?: () => void,
    onRemove?: () => void,
    sideEffect?: () => void
  ) {
    super(name, description, "wand", onEquip, onRemove, sideEffect)
  }
}
