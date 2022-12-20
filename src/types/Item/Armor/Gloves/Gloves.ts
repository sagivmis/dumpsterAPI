import { GlovesNames } from "../../../types"
import { Armor } from "../Armor"

export class GlovesArmor extends Armor {
  constructor(
    name: GlovesNames,
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
      "gloves",
      onEquip,
      onRemove,
      sideEffect
    )
  }
}
