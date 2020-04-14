/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
    RenderStore.ɵfac = function RenderStore_Factory(t) { return new (t || RenderStore)(); };
    RenderStore.ɵprov = i0.ɵɵdefineInjectable({ token: RenderStore, factory: RenderStore.ɵfac });
    return RenderStore;
}());
export { RenderStore };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(RenderStore, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyX3N0b3JlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvcmVuZGVyX3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBRXpDO0lBQUE7UUFFVSxlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsZ0JBQVcsR0FBRyxJQUFJLEdBQUcsRUFBZSxDQUFDO1FBQ3JDLG9CQUFlLEdBQUcsSUFBSSxHQUFHLEVBQWUsQ0FBQztLQTJCbEQ7SUF6QkMsZ0NBQVUsR0FBVjtRQUNFLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCwyQkFBSyxHQUFMLFVBQU0sR0FBUSxFQUFFLEVBQVU7UUFDeEIsSUFBSSxFQUFFLElBQUksSUFBSTtZQUFFLE9BQU87UUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsNEJBQU0sR0FBTixVQUFPLEdBQVE7UUFDYixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QyxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDakIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDaEM7SUFDSCxDQUFDO0lBRUQsaUNBQVcsR0FBWCxVQUFZLEVBQVU7UUFDcEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNwRSxDQUFDO0lBRUQsK0JBQVMsR0FBVCxVQUFVLEdBQVE7UUFDaEIsT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVELENBQUM7MEVBN0JVLFdBQVc7dURBQVgsV0FBVyxXQUFYLFdBQVc7c0JBWHhCO0NBeUNDLEFBL0JELElBK0JDO1NBOUJZLFdBQVc7a0RBQVgsV0FBVztjQUR2QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVuZGVyU3RvcmUge1xuICBwcml2YXRlIF9uZXh0SW5kZXggPSAwO1xuICBwcml2YXRlIF9sb29rdXBCeUlkID0gbmV3IE1hcDxudW1iZXIsIGFueT4oKTtcbiAgcHJpdmF0ZSBfbG9va3VwQnlPYmplY3QgPSBuZXcgTWFwPGFueSwgbnVtYmVyPigpO1xuXG4gIGFsbG9jYXRlSWQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmV4dEluZGV4Kys7XG4gIH1cblxuICBzdG9yZShvYmo6IGFueSwgaWQ6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZCA9PSBudWxsKSByZXR1cm47XG4gICAgdGhpcy5fbG9va3VwQnlJZC5zZXQoaWQsIG9iaik7XG4gICAgdGhpcy5fbG9va3VwQnlPYmplY3Quc2V0KG9iaiwgaWQpO1xuICB9XG5cbiAgcmVtb3ZlKG9iajogYW55KTogdm9pZCB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9sb29rdXBCeU9iamVjdC5nZXQob2JqKTtcbiAgICBpZiAoaW5kZXggIT0gbnVsbCkge1xuICAgICAgdGhpcy5fbG9va3VwQnlPYmplY3QuZGVsZXRlKG9iaik7XG4gICAgICB0aGlzLl9sb29rdXBCeUlkLmRlbGV0ZShpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgZGVzZXJpYWxpemUoaWQ6IG51bWJlcik6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2xvb2t1cEJ5SWQuaGFzKGlkKSA/IHRoaXMuX2xvb2t1cEJ5SWQuZ2V0KGlkKSA6IG51bGw7XG4gIH1cblxuICBzZXJpYWxpemUob2JqOiBhbnkpOiBudW1iZXJ8bnVsbHx1bmRlZmluZWQge1xuICAgIHJldHVybiBvYmogPT0gbnVsbCA/IG51bGwgOiB0aGlzLl9sb29rdXBCeU9iamVjdC5nZXQob2JqKTtcbiAgfVxufVxuIl19