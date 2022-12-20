import { HeadNames } from "../../../types"
import { Armor } from "../Armor"

export class HeadArmor extends Armor {
  constructor(
    name: HeadNames,
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
      "head",
      onEquip,
      onRemove,
      sideEffect
    )
  }
}
