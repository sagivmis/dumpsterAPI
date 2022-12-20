"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PantsArmor = void 0;
const Armor_1 = require("../Armor");
class PantsArmor extends Armor_1.Armor {
    constructor(name, description, physicalArmor, elementalArmor, onEquip, onRemove, sideEffect) {
        super(name, description, physicalArmor, elementalArmor, "pants", onEquip, onRemove, sideEffect);
    }
}
exports.PantsArmor = PantsArmor;
