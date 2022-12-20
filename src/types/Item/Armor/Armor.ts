import { Equippable } from "../Item"
import { ArmorNames, ArmorType } from "../../types"

export class Armor extends Equippable {
  physicalArmor: number
  elementalArmor: number
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    name: ArmorNames,
    description: string,
    physicalArmor: number,
    elementalArmor: number,
    slot: ArmorType,
    onEquip?: () => void,
    onRemove?: () => void,
    sideEffect?: () => void
  ) {
    super(name, description, slot, onEquip, onRemove, sideEffect)
    this.physicalArmor = physicalArmor
    this.elementalArmor = elementalArmor
  }
}
