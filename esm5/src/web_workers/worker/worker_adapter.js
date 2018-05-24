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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci93b3JrZXJfYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQVFBLE9BQU8sRUFBQyxXQUFXLElBQUksVUFBVSxFQUFFLGtCQUFrQixJQUFJLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7Ozs7OztBQU83Rzs7Ozs7QUFBQTtJQUFzQyw0Q0FBVTs7OztJQUN2Qyw0QkFBVyxHQUFsQixjQUF1QixpQkFBaUIsQ0FBQyxJQUFJLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxFQUFFO0lBRW5FLG1DQUFRLEdBQVIsVUFBUyxLQUFVO1FBQ2pCLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtZQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3RCO2FBQU07O1lBRUwsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQjtLQUNGO0lBRUQsOEJBQUcsR0FBSCxVQUFJLEtBQVU7O1FBRVosT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNwQjtJQUVELG1DQUFRLEdBQVIsVUFBUyxLQUFVO1FBQ2pCLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtZQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEI7YUFBTTs7WUFFTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BCO0tBQ0Y7SUFFRCxzQ0FBVyxHQUFYO1FBQ0UsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQ3BCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNwQjtLQUNGO0lBRUQsbUNBQVEsR0FBUixVQUFTLEtBQVUsRUFBRSxLQUFVLElBQWEsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ3RFLHNDQUFXLEdBQVgsVUFBWSxPQUFZLEVBQUUsSUFBWSxJQUFhLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUM3RSxzQ0FBVyxHQUFYLFVBQVksRUFBVyxFQUFFLElBQVksRUFBRSxLQUFVLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQy9FLHNDQUFXLEdBQVgsVUFBWSxFQUFXLEVBQUUsSUFBWSxJQUFTLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUN4RSxpQ0FBTSxHQUFOLFVBQU8sRUFBVyxFQUFFLFVBQWtCLEVBQUUsSUFBVyxJQUFTLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUV0RixzQkFBSSwyQ0FBYTthQUFqQixjQUErQyxNQUFNLGlCQUFpQixDQUFDLEVBQUU7YUFDekUsVUFBa0IsS0FBOEIsSUFBSSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7OztPQURMO0lBR3pFLGdDQUFLLEdBQUwsVUFBTSxZQUFvQixJQUFJLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUN4RCx3Q0FBYSxHQUFiLFVBQWMsRUFBTyxFQUFFLFFBQWdCLElBQWlCLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUNsRiwyQ0FBZ0IsR0FBaEIsVUFBaUIsRUFBTyxFQUFFLFFBQWdCLElBQVcsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQy9FLDZCQUFFLEdBQUYsVUFBRyxFQUFPLEVBQUUsR0FBUSxFQUFFLFFBQWEsSUFBSSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDakUsc0NBQVcsR0FBWCxVQUFZLEVBQU8sRUFBRSxHQUFRLEVBQUUsUUFBYSxJQUFjLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUNwRix3Q0FBYSxHQUFiLFVBQWMsRUFBTyxFQUFFLEdBQVEsSUFBSSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDN0QsMkNBQWdCLEdBQWhCLFVBQWlCLFNBQWMsSUFBUyxNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDbEUsc0NBQVcsR0FBWCxVQUFZLFNBQWlCLElBQVMsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ2hFLHlDQUFjLEdBQWQsVUFBZSxHQUFRLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ3JELHNDQUFXLEdBQVgsVUFBWSxHQUFRLElBQWEsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQzNELHVDQUFZLEdBQVosVUFBYSxFQUFPLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQzFELDZDQUFrQixHQUFsQixVQUFtQixFQUFPLElBQVMsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQzdELHVDQUFZLEdBQVosVUFBYSxFQUFPLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQzFELG1DQUFRLEdBQVIsVUFBUyxJQUFTLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ3hELG9DQUFTLEdBQVQsVUFBVSxJQUFTLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ3pELCtCQUFJLEdBQUosVUFBSyxJQUFTLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ3BELGtDQUFPLEdBQVAsVUFBUSxJQUFTLElBQVMsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ3BELHFDQUFVLEdBQVYsVUFBVyxFQUFPLElBQVUsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ3RELHNDQUFXLEdBQVgsVUFBWSxFQUFPLElBQVUsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ3ZELHdDQUFhLEdBQWIsVUFBYyxFQUFPLElBQVUsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ3pELHFDQUFVLEdBQVYsVUFBVyxFQUFPLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ3hELDJDQUFnQixHQUFoQixVQUFpQixFQUFPLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQzlELHFDQUFVLEdBQVYsVUFBVyxFQUFPLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ2hELHNDQUFXLEdBQVgsVUFBWSxFQUFPLEVBQUUsSUFBUyxJQUFJLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUM1RCxzQ0FBVyxHQUFYLFVBQVksRUFBTyxFQUFFLElBQVMsSUFBSSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDNUQsdUNBQVksR0FBWixVQUFhLEVBQU8sRUFBRSxPQUFZLEVBQUUsT0FBWSxJQUFJLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUM5RSxpQ0FBTSxHQUFOLFVBQU8sRUFBTyxJQUFVLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUNsRCx1Q0FBWSxHQUFaLFVBQWEsTUFBVyxFQUFFLEVBQU8sRUFBRSxJQUFTLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQzFFLDBDQUFlLEdBQWYsVUFBZ0IsTUFBVyxFQUFFLEVBQU8sRUFBRSxLQUFVLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQzlFLHNDQUFXLEdBQVgsVUFBWSxNQUFXLEVBQUUsRUFBTyxFQUFFLElBQVMsSUFBSSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDekUsdUNBQVksR0FBWixVQUFhLEVBQU8sRUFBRSxLQUFVLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQzlELGtDQUFPLEdBQVAsVUFBUSxFQUFPLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ3JELGtDQUFPLEdBQVAsVUFBUSxFQUFPLEVBQUUsS0FBYSxJQUFJLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUM1RCxtQ0FBUSxHQUFSLFVBQVMsRUFBTyxJQUFZLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUN0RCxtQ0FBUSxHQUFSLFVBQVMsRUFBTyxFQUFFLEtBQWEsSUFBSSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDN0QscUNBQVUsR0FBVixVQUFXLEVBQU8sSUFBYSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDekQscUNBQVUsR0FBVixVQUFXLEVBQU8sRUFBRSxLQUFjLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ2hFLHdDQUFhLEdBQWIsVUFBYyxJQUFZLElBQVMsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQzdELHlDQUFjLEdBQWQsVUFBZSxJQUFTLElBQWlCLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUNuRSx3Q0FBYSxHQUFiLFVBQWMsT0FBWSxFQUFFLEdBQVMsSUFBaUIsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ2hGLDBDQUFlLEdBQWYsVUFBZ0IsRUFBVSxFQUFFLE9BQWUsRUFBRSxHQUFTLElBQWEsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQzdGLHlDQUFjLEdBQWQsVUFBZSxJQUFZLEVBQUUsR0FBUyxJQUFVLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUMxRSwwQ0FBZSxHQUFmLFVBQWdCLFFBQWdCLEVBQUUsU0FBaUIsRUFBRSxHQUFTO1FBQzVELE1BQU0saUJBQWlCLENBQUM7S0FDekI7SUFDRCw2Q0FBa0IsR0FBbEIsVUFBbUIsR0FBVyxFQUFFLEdBQVMsSUFBc0IsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ3pGLDJDQUFnQixHQUFoQixVQUFpQixFQUFPLElBQVMsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQzNELHdDQUFhLEdBQWIsVUFBYyxFQUFPLElBQVMsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ3hELGtDQUFPLEdBQVAsVUFBUSxFQUFPLElBQVMsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ2xELDhDQUFtQixHQUFuQixVQUFvQixFQUFPLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ2pFLGdDQUFLLEdBQUwsVUFBTSxJQUFVLElBQVUsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ3BELGlEQUFzQixHQUF0QixVQUF1QixPQUFZLEVBQUUsSUFBWSxJQUFtQixNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDOUYsK0NBQW9CLEdBQXBCLFVBQXFCLE9BQVksRUFBRSxJQUFZLElBQW1CLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUM1RixvQ0FBUyxHQUFULFVBQVUsT0FBWSxJQUFXLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUMzRCxtQ0FBUSxHQUFSLFVBQVMsT0FBWSxFQUFFLFNBQWlCLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ3RFLHNDQUFXLEdBQVgsVUFBWSxPQUFZLEVBQUUsU0FBaUIsSUFBSSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDekUsbUNBQVEsR0FBUixVQUFTLE9BQVksRUFBRSxTQUFpQixJQUFhLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUMvRSxtQ0FBUSxHQUFSLFVBQVMsT0FBWSxFQUFFLFNBQWlCLEVBQUUsVUFBa0IsSUFBSSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDMUYsc0NBQVcsR0FBWCxVQUFZLE9BQVksRUFBRSxTQUFpQixJQUFJLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUN6RSxtQ0FBUSxHQUFSLFVBQVMsT0FBWSxFQUFFLFNBQWlCLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQzlFLG1DQUFRLEdBQVIsVUFBUyxPQUFZLEVBQUUsU0FBaUIsRUFBRSxVQUFtQjtRQUMzRCxNQUFNLGlCQUFpQixDQUFDO0tBQ3pCO0lBQ0Qsa0NBQU8sR0FBUCxVQUFRLE9BQVksSUFBWSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDMUQsdUNBQVksR0FBWixVQUFhLE9BQVksSUFBeUIsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQzVFLHVDQUFZLEdBQVosVUFBYSxPQUFZLEVBQUUsU0FBaUIsSUFBYSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDbkYseUNBQWMsR0FBZCxVQUFlLE9BQVksRUFBRSxFQUFVLEVBQUUsU0FBaUIsSUFBYSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDakcsdUNBQVksR0FBWixVQUFhLE9BQVksRUFBRSxTQUFpQixJQUFZLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUNsRix5Q0FBYyxHQUFkLFVBQWUsT0FBWSxFQUFFLEVBQVUsRUFBRSxTQUFpQixJQUFZLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUNoRyx1Q0FBWSxHQUFaLFVBQWEsT0FBWSxFQUFFLElBQVksRUFBRSxLQUFhLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ3BGLHlDQUFjLEdBQWQsVUFBZSxPQUFZLEVBQUUsRUFBVSxFQUFFLElBQVksRUFBRSxLQUFhLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ2xHLDBDQUFlLEdBQWYsVUFBZ0IsT0FBWSxFQUFFLFNBQWlCLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQzdFLDRDQUFpQixHQUFqQixVQUFrQixPQUFZLEVBQUUsRUFBVSxFQUFFLFNBQWlCLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQzNGLDRDQUFpQixHQUFqQixVQUFrQixFQUFPLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ3ZELDZDQUFrQixHQUFsQixjQUFxQyxNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDL0QsNkNBQWtCLEdBQWxCLGNBQWlDLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUMzRCxnREFBcUIsR0FBckIsVUFBc0IsRUFBTyxJQUFJLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUMzRCxtQ0FBUSxHQUFSLFVBQVMsR0FBYSxJQUFZLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUM1RCxtQ0FBUSxHQUFSLFVBQVMsR0FBYSxFQUFFLFFBQWdCLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ3RFLHlDQUFjLEdBQWQsVUFBZSxDQUFNLEVBQUUsUUFBZ0IsSUFBYSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDOUUsNENBQWlCLEdBQWpCLFVBQWtCLEVBQU8sSUFBYSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDaEUscUNBQVUsR0FBVixVQUFXLElBQVMsSUFBYSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDM0Qsd0NBQWEsR0FBYixVQUFjLElBQVMsSUFBYSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDOUQsd0NBQWEsR0FBYixVQUFjLElBQVMsSUFBYSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDOUQsd0NBQWEsR0FBYixVQUFjLElBQVMsSUFBYSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDOUQsdUNBQVksR0FBWixVQUFhLElBQVMsSUFBYSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDN0Qsd0NBQWEsR0FBYixVQUFjLElBQVUsSUFBVSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDNUQsb0NBQVMsR0FBVCxVQUFVLElBQVUsSUFBVSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDeEQsa0NBQU8sR0FBUCxVQUFRLE9BQVksSUFBWSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDMUQsc0NBQVcsR0FBWCxVQUFZLEtBQVUsSUFBWSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDNUQsNENBQWlCLEdBQWpCLFVBQWtCLE9BQVksRUFBRSxPQUFlLEVBQUUsSUFBWSxJQUFJLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUMzRiw0Q0FBaUIsR0FBakIsY0FBK0IsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ3pELGtEQUF1QixHQUF2QixjQUFxQyxNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDL0QsK0NBQW9CLEdBQXBCLFVBQXFCLEdBQWEsRUFBRSxNQUFjLElBQVMsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ3JGLHFDQUFVLEdBQVYsY0FBd0IsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ2xELHNDQUFXLEdBQVgsY0FBMEIsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ3BELHNDQUFXLEdBQVgsVUFBWSxHQUFhLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQy9ELDJDQUFnQixHQUFoQixjQUEyQixNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDckQsdUNBQVksR0FBWixjQUF5QixPQUFPLGlCQUFpQixDQUFDLEVBQUU7SUFDcEQsa0NBQU8sR0FBUCxVQUFRLE9BQVksRUFBRSxJQUFZLEVBQUUsS0FBYSxJQUFJLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUMvRSwyQ0FBZ0IsR0FBaEIsVUFBaUIsT0FBWSxJQUFTLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUNoRSxrQ0FBTyxHQUFQLFVBQVEsT0FBWSxFQUFFLElBQVksSUFBWSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDeEUseUNBQWMsR0FBZCxjQUEyQixNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDckQsNkNBQWtCLEdBQWxCLGNBQStCLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUN6RCwyQ0FBZ0IsR0FBaEIsY0FBNkIsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0lBQ3ZELDRDQUFpQixHQUFqQixjQUErQixNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDekQsK0NBQW9CLEdBQXBCLGNBQWtDLE1BQU0saUJBQWlCLENBQUMsRUFBRTtJQUU1RCwwQ0FBZSxHQUFmLGNBQTZCLE9BQU8sS0FBSyxDQUFDLEVBQUU7SUFDNUMsb0NBQVMsR0FBVCxVQUFVLElBQVksSUFBWSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7SUFDNUQsb0NBQVMsR0FBVCxVQUFVLElBQVksRUFBRSxLQUFhLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzJCQXZLckU7RUFlc0MsVUFBVSxFQXlKL0MsQ0FBQTs7Ozs7O0FBekpELDRCQXlKQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHvJtURvbUFkYXB0ZXIgYXMgRG9tQWRhcHRlciwgybVzZXRSb290RG9tQWRhcHRlciBhcyBzZXRSb290RG9tQWRhcHRlcn0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbi8qKlxuICogVGhpcyBhZGFwdGVyIGlzIHJlcXVpcmVkIHRvIGxvZyBlcnJvciBtZXNzYWdlcy5cbiAqXG4gKiBOb3RlOiBvdGhlciBtZXRob2RzIGFsbCB0aHJvdyBhcyB0aGUgRE9NIGlzIG5vdCBhY2Nlc3NpYmxlIGRpcmVjdGx5IGluIHdlYiB3b3JrZXIgY29udGV4dC5cbiAqL1xuZXhwb3J0IGNsYXNzIFdvcmtlckRvbUFkYXB0ZXIgZXh0ZW5kcyBEb21BZGFwdGVyIHtcbiAgc3RhdGljIG1ha2VDdXJyZW50KCkgeyBzZXRSb290RG9tQWRhcHRlcihuZXcgV29ya2VyRG9tQWRhcHRlcigpKTsgfVxuXG4gIGxvZ0Vycm9yKGVycm9yOiBhbnkpIHtcbiAgICBpZiAoY29uc29sZS5lcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgbG9nKGVycm9yOiBhbnkpIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfVxuXG4gIGxvZ0dyb3VwKGVycm9yOiBhbnkpIHtcbiAgICBpZiAoY29uc29sZS5ncm91cCkge1xuICAgICAgY29uc29sZS5ncm91cChlcnJvcik7XG4gICAgICB0aGlzLmxvZ0Vycm9yKGVycm9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBsb2dHcm91cEVuZCgpIHtcbiAgICBpZiAoY29uc29sZS5ncm91cEVuZCkge1xuICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnRhaW5zKG5vZGVBOiBhbnksIG5vZGVCOiBhbnkpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaGFzUHJvcGVydHkoZWxlbWVudDogYW55LCBuYW1lOiBzdHJpbmcpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc2V0UHJvcGVydHkoZWw6IEVsZW1lbnQsIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRQcm9wZXJ0eShlbDogRWxlbWVudCwgbmFtZTogc3RyaW5nKTogYW55IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaW52b2tlKGVsOiBFbGVtZW50LCBtZXRob2ROYW1lOiBzdHJpbmcsIGFyZ3M6IGFueVtdKTogYW55IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cblxuICBnZXQgYXR0clRvUHJvcE1hcCgpOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHNldCBhdHRyVG9Qcm9wTWFwKHZhbHVlOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuXG4gIHBhcnNlKHRlbXBsYXRlSHRtbDogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHF1ZXJ5U2VsZWN0b3IoZWw6IGFueSwgc2VsZWN0b3I6IHN0cmluZyk6IEhUTUxFbGVtZW50IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcXVlcnlTZWxlY3RvckFsbChlbDogYW55LCBzZWxlY3Rvcjogc3RyaW5nKTogYW55W10geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBvbihlbDogYW55LCBldnQ6IGFueSwgbGlzdGVuZXI6IGFueSkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBvbkFuZENhbmNlbChlbDogYW55LCBldnQ6IGFueSwgbGlzdGVuZXI6IGFueSk6IEZ1bmN0aW9uIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZGlzcGF0Y2hFdmVudChlbDogYW55LCBldnQ6IGFueSkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjcmVhdGVNb3VzZUV2ZW50KGV2ZW50VHlwZTogYW55KTogYW55IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY3JlYXRlRXZlbnQoZXZlbnRUeXBlOiBzdHJpbmcpOiBhbnkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBwcmV2ZW50RGVmYXVsdChldnQ6IGFueSkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBpc1ByZXZlbnRlZChldnQ6IGFueSk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRJbm5lckhUTUwoZWw6IGFueSk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldFRlbXBsYXRlQ29udGVudChlbDogYW55KTogYW55IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0T3V0ZXJIVE1MKGVsOiBhbnkpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBub2RlTmFtZShub2RlOiBhbnkpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBub2RlVmFsdWUobm9kZTogYW55KTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgdHlwZShub2RlOiBhbnkpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjb250ZW50KG5vZGU6IGFueSk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGZpcnN0Q2hpbGQoZWw6IGFueSk6IE5vZGUgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBuZXh0U2libGluZyhlbDogYW55KTogTm9kZSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHBhcmVudEVsZW1lbnQoZWw6IGFueSk6IE5vZGUgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjaGlsZE5vZGVzKGVsOiBhbnkpOiBOb2RlW10geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjaGlsZE5vZGVzQXNMaXN0KGVsOiBhbnkpOiBOb2RlW10geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjbGVhck5vZGVzKGVsOiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgYXBwZW5kQ2hpbGQoZWw6IGFueSwgbm9kZTogYW55KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHJlbW92ZUNoaWxkKGVsOiBhbnksIG5vZGU6IGFueSkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICByZXBsYWNlQ2hpbGQoZWw6IGFueSwgbmV3Tm9kZTogYW55LCBvbGROb2RlOiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcmVtb3ZlKGVsOiBhbnkpOiBOb2RlIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaW5zZXJ0QmVmb3JlKHBhcmVudDogYW55LCBlbDogYW55LCBub2RlOiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaW5zZXJ0QWxsQmVmb3JlKHBhcmVudDogYW55LCBlbDogYW55LCBub2RlczogYW55KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGluc2VydEFmdGVyKHBhcmVudDogYW55LCBlbDogYW55LCBub2RlOiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc2V0SW5uZXJIVE1MKGVsOiBhbnksIHZhbHVlOiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0VGV4dChlbDogYW55KTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc2V0VGV4dChlbDogYW55LCB2YWx1ZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldFZhbHVlKGVsOiBhbnkpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzZXRWYWx1ZShlbDogYW55LCB2YWx1ZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldENoZWNrZWQoZWw6IGFueSk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzZXRDaGVja2VkKGVsOiBhbnksIHZhbHVlOiBib29sZWFuKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNyZWF0ZUNvbW1lbnQodGV4dDogc3RyaW5nKTogYW55IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY3JlYXRlVGVtcGxhdGUoaHRtbDogYW55KTogSFRNTEVsZW1lbnQgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjcmVhdGVFbGVtZW50KHRhZ05hbWU6IGFueSwgZG9jPzogYW55KTogSFRNTEVsZW1lbnQgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjcmVhdGVFbGVtZW50TlMobnM6IHN0cmluZywgdGFnTmFtZTogc3RyaW5nLCBkb2M/OiBhbnkpOiBFbGVtZW50IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY3JlYXRlVGV4dE5vZGUodGV4dDogc3RyaW5nLCBkb2M/OiBhbnkpOiBUZXh0IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY3JlYXRlU2NyaXB0VGFnKGF0dHJOYW1lOiBzdHJpbmcsIGF0dHJWYWx1ZTogc3RyaW5nLCBkb2M/OiBhbnkpOiBIVE1MRWxlbWVudCB7XG4gICAgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7XG4gIH1cbiAgY3JlYXRlU3R5bGVFbGVtZW50KGNzczogc3RyaW5nLCBkb2M/OiBhbnkpOiBIVE1MU3R5bGVFbGVtZW50IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY3JlYXRlU2hhZG93Um9vdChlbDogYW55KTogYW55IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0U2hhZG93Um9vdChlbDogYW55KTogYW55IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0SG9zdChlbDogYW55KTogYW55IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0RGlzdHJpYnV0ZWROb2RlcyhlbDogYW55KTogTm9kZVtdIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY2xvbmUobm9kZTogTm9kZSk6IE5vZGUgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nKTogSFRNTEVsZW1lbnRbXSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEVsZW1lbnRzQnlUYWdOYW1lKGVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nKTogSFRNTEVsZW1lbnRbXSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNsYXNzTGlzdChlbGVtZW50OiBhbnkpOiBhbnlbXSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGFkZENsYXNzKGVsZW1lbnQ6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcmVtb3ZlQ2xhc3MoZWxlbWVudDogYW55LCBjbGFzc05hbWU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBoYXNDbGFzcyhlbGVtZW50OiBhbnksIGNsYXNzTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHNldFN0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcsIHN0eWxlVmFsdWU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICByZW1vdmVTdHlsZShlbGVtZW50OiBhbnksIHN0eWxlTmFtZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldFN0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBoYXNTdHlsZShlbGVtZW50OiBhbnksIHN0eWxlTmFtZTogc3RyaW5nLCBzdHlsZVZhbHVlPzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7XG4gIH1cbiAgdGFnTmFtZShlbGVtZW50OiBhbnkpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBhdHRyaWJ1dGVNYXAoZWxlbWVudDogYW55KTogTWFwPHN0cmluZywgc3RyaW5nPiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGhhc0F0dHJpYnV0ZShlbGVtZW50OiBhbnksIGF0dHJpYnV0ZTogc3RyaW5nKTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGhhc0F0dHJpYnV0ZU5TKGVsZW1lbnQ6IGFueSwgbnM6IHN0cmluZywgYXR0cmlidXRlOiBzdHJpbmcpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0QXR0cmlidXRlKGVsZW1lbnQ6IGFueSwgYXR0cmlidXRlOiBzdHJpbmcpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRBdHRyaWJ1dGVOUyhlbGVtZW50OiBhbnksIG5zOiBzdHJpbmcsIGF0dHJpYnV0ZTogc3RyaW5nKTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc2V0QXR0cmlidXRlKGVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHNldEF0dHJpYnV0ZU5TKGVsZW1lbnQ6IGFueSwgbnM6IHN0cmluZywgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHJlbW92ZUF0dHJpYnV0ZShlbGVtZW50OiBhbnksIGF0dHJpYnV0ZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHJlbW92ZUF0dHJpYnV0ZU5TKGVsZW1lbnQ6IGFueSwgbnM6IHN0cmluZywgYXR0cmlidXRlOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgdGVtcGxhdGVBd2FyZVJvb3QoZWw6IGFueSkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjcmVhdGVIdG1sRG9jdW1lbnQoKTogSFRNTERvY3VtZW50IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0RGVmYXVsdERvY3VtZW50KCk6IERvY3VtZW50IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsOiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0VGl0bGUoZG9jOiBEb2N1bWVudCk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHNldFRpdGxlKGRvYzogRG9jdW1lbnQsIG5ld1RpdGxlOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZWxlbWVudE1hdGNoZXMobjogYW55LCBzZWxlY3Rvcjogc3RyaW5nKTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGlzVGVtcGxhdGVFbGVtZW50KGVsOiBhbnkpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaXNUZXh0Tm9kZShub2RlOiBhbnkpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaXNDb21tZW50Tm9kZShub2RlOiBhbnkpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaXNFbGVtZW50Tm9kZShub2RlOiBhbnkpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaGFzU2hhZG93Um9vdChub2RlOiBhbnkpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaXNTaGFkb3dSb290KG5vZGU6IGFueSk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBpbXBvcnRJbnRvRG9jKG5vZGU6IE5vZGUpOiBOb2RlIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgYWRvcHROb2RlKG5vZGU6IE5vZGUpOiBOb2RlIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0SHJlZihlbGVtZW50OiBhbnkpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRFdmVudEtleShldmVudDogYW55KTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcmVzb2x2ZUFuZFNldEhyZWYoZWxlbWVudDogYW55LCBiYXNlVXJsOiBzdHJpbmcsIGhyZWY6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzdXBwb3J0c0RPTUV2ZW50cygpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc3VwcG9ydHNOYXRpdmVTaGFkb3dET00oKTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEdsb2JhbEV2ZW50VGFyZ2V0KGRvYzogRG9jdW1lbnQsIHRhcmdldDogc3RyaW5nKTogYW55IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0SGlzdG9yeSgpOiBIaXN0b3J5IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0TG9jYXRpb24oKTogTG9jYXRpb24geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRCYXNlSHJlZihkb2M6IERvY3VtZW50KTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcmVzZXRCYXNlRWxlbWVudCgpOiB2b2lkIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0VXNlckFnZW50KCk6IHN0cmluZyB7IHJldHVybiAnRmFrZSB1c2VyIGFnZW50JzsgfVxuICBzZXREYXRhKGVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldENvbXB1dGVkU3R5bGUoZWxlbWVudDogYW55KTogYW55IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0RGF0YShlbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZyk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHBlcmZvcm1hbmNlTm93KCk6IG51bWJlciB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEFuaW1hdGlvblByZWZpeCgpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRUcmFuc2l0aW9uRW5kKCk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHN1cHBvcnRzQW5pbWF0aW9uKCk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzdXBwb3J0c1dlYkFuaW1hdGlvbigpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cblxuICBzdXBwb3J0c0Nvb2tpZXMoKTogYm9vbGVhbiB7IHJldHVybiBmYWxzZTsgfVxuICBnZXRDb29raWUobmFtZTogc3RyaW5nKTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc2V0Q29va2llKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxufVxuIl19