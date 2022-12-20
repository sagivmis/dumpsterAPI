"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Healer = exports.Magician = exports.Warrior = exports.Archer = exports.Character = exports.baseManaPoints = exports.baseHealthPoints = exports.elementalDefenseMultiplier = exports.physicalDefenseMultiplier = exports.attributeMultiplier = void 0;
const uuid_1 = require("uuid");
exports.attributeMultiplier = 1.3;
exports.physicalDefenseMultiplier = 2.5;
exports.elementalDefenseMultiplier = 2.5;
exports.baseHealthPoints = 500;
exports.baseManaPoints = 200;
class Character {
    constructor(name, strength, dexterity, intelligence, energy) {
        this.id = (0, uuid_1.v4)();
        this.level = 1;
        this.experience = 0;
        this.name = name;
        this.strength = strength;
        this.dexterity = dexterity;
        this.intelligence = intelligence;
        this.energy = energy;
        this.physicalDefense =
            (this.strength + this.dexterity) * exports.physicalDefenseMultiplier;
        this.elementalDefense =
            (this.intelligence + this.energy) * exports.elementalDefenseMultiplier;
        this.healthPoints = exports.baseHealthPoints + strength * 10 + dexterity * 5;
        this.manaPoints = exports.baseManaPoints + energy * 10 + intelligence * 5;
        this.currentHealthPoints = this.healthPoints;
        this.currentManaPoints = this.manaPoints;
        this.inventory = [];
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
        };
        this.buffs = [];
        this.gold = 1000;
    }
    takeDamage(value) {
        this.currentHealthPoints -= value;
    }
    healSelf(value) {
        this.currentHealthPoints += value;
    }
    equipItem(item) {
        if (this.inventory.includes(item) &&
            item.slot !== "consumable" &&
            !this.equip[item.slot]) {
            const itemIndex = this.inventory.findIndex((invItem) => {
                return invItem.id === item.id;
            });
            if (itemIndex > -1) {
                this.inventory.splice(itemIndex, 1);
                this.equip[item.slot] = item;
            }
        }
    }
    unequipItem(item) {
        if (item.slot !== "consumable" && this.equip[item.slot]) {
            this.inventory.push(item);
            this.equip[item.slot] = null;
        }
    }
}
exports.Character = Character;
class Archer extends Character {
    orientaion;
    constructor(name, dexterity, strength) {
        super(name, strength, Math.floor(dexterity * exports.attributeMultiplier), 5, 5);
        this.orientaion = "physical";
    }
}
exports.Archer = Archer;
class Warrior extends Character {
    orientaion;
    constructor(name, strength, dexterity) {
        super(name, Math.floor(strength * exports.attributeMultiplier), dexterity, 5, 5);
        this.orientaion = "physical";
    }
}
exports.Warrior = Warrior;
class Magician extends Character {
    orientaion;
    constructor(name, intelligence, energy) {
        super(name, 5, 5, Math.floor(intelligence * exports.attributeMultiplier), energy);
        this.orientaion = "elemental";
    }
}
exports.Magician = Magician;
class Healer extends Character {
    orientaion;
    constructor(name, energy, intelligence) {
        super(name, 5, 5, intelligence, Math.floor(energy * exports.attributeMultiplier));
        this.orientaion = "elemental";
    }
}
exports.Healer = Healer;
