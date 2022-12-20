"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Armor = void 0;
const Item_1 = require("../Item");
class Armor extends Item_1.Equippable {
    physicalArmor;
    elementalArmor;
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(name, description, physicalArmor, elementalArmor, slot, onEquip, onRemove, sideEffect) {
        super(name, description, slot, onEquip, onRemove, sideEffect);
        this.physicalArmor = physicalArmor;
        this.elementalArmor = elementalArmor;
    }
}
exports.Armor = Armor;
