"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeckArmor = void 0;
const Armor_1 = require("../Armor");
class NeckArmor extends Armor_1.Armor {
    constructor(name, description, physicalArmor, elementalArmor, onEquip, onRemove, sideEffect) {
        super(name, description, physicalArmor, elementalArmor, "necklace", onEquip, onRemove, sideEffect);
    }
}
exports.NeckArmor = NeckArmor;
