import { v4 } from "uuid"

type EnemyNames = "Demon Mage" | "Demon Warrior"

export interface Enemy {
  id: string
  name: EnemyNames
  physicalAttack: number
  elementalAttack: number
  physicalDefense: number
  elementalDefense: number
  healthPoints: number
  manaPoints: number
  currentHealthPoints: number
  currentManaPoints: number
}

export class Enemy implements Enemy {
  id: string
  name: EnemyNames
  physicalAttack: number
  elementalAttack: number
  physicalDefense: number
  elementalDefense: number
  healthPoints: number
  manaPoints: number
  currentHealthPoints: number
  currentManaPoints: number
  constructor(name: EnemyNames, physical: number, elemental: number) {
    this.id = v4()
    this.name = name
    this.physicalAttack = physical
    this.physicalDefense = physical
    this.elementalAttack = elemental
    this.elementalDefense = elemental
    this.healthPoints = this.physicalDefense * 1.5
    this.manaPoints = this.elementalDefense * 1.5
    this.currentHealthPoints = this.healthPoints
    this.currentManaPoints = this.manaPoints
  }
  takeDamage(value: number) {
    this.currentHealthPoints -= value
  }
  healSelf(value: number) {
    this.currentHealthPoints += value
  }
}
export class DemonMage extends Enemy {
  constructor() {
    super("Demon Mage", 10, 150)
  }
}

export class DemonWarrior extends Enemy {
  constructor() {
    super("Demon Warrior", 150, 10)
  }
}
