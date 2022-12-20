"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlovesArmor = void 0;
const Armor_1 = require("../Armor");
class GlovesArmor extends Armor_1.Armor {
    constructor(name, description, physicalArmor, elementalArmor, onEquip, onRemove, sideEffect) {
        super(name, description, physicalArmor, elementalArmor, "gloves", onEquip, onRemove, sideEffect);
    }
}
exports.GlovesArmor = GlovesArmor;
