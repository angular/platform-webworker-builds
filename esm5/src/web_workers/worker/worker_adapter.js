/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __extends } from "tslib";
import { ɵDomAdapter as DomAdapter, ɵsetRootDomAdapter as setRootDomAdapter } from '@angular/common';
/**
 * This adapter is required to log error messages.
 *
 * Note: other methods all throw as the DOM is not accessible directly in web worker context.
 */
var WorkerDomAdapter = /** @class */ (function (_super) {
    __extends(WorkerDomAdapter, _super);
    function WorkerDomAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WorkerDomAdapter.makeCurrent = function () {
        setRootDomAdapter(new WorkerDomAdapter());
    };
    WorkerDomAdapter.prototype.log = function (error) {
        // tslint:disable-next-line:no-console
        console.log(error);
    };
    WorkerDomAdapter.prototype.logGroup = function (error) {
        if (console.group) {
            console.group(error);
            if (console.error) {
                console.error(error);
            }
            else {
                // tslint:disable-next-line:no-console
                console.log(error);
            }
        }
        else {
            // tslint:disable-next-line:no-console
            console.log(error);
        }
    };
    WorkerDomAdapter.prototype.logGroupEnd = function () {
        if (console.groupEnd) {
            console.groupEnd();
        }
    };
    WorkerDomAdapter.prototype.getProperty = function (el, name) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.onAndCancel = function (el, evt, listener) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.dispatchEvent = function (el, evt) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.remove = function (el) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.createElement = function (tagName, doc) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.createHtmlDocument = function () {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.getDefaultDocument = function () {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.isElementNode = function (node) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.isShadowRoot = function (node) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.supportsDOMEvents = function () {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.getGlobalEventTarget = function (doc, target) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.getHistory = function () {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.getLocation = function () {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.getBaseHref = function (doc) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.resetBaseElement = function () {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.getUserAgent = function () {
        return 'Fake user agent';
    };
    WorkerDomAdapter.prototype.performanceNow = function () {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.supportsCookies = function () {
        return false;
    };
    WorkerDomAdapter.prototype.getCookie = function (name) {
        throw 'not implemented';
    };
    return WorkerDomAdapter;
}(DomAdapter));
export { WorkerDomAdapter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci93b3JrZXJfYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLFdBQVcsSUFBSSxVQUFVLEVBQUUsa0JBQWtCLElBQUksaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUVuRzs7OztHQUlHO0FBQ0g7SUFBc0Msb0NBQVU7SUFBaEQ7O0lBMEZBLENBQUM7SUF6RlEsNEJBQVcsR0FBbEI7UUFDRSxpQkFBaUIsQ0FBQyxJQUFJLGdCQUFnQixFQUFFLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsOEJBQUcsR0FBSCxVQUFJLEtBQVU7UUFDWixzQ0FBc0M7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsbUNBQVEsR0FBUixVQUFTLEtBQVU7UUFDakIsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3RCO2lCQUFNO2dCQUNMLHNDQUFzQztnQkFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNwQjtTQUNGO2FBQU07WUFDTCxzQ0FBc0M7WUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQjtJQUNILENBQUM7SUFFRCxzQ0FBVyxHQUFYO1FBQ0UsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQ3BCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNwQjtJQUNILENBQUM7SUFFRCxzQ0FBVyxHQUFYLFVBQVksRUFBVyxFQUFFLElBQVk7UUFDbkMsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBRUQsc0NBQVcsR0FBWCxVQUFZLEVBQU8sRUFBRSxHQUFRLEVBQUUsUUFBYTtRQUMxQyxNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7SUFDRCx3Q0FBYSxHQUFiLFVBQWMsRUFBTyxFQUFFLEdBQVE7UUFDN0IsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBQ0QsaUNBQU0sR0FBTixVQUFPLEVBQU87UUFDWixNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7SUFDRCx3Q0FBYSxHQUFiLFVBQWMsT0FBWSxFQUFFLEdBQVM7UUFDbkMsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBQ0QsNkNBQWtCLEdBQWxCO1FBQ0UsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBQ0QsNkNBQWtCLEdBQWxCO1FBQ0UsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBQ0Qsd0NBQWEsR0FBYixVQUFjLElBQVM7UUFDckIsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBQ0QsdUNBQVksR0FBWixVQUFhLElBQVM7UUFDcEIsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBQ0QsNENBQWlCLEdBQWpCO1FBQ0UsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBQ0QsK0NBQW9CLEdBQXBCLFVBQXFCLEdBQWEsRUFBRSxNQUFjO1FBQ2hELE1BQU0saUJBQWlCLENBQUM7SUFDMUIsQ0FBQztJQUNELHFDQUFVLEdBQVY7UUFDRSxNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7SUFDRCxzQ0FBVyxHQUFYO1FBQ0UsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBQ0Qsc0NBQVcsR0FBWCxVQUFZLEdBQWE7UUFDdkIsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBQ0QsMkNBQWdCLEdBQWhCO1FBQ0UsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBQ0QsdUNBQVksR0FBWjtRQUNFLE9BQU8saUJBQWlCLENBQUM7SUFDM0IsQ0FBQztJQUNELHlDQUFjLEdBQWQ7UUFDRSxNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7SUFFRCwwQ0FBZSxHQUFmO1FBQ0UsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ0Qsb0NBQVMsR0FBVCxVQUFVLElBQVk7UUFDcEIsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBMUZELENBQXNDLFVBQVUsR0EwRi9DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge8m1RG9tQWRhcHRlciBhcyBEb21BZGFwdGVyLCDJtXNldFJvb3REb21BZGFwdGVyIGFzIHNldFJvb3REb21BZGFwdGVyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG4vKipcbiAqIFRoaXMgYWRhcHRlciBpcyByZXF1aXJlZCB0byBsb2cgZXJyb3IgbWVzc2FnZXMuXG4gKlxuICogTm90ZTogb3RoZXIgbWV0aG9kcyBhbGwgdGhyb3cgYXMgdGhlIERPTSBpcyBub3QgYWNjZXNzaWJsZSBkaXJlY3RseSBpbiB3ZWIgd29ya2VyIGNvbnRleHQuXG4gKi9cbmV4cG9ydCBjbGFzcyBXb3JrZXJEb21BZGFwdGVyIGV4dGVuZHMgRG9tQWRhcHRlciB7XG4gIHN0YXRpYyBtYWtlQ3VycmVudCgpIHtcbiAgICBzZXRSb290RG9tQWRhcHRlcihuZXcgV29ya2VyRG9tQWRhcHRlcigpKTtcbiAgfVxuXG4gIGxvZyhlcnJvcjogYW55KSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH1cblxuICBsb2dHcm91cChlcnJvcjogYW55KSB7XG4gICAgaWYgKGNvbnNvbGUuZ3JvdXApIHtcbiAgICAgIGNvbnNvbGUuZ3JvdXAoZXJyb3IpO1xuICAgICAgaWYgKGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgbG9nR3JvdXBFbmQoKSB7XG4gICAgaWYgKGNvbnNvbGUuZ3JvdXBFbmQpIHtcbiAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgICB9XG4gIH1cblxuICBnZXRQcm9wZXJ0eShlbDogRWxlbWVudCwgbmFtZTogc3RyaW5nKTogYW55IHtcbiAgICB0aHJvdyAnbm90IGltcGxlbWVudGVkJztcbiAgfVxuXG4gIG9uQW5kQ2FuY2VsKGVsOiBhbnksIGV2dDogYW55LCBsaXN0ZW5lcjogYW55KTogRnVuY3Rpb24ge1xuICAgIHRocm93ICdub3QgaW1wbGVtZW50ZWQnO1xuICB9XG4gIGRpc3BhdGNoRXZlbnQoZWw6IGFueSwgZXZ0OiBhbnkpIHtcbiAgICB0aHJvdyAnbm90IGltcGxlbWVudGVkJztcbiAgfVxuICByZW1vdmUoZWw6IGFueSk6IE5vZGUge1xuICAgIHRocm93ICdub3QgaW1wbGVtZW50ZWQnO1xuICB9XG4gIGNyZWF0ZUVsZW1lbnQodGFnTmFtZTogYW55LCBkb2M/OiBhbnkpOiBIVE1MRWxlbWVudCB7XG4gICAgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7XG4gIH1cbiAgY3JlYXRlSHRtbERvY3VtZW50KCk6IEhUTUxEb2N1bWVudCB7XG4gICAgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7XG4gIH1cbiAgZ2V0RGVmYXVsdERvY3VtZW50KCk6IERvY3VtZW50IHtcbiAgICB0aHJvdyAnbm90IGltcGxlbWVudGVkJztcbiAgfVxuICBpc0VsZW1lbnROb2RlKG5vZGU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHRocm93ICdub3QgaW1wbGVtZW50ZWQnO1xuICB9XG4gIGlzU2hhZG93Um9vdChub2RlOiBhbnkpOiBib29sZWFuIHtcbiAgICB0aHJvdyAnbm90IGltcGxlbWVudGVkJztcbiAgfVxuICBzdXBwb3J0c0RPTUV2ZW50cygpOiBib29sZWFuIHtcbiAgICB0aHJvdyAnbm90IGltcGxlbWVudGVkJztcbiAgfVxuICBnZXRHbG9iYWxFdmVudFRhcmdldChkb2M6IERvY3VtZW50LCB0YXJnZXQ6IHN0cmluZyk6IGFueSB7XG4gICAgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7XG4gIH1cbiAgZ2V0SGlzdG9yeSgpOiBIaXN0b3J5IHtcbiAgICB0aHJvdyAnbm90IGltcGxlbWVudGVkJztcbiAgfVxuICBnZXRMb2NhdGlvbigpOiBMb2NhdGlvbiB7XG4gICAgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7XG4gIH1cbiAgZ2V0QmFzZUhyZWYoZG9jOiBEb2N1bWVudCk6IHN0cmluZyB7XG4gICAgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7XG4gIH1cbiAgcmVzZXRCYXNlRWxlbWVudCgpOiB2b2lkIHtcbiAgICB0aHJvdyAnbm90IGltcGxlbWVudGVkJztcbiAgfVxuICBnZXRVc2VyQWdlbnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ0Zha2UgdXNlciBhZ2VudCc7XG4gIH1cbiAgcGVyZm9ybWFuY2VOb3coKTogbnVtYmVyIHtcbiAgICB0aHJvdyAnbm90IGltcGxlbWVudGVkJztcbiAgfVxuXG4gIHN1cHBvcnRzQ29va2llcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZ2V0Q29va2llKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7XG4gIH1cbn1cbiJdfQ==