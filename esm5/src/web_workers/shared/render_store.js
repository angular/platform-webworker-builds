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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyX3N0b3JlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvcmVuZGVyX3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7MEJBSWxCLENBQUM7MkJBQ0EsSUFBSSxHQUFHLEVBQWU7K0JBQ2xCLElBQUksR0FBRyxFQUFlOztJQUVoRCxnQ0FBVSxHQUFWLGNBQXVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRTtJQUVsRCwyQkFBSyxHQUFMLFVBQU0sR0FBUSxFQUFFLEVBQVU7UUFDeEIsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ25DO0lBRUQsNEJBQU0sR0FBTixVQUFPLEdBQVE7UUFDYixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoQztLQUNGO0lBRUQsaUNBQVcsR0FBWCxVQUFZLEVBQVU7UUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0tBQ25FO0lBRUQsK0JBQVMsR0FBVCxVQUFVLEdBQVE7UUFDaEIsTUFBTSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDM0Q7O2dCQTVCRixVQUFVOztzQkFWWDs7U0FXYSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVuZGVyU3RvcmUge1xuICBwcml2YXRlIF9uZXh0SW5kZXggPSAwO1xuICBwcml2YXRlIF9sb29rdXBCeUlkID0gbmV3IE1hcDxudW1iZXIsIGFueT4oKTtcbiAgcHJpdmF0ZSBfbG9va3VwQnlPYmplY3QgPSBuZXcgTWFwPGFueSwgbnVtYmVyPigpO1xuXG4gIGFsbG9jYXRlSWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX25leHRJbmRleCsrOyB9XG5cbiAgc3RvcmUob2JqOiBhbnksIGlkOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaWQgPT0gbnVsbCkgcmV0dXJuO1xuICAgIHRoaXMuX2xvb2t1cEJ5SWQuc2V0KGlkLCBvYmopO1xuICAgIHRoaXMuX2xvb2t1cEJ5T2JqZWN0LnNldChvYmosIGlkKTtcbiAgfVxuXG4gIHJlbW92ZShvYmo6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fbG9va3VwQnlPYmplY3QuZ2V0KG9iaik7XG4gICAgaWYgKGluZGV4ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2xvb2t1cEJ5T2JqZWN0LmRlbGV0ZShvYmopO1xuICAgICAgdGhpcy5fbG9va3VwQnlJZC5kZWxldGUoaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIGRlc2VyaWFsaXplKGlkOiBudW1iZXIpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9sb29rdXBCeUlkLmhhcyhpZCkgPyB0aGlzLl9sb29rdXBCeUlkLmdldChpZCkgOiBudWxsO1xuICB9XG5cbiAgc2VyaWFsaXplKG9iajogYW55KTogbnVtYmVyfG51bGx8dW5kZWZpbmVkIHtcbiAgICByZXR1cm4gb2JqID09IG51bGwgPyBudWxsIDogdGhpcy5fbG9va3VwQnlPYmplY3QuZ2V0KG9iaik7XG4gIH1cbn1cbiJdfQ==