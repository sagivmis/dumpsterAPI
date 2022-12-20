"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShieldArmor = void 0;
const Armor_1 = require("../Armor");
class ShieldArmor extends Armor_1.Armor {
    constructor(name, description, physicalArmor, elementalArmor, onEquip, onRemove, sideEffect) {
        super(name, description, physicalArmor, elementalArmor, "shield", onEquip, onRemove, sideEffect);
    }
}
exports.ShieldArmor = ShieldArmor;
