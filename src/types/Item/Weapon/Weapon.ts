import { Equippable } from "../Item"
import { WeaponNames, WeaponType } from "../../types"

export class Weapon extends Equippable {
  type: WeaponType
  constructor(
    name: WeaponNames,
    description: string,
    type: WeaponType,
    onEquip?: () => void,
    onRemove?: () => void,
    sideEffect?: () => void
  ) {
    super(name, description, "weapon", onEquip, onRemove, sideEffect)
    this.type = type
  }
}
