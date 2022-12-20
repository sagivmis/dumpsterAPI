import { v4 } from "uuid"
import { Buff } from "./Buff"
import { Consumable, Equippable } from "./Item/Item"

export const attributeMultiplier = 1.3
export const physicalDefenseMultiplier = 2.5
export const elementalDefenseMultiplier = 2.5
export const baseHealthPoints = 500
export const baseManaPoints = 200

type Orientation = "elemental" | "physical"

export type Equip = {
  head: Consumable | Equippable | null
  chest: Consumable | Equippable | null
  pants: Consumable | Equippable | null
  boots: Consumable | Equippable | null
  gloves: Consumable | Equippable | null
  necklace: Consumable | Equippable | null
  earrings: Consumable | Equippable | null
  weapon: Consumable | Equippable | null
  shield: Consumable | Equippable | null
}

export interface Character {
  id: string
  level: number
  experience: number
  name: string
  strength: number
  dexterity: number
  intelligence: number
  energy: number
  physicalDefense: number
  elementalDefense: number
  healthPoints: number
  manaPoints: number
  currentHealthPoints: number
  currentManaPoints: number
  inventory: (Consumable | Equippable)[]
  equip: Equip
  orientaion: Orientation
  buffs: Buff[]
  gold: number
}

export class Character implements Character {
  constructor(
    name: string,
    strength: number,
    dexterity: number,
    intelligence: number,
    energy: number
  ) {
    this.id = v4()
    this.level = 1
    this.experience = 0
    this.name = name
    this.strength = strength
    this.dexterity = dexterity
    this.intelligence = intelligence
    this.energy = energy
    this.physicalDefense =
      (this.strength + this.dexterity) * physicalDefenseMultiplier
    this.elementalDefense =
      (this.intelligence + this.energy) * elementalDefenseMultiplier
    this.healthPoints = baseHealthPoints + strength * 10 + dexterity * 5
    this.manaPoints = baseManaPoints + energy * 10 + intelligence * 5
    this.currentHealthPoints = this.healthPoints
    this.currentManaPoints = this.manaPoints
    this.inventory = []
    this.equip = {
      boots: null,
      chest: null,
      earrings: null,
      gloves: null,
      head: null,
      necklace: null,
      pants: null,
      shield: null,
      weapon: null
    }
    this.buffs = []
    this.gold = 1000
  }

  takeDamage(value: number) {
    this.currentHealthPoints -= value
  }

  healSelf(value: number) {
    this.currentHealthPoints += value
  }

  equipItem(item: Equippable) {
    if (
      this.inventory.includes(item) &&
      item.slot !== "consumable" &&
      !this.equip[item.slot]
    ) {
      const itemIndex = this.inventory.findIndex((invItem) => {
        return invItem.id === item.id
      })
      if (itemIndex > -1) {
        this.inventory.splice(itemIndex, 1)
        this.equip[item.slot] = item
      }
    }
  }

  unequipItem(item: Equippable) {
    if (item.slot !== "consumable" && this.equip[item.slot]) {
      this.inventory.push(item)
      this.equip[item.slot] = null
    }
  }
}

export class Archer extends Character {
  orientaion: Orientation
  constructor(name: string, dexterity: number, strength: number) {
    super(name, strength, Math.floor(dexterity * attributeMultiplier), 5, 5)
    this.orientaion = "physical"
  }
}

export class Warrior extends Character {
  orientaion: Orientation
  constructor(name: string, strength: number, dexterity: number) {
    super(name, Math.floor(strength * attributeMultiplier), dexterity, 5, 5)
    this.orientaion = "physical"
  }
}

export class Magician extends Character {
  orientaion: Orientation
  constructor(name: string, intelligence: number, energy: number) {
    super(name, 5, 5, Math.floor(intelligence * attributeMultiplier), energy)
    this.orientaion = "elemental"
  }
}

export class Healer extends Character {
  orientaion: Orientation
  constructor(name: string, energy: number, intelligence: number) {
    super(name, 5, 5, intelligence, Math.floor(energy * attributeMultiplier))
    this.orientaion = "elemental"
  }
}
