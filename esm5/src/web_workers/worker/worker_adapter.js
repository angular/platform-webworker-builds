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
    WorkerDomAdapter.makeCurrent = function () { setRootDomAdapter(new WorkerDomAdapter()); };
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
    WorkerDomAdapter.prototype.getProperty = function (el, name) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.onAndCancel = function (el, evt, listener) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.dispatchEvent = function (el, evt) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.remove = function (el) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.createElement = function (tagName, doc) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.createHtmlDocument = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getDefaultDocument = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.isElementNode = function (node) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.isShadowRoot = function (node) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.supportsDOMEvents = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getGlobalEventTarget = function (doc, target) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getHistory = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getLocation = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getBaseHref = function (doc) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.resetBaseElement = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getUserAgent = function () { return 'Fake user agent'; };
    WorkerDomAdapter.prototype.performanceNow = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.supportsCookies = function () { return false; };
    WorkerDomAdapter.prototype.getCookie = function (name) { throw 'not implemented'; };
    return WorkerDomAdapter;
}(DomAdapter));
export { WorkerDomAdapter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci93b3JrZXJfYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLFdBQVcsSUFBSSxVQUFVLEVBQUUsa0JBQWtCLElBQUksaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUVuRzs7OztHQUlHO0FBQ0g7SUFBc0Msb0NBQVU7SUFBaEQ7O0lBa0RBLENBQUM7SUFqRFEsNEJBQVcsR0FBbEIsY0FBdUIsaUJBQWlCLENBQUMsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRW5FLDhCQUFHLEdBQUgsVUFBSSxLQUFVO1FBQ1osc0NBQXNDO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELG1DQUFRLEdBQVIsVUFBUyxLQUFVO1FBQ2pCLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtZQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0QjtpQkFBTTtnQkFDTCxzQ0FBc0M7Z0JBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDcEI7U0FDRjthQUFNO1lBQ0wsc0NBQXNDO1lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEI7SUFDSCxDQUFDO0lBRUQsc0NBQVcsR0FBWDtRQUNFLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUNwQixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDcEI7SUFDSCxDQUFDO0lBRUQsc0NBQVcsR0FBWCxVQUFZLEVBQVcsRUFBRSxJQUFZLElBQVMsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFFeEUsc0NBQVcsR0FBWCxVQUFZLEVBQU8sRUFBRSxHQUFRLEVBQUUsUUFBYSxJQUFjLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ3BGLHdDQUFhLEdBQWIsVUFBYyxFQUFPLEVBQUUsR0FBUSxJQUFJLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQzdELGlDQUFNLEdBQU4sVUFBTyxFQUFPLElBQVUsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDbEQsd0NBQWEsR0FBYixVQUFjLE9BQVksRUFBRSxHQUFTLElBQWlCLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ2hGLDZDQUFrQixHQUFsQixjQUFxQyxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUMvRCw2Q0FBa0IsR0FBbEIsY0FBaUMsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDM0Qsd0NBQWEsR0FBYixVQUFjLElBQVMsSUFBYSxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUM5RCx1Q0FBWSxHQUFaLFVBQWEsSUFBUyxJQUFhLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQzdELDRDQUFpQixHQUFqQixjQUErQixNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUN6RCwrQ0FBb0IsR0FBcEIsVUFBcUIsR0FBYSxFQUFFLE1BQWMsSUFBUyxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUNyRixxQ0FBVSxHQUFWLGNBQXdCLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ2xELHNDQUFXLEdBQVgsY0FBMEIsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDcEQsc0NBQVcsR0FBWCxVQUFZLEdBQWEsSUFBWSxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUMvRCwyQ0FBZ0IsR0FBaEIsY0FBMkIsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDckQsdUNBQVksR0FBWixjQUF5QixPQUFPLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUNwRCx5Q0FBYyxHQUFkLGNBQTJCLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBRXJELDBDQUFlLEdBQWYsY0FBNkIsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzVDLG9DQUFTLEdBQVQsVUFBVSxJQUFZLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDOUQsdUJBQUM7QUFBRCxDQUFDLEFBbERELENBQXNDLFVBQVUsR0FrRC9DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge8m1RG9tQWRhcHRlciBhcyBEb21BZGFwdGVyLCDJtXNldFJvb3REb21BZGFwdGVyIGFzIHNldFJvb3REb21BZGFwdGVyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG4vKipcbiAqIFRoaXMgYWRhcHRlciBpcyByZXF1aXJlZCB0byBsb2cgZXJyb3IgbWVzc2FnZXMuXG4gKlxuICogTm90ZTogb3RoZXIgbWV0aG9kcyBhbGwgdGhyb3cgYXMgdGhlIERPTSBpcyBub3QgYWNjZXNzaWJsZSBkaXJlY3RseSBpbiB3ZWIgd29ya2VyIGNvbnRleHQuXG4gKi9cbmV4cG9ydCBjbGFzcyBXb3JrZXJEb21BZGFwdGVyIGV4dGVuZHMgRG9tQWRhcHRlciB7XG4gIHN0YXRpYyBtYWtlQ3VycmVudCgpIHsgc2V0Um9vdERvbUFkYXB0ZXIobmV3IFdvcmtlckRvbUFkYXB0ZXIoKSk7IH1cblxuICBsb2coZXJyb3I6IGFueSkge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICB9XG5cbiAgbG9nR3JvdXAoZXJyb3I6IGFueSkge1xuICAgIGlmIChjb25zb2xlLmdyb3VwKSB7XG4gICAgICBjb25zb2xlLmdyb3VwKGVycm9yKTtcbiAgICAgIGlmIChjb25zb2xlLmVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGxvZ0dyb3VwRW5kKCkge1xuICAgIGlmIChjb25zb2xlLmdyb3VwRW5kKSB7XG4gICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0UHJvcGVydHkoZWw6IEVsZW1lbnQsIG5hbWU6IHN0cmluZyk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG5cbiAgb25BbmRDYW5jZWwoZWw6IGFueSwgZXZ0OiBhbnksIGxpc3RlbmVyOiBhbnkpOiBGdW5jdGlvbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGRpc3BhdGNoRXZlbnQoZWw6IGFueSwgZXZ0OiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcmVtb3ZlKGVsOiBhbnkpOiBOb2RlIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY3JlYXRlRWxlbWVudCh0YWdOYW1lOiBhbnksIGRvYz86IGFueSk6IEhUTUxFbGVtZW50IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY3JlYXRlSHRtbERvY3VtZW50KCk6IEhUTUxEb2N1bWVudCB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldERlZmF1bHREb2N1bWVudCgpOiBEb2N1bWVudCB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGlzRWxlbWVudE5vZGUobm9kZTogYW55KTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGlzU2hhZG93Um9vdChub2RlOiBhbnkpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc3VwcG9ydHNET01FdmVudHMoKTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEdsb2JhbEV2ZW50VGFyZ2V0KGRvYzogRG9jdW1lbnQsIHRhcmdldDogc3RyaW5nKTogYW55IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0SGlzdG9yeSgpOiBIaXN0b3J5IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0TG9jYXRpb24oKTogTG9jYXRpb24geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRCYXNlSHJlZihkb2M6IERvY3VtZW50KTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcmVzZXRCYXNlRWxlbWVudCgpOiB2b2lkIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0VXNlckFnZW50KCk6IHN0cmluZyB7IHJldHVybiAnRmFrZSB1c2VyIGFnZW50JzsgfVxuICBwZXJmb3JtYW5jZU5vdygpOiBudW1iZXIgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuXG4gIHN1cHBvcnRzQ29va2llcygpOiBib29sZWFuIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGdldENvb2tpZShuYW1lOiBzdHJpbmcpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxufVxuIl19