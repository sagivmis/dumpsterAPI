import { v4 } from "uuid"
import {
  AllItemNames,
  AllItemSlot,
  EquippableItemSlot,
  EquippableNames
} from ".."

interface Item {
  id: string
  name: AllItemNames
  quantity: number
  description: string[]
  isEquippable: boolean
  slot: AllItemSlot
  onEquip?: () => void
  onRemove?: () => void
  sideEffect?: () => void //side effect for holding (trophy, extra exp etc.)
}

class Item implements Item {
  constructor(
    name: AllItemNames,
    description: string,
    slot: AllItemSlot,
    onEquip?: () => void,
    onRemove?: () => void,
    sideEffect?: () => void
  ) {
    this.id = v4()
    this.name = name
    this.quantity = 1
    this.description = [description]
    this.slot = slot
    this.onEquip = onEquip
    this.onRemove = onRemove
    this.sideEffect = sideEffect
  }
}

export class Equippable extends Item {
  constructor(
    name: EquippableNames,
    description: string,
    slot: EquippableItemSlot,
    onEquip?: () => void,
    onRemove?: () => void,
    sideEffect?: () => void
  ) {
    super(name, description, slot, onEquip, onRemove, sideEffect)
    this.isEquippable = true
  }
}

export class Consumable extends Item {
  constructor(
    name: EquippableNames,
    description: string,
    onEquip?: () => void,
    onRemove?: () => void,
    sideEffect?: () => void
  ) {
    super(name, description, "consumable", onEquip, onRemove, sideEffect)
    this.isEquippable = false
  }
}
