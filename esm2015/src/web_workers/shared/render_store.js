import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
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
        if (id == null)
            return;
        this._lookupById.set(id, obj);
        this._lookupByObject.set(obj, id);
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    remove(obj) {
        /** @type {?} */
        const index = this._lookupByObject.get(obj);
        if (index != null) {
            this._lookupByObject.delete(obj);
            this._lookupById.delete(index);
        }
    }
    /**
     * @param {?} id
     * @return {?}
     */
    deserialize(id) {
        return this._lookupById.has(id) ? this._lookupById.get(id) : null;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    serialize(obj) {
        return obj == null ? null : this._lookupByObject.get(obj);
    }
}
RenderStore.decorators = [
    { type: Injectable },
];
RenderStore.ngInjectableDef = i0.defineInjectable({ token: RenderStore, factory: function RenderStore_Factory(t) { return new (t || RenderStore)(); }, providedIn: null });
/*@__PURE__*/ i0.ɵsetClassMetadata(RenderStore, [{
        type: Injectable
    }], null, null);
if (false) {
    /**
     * @type {?}
     * @private
     */
    RenderStore.prototype._nextIndex;
    /**
     * @type {?}
     * @private
     */
    RenderStore.prototype._lookupById;
    /**
     * @type {?}
     * @private
     */
    RenderStore.prototype._lookupByObject;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyX3N0b3JlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLyIsInNvdXJjZXMiOlsicGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvcmVuZGVyX3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFHekMsTUFBTSxPQUFPLFdBQVc7SUFEeEI7UUFFVSxlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsZ0JBQVcsR0FBRyxJQUFJLEdBQUcsRUFBZSxDQUFDO1FBQ3JDLG9CQUFlLEdBQUcsSUFBSSxHQUFHLEVBQWUsQ0FBQztLQXlCbEQ7Ozs7SUF2QkMsVUFBVSxLQUFhLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQzs7Ozs7O0lBRWxELEtBQUssQ0FBQyxHQUFRLEVBQUUsRUFBVTtRQUN4QixJQUFJLEVBQUUsSUFBSSxJQUFJO1lBQUUsT0FBTztRQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7O0lBRUQsTUFBTSxDQUFDLEdBQVE7O2NBQ1AsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUMzQyxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDakIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDaEM7SUFDSCxDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxFQUFVO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDcEUsQ0FBQzs7Ozs7SUFFRCxTQUFTLENBQUMsR0FBUTtRQUNoQixPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUQsQ0FBQzs7O1lBNUJGLFVBQVU7OzJEQUNFLFdBQVcsOERBQVgsV0FBVzttQ0FBWCxXQUFXO2NBRHZCLFVBQVU7Ozs7Ozs7SUFFVCxpQ0FBdUI7Ozs7O0lBQ3ZCLGtDQUE2Qzs7Ozs7SUFDN0Msc0NBQWlEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVuZGVyU3RvcmUge1xuICBwcml2YXRlIF9uZXh0SW5kZXggPSAwO1xuICBwcml2YXRlIF9sb29rdXBCeUlkID0gbmV3IE1hcDxudW1iZXIsIGFueT4oKTtcbiAgcHJpdmF0ZSBfbG9va3VwQnlPYmplY3QgPSBuZXcgTWFwPGFueSwgbnVtYmVyPigpO1xuXG4gIGFsbG9jYXRlSWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX25leHRJbmRleCsrOyB9XG5cbiAgc3RvcmUob2JqOiBhbnksIGlkOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaWQgPT0gbnVsbCkgcmV0dXJuO1xuICAgIHRoaXMuX2xvb2t1cEJ5SWQuc2V0KGlkLCBvYmopO1xuICAgIHRoaXMuX2xvb2t1cEJ5T2JqZWN0LnNldChvYmosIGlkKTtcbiAgfVxuXG4gIHJlbW92ZShvYmo6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fbG9va3VwQnlPYmplY3QuZ2V0KG9iaik7XG4gICAgaWYgKGluZGV4ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2xvb2t1cEJ5T2JqZWN0LmRlbGV0ZShvYmopO1xuICAgICAgdGhpcy5fbG9va3VwQnlJZC5kZWxldGUoaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIGRlc2VyaWFsaXplKGlkOiBudW1iZXIpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9sb29rdXBCeUlkLmhhcyhpZCkgPyB0aGlzLl9sb29rdXBCeUlkLmdldChpZCkgOiBudWxsO1xuICB9XG5cbiAgc2VyaWFsaXplKG9iajogYW55KTogbnVtYmVyfG51bGx8dW5kZWZpbmVkIHtcbiAgICByZXR1cm4gb2JqID09IG51bGwgPyBudWxsIDogdGhpcy5fbG9va3VwQnlPYmplY3QuZ2V0KG9iaik7XG4gIH1cbn1cbiJdfQ==