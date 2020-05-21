/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let RenderStore = /** @class */ (() => {
    let RenderStore = class RenderStore {
        constructor() {
            this._nextIndex = 0;
            this._lookupById = new Map();
            this._lookupByObject = new Map();
        }
        allocateId() {
            return this._nextIndex++;
        }
        store(obj, id) {
            if (id == null)
                return;
            this._lookupById.set(id, obj);
            this._lookupByObject.set(obj, id);
        }
        remove(obj) {
            const index = this._lookupByObject.get(obj);
            if (index != null) {
                this._lookupByObject.delete(obj);
                this._lookupById.delete(index);
            }
        }
        deserialize(id) {
            return this._lookupById.has(id) ? this._lookupById.get(id) : null;
        }
        serialize(obj) {
            return obj == null ? null : this._lookupByObject.get(obj);
        }
    };
    RenderStore = __decorate([
        Injectable()
    ], RenderStore);
    return RenderStore;
})();
export { RenderStore };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyX3N0b3JlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvcmVuZGVyX3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBR3pDO0lBQUEsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztRQUF4QjtZQUNVLGVBQVUsR0FBRyxDQUFDLENBQUM7WUFDZixnQkFBVyxHQUFHLElBQUksR0FBRyxFQUFlLENBQUM7WUFDckMsb0JBQWUsR0FBRyxJQUFJLEdBQUcsRUFBZSxDQUFDO1FBMkJuRCxDQUFDO1FBekJDLFVBQVU7WUFDUixPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMzQixDQUFDO1FBRUQsS0FBSyxDQUFDLEdBQVEsRUFBRSxFQUFVO1lBQ3hCLElBQUksRUFBRSxJQUFJLElBQUk7Z0JBQUUsT0FBTztZQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFFRCxNQUFNLENBQUMsR0FBUTtZQUNiLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtnQkFDakIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2hDO1FBQ0gsQ0FBQztRQUVELFdBQVcsQ0FBQyxFQUFVO1lBQ3BCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDcEUsQ0FBQztRQUVELFNBQVMsQ0FBQyxHQUFRO1lBQ2hCLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1RCxDQUFDO0tBQ0YsQ0FBQTtJQTlCWSxXQUFXO1FBRHZCLFVBQVUsRUFBRTtPQUNBLFdBQVcsQ0E4QnZCO0lBQUQsa0JBQUM7S0FBQTtTQTlCWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVuZGVyU3RvcmUge1xuICBwcml2YXRlIF9uZXh0SW5kZXggPSAwO1xuICBwcml2YXRlIF9sb29rdXBCeUlkID0gbmV3IE1hcDxudW1iZXIsIGFueT4oKTtcbiAgcHJpdmF0ZSBfbG9va3VwQnlPYmplY3QgPSBuZXcgTWFwPGFueSwgbnVtYmVyPigpO1xuXG4gIGFsbG9jYXRlSWQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmV4dEluZGV4Kys7XG4gIH1cblxuICBzdG9yZShvYmo6IGFueSwgaWQ6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZCA9PSBudWxsKSByZXR1cm47XG4gICAgdGhpcy5fbG9va3VwQnlJZC5zZXQoaWQsIG9iaik7XG4gICAgdGhpcy5fbG9va3VwQnlPYmplY3Quc2V0KG9iaiwgaWQpO1xuICB9XG5cbiAgcmVtb3ZlKG9iajogYW55KTogdm9pZCB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9sb29rdXBCeU9iamVjdC5nZXQob2JqKTtcbiAgICBpZiAoaW5kZXggIT0gbnVsbCkge1xuICAgICAgdGhpcy5fbG9va3VwQnlPYmplY3QuZGVsZXRlKG9iaik7XG4gICAgICB0aGlzLl9sb29rdXBCeUlkLmRlbGV0ZShpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgZGVzZXJpYWxpemUoaWQ6IG51bWJlcik6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2xvb2t1cEJ5SWQuaGFzKGlkKSA/IHRoaXMuX2xvb2t1cEJ5SWQuZ2V0KGlkKSA6IG51bGw7XG4gIH1cblxuICBzZXJpYWxpemUob2JqOiBhbnkpOiBudW1iZXJ8bnVsbHx1bmRlZmluZWQge1xuICAgIHJldHVybiBvYmogPT0gbnVsbCA/IG51bGwgOiB0aGlzLl9sb29rdXBCeU9iamVjdC5nZXQob2JqKTtcbiAgfVxufVxuIl19