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
let RenderStore = /** @class */ (() => {
    class RenderStore {
        constructor() {
            this._nextIndex = 0;
            this._lookupById = new Map();
            this._lookupByObject = new Map();
        }
        /**
         * @return {?}
         */
        allocateId() {
            return this._nextIndex++;
        }
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
    return RenderStore;
})();
export { RenderStore };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyX3N0b3JlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvcmVuZGVyX3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBUUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7O0FBRXpDO0lBQUEsTUFDYSxXQUFXO1FBRHhCO1lBRVUsZUFBVSxHQUFHLENBQUMsQ0FBQztZQUNmLGdCQUFXLEdBQUcsSUFBSSxHQUFHLEVBQWUsQ0FBQztZQUNyQyxvQkFBZSxHQUFHLElBQUksR0FBRyxFQUFlLENBQUM7U0EyQmxEOzs7O1FBekJDLFVBQVU7WUFDUixPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMzQixDQUFDOzs7Ozs7UUFFRCxLQUFLLENBQUMsR0FBUSxFQUFFLEVBQVU7WUFDeEIsSUFBSSxFQUFFLElBQUksSUFBSTtnQkFBRSxPQUFPO1lBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDcEMsQ0FBQzs7Ozs7UUFFRCxNQUFNLENBQUMsR0FBUTs7a0JBQ1AsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUMzQyxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoQztRQUNILENBQUM7Ozs7O1FBRUQsV0FBVyxDQUFDLEVBQVU7WUFDcEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNwRSxDQUFDOzs7OztRQUVELFNBQVMsQ0FBQyxHQUFRO1lBQ2hCLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1RCxDQUFDOzs7Z0JBOUJGLFVBQVU7OzZGQUNFLFdBQVc7MEVBQVgsV0FBVyxXQUFYLFdBQVc7c0JBWHhCO0tBeUNDO1NBOUJZLFdBQVc7a0RBQVgsV0FBVztjQUR2QixVQUFVOzs7Ozs7O0lBRVQsaUNBQXVCOzs7OztJQUN2QixrQ0FBNkM7Ozs7O0lBQzdDLHNDQUFpRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlbmRlclN0b3JlIHtcbiAgcHJpdmF0ZSBfbmV4dEluZGV4ID0gMDtcbiAgcHJpdmF0ZSBfbG9va3VwQnlJZCA9IG5ldyBNYXA8bnVtYmVyLCBhbnk+KCk7XG4gIHByaXZhdGUgX2xvb2t1cEJ5T2JqZWN0ID0gbmV3IE1hcDxhbnksIG51bWJlcj4oKTtcblxuICBhbGxvY2F0ZUlkKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25leHRJbmRleCsrO1xuICB9XG5cbiAgc3RvcmUob2JqOiBhbnksIGlkOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaWQgPT0gbnVsbCkgcmV0dXJuO1xuICAgIHRoaXMuX2xvb2t1cEJ5SWQuc2V0KGlkLCBvYmopO1xuICAgIHRoaXMuX2xvb2t1cEJ5T2JqZWN0LnNldChvYmosIGlkKTtcbiAgfVxuXG4gIHJlbW92ZShvYmo6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fbG9va3VwQnlPYmplY3QuZ2V0KG9iaik7XG4gICAgaWYgKGluZGV4ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2xvb2t1cEJ5T2JqZWN0LmRlbGV0ZShvYmopO1xuICAgICAgdGhpcy5fbG9va3VwQnlJZC5kZWxldGUoaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIGRlc2VyaWFsaXplKGlkOiBudW1iZXIpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9sb29rdXBCeUlkLmhhcyhpZCkgPyB0aGlzLl9sb29rdXBCeUlkLmdldChpZCkgOiBudWxsO1xuICB9XG5cbiAgc2VyaWFsaXplKG9iajogYW55KTogbnVtYmVyfG51bGx8dW5kZWZpbmVkIHtcbiAgICByZXR1cm4gb2JqID09IG51bGwgPyBudWxsIDogdGhpcy5fbG9va3VwQnlPYmplY3QuZ2V0KG9iaik7XG4gIH1cbn1cbiJdfQ==