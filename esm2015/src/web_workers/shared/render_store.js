/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
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
    { type: Injectable }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyX3N0b3JlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvcmVuZGVyX3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUd6QyxNQUFNLE9BQU8sV0FBVztJQUR4QjtRQUVVLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixnQkFBVyxHQUFHLElBQUksR0FBRyxFQUFlLENBQUM7UUFDckMsb0JBQWUsR0FBRyxJQUFJLEdBQUcsRUFBZSxDQUFDO0lBeUJuRCxDQUFDOzs7O0lBdkJDLFVBQVUsS0FBYSxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUVsRCxLQUFLLENBQUMsR0FBUSxFQUFFLEVBQVU7UUFDeEIsSUFBSSxFQUFFLElBQUksSUFBSTtZQUFFLE9BQU87UUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxHQUFROztjQUNQLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDM0MsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsRUFBVTtRQUNwQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3BFLENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLEdBQVE7UUFDaEIsT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVELENBQUM7OztZQTVCRixVQUFVOzs7Ozs7O0lBRVQsaUNBQXVCOzs7OztJQUN2QixrQ0FBNkM7Ozs7O0lBQzdDLHNDQUFpRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlbmRlclN0b3JlIHtcbiAgcHJpdmF0ZSBfbmV4dEluZGV4ID0gMDtcbiAgcHJpdmF0ZSBfbG9va3VwQnlJZCA9IG5ldyBNYXA8bnVtYmVyLCBhbnk+KCk7XG4gIHByaXZhdGUgX2xvb2t1cEJ5T2JqZWN0ID0gbmV3IE1hcDxhbnksIG51bWJlcj4oKTtcblxuICBhbGxvY2F0ZUlkKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9uZXh0SW5kZXgrKzsgfVxuXG4gIHN0b3JlKG9iajogYW55LCBpZDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlkID09IG51bGwpIHJldHVybjtcbiAgICB0aGlzLl9sb29rdXBCeUlkLnNldChpZCwgb2JqKTtcbiAgICB0aGlzLl9sb29rdXBCeU9iamVjdC5zZXQob2JqLCBpZCk7XG4gIH1cblxuICByZW1vdmUob2JqOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX2xvb2t1cEJ5T2JqZWN0LmdldChvYmopO1xuICAgIGlmIChpbmRleCAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9sb29rdXBCeU9iamVjdC5kZWxldGUob2JqKTtcbiAgICAgIHRoaXMuX2xvb2t1cEJ5SWQuZGVsZXRlKGluZGV4KTtcbiAgICB9XG4gIH1cblxuICBkZXNlcmlhbGl6ZShpZDogbnVtYmVyKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fbG9va3VwQnlJZC5oYXMoaWQpID8gdGhpcy5fbG9va3VwQnlJZC5nZXQoaWQpIDogbnVsbDtcbiAgfVxuXG4gIHNlcmlhbGl6ZShvYmo6IGFueSk6IG51bWJlcnxudWxsfHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIG9iaiA9PSBudWxsID8gbnVsbCA6IHRoaXMuX2xvb2t1cEJ5T2JqZWN0LmdldChvYmopO1xuICB9XG59XG4iXX0=