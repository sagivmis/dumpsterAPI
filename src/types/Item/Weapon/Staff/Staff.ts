import { StaffNames } from "../../../types"
import { Weapon } from "../Weapon"

export class Staff extends Weapon {
  constructor(
    name: StaffNames,
    description: string,
    onEquip?: () => void,
    onRemove?: () => void,
    sideEffect?: () => void
  ) {
    super(name, description, "staff", onEquip, onRemove, sideEffect)
  }
}
