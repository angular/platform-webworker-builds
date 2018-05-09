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
var /**
 * This adapter is required to log error messages.
 *
 * Note: other methods all throw as the DOM is not accessible directly in web worker context.
 */
WorkerDomAdapter = /** @class */ (function (_super) {
    tslib_1.__extends(WorkerDomAdapter, _super);
    function WorkerDomAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WorkerDomAdapter.makeCurrent = function () { setRootDomAdapter(new WorkerDomAdapter()); };
    WorkerDomAdapter.prototype.logError = function (error) {
        if (console.error) {
            console.error(error);
        }
        else {
            // tslint:disable-next-line:no-console
            console.log(error);
        }
    };
    WorkerDomAdapter.prototype.log = function (error) {
        // tslint:disable-next-line:no-console
        console.log(error);
    };
    WorkerDomAdapter.prototype.logGroup = function (error) {
        if (console.group) {
            console.group(error);
            this.logError(error);
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
    WorkerDomAdapter.prototype.contains = function (nodeA, nodeB) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.hasProperty = function (element, name) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.setProperty = function (el, name, value) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getProperty = function (el, name) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.invoke = function (el, methodName, args) { throw 'not implemented'; };
    Object.defineProperty(WorkerDomAdapter.prototype, "attrToPropMap", {
        get: function () { throw 'not implemented'; },
        set: function (value) { throw 'not implemented'; },
        enumerable: true,
        configurable: true
    });
    WorkerDomAdapter.prototype.parse = function (templateHtml) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.querySelector = function (el, selector) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.querySelectorAll = function (el, selector) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.on = function (el, evt, listener) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.onAndCancel = function (el, evt, listener) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.dispatchEvent = function (el, evt) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.createMouseEvent = function (eventType) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.createEvent = function (eventType) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.preventDefault = function (evt) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.isPrevented = function (evt) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getInnerHTML = function (el) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getTemplateContent = function (el) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getOuterHTML = function (el) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.nodeName = function (node) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.nodeValue = function (node) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.type = function (node) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.content = function (node) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.firstChild = function (el) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.nextSibling = function (el) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.parentElement = function (el) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.childNodes = function (el) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.childNodesAsList = function (el) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.clearNodes = function (el) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.appendChild = function (el, node) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.removeChild = function (el, node) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.replaceChild = function (el, newNode, oldNode) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.remove = function (el) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.insertBefore = function (parent, el, node) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.insertAllBefore = function (parent, el, nodes) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.insertAfter = function (parent, el, node) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.setInnerHTML = function (el, value) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getText = function (el) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.setText = function (el, value) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getValue = function (el) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.setValue = function (el, value) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getChecked = function (el) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.setChecked = function (el, value) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.createComment = function (text) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.createTemplate = function (html) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.createElement = function (tagName, doc) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.createElementNS = function (ns, tagName, doc) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.createTextNode = function (text, doc) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.createScriptTag = function (attrName, attrValue, doc) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.createStyleElement = function (css, doc) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.createShadowRoot = function (el) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getShadowRoot = function (el) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getHost = function (el) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getDistributedNodes = function (el) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.clone = function (node) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getElementsByClassName = function (element, name) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getElementsByTagName = function (element, name) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.classList = function (element) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.addClass = function (element, className) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.removeClass = function (element, className) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.hasClass = function (element, className) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.setStyle = function (element, styleName, styleValue) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.removeStyle = function (element, styleName) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getStyle = function (element, styleName) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.hasStyle = function (element, styleName, styleValue) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.tagName = function (element) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.attributeMap = function (element) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.hasAttribute = function (element, attribute) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.hasAttributeNS = function (element, ns, attribute) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getAttribute = function (element, attribute) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getAttributeNS = function (element, ns, attribute) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.setAttribute = function (element, name, value) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.setAttributeNS = function (element, ns, name, value) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.removeAttribute = function (element, attribute) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.removeAttributeNS = function (element, ns, attribute) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.templateAwareRoot = function (el) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.createHtmlDocument = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getDefaultDocument = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getBoundingClientRect = function (el) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getTitle = function (doc) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.setTitle = function (doc, newTitle) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.elementMatches = function (n, selector) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.isTemplateElement = function (el) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.isTextNode = function (node) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.isCommentNode = function (node) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.isElementNode = function (node) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.hasShadowRoot = function (node) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.isShadowRoot = function (node) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.importIntoDoc = function (node) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.adoptNode = function (node) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getHref = function (element) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getEventKey = function (event) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.resolveAndSetHref = function (element, baseUrl, href) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.supportsDOMEvents = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.supportsNativeShadowDOM = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getGlobalEventTarget = function (doc, target) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getHistory = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getLocation = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getBaseHref = function (doc) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.resetBaseElement = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getUserAgent = function () { return 'Fake user agent'; };
    WorkerDomAdapter.prototype.setData = function (element, name, value) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getComputedStyle = function (element) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getData = function (element, name) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.performanceNow = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getAnimationPrefix = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getTransitionEnd = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.supportsAnimation = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.supportsWebAnimation = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.supportsCookies = function () { return false; };
    WorkerDomAdapter.prototype.getCookie = function (name) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.setCookie = function (name, value) { throw 'not implemented'; };
    return WorkerDomAdapter;
}(DomAdapter));
/**
 * This adapter is required to log error messages.
 *
 * Note: other methods all throw as the DOM is not accessible directly in web worker context.
 */
export { WorkerDomAdapter };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci93b3JrZXJfYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQVFBLE9BQU8sRUFBQyxXQUFXLElBQUksVUFBVSxFQUFFLGtCQUFrQixJQUFJLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7Ozs7OztBQU83Rzs7Ozs7QUFBQTtJQUFzQyw0Q0FBVTs7OztJQUN2Qyw0QkFBVyxHQUFsQixjQUF1QixpQkFBaUIsQ0FBQyxJQUFJLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxFQUFFO0lBRW5FLG1DQUFRLEdBQVIsVUFBUyxLQUFVO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEI7UUFBQyxJQUFJLENBQUMsQ0FBQzs7WUFFTixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BCO0tBQ0Y7SUFFRCw4QkFBRyxHQUFILFVBQUksS0FBVTs7UUFFWixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3BCO0lBRUQsbUNBQVEsR0FBUixVQUFTLEtBQVU7UUFDakIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3RCO1FBQUMsSUFBSSxDQUFDLENBQUM7O1lBRU4sT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQjtLQUNGO0lBRUQsc0NBQVcs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WSxFQUFFLElBQVksRUFBRSxLQUFhLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQy9FLDJDQUFnQixHQUFoQixVQUFpQixPQUFZLElBQVMsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ2hFLGtDQUFPLEdBQVAsVUFBUSxPQUFZLEVBQUUsSUFBWSxJQUFZLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUN4RSx5Q0FBYyxHQUFkLGNBQTJCLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUNyRCw2Q0FBa0IsR0FBbEIsY0FBK0IsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ3pELDJDQUFnQixHQUFoQixjQUE2QixNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDdkQsNENBQWlCLEdBQWpCLGNBQStCLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUN6RCwrQ0FBb0IsR0FBcEIsY0FBa0MsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBRTVELDBDQUFlLEdBQWYsY0FBNkIsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO0lBQzVDLG9DQUFTLEdBQVQsVUFBVSxJQUFZLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQzVELG9DQUFTLEdBQVQsVUFBVSxJQUFZLEVBQUUsS0FBYSxJQUFJLE1BQU0saUJBQWlCLENBQUMsRUFBRTsyQkF2S3JFO0VBZXNDLFVBQVUsRUF5Si9DLENBQUE7Ozs7OztBQXpKRCw0QkF5SkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7ybVEb21BZGFwdGVyIGFzIERvbUFkYXB0ZXIsIMm1c2V0Um9vdERvbUFkYXB0ZXIgYXMgc2V0Um9vdERvbUFkYXB0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG4vKipcbiAqIFRoaXMgYWRhcHRlciBpcyByZXF1aXJlZCB0byBsb2cgZXJyb3IgbWVzc2FnZXMuXG4gKlxuICogTm90ZTogb3RoZXIgbWV0aG9kcyBhbGwgdGhyb3cgYXMgdGhlIERPTSBpcyBub3QgYWNjZXNzaWJsZSBkaXJlY3RseSBpbiB3ZWIgd29ya2VyIGNvbnRleHQuXG4gKi9cbmV4cG9ydCBjbGFzcyBXb3JrZXJEb21BZGFwdGVyIGV4dGVuZHMgRG9tQWRhcHRlciB7XG4gIHN0YXRpYyBtYWtlQ3VycmVudCgpIHsgc2V0Um9vdERvbUFkYXB0ZXIobmV3IFdvcmtlckRvbUFkYXB0ZXIoKSk7IH1cblxuICBsb2dFcnJvcihlcnJvcjogYW55KSB7XG4gICAgaWYgKGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGxvZyhlcnJvcjogYW55KSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH1cblxuICBsb2dHcm91cChlcnJvcjogYW55KSB7XG4gICAgaWYgKGNvbnNvbGUuZ3JvdXApIHtcbiAgICAgIGNvbnNvbGUuZ3JvdXAoZXJyb3IpO1xuICAgICAgdGhpcy5sb2dFcnJvcihlcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgbG9nR3JvdXBFbmQoKSB7XG4gICAgaWYgKGNvbnNvbGUuZ3JvdXBFbmQpIHtcbiAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgICB9XG4gIH1cblxuICBjb250YWlucyhub2RlQTogYW55LCBub2RlQjogYW55KTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGhhc1Byb3BlcnR5KGVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nKTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHNldFByb3BlcnR5KGVsOiBFbGVtZW50LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0UHJvcGVydHkoZWw6IEVsZW1lbnQsIG5hbWU6IHN0cmluZyk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGludm9rZShlbDogRWxlbWVudCwgbWV0aG9kTmFtZTogc3RyaW5nLCBhcmdzOiBhbnlbXSk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG5cbiAgZ2V0IGF0dHJUb1Byb3BNYXAoKToge1trZXk6IHN0cmluZ106IHN0cmluZ30geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzZXQgYXR0clRvUHJvcE1hcCh2YWx1ZToge1trZXk6IHN0cmluZ106IHN0cmluZ30pIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cblxuICBwYXJzZSh0ZW1wbGF0ZUh0bWw6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBxdWVyeVNlbGVjdG9yKGVsOiBhbnksIHNlbGVjdG9yOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHF1ZXJ5U2VsZWN0b3JBbGwoZWw6IGFueSwgc2VsZWN0b3I6IHN0cmluZyk6IGFueVtdIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgb24oZWw6IGFueSwgZXZ0OiBhbnksIGxpc3RlbmVyOiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgb25BbmRDYW5jZWwoZWw6IGFueSwgZXZ0OiBhbnksIGxpc3RlbmVyOiBhbnkpOiBGdW5jdGlvbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGRpc3BhdGNoRXZlbnQoZWw6IGFueSwgZXZ0OiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY3JlYXRlTW91c2VFdmVudChldmVudFR5cGU6IGFueSk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNyZWF0ZUV2ZW50KGV2ZW50VHlwZTogc3RyaW5nKTogYW55IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcHJldmVudERlZmF1bHQoZXZ0OiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaXNQcmV2ZW50ZWQoZXZ0OiBhbnkpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0SW5uZXJIVE1MKGVsOiBhbnkpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRUZW1wbGF0ZUNvbnRlbnQoZWw6IGFueSk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldE91dGVySFRNTChlbDogYW55KTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgbm9kZU5hbWUobm9kZTogYW55KTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgbm9kZVZhbHVlKG5vZGU6IGFueSk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHR5cGUobm9kZTogYW55KTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY29udGVudChub2RlOiBhbnkpOiBhbnkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBmaXJzdENoaWxkKGVsOiBhbnkpOiBOb2RlIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgbmV4dFNpYmxpbmcoZWw6IGFueSk6IE5vZGUgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBwYXJlbnRFbGVtZW50KGVsOiBhbnkpOiBOb2RlIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY2hpbGROb2RlcyhlbDogYW55KTogTm9kZVtdIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY2hpbGROb2Rlc0FzTGlzdChlbDogYW55KTogTm9kZVtdIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY2xlYXJOb2RlcyhlbDogYW55KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGFwcGVuZENoaWxkKGVsOiBhbnksIG5vZGU6IGFueSkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICByZW1vdmVDaGlsZChlbDogYW55LCBub2RlOiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcmVwbGFjZUNoaWxkKGVsOiBhbnksIG5ld05vZGU6IGFueSwgb2xkTm9kZTogYW55KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHJlbW92ZShlbDogYW55KTogTm9kZSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGluc2VydEJlZm9yZShwYXJlbnQ6IGFueSwgZWw6IGFueSwgbm9kZTogYW55KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGluc2VydEFsbEJlZm9yZShwYXJlbnQ6IGFueSwgZWw6IGFueSwgbm9kZXM6IGFueSkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBpbnNlcnRBZnRlcihwYXJlbnQ6IGFueSwgZWw6IGFueSwgbm9kZTogYW55KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHNldElubmVySFRNTChlbDogYW55LCB2YWx1ZTogYW55KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldFRleHQoZWw6IGFueSk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHNldFRleHQoZWw6IGFueSwgdmFsdWU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRWYWx1ZShlbDogYW55KTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc2V0VmFsdWUoZWw6IGFueSwgdmFsdWU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRDaGVja2VkKGVsOiBhbnkpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc2V0Q2hlY2tlZChlbDogYW55LCB2YWx1ZTogYm9vbGVhbikgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjcmVhdGVDb21tZW50KHRleHQ6IHN0cmluZyk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNyZWF0ZVRlbXBsYXRlKGh0bWw6IGFueSk6IEhUTUxFbGVtZW50IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY3JlYXRlRWxlbWVudCh0YWdOYW1lOiBhbnksIGRvYz86IGFueSk6IEhUTUxFbGVtZW50IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY3JlYXRlRWxlbWVudE5TKG5zOiBzdHJpbmcsIHRhZ05hbWU6IHN0cmluZywgZG9jPzogYW55KTogRWxlbWVudCB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNyZWF0ZVRleHROb2RlKHRleHQ6IHN0cmluZywgZG9jPzogYW55KTogVGV4dCB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNyZWF0ZVNjcmlwdFRhZyhhdHRyTmFtZTogc3RyaW5nLCBhdHRyVmFsdWU6IHN0cmluZywgZG9jPzogYW55KTogSFRNTEVsZW1lbnQge1xuICAgIHRocm93ICdub3QgaW1wbGVtZW50ZWQnO1xuICB9XG4gIGNyZWF0ZVN0eWxlRWxlbWVudChjc3M6IHN0cmluZywgZG9jPzogYW55KTogSFRNTFN0eWxlRWxlbWVudCB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNyZWF0ZVNoYWRvd1Jvb3QoZWw6IGFueSk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldFNoYWRvd1Jvb3QoZWw6IGFueSk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEhvc3QoZWw6IGFueSk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldERpc3RyaWJ1dGVkTm9kZXMoZWw6IGFueSk6IE5vZGVbXSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNsb25lKG5vZGU6IE5vZGUpOiBOb2RlIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShlbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZyk6IEhUTUxFbGVtZW50W10geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRFbGVtZW50c0J5VGFnTmFtZShlbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZyk6IEhUTUxFbGVtZW50W10geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjbGFzc0xpc3QoZWxlbWVudDogYW55KTogYW55W10geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBhZGRDbGFzcyhlbGVtZW50OiBhbnksIGNsYXNzTmFtZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHJlbW92ZUNsYXNzKGVsZW1lbnQ6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaGFzQ2xhc3MoZWxlbWVudDogYW55LCBjbGFzc05hbWU6IHN0cmluZyk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzZXRTdHlsZShlbGVtZW50OiBhbnksIHN0eWxlTmFtZTogc3RyaW5nLCBzdHlsZVZhbHVlOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcmVtb3ZlU3R5bGUoZWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRTdHlsZShlbGVtZW50OiBhbnksIHN0eWxlTmFtZTogc3RyaW5nKTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaGFzU3R5bGUoZWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZywgc3R5bGVWYWx1ZT86IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHRocm93ICdub3QgaW1wbGVtZW50ZWQnO1xuICB9XG4gIHRhZ05hbWUoZWxlbWVudDogYW55KTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgYXR0cmlidXRlTWFwKGVsZW1lbnQ6IGFueSk6IE1hcDxzdHJpbmcsIHN0cmluZz4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBoYXNBdHRyaWJ1dGUoZWxlbWVudDogYW55LCBhdHRyaWJ1dGU6IHN0cmluZyk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBoYXNBdHRyaWJ1dGVOUyhlbGVtZW50OiBhbnksIG5zOiBzdHJpbmcsIGF0dHJpYnV0ZTogc3RyaW5nKTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEF0dHJpYnV0ZShlbGVtZW50OiBhbnksIGF0dHJpYnV0ZTogc3RyaW5nKTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0QXR0cmlidXRlTlMoZWxlbWVudDogYW55LCBuczogc3RyaW5nLCBhdHRyaWJ1dGU6IHN0cmluZyk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHNldEF0dHJpYnV0ZShlbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzZXRBdHRyaWJ1dGVOUyhlbGVtZW50OiBhbnksIG5zOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICByZW1vdmVBdHRyaWJ1dGUoZWxlbWVudDogYW55LCBhdHRyaWJ1dGU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICByZW1vdmVBdHRyaWJ1dGVOUyhlbGVtZW50OiBhbnksIG5zOiBzdHJpbmcsIGF0dHJpYnV0ZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHRlbXBsYXRlQXdhcmVSb290KGVsOiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY3JlYXRlSHRtbERvY3VtZW50KCk6IEhUTUxEb2N1bWVudCB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldERlZmF1bHREb2N1bWVudCgpOiBEb2N1bWVudCB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEJvdW5kaW5nQ2xpZW50UmVjdChlbDogYW55KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldFRpdGxlKGRvYzogRG9jdW1lbnQpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzZXRUaXRsZShkb2M6IERvY3VtZW50LCBuZXdUaXRsZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGVsZW1lbnRNYXRjaGVzKG46IGFueSwgc2VsZWN0b3I6IHN0cmluZyk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBpc1RlbXBsYXRlRWxlbWVudChlbDogYW55KTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGlzVGV4dE5vZGUobm9kZTogYW55KTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGlzQ29tbWVudE5vZGUobm9kZTogYW55KTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGlzRWxlbWVudE5vZGUobm9kZTogYW55KTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGhhc1NoYWRvd1Jvb3Qobm9kZTogYW55KTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGlzU2hhZG93Um9vdChub2RlOiBhbnkpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaW1wb3J0SW50b0RvYyhub2RlOiBOb2RlKTogTm9kZSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGFkb3B0Tm9kZShub2RlOiBOb2RlKTogTm9kZSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEhyZWYoZWxlbWVudDogYW55KTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0RXZlbnRLZXkoZXZlbnQ6IGFueSk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHJlc29sdmVBbmRTZXRIcmVmKGVsZW1lbnQ6IGFueSwgYmFzZVVybDogc3RyaW5nLCBocmVmOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc3VwcG9ydHNET01FdmVudHMoKTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHN1cHBvcnRzTmF0aXZlU2hhZG93RE9NKCk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRHbG9iYWxFdmVudFRhcmdldChkb2M6IERvY3VtZW50LCB0YXJnZXQ6IHN0cmluZyk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEhpc3RvcnkoKTogSGlzdG9yeSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldExvY2F0aW9uKCk6IExvY2F0aW9uIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0QmFzZUhyZWYoZG9jOiBEb2N1bWVudCk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHJlc2V0QmFzZUVsZW1lbnQoKTogdm9pZCB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldFVzZXJBZ2VudCgpOiBzdHJpbmcgeyByZXR1cm4gJ0Zha2UgdXNlciBhZ2VudCc7IH1cbiAgc2V0RGF0YShlbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQ6IGFueSk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldERhdGEoZWxlbWVudDogYW55LCBuYW1lOiBzdHJpbmcpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBwZXJmb3JtYW5jZU5vdygpOiBudW1iZXIgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRBbmltYXRpb25QcmVmaXgoKTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0VHJhbnNpdGlvbkVuZCgpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzdXBwb3J0c0FuaW1hdGlvbigpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc3VwcG9ydHNXZWJBbmltYXRpb24oKTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG5cbiAgc3VwcG9ydHNDb29raWVzKCk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cbiAgZ2V0Q29va2llKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHNldENvb2tpZShuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbn1cbiJdfQ==