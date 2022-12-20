import { EarNames } from "../../../types"
import { Armor } from "../Armor"

export class EarArmor extends Armor {
  constructor(
    name: EarNames,
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
      "earrings",
      onEquip,
      onRemove,
      sideEffect
    )
  }
}
