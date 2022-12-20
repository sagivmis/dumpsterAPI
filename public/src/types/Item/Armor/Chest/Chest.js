"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChestArmor = void 0;
const Armor_1 = require("../Armor");
class ChestArmor extends Armor_1.Armor {
    constructor(name, description, physicalArmor, elementalArmor, onEquip, onRemove, sideEffect) {
        super(name, description, physicalArmor, elementalArmor, "chest", onEquip, onRemove, sideEffect);
    }
}
exports.ChestArmor = ChestArmor;
