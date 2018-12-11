import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
    /** @type {?} */
    RenderStore.prototype._nextIndex;
    /** @type {?} */
    RenderStore.prototype._lookupById;
    /** @type {?} */
    RenderStore.prototype._lookupByObject;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyX3N0b3JlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLyIsInNvdXJjZXMiOlsicGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvcmVuZGVyX3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFHekMsTUFBTSxPQUFPLFdBQVc7OzBCQUNELENBQUM7MkJBQ0EsSUFBSSxHQUFHLEVBQWU7K0JBQ2xCLElBQUksR0FBRyxFQUFlOzs7OztJQUVoRCxVQUFVLEtBQWEsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRTs7Ozs7O0lBRWxELEtBQUssQ0FBQyxHQUFRLEVBQUUsRUFBVTtRQUN4QixJQUFJLEVBQUUsSUFBSSxJQUFJO1lBQUUsT0FBTztRQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ25DOzs7OztJQUVELE1BQU0sQ0FBQyxHQUFROztRQUNiLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtZQUNqQixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoQztLQUNGOzs7OztJQUVELFdBQVcsQ0FBQyxFQUFVO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FDbkU7Ozs7O0lBRUQsU0FBUyxDQUFDLEdBQVE7UUFDaEIsT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzNEOzs7WUE1QkYsVUFBVTs7MkRBQ0UsV0FBVyw4REFBWCxXQUFXO21DQUFYLFdBQVc7Y0FEdkIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlbmRlclN0b3JlIHtcbiAgcHJpdmF0ZSBfbmV4dEluZGV4ID0gMDtcbiAgcHJpdmF0ZSBfbG9va3VwQnlJZCA9IG5ldyBNYXA8bnVtYmVyLCBhbnk+KCk7XG4gIHByaXZhdGUgX2xvb2t1cEJ5T2JqZWN0ID0gbmV3IE1hcDxhbnksIG51bWJlcj4oKTtcblxuICBhbGxvY2F0ZUlkKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9uZXh0SW5kZXgrKzsgfVxuXG4gIHN0b3JlKG9iajogYW55LCBpZDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlkID09IG51bGwpIHJldHVybjtcbiAgICB0aGlzLl9sb29rdXBCeUlkLnNldChpZCwgb2JqKTtcbiAgICB0aGlzLl9sb29rdXBCeU9iamVjdC5zZXQob2JqLCBpZCk7XG4gIH1cblxuICByZW1vdmUob2JqOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX2xvb2t1cEJ5T2JqZWN0LmdldChvYmopO1xuICAgIGlmIChpbmRleCAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9sb29rdXBCeU9iamVjdC5kZWxldGUob2JqKTtcbiAgICAgIHRoaXMuX2xvb2t1cEJ5SWQuZGVsZXRlKGluZGV4KTtcbiAgICB9XG4gIH1cblxuICBkZXNlcmlhbGl6ZShpZDogbnVtYmVyKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fbG9va3VwQnlJZC5oYXMoaWQpID8gdGhpcy5fbG9va3VwQnlJZC5nZXQoaWQpIDogbnVsbDtcbiAgfVxuXG4gIHNlcmlhbGl6ZShvYmo6IGFueSk6IG51bWJlcnxudWxsfHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIG9iaiA9PSBudWxsID8gbnVsbCA6IHRoaXMuX2xvb2t1cEJ5T2JqZWN0LmdldChvYmopO1xuICB9XG59XG4iXX0=