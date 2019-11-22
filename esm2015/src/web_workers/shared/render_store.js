/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-webworker/src/web_workers/shared/render_store.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
/** @nocollapse */ RenderStore.ɵfac = function RenderStore_Factory(t) { return new (t || RenderStore)(); };
/** @nocollapse */ RenderStore.ɵprov = i0.ɵɵdefineInjectable({ token: RenderStore, factory: function (t) { return RenderStore.ɵfac(t); }, providedIn: null });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(RenderStore, [{
        type: Injectable
    }], null, null); })();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyX3N0b3JlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvcmVuZGVyX3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBUUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7O0FBR3pDLE1BQU0sT0FBTyxXQUFXO0lBRHhCO1FBRVUsZUFBVSxHQUFHLENBQUMsQ0FBQztRQUNmLGdCQUFXLEdBQUcsSUFBSSxHQUFHLEVBQWUsQ0FBQztRQUNyQyxvQkFBZSxHQUFHLElBQUksR0FBRyxFQUFlLENBQUM7S0F5QmxEOzs7O0lBdkJDLFVBQVUsS0FBYSxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUVsRCxLQUFLLENBQUMsR0FBUSxFQUFFLEVBQVU7UUFDeEIsSUFBSSxFQUFFLElBQUksSUFBSTtZQUFFLE9BQU87UUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxHQUFROztjQUNQLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDM0MsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsRUFBVTtRQUNwQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3BFLENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLEdBQVE7UUFDaEIsT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVELENBQUM7OztZQTVCRixVQUFVOztzRUFDRSxXQUFXO21EQUFYLFdBQVcsaUNBQVgsV0FBVztrREFBWCxXQUFXO2NBRHZCLFVBQVU7Ozs7Ozs7SUFFVCxpQ0FBdUI7Ozs7O0lBQ3ZCLGtDQUE2Qzs7Ozs7SUFDN0Msc0NBQWlEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVuZGVyU3RvcmUge1xuICBwcml2YXRlIF9uZXh0SW5kZXggPSAwO1xuICBwcml2YXRlIF9sb29rdXBCeUlkID0gbmV3IE1hcDxudW1iZXIsIGFueT4oKTtcbiAgcHJpdmF0ZSBfbG9va3VwQnlPYmplY3QgPSBuZXcgTWFwPGFueSwgbnVtYmVyPigpO1xuXG4gIGFsbG9jYXRlSWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX25leHRJbmRleCsrOyB9XG5cbiAgc3RvcmUob2JqOiBhbnksIGlkOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaWQgPT0gbnVsbCkgcmV0dXJuO1xuICAgIHRoaXMuX2xvb2t1cEJ5SWQuc2V0KGlkLCBvYmopO1xuICAgIHRoaXMuX2xvb2t1cEJ5T2JqZWN0LnNldChvYmosIGlkKTtcbiAgfVxuXG4gIHJlbW92ZShvYmo6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fbG9va3VwQnlPYmplY3QuZ2V0KG9iaik7XG4gICAgaWYgKGluZGV4ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2xvb2t1cEJ5T2JqZWN0LmRlbGV0ZShvYmopO1xuICAgICAgdGhpcy5fbG9va3VwQnlJZC5kZWxldGUoaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIGRlc2VyaWFsaXplKGlkOiBudW1iZXIpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9sb29rdXBCeUlkLmhhcyhpZCkgPyB0aGlzLl9sb29rdXBCeUlkLmdldChpZCkgOiBudWxsO1xuICB9XG5cbiAgc2VyaWFsaXplKG9iajogYW55KTogbnVtYmVyfG51bGx8dW5kZWZpbmVkIHtcbiAgICByZXR1cm4gb2JqID09IG51bGwgPyBudWxsIDogdGhpcy5fbG9va3VwQnlPYmplY3QuZ2V0KG9iaik7XG4gIH1cbn1cbiJdfQ==