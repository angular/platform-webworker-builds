/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵDomAdapter as DomAdapter, ɵsetRootDomAdapter as setRootDomAdapter } from '@angular/common';
/**
 * This adapter is required to log error messages.
 *
 * Note: other methods all throw as the DOM is not accessible directly in web worker context.
 */
export class WorkerDomAdapter extends DomAdapter {
    /**
     * @return {?}
     */
    static makeCurrent() { setRootDomAdapter(new WorkerDomAdapter()); }
    /**
     * @param {?} error
     * @return {?}
     */
    log(error) {
        // tslint:disable-next-line:no-console
        console.log(error);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    logGroup(error) {
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
    }
    /**
     * @return {?}
     */
    logGroupEnd() {
        if (console.groupEnd) {
            console.groupEnd();
        }
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setProperty(el, name, value) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    getProperty(el, name) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    querySelector(el, selector) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    querySelectorAll(el, selector) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    onAndCancel(el, evt, listener) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */
    dispatchEvent(el, evt) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    nextSibling(el) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    parentElement(el) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    clearNodes(el) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    appendChild(el, node) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    removeChild(el, node) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    remove(el) { throw 'not implemented'; }
    /**
     * @param {?} parent
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    insertBefore(parent, el, node) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setText(el, value) { throw 'not implemented'; }
    /**
     * @param {?} text
     * @return {?}
     */
    createComment(text) { throw 'not implemented'; }
    /**
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    createElement(tagName, doc) { throw 'not implemented'; }
    /**
     * @param {?} ns
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    createElementNS(ns, tagName, doc) { throw 'not implemented'; }
    /**
     * @param {?} text
     * @param {?=} doc
     * @return {?}
     */
    createTextNode(text, doc) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getHost(el) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getElementsByTagName(element, name) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    addClass(element, className) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    removeClass(element, className) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    setStyle(element, styleName, styleValue) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    removeStyle(element, styleName) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    getStyle(element, styleName) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    getAttribute(element, attribute) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setAttribute(element, name, value) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setAttributeNS(element, ns, name, value) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    removeAttribute(element, attribute) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    removeAttributeNS(element, ns, attribute) { throw 'not implemented'; }
    /**
     * @return {?}
     */
    createHtmlDocument() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    getDefaultDocument() { throw 'not implemented'; }
    /**
     * @param {?} doc
     * @return {?}
     */
    getTitle(doc) { throw 'not implemented'; }
    /**
     * @param {?} doc
     * @param {?} newTitle
     * @return {?}
     */
    setTitle(doc, newTitle) { throw 'not implemented'; }
    /**
     * @param {?} n
     * @param {?} selector
     * @return {?}
     */
    elementMatches(n, selector) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    isElementNode(node) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    isShadowRoot(node) { throw 'not implemented'; }
    /**
     * @param {?} event
     * @return {?}
     */
    getEventKey(event) { throw 'not implemented'; }
    /**
     * @return {?}
     */
    supportsDOMEvents() { throw 'not implemented'; }
    /**
     * @param {?} doc
     * @param {?} target
     * @return {?}
     */
    getGlobalEventTarget(doc, target) { throw 'not implemented'; }
    /**
     * @return {?}
     */
    getHistory() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    getLocation() { throw 'not implemented'; }
    /**
     * @param {?} doc
     * @return {?}
     */
    getBaseHref(doc) { throw 'not implemented'; }
    /**
     * @return {?}
     */
    resetBaseElement() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    getUserAgent() { return 'Fake user agent'; }
    /**
     * @return {?}
     */
    performanceNow() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    supportsCookies() { return false; }
    /**
     * @param {?} name
     * @return {?}
     */
    getCookie(name) { throw 'not implemented'; }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci93b3JrZXJfYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxXQUFXLElBQUksVUFBVSxFQUFFLGtCQUFrQixJQUFJLGlCQUFpQixFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7OztBQU9uRyxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsVUFBVTs7OztJQUM5QyxNQUFNLENBQUMsV0FBVyxLQUFLLGlCQUFpQixDQUFDLElBQUksZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFFbkUsR0FBRyxDQUFDLEtBQVU7UUFDWixzQ0FBc0M7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQixDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxLQUFVO1FBQ2pCLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtZQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0QjtpQkFBTTtnQkFDTCxzQ0FBc0M7Z0JBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDcEI7U0FDRjthQUFNO1lBQ0wsc0NBQXNDO1lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEI7SUFDSCxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUNwQixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDcEI7SUFDSCxDQUFDOzs7Ozs7O0lBRUQs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QUMsQ0FBQzs7OztJQUNsRCxXQUFXLEtBQWUsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQ3BELFdBQVcsQ0FBQyxHQUFhLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7SUFDL0QsZ0JBQWdCLEtBQVcsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7SUFDckQsWUFBWSxLQUFhLE9BQU8saUJBQWlCLENBQUMsQ0FBQyxDQUFDOzs7O0lBQ3BELGNBQWMsS0FBYSxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQzs7OztJQUVyRCxlQUFlLEtBQWMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7OztJQUM1QyxTQUFTLENBQUMsSUFBWSxJQUFZLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0NBQzdEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge8m1RG9tQWRhcHRlciBhcyBEb21BZGFwdGVyLCDJtXNldFJvb3REb21BZGFwdGVyIGFzIHNldFJvb3REb21BZGFwdGVyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG4vKipcbiAqIFRoaXMgYWRhcHRlciBpcyByZXF1aXJlZCB0byBsb2cgZXJyb3IgbWVzc2FnZXMuXG4gKlxuICogTm90ZTogb3RoZXIgbWV0aG9kcyBhbGwgdGhyb3cgYXMgdGhlIERPTSBpcyBub3QgYWNjZXNzaWJsZSBkaXJlY3RseSBpbiB3ZWIgd29ya2VyIGNvbnRleHQuXG4gKi9cbmV4cG9ydCBjbGFzcyBXb3JrZXJEb21BZGFwdGVyIGV4dGVuZHMgRG9tQWRhcHRlciB7XG4gIHN0YXRpYyBtYWtlQ3VycmVudCgpIHsgc2V0Um9vdERvbUFkYXB0ZXIobmV3IFdvcmtlckRvbUFkYXB0ZXIoKSk7IH1cblxuICBsb2coZXJyb3I6IGFueSkge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICB9XG5cbiAgbG9nR3JvdXAoZXJyb3I6IGFueSkge1xuICAgIGlmIChjb25zb2xlLmdyb3VwKSB7XG4gICAgICBjb25zb2xlLmdyb3VwKGVycm9yKTtcbiAgICAgIGlmIChjb25zb2xlLmVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGxvZ0dyb3VwRW5kKCkge1xuICAgIGlmIChjb25zb2xlLmdyb3VwRW5kKSB7XG4gICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgfVxuICB9XG5cbiAgc2V0UHJvcGVydHkoZWw6IEVsZW1lbnQsIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRQcm9wZXJ0eShlbDogRWxlbWVudCwgbmFtZTogc3RyaW5nKTogYW55IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cblxuICBxdWVyeVNlbGVjdG9yKGVsOiBhbnksIHNlbGVjdG9yOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHF1ZXJ5U2VsZWN0b3JBbGwoZWw6IGFueSwgc2VsZWN0b3I6IHN0cmluZyk6IGFueVtdIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgb25BbmRDYW5jZWwoZWw6IGFueSwgZXZ0OiBhbnksIGxpc3RlbmVyOiBhbnkpOiBGdW5jdGlvbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGRpc3BhdGNoRXZlbnQoZWw6IGFueSwgZXZ0OiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgbmV4dFNpYmxpbmcoZWw6IGFueSk6IE5vZGUgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBwYXJlbnRFbGVtZW50KGVsOiBhbnkpOiBOb2RlIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY2xlYXJOb2RlcyhlbDogYW55KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGFwcGVuZENoaWxkKGVsOiBhbnksIG5vZGU6IGFueSkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICByZW1vdmVDaGlsZChlbDogYW55LCBub2RlOiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcmVtb3ZlKGVsOiBhbnkpOiBOb2RlIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaW5zZXJ0QmVmb3JlKHBhcmVudDogYW55LCBlbDogYW55LCBub2RlOiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc2V0VGV4dChlbDogYW55LCB2YWx1ZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNyZWF0ZUNvbW1lbnQodGV4dDogc3RyaW5nKTogYW55IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY3JlYXRlRWxlbWVudCh0YWdOYW1lOiBhbnksIGRvYz86IGFueSk6IEhUTUxFbGVtZW50IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY3JlYXRlRWxlbWVudE5TKG5zOiBzdHJpbmcsIHRhZ05hbWU6IHN0cmluZywgZG9jPzogYW55KTogRWxlbWVudCB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNyZWF0ZVRleHROb2RlKHRleHQ6IHN0cmluZywgZG9jPzogYW55KTogVGV4dCB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEhvc3QoZWw6IGFueSk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEVsZW1lbnRzQnlUYWdOYW1lKGVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nKTogSFRNTEVsZW1lbnRbXSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGFkZENsYXNzKGVsZW1lbnQ6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcmVtb3ZlQ2xhc3MoZWxlbWVudDogYW55LCBjbGFzc05hbWU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzZXRTdHlsZShlbGVtZW50OiBhbnksIHN0eWxlTmFtZTogc3RyaW5nLCBzdHlsZVZhbHVlOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcmVtb3ZlU3R5bGUoZWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRTdHlsZShlbGVtZW50OiBhbnksIHN0eWxlTmFtZTogc3RyaW5nKTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0QXR0cmlidXRlKGVsZW1lbnQ6IGFueSwgYXR0cmlidXRlOiBzdHJpbmcpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzZXRBdHRyaWJ1dGUoZWxlbWVudDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc2V0QXR0cmlidXRlTlMoZWxlbWVudDogYW55LCBuczogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcmVtb3ZlQXR0cmlidXRlKGVsZW1lbnQ6IGFueSwgYXR0cmlidXRlOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcmVtb3ZlQXR0cmlidXRlTlMoZWxlbWVudDogYW55LCBuczogc3RyaW5nLCBhdHRyaWJ1dGU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjcmVhdGVIdG1sRG9jdW1lbnQoKTogSFRNTERvY3VtZW50IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0RGVmYXVsdERvY3VtZW50KCk6IERvY3VtZW50IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0VGl0bGUoZG9jOiBEb2N1bWVudCk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHNldFRpdGxlKGRvYzogRG9jdW1lbnQsIG5ld1RpdGxlOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZWxlbWVudE1hdGNoZXMobjogYW55LCBzZWxlY3Rvcjogc3RyaW5nKTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGlzRWxlbWVudE5vZGUobm9kZTogYW55KTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGlzU2hhZG93Um9vdChub2RlOiBhbnkpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0RXZlbnRLZXkoZXZlbnQ6IGFueSk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHN1cHBvcnRzRE9NRXZlbnRzKCk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRHbG9iYWxFdmVudFRhcmdldChkb2M6IERvY3VtZW50LCB0YXJnZXQ6IHN0cmluZyk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEhpc3RvcnkoKTogSGlzdG9yeSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldExvY2F0aW9uKCk6IExvY2F0aW9uIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0QmFzZUhyZWYoZG9jOiBEb2N1bWVudCk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHJlc2V0QmFzZUVsZW1lbnQoKTogdm9pZCB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldFVzZXJBZ2VudCgpOiBzdHJpbmcgeyByZXR1cm4gJ0Zha2UgdXNlciBhZ2VudCc7IH1cbiAgcGVyZm9ybWFuY2VOb3coKTogbnVtYmVyIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cblxuICBzdXBwb3J0c0Nvb2tpZXMoKTogYm9vbGVhbiB7IHJldHVybiBmYWxzZTsgfVxuICBnZXRDb29raWUobmFtZTogc3RyaW5nKTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbn1cbiJdfQ==