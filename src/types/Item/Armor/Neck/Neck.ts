import { NeckNames } from "../../../types"
import { Armor } from "../Armor"

export class NeckArmor extends Armor {
  constructor(
    name: NeckNames,
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
      "necklace",
      onEquip,
      onRemove,
      sideEffect
    )
  }
}
