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
/** @nocollapse */ RenderStore.ɵprov = i0.ɵɵdefineInjectable({ token: RenderStore, factory: RenderStore.ɵfac });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyX3N0b3JlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvcmVuZGVyX3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBUUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7O0FBR3pDLE1BQU0sT0FBTyxXQUFXO0lBRHhCO1FBRVUsZUFBVSxHQUFHLENBQUMsQ0FBQztRQUNmLGdCQUFXLEdBQUcsSUFBSSxHQUFHLEVBQWUsQ0FBQztRQUNyQyxvQkFBZSxHQUFHLElBQUksR0FBRyxFQUFlLENBQUM7S0F5QmxEOzs7O0lBdkJDLFVBQVUsS0FBYSxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUVsRCxLQUFLLENBQUMsR0FBUSxFQUFFLEVBQVU7UUFDeEIsSUFBSSxFQUFFLElBQUksSUFBSTtZQUFFLE9BQU87UUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxHQUFROztjQUNQLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDM0MsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsRUFBVTtRQUNwQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3BFLENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLEdBQVE7UUFDaEIsT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVELENBQUM7OztZQTVCRixVQUFVOzt5RkFDRSxXQUFXO3NFQUFYLFdBQVcsV0FBWCxXQUFXO2tEQUFYLFdBQVc7Y0FEdkIsVUFBVTs7Ozs7OztJQUVULGlDQUF1Qjs7Ozs7SUFDdkIsa0NBQTZDOzs7OztJQUM3QyxzQ0FBaUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZW5kZXJTdG9yZSB7XG4gIHByaXZhdGUgX25leHRJbmRleCA9IDA7XG4gIHByaXZhdGUgX2xvb2t1cEJ5SWQgPSBuZXcgTWFwPG51bWJlciwgYW55PigpO1xuICBwcml2YXRlIF9sb29rdXBCeU9iamVjdCA9IG5ldyBNYXA8YW55LCBudW1iZXI+KCk7XG5cbiAgYWxsb2NhdGVJZCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbmV4dEluZGV4Kys7IH1cblxuICBzdG9yZShvYmo6IGFueSwgaWQ6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZCA9PSBudWxsKSByZXR1cm47XG4gICAgdGhpcy5fbG9va3VwQnlJZC5zZXQoaWQsIG9iaik7XG4gICAgdGhpcy5fbG9va3VwQnlPYmplY3Quc2V0KG9iaiwgaWQpO1xuICB9XG5cbiAgcmVtb3ZlKG9iajogYW55KTogdm9pZCB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9sb29rdXBCeU9iamVjdC5nZXQob2JqKTtcbiAgICBpZiAoaW5kZXggIT0gbnVsbCkge1xuICAgICAgdGhpcy5fbG9va3VwQnlPYmplY3QuZGVsZXRlKG9iaik7XG4gICAgICB0aGlzLl9sb29rdXBCeUlkLmRlbGV0ZShpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgZGVzZXJpYWxpemUoaWQ6IG51bWJlcik6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2xvb2t1cEJ5SWQuaGFzKGlkKSA/IHRoaXMuX2xvb2t1cEJ5SWQuZ2V0KGlkKSA6IG51bGw7XG4gIH1cblxuICBzZXJpYWxpemUob2JqOiBhbnkpOiBudW1iZXJ8bnVsbHx1bmRlZmluZWQge1xuICAgIHJldHVybiBvYmogPT0gbnVsbCA/IG51bGwgOiB0aGlzLl9sb29rdXBCeU9iamVjdC5nZXQob2JqKTtcbiAgfVxufVxuIl19