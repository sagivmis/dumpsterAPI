import { PantsNames } from "../../../types"
import { Armor } from "../Armor"

export class PantsArmor extends Armor {
  constructor(
    name: PantsNames,
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
      "pants",
      onEquip,
      onRemove,
      sideEffect
    )
  }
}
