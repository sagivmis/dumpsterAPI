import { BootsNames } from "../../../types"
import { Armor } from "../Armor"

export class BootsArmor extends Armor {
  constructor(
    name: BootsNames,
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
      "boots",
      onEquip,
      onRemove,
      sideEffect
    )
  }
}
