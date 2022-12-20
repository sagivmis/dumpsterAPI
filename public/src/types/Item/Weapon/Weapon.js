"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weapon = void 0;
const Item_1 = require("../Item");
class Weapon extends Item_1.Equippable {
    type;
    constructor(name, description, type, onEquip, onRemove, sideEffect) {
        super(name, description, "weapon", onEquip, onRemove, sideEffect);
        this.type = type;
    }
}
exports.Weapon = Weapon;
