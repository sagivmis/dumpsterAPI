import { Enemy } from "./Enemy"
import { Consumable, Equippable } from "./Item/Item"

interface Battle {
  enemies: Enemy[]
  reward: { exp?: number; gold?: number; items?: [Equippable | Consumable] }
}
