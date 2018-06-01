/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
var RenderStore = /** @class */ (function () {
    function RenderStore() {
        this._nextIndex = 0;
        this._lookupById = new Map();
        this._lookupByObject = new Map();
    }
    RenderStore.prototype.allocateId = function () { return this._nextIndex++; };
    RenderStore.prototype.store = function (obj, id) {
        if (id == null)
            return;
        this._lookupById.set(id, obj);
        this._lookupByObject.set(obj, id);
    };
    RenderStore.prototype.remove = function (obj) {
        var index = this._lookupByObject.get(obj);
        if (index != null) {
            this._lookupByObject.delete(obj);
            this._lookupById.delete(index);
        }
    };
    RenderStore.prototype.deserialize = function (id) {
        return this._lookupById.has(id) ? this._lookupById.get(id) : null;
    };
    RenderStore.prototype.serialize = function (obj) {
        return obj == null ? null : this._lookupByObject.get(obj);
    };
    RenderStore.decorators = [
        { type: Injectable }
    ];
    return RenderStore;
}());
export { RenderStore };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyX3N0b3JlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvcmVuZGVyX3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFekM7SUFBQTtRQUVVLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixnQkFBVyxHQUFHLElBQUksR0FBRyxFQUFlLENBQUM7UUFDckMsb0JBQWUsR0FBRyxJQUFJLEdBQUcsRUFBZSxDQUFDO0lBeUJuRCxDQUFDO0lBdkJDLGdDQUFVLEdBQVYsY0FBdUIsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRWxELDJCQUFLLEdBQUwsVUFBTSxHQUFRLEVBQUUsRUFBVTtRQUN4QixJQUFJLEVBQUUsSUFBSSxJQUFJO1lBQUUsT0FBTztRQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCw0QkFBTSxHQUFOLFVBQU8sR0FBUTtRQUNiLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtZQUNqQixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoQztJQUNILENBQUM7SUFFRCxpQ0FBVyxHQUFYLFVBQVksRUFBVTtRQUNwQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3BFLENBQUM7SUFFRCwrQkFBUyxHQUFULFVBQVUsR0FBUTtRQUNoQixPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUQsQ0FBQzs7Z0JBNUJGLFVBQVU7O0lBNkJYLGtCQUFDO0NBQUEsQUE3QkQsSUE2QkM7U0E1QlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlbmRlclN0b3JlIHtcbiAgcHJpdmF0ZSBfbmV4dEluZGV4ID0gMDtcbiAgcHJpdmF0ZSBfbG9va3VwQnlJZCA9IG5ldyBNYXA8bnVtYmVyLCBhbnk+KCk7XG4gIHByaXZhdGUgX2xvb2t1cEJ5T2JqZWN0ID0gbmV3IE1hcDxhbnksIG51bWJlcj4oKTtcblxuICBhbGxvY2F0ZUlkKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9uZXh0SW5kZXgrKzsgfVxuXG4gIHN0b3JlKG9iajogYW55LCBpZDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlkID09IG51bGwpIHJldHVybjtcbiAgICB0aGlzLl9sb29rdXBCeUlkLnNldChpZCwgb2JqKTtcbiAgICB0aGlzLl9sb29rdXBCeU9iamVjdC5zZXQob2JqLCBpZCk7XG4gIH1cblxuICByZW1vdmUob2JqOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX2xvb2t1cEJ5T2JqZWN0LmdldChvYmopO1xuICAgIGlmIChpbmRleCAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9sb29rdXBCeU9iamVjdC5kZWxldGUob2JqKTtcbiAgICAgIHRoaXMuX2xvb2t1cEJ5SWQuZGVsZXRlKGluZGV4KTtcbiAgICB9XG4gIH1cblxuICBkZXNlcmlhbGl6ZShpZDogbnVtYmVyKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fbG9va3VwQnlJZC5oYXMoaWQpID8gdGhpcy5fbG9va3VwQnlJZC5nZXQoaWQpIDogbnVsbDtcbiAgfVxuXG4gIHNlcmlhbGl6ZShvYmo6IGFueSk6IG51bWJlcnxudWxsfHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIG9iaiA9PSBudWxsID8gbnVsbCA6IHRoaXMuX2xvb2t1cEJ5T2JqZWN0LmdldChvYmopO1xuICB9XG59XG4iXX0=