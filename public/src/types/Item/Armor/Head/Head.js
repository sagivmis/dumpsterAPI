"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeadArmor = void 0;
const Armor_1 = require("../Armor");
class HeadArmor extends Armor_1.Armor {
    constructor(name, description, physicalArmor, elementalArmor, onEquip, onRemove, sideEffect) {
        super(name, description, physicalArmor, elementalArmor, "head", onEquip, onRemove, sideEffect);
    }
}
exports.HeadArmor = HeadArmor;
