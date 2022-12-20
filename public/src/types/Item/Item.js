"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consumable = exports.Equippable = void 0;
const uuid_1 = require("uuid");
class Item {
    constructor(name, description, slot, onEquip, onRemove, sideEffect) {
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.quantity = 1;
        this.description = [description];
        this.slot = slot;
        this.onEquip = onEquip;
        this.onRemove = onRemove;
        this.sideEffect = sideEffect;
    }
}
class Equippable extends Item {
    constructor(name, description, slot, onEquip, onRemove, sideEffect) {
        super(name, description, slot, onEquip, onRemove, sideEffect);
        this.isEquippable = true;
    }
}
exports.Equippable = Equippable;
class Consumable extends Item {
    constructor(name, description, onEquip, onRemove, sideEffect) {
        super(name, description, "consumable", onEquip, onRemove, sideEffect);
        this.isEquippable = false;
    }
}
exports.Consumable = Consumable;
