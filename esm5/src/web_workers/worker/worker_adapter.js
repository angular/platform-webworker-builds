/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { ɵDomAdapter as DomAdapter, ɵsetRootDomAdapter as setRootDomAdapter } from '@angular/platform-browser';
/**
 * This adapter is required to log error messages.
 *
 * Note: other methods all throw as the DOM is not accessible directly in web worker context.
 */
var WorkerDomAdapter = /** @class */ (function (_super) {
    tslib_1.__extends(WorkerDomAdapter, _super);
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
    WorkerDomAdapter.prototype.setProperty = function (el, name, value) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getProperty = function (el, name) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.querySelector = function (el, selector) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.querySelectorAll = function (el, selector) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.onAndCancel = function (el, evt, listener) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.dispatchEvent = function (el, evt) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.nextSibling = function (el) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.parentElement = function (el) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.clearNodes = function (el) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.appendChild = function (el, node) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.removeChild = function (el, node) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.remove = function (el) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.insertBefore = function (parent, el, node) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.setText = function (el, value) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.createComment = function (text) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.createElement = function (tagName, doc) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.createElementNS = function (ns, tagName, doc) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.createTextNode = function (text, doc) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getHost = function (el) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getElementsByTagName = function (element, name) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.addClass = function (element, className) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.removeClass = function (element, className) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.setStyle = function (element, styleName, styleValue) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.removeStyle = function (element, styleName) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getStyle = function (element, styleName) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getAttribute = function (element, attribute) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.setAttribute = function (element, name, value) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.setAttributeNS = function (element, ns, name, value) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.removeAttribute = function (element, attribute) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.removeAttributeNS = function (element, ns, attribute) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.createHtmlDocument = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getDefaultDocument = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getTitle = function (doc) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.setTitle = function (doc, newTitle) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.elementMatches = function (n, selector) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.isElementNode = function (node) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.isShadowRoot = function (node) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getEventKey = function (event) { throw 'not implemented'; };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci93b3JrZXJfYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLFdBQVcsSUFBSSxVQUFVLEVBQUUsa0JBQWtCLElBQUksaUJBQWlCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUU3Rzs7OztHQUlHO0FBQ0g7SUFBc0MsNENBQVU7SUFBaEQ7O0lBK0VBLENBQUM7SUE5RVEsNEJBQVcsR0FBbEIsY0FBdUIsaUJBQWlCLENBQUMsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRW5FLDhCQUFHLEdBQUgsVUFBSSxLQUFVO1FBQ1osc0NBQXNDO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELG1DQUFRLEdBQVIsVUFBUyxLQUFVO1FBQ2pCLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtZQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0QjtpQkFBTTtnQkFDTCxzQ0FBc0M7Z0JBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDcEI7U0FDRjthQUFNO1lBQ0wsc0NBQXNDO1lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEI7SUFDSCxDQUFDO0lBRUQsc0NBQVcsR0FBWDtRQUNFLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUNwQixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7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YSxFQUFFLE1BQWMsSUFBUyxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUNyRixxQ0FBVSxHQUFWLGNBQXdCLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ2xELHNDQUFXLEdBQVgsY0FBMEIsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDcEQsc0NBQVcsR0FBWCxVQUFZLEdBQWEsSUFBWSxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUMvRCwyQ0FBZ0IsR0FBaEIsY0FBMkIsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDckQsdUNBQVksR0FBWixjQUF5QixPQUFPLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUNwRCx5Q0FBYyxHQUFkLGNBQTJCLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBRXJELDBDQUFlLEdBQWYsY0FBNkIsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzVDLG9DQUFTLEdBQVQsVUFBVSxJQUFZLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDOUQsdUJBQUM7QUFBRCxDQUFDLEFBL0VELENBQXNDLFVBQVUsR0ErRS9DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge8m1RG9tQWRhcHRlciBhcyBEb21BZGFwdGVyLCDJtXNldFJvb3REb21BZGFwdGVyIGFzIHNldFJvb3REb21BZGFwdGVyfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuLyoqXG4gKiBUaGlzIGFkYXB0ZXIgaXMgcmVxdWlyZWQgdG8gbG9nIGVycm9yIG1lc3NhZ2VzLlxuICpcbiAqIE5vdGU6IG90aGVyIG1ldGhvZHMgYWxsIHRocm93IGFzIHRoZSBET00gaXMgbm90IGFjY2Vzc2libGUgZGlyZWN0bHkgaW4gd2ViIHdvcmtlciBjb250ZXh0LlxuICovXG5leHBvcnQgY2xhc3MgV29ya2VyRG9tQWRhcHRlciBleHRlbmRzIERvbUFkYXB0ZXIge1xuICBzdGF0aWMgbWFrZUN1cnJlbnQoKSB7IHNldFJvb3REb21BZGFwdGVyKG5ldyBXb3JrZXJEb21BZGFwdGVyKCkpOyB9XG5cbiAgbG9nKGVycm9yOiBhbnkpIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfVxuXG4gIGxvZ0dyb3VwKGVycm9yOiBhbnkpIHtcbiAgICBpZiAoY29uc29sZS5ncm91cCkge1xuICAgICAgY29uc29sZS5ncm91cChlcnJvcik7XG4gICAgICBpZiAoY29uc29sZS5lcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBsb2dHcm91cEVuZCgpIHtcbiAgICBpZiAoY29uc29sZS5ncm91cEVuZCkge1xuICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xuICAgIH1cbiAgfVxuXG4gIHNldFByb3BlcnR5KGVsOiBFbGVtZW50LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0UHJvcGVydHkoZWw6IEVsZW1lbnQsIG5hbWU6IHN0cmluZyk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG5cbiAgcXVlcnlTZWxlY3RvcihlbDogYW55LCBzZWxlY3Rvcjogc3RyaW5nKTogSFRNTEVsZW1lbnQgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBxdWVyeVNlbGVjdG9yQWxsKGVsOiBhbnksIHNlbGVjdG9yOiBzdHJpbmcpOiBhbnlbXSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIG9uQW5kQ2FuY2VsKGVsOiBhbnksIGV2dDogYW55LCBsaXN0ZW5lcjogYW55KTogRnVuY3Rpb24geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBkaXNwYXRjaEV2ZW50KGVsOiBhbnksIGV2dDogYW55KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIG5leHRTaWJsaW5nKGVsOiBhbnkpOiBOb2RlIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcGFyZW50RWxlbWVudChlbDogYW55KTogTm9kZSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNsZWFyTm9kZXMoZWw6IGFueSkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBhcHBlbmRDaGlsZChlbDogYW55LCBub2RlOiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcmVtb3ZlQ2hpbGQoZWw6IGFueSwgbm9kZTogYW55KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHJlbW92ZShlbDogYW55KTogTm9kZSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGluc2VydEJlZm9yZShwYXJlbnQ6IGFueSwgZWw6IGFueSwgbm9kZTogYW55KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHNldFRleHQoZWw6IGFueSwgdmFsdWU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjcmVhdGVDb21tZW50KHRleHQ6IHN0cmluZyk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNyZWF0ZUVsZW1lbnQodGFnTmFtZTogYW55LCBkb2M/OiBhbnkpOiBIVE1MRWxlbWVudCB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNyZWF0ZUVsZW1lbnROUyhuczogc3RyaW5nLCB0YWdOYW1lOiBzdHJpbmcsIGRvYz86IGFueSk6IEVsZW1lbnQgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjcmVhdGVUZXh0Tm9kZSh0ZXh0OiBzdHJpbmcsIGRvYz86IGFueSk6IFRleHQgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRIb3N0KGVsOiBhbnkpOiBhbnkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRFbGVtZW50c0J5VGFnTmFtZShlbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZyk6IEhUTUxFbGVtZW50W10geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBhZGRDbGFzcyhlbGVtZW50OiBhbnksIGNsYXNzTmFtZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHJlbW92ZUNsYXNzKGVsZW1lbnQ6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc2V0U3R5bGUoZWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZywgc3R5bGVWYWx1ZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHJlbW92ZVN0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0U3R5bGUoZWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEF0dHJpYnV0ZShlbGVtZW50OiBhbnksIGF0dHJpYnV0ZTogc3RyaW5nKTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc2V0QXR0cmlidXRlKGVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHNldEF0dHJpYnV0ZU5TKGVsZW1lbnQ6IGFueSwgbnM6IHN0cmluZywgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHJlbW92ZUF0dHJpYnV0ZShlbGVtZW50OiBhbnksIGF0dHJpYnV0ZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHJlbW92ZUF0dHJpYnV0ZU5TKGVsZW1lbnQ6IGFueSwgbnM6IHN0cmluZywgYXR0cmlidXRlOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY3JlYXRlSHRtbERvY3VtZW50KCk6IEhUTUxEb2N1bWVudCB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldERlZmF1bHREb2N1bWVudCgpOiBEb2N1bWVudCB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldFRpdGxlKGRvYzogRG9jdW1lbnQpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzZXRUaXRsZShkb2M6IERvY3VtZW50LCBuZXdUaXRsZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGVsZW1lbnRNYXRjaGVzKG46IGFueSwgc2VsZWN0b3I6IHN0cmluZyk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBpc0VsZW1lbnROb2RlKG5vZGU6IGFueSk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBpc1NoYWRvd1Jvb3Qobm9kZTogYW55KTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEV2ZW50S2V5KGV2ZW50OiBhbnkpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzdXBwb3J0c0RPTUV2ZW50cygpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0R2xvYmFsRXZlbnRUYXJnZXQoZG9jOiBEb2N1bWVudCwgdGFyZ2V0OiBzdHJpbmcpOiBhbnkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRIaXN0b3J5KCk6IEhpc3RvcnkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRMb2NhdGlvbigpOiBMb2NhdGlvbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEJhc2VIcmVmKGRvYzogRG9jdW1lbnQpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICByZXNldEJhc2VFbGVtZW50KCk6IHZvaWQgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRVc2VyQWdlbnQoKTogc3RyaW5nIHsgcmV0dXJuICdGYWtlIHVzZXIgYWdlbnQnOyB9XG4gIHBlcmZvcm1hbmNlTm93KCk6IG51bWJlciB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG5cbiAgc3VwcG9ydHNDb29raWVzKCk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cbiAgZ2V0Q29va2llKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG59XG4iXX0=