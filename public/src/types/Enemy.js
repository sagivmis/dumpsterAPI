"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemonWarrior = exports.DemonMage = exports.Enemy = void 0;
const uuid_1 = require("uuid");
class Enemy {
    id;
    name;
    physicalAttack;
    elementalAttack;
    physicalDefense;
    elementalDefense;
    healthPoints;
    manaPoints;
    currentHealthPoints;
    currentManaPoints;
    constructor(name, physical, elemental) {
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.physicalAttack = physical;
        this.physicalDefense = physical;
        this.elementalAttack = elemental;
        this.elementalDefense = elemental;
        this.healthPoints = this.physicalDefense * 1.5;
        this.manaPoints = this.elementalDefense * 1.5;
        this.currentHealthPoints = this.healthPoints;
        this.currentManaPoints = this.manaPoints;
    }
    takeDamage(value) {
        this.currentHealthPoints -= value;
    }
    healSelf(value) {
        this.currentHealthPoints += value;
    }
}
exports.Enemy = Enemy;
class DemonMage extends Enemy {
    constructor() {
        super("Demon Mage", 10, 150);
    }
}
exports.DemonMage = DemonMage;
class DemonWarrior extends Enemy {
    constructor() {
        super("Demon Warrior", 150, 10);
    }
}
exports.DemonWarrior = DemonWarrior;
