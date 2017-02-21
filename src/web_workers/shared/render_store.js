/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
var RenderStore = (function () {
    function RenderStore() {
        this._nextIndex = 0;
        this._lookupById = new Map();
        this._lookupByObject = new Map();
    }
    /**
     * @return {?}
     */
    RenderStore.prototype.allocateId = function () { return this._nextIndex++; };
    /**
     * @param {?} obj
     * @param {?} id
     * @return {?}
     */
    RenderStore.prototype.store = function (obj, id) {
        if (id == null)
            return;
        this._lookupById.set(id, obj);
        this._lookupByObject.set(obj, id);
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    RenderStore.prototype.remove = function (obj) {
        var /** @type {?} */ index = this._lookupByObject.get(obj);
        if (index != null) {
            this._lookupByObject.delete(obj);
            this._lookupById.delete(index);
        }
    };
    /**
     * @param {?} id
     * @return {?}
     */
    RenderStore.prototype.deserialize = function (id) {
        return this._lookupById.has(id) ? this._lookupById.get(id) : null;
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    RenderStore.prototype.serialize = function (obj) { return obj == null ? null : this._lookupByObject.get(obj); };
    return RenderStore;
}());
export { RenderStore };
RenderStore.decorators = [
    { type: Injectable },
];
/** @nocollapse */
RenderStore.ctorParameters = function () { return []; };
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