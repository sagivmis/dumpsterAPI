"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootsArmor = void 0;
const Armor_1 = require("../Armor");
class BootsArmor extends Armor_1.Armor {
    constructor(name, description, physicalArmor, elementalArmor, onEquip, onRemove, sideEffect) {
        super(name, description, physicalArmor, elementalArmor, "boots", onEquip, onRemove, sideEffect);
    }
}
exports.BootsArmor = BootsArmor;
