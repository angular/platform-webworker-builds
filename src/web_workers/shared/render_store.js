/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core/index';
export class RenderStore {
    constructor() {
        this._nextIndex = 0;
        this._lookupById = new Map();
        this._lookupByObject = new Map();
    }
    /**
     * @return {?}
     */
    allocateId() { return this._nextIndex++; }
    /**
     * @param {?} obj
     * @param {?} id
     * @return {?}
     */
    store(obj, id) {
        this._lookupById.set(id, obj);
        this._lookupByObject.set(obj, id);
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    remove(obj) {
        const /** @type {?} */ index = this._lookupByObject.get(obj);
        this._lookupByObject.delete(obj);
        this._lookupById.delete(index);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    deserialize(id) {
        if (id == null) {
            return null;
        }
        if (!this._lookupById.has(id)) {
            return null;
        }
        return this._lookupById.get(id);
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    serialize(obj) {
        if (obj == null) {
            return null;
        }
        return this._lookupByObject.get(obj);
    }
}
RenderStore.decorators = [
    { type: Injectable },
];
/** @nocollapse */
RenderStore.ctorParameters = () => [];
function RenderStore_tsickle_Closure_declarations() {
    /** @type {?} */
    RenderStore.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    RenderStore.ctorParameters;
    /** @type {?} */
    RenderStore.prototype._nextIndex;
    /** @type {?} */
    RenderStore.prototype._lookupById;
    /** @type {?} */
    RenderStore.prototype._lookupByObject;
}
//# sourceMappingURL=render_store.js.map