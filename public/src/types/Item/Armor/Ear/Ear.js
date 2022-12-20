"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EarArmor = void 0;
const Armor_1 = require("../Armor");
class EarArmor extends Armor_1.Armor {
    constructor(name, description, physicalArmor, elementalArmor, onEquip, onRemove, sideEffect) {
        super(name, description, physicalArmor, elementalArmor, "earrings", onEquip, onRemove, sideEffect);
    }
}
exports.EarArmor = EarArmor;
