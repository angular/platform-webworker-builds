/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
var RenderStore = /** @class */ (function () {
    function RenderStore() {
        this._nextIndex = 0;
        this._lookupById = new Map();
        this._lookupByObject = new Map();
    }
    RenderStore.prototype.allocateId = function () {
        return this._nextIndex++;
    };
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
    RenderStore = __decorate([
        Injectable()
    ], RenderStore);
    return RenderStore;
}());
export { RenderStore };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyX3N0b3JlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvcmVuZGVyX3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBR3pDO0lBQUE7UUFDVSxlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsZ0JBQVcsR0FBRyxJQUFJLEdBQUcsRUFBZSxDQUFDO1FBQ3JDLG9CQUFlLEdBQUcsSUFBSSxHQUFHLEVBQWUsQ0FBQztJQTJCbkQsQ0FBQztJQXpCQyxnQ0FBVSxHQUFWO1FBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELDJCQUFLLEdBQUwsVUFBTSxHQUFRLEVBQUUsRUFBVTtRQUN4QixJQUFJLEVBQUUsSUFBSSxJQUFJO1lBQUUsT0FBTztRQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCw0QkFBTSxHQUFOLFVBQU8sR0FBUTtRQUNiLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtZQUNqQixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoQztJQUNILENBQUM7SUFFRCxpQ0FBVyxHQUFYLFVBQVksRUFBVTtRQUNwQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3BFLENBQUM7SUFFRCwrQkFBUyxHQUFULFVBQVUsR0FBUTtRQUNoQixPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQTdCVSxXQUFXO1FBRHZCLFVBQVUsRUFBRTtPQUNBLFdBQVcsQ0E4QnZCO0lBQUQsa0JBQUM7Q0FBQSxBQTlCRCxJQThCQztTQTlCWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVuZGVyU3RvcmUge1xuICBwcml2YXRlIF9uZXh0SW5kZXggPSAwO1xuICBwcml2YXRlIF9sb29rdXBCeUlkID0gbmV3IE1hcDxudW1iZXIsIGFueT4oKTtcbiAgcHJpdmF0ZSBfbG9va3VwQnlPYmplY3QgPSBuZXcgTWFwPGFueSwgbnVtYmVyPigpO1xuXG4gIGFsbG9jYXRlSWQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmV4dEluZGV4Kys7XG4gIH1cblxuICBzdG9yZShvYmo6IGFueSwgaWQ6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZCA9PSBudWxsKSByZXR1cm47XG4gICAgdGhpcy5fbG9va3VwQnlJZC5zZXQoaWQsIG9iaik7XG4gICAgdGhpcy5fbG9va3VwQnlPYmplY3Quc2V0KG9iaiwgaWQpO1xuICB9XG5cbiAgcmVtb3ZlKG9iajogYW55KTogdm9pZCB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9sb29rdXBCeU9iamVjdC5nZXQob2JqKTtcbiAgICBpZiAoaW5kZXggIT0gbnVsbCkge1xuICAgICAgdGhpcy5fbG9va3VwQnlPYmplY3QuZGVsZXRlKG9iaik7XG4gICAgICB0aGlzLl9sb29rdXBCeUlkLmRlbGV0ZShpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgZGVzZXJpYWxpemUoaWQ6IG51bWJlcik6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2xvb2t1cEJ5SWQuaGFzKGlkKSA/IHRoaXMuX2xvb2t1cEJ5SWQuZ2V0KGlkKSA6IG51bGw7XG4gIH1cblxuICBzZXJpYWxpemUob2JqOiBhbnkpOiBudW1iZXJ8bnVsbHx1bmRlZmluZWQge1xuICAgIHJldHVybiBvYmogPT0gbnVsbCA/IG51bGwgOiB0aGlzLl9sb29rdXBCeU9iamVjdC5nZXQob2JqKTtcbiAgfVxufVxuIl19