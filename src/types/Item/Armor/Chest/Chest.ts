import { ChestNames } from "../../../types"
import { Armor } from "../Armor"

export class ChestArmor extends Armor {
  constructor(
    name: ChestNames,
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
      "chest",
      onEquip,
      onRemove,
      sideEffect
    )
  }
}
