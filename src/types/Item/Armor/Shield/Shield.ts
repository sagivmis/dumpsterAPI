import { ShieldNames } from "../../../types"
import { Armor } from "../Armor"

export class ShieldArmor extends Armor {
  constructor(
    name: ShieldNames,
    description: string,
    physicalArmor: number,
    elementalArmor: number,
    onEquip?: () => void,
    onRemove?: () => void,
    sideEffect?: () => void
  ) {
    super(
      name,
      description,
      physicalArmor,
      elementalArmor,
      "shield",
      onEquip,
      onRemove,
      sideEffect
    )
  }
}
