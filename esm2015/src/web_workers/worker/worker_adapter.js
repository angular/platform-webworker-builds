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
import { ɵDomAdapter as DomAdapter, ɵsetRootDomAdapter as setRootDomAdapter } from '@angular/platform-browser';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci93b3JrZXJfYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxXQUFXLElBQUksVUFBVSxFQUFFLGtCQUFrQixJQUFJLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7Ozs7OztBQU83RyxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsVUFBVTs7OztJQUM5QyxNQUFNLENBQUMsV0FBVyxLQUFLLGlCQUFpQixDQUFDLElBQUksZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFFbkUsR0FBRyxDQUFDLEtBQVU7UUFDWixzQ0FBc0M7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQixDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxLQUFVO1FBQ2pCLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtZQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0QjtpQkFBTTtnQkFDTCxzQ0FBc0M7Z0JBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDcEI7U0FDRjthQUFNO1lBQ0wsc0NBQXNDO1lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEI7SUFDSCxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUNwQixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDcEI7SUFDSCxDQUFDOzs7Ozs7O0lBRUQsV0FBVyxDQUFDLEVBQVcsRUFBRSxJQUFZLEVBQUUsS0FBVSxJQUFJLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDOzs7Ozs7SUFDL0UsV0FBVyxDQUFDLEVBQVcsRUFBRSxJQUFZLElBQVMsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUV4RSxhQUFhLENBQUMsRUFBTyxFQUFFLFFBQWdCLElBQWlCLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDOzs7Ozs7SUFDbEYsZ0JBQWdCLENBQUMsRUFBTyxFQUFFLFFBQWdCLElBQVcsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7SUFDL0UsV0FBVyxDQUFDLEVBQU8sRUFBRSxHQUFRLEVBQUUsUUFBYSxJQUFjLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDOzs7Ozs7SUFDcEYsYUFBYSxDQUFDLEVBQU8sRUFBRSxHQUFRLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQzdELFdBQVcsQ0FBQyxFQUFPLElBQVUsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQ3ZELGFBQWEsQ0FBQyxFQUFPLElBQVUsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQ3pELFVBQVUsQ0FBQyxFQUFPLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUNoRCxXQUFXLENBQUMsRUFBTyxFQUFFLElBQVMsSUFBSSxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQzs7Ozs7O0lBQzVELFdBQVcsQ0FBQyxFQUFPLEVBQUUsSUFBUyxJQUFJLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDOzs7OztJQUM1RCxNQUFNLENBQUMsRUFBTyxJQUFVLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0lBQ2xELFlBQVksQ0FBQyxNQUFXLEVBQUUsRUFBTyxFQUFFLElBQVMsSUFBSSxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQzs7Ozs7O0lBQzFFLE9BQU8sQ0FBQyxFQUFPLEVBQUUsS0FBYSxJQUFJLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDOzs7OztJQUM1RCxhQUFhLENBQUMsSUFBWSxJQUFTLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDOzs7Ozs7SUFDN0QsYUFBYSxDQUFDLE9BQVksRUFBRSxHQUFTLElBQWlCLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0lBQ2hGLGVBQWUsQ0FBQyxFQUFVLEVBQUUsT0FBZSxFQUFFLEdBQVMsSUFBYSxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQzs7Ozs7O0lBQzdGLGNBQWMsQ0FBQyxJQUFZLEVBQUUsR0FBUyxJQUFVLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDOzs7OztJQUMxRSxPQUFPLENBQUMsRUFBTyxJQUFTLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDOzs7Ozs7SUFDbEQsb0JBQW9CLENBQUMsT0FBWSxFQUFFLElBQVksSUFBbUIsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUM1RixRQUFRLENBQUMsT0FBWSxFQUFFLFNBQWlCLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUN0RSxXQUFXLENBQUMsT0FBWSxFQUFFLFNBQWlCLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7SUFDekUsUUFBUSxDQUFDLE9BQVksRUFBRSxTQUFpQixFQUFFLFVBQWtCLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUMxRixXQUFXLENBQUMsT0FBWSxFQUFFLFNBQWlCLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUN6RSxRQUFRLENBQUMsT0FBWSxFQUFFLFNBQWlCLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUM5RSxZQUFZLENBQUMsT0FBWSxFQUFFLFNBQWlCLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7SUFDbEYsWUFBWSxDQUFDLE9BQVksRUFBRSxJQUFZLEVBQUUsS0FBYSxJQUFJLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDOzs7Ozs7OztJQUNwRixjQUFjLENBQUMsT0FBWSxFQUFFLEVBQVUsRUFBRSxJQUFZLEVBQUUsS0FBYSxJQUFJLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDOzs7Ozs7SUFDbEcsZUFBZSxDQUFDLE9BQVksRUFBRSxTQUFpQixJQUFJLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0lBQzdFLGlCQUFpQixDQUFDLE9BQVksRUFBRSxFQUFVLEVBQUUsU0FBaUIsSUFBSSxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQzs7OztJQUMzRixrQkFBa0IsS0FBbUIsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7SUFDL0Qsa0JBQWtCLEtBQWUsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQzNELFFBQVEsQ0FBQyxHQUFhLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUM1RCxRQUFRLENBQUMsR0FBYSxFQUFFLFFBQWdCLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUN0RSxjQUFjLENBQUMsQ0FBTSxFQUFFLFFBQWdCLElBQWEsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQzlFLGFBQWEsQ0FBQyxJQUFTLElBQWEsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQzlELFlBQVksQ0FBQyxJQUFTLElBQWEsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQzdELFdBQVcsQ0FBQyxLQUFVLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7SUFDNUQsaUJBQWlCLEtBQWMsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUN6RCxvQkFBb0IsQ0FBQyxHQUFhLEVBQUUsTUFBYyxJQUFTLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDOzs7O0lBQ3JGLFVBQVUsS0FBYyxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQzs7OztJQUNsRCxXQUFXLEtBQWUsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQ3BELFdBQVcsQ0FBQyxHQUFhLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7SUFDL0QsZ0JBQWdCLEtBQVcsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7SUFDckQsWUFBWSxLQUFhLE9BQU8saUJBQWlCLENBQUMsQ0FBQyxDQUFDOzs7O0lBQ3BELGNBQWMsS0FBYSxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQzs7OztJQUVyRCxlQUFlLEtBQWMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7OztJQUM1QyxTQUFTLENBQUMsSUFBWSxJQUFZLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0NBQzdEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge8m1RG9tQWRhcHRlciBhcyBEb21BZGFwdGVyLCDJtXNldFJvb3REb21BZGFwdGVyIGFzIHNldFJvb3REb21BZGFwdGVyfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuLyoqXG4gKiBUaGlzIGFkYXB0ZXIgaXMgcmVxdWlyZWQgdG8gbG9nIGVycm9yIG1lc3NhZ2VzLlxuICpcbiAqIE5vdGU6IG90aGVyIG1ldGhvZHMgYWxsIHRocm93IGFzIHRoZSBET00gaXMgbm90IGFjY2Vzc2libGUgZGlyZWN0bHkgaW4gd2ViIHdvcmtlciBjb250ZXh0LlxuICovXG5leHBvcnQgY2xhc3MgV29ya2VyRG9tQWRhcHRlciBleHRlbmRzIERvbUFkYXB0ZXIge1xuICBzdGF0aWMgbWFrZUN1cnJlbnQoKSB7IHNldFJvb3REb21BZGFwdGVyKG5ldyBXb3JrZXJEb21BZGFwdGVyKCkpOyB9XG5cbiAgbG9nKGVycm9yOiBhbnkpIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfVxuXG4gIGxvZ0dyb3VwKGVycm9yOiBhbnkpIHtcbiAgICBpZiAoY29uc29sZS5ncm91cCkge1xuICAgICAgY29uc29sZS5ncm91cChlcnJvcik7XG4gICAgICBpZiAoY29uc29sZS5lcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBsb2dHcm91cEVuZCgpIHtcbiAgICBpZiAoY29uc29sZS5ncm91cEVuZCkge1xuICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xuICAgIH1cbiAgfVxuXG4gIHNldFByb3BlcnR5KGVsOiBFbGVtZW50LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0UHJvcGVydHkoZWw6IEVsZW1lbnQsIG5hbWU6IHN0cmluZyk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG5cbiAgcXVlcnlTZWxlY3RvcihlbDogYW55LCBzZWxlY3Rvcjogc3RyaW5nKTogSFRNTEVsZW1lbnQgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBxdWVyeVNlbGVjdG9yQWxsKGVsOiBhbnksIHNlbGVjdG9yOiBzdHJpbmcpOiBhbnlbXSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIG9uQW5kQ2FuY2VsKGVsOiBhbnksIGV2dDogYW55LCBsaXN0ZW5lcjogYW55KTogRnVuY3Rpb24geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBkaXNwYXRjaEV2ZW50KGVsOiBhbnksIGV2dDogYW55KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIG5leHRTaWJsaW5nKGVsOiBhbnkpOiBOb2RlIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcGFyZW50RWxlbWVudChlbDogYW55KTogTm9kZSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNsZWFyTm9kZXMoZWw6IGFueSkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBhcHBlbmRDaGlsZChlbDogYW55LCBub2RlOiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcmVtb3ZlQ2hpbGQoZWw6IGFueSwgbm9kZTogYW55KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHJlbW92ZShlbDogYW55KTogTm9kZSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGluc2VydEJlZm9yZShwYXJlbnQ6IGFueSwgZWw6IGFueSwgbm9kZTogYW55KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHNldFRleHQoZWw6IGFueSwgdmFsdWU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjcmVhdGVDb21tZW50KHRleHQ6IHN0cmluZyk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNyZWF0ZUVsZW1lbnQodGFnTmFtZTogYW55LCBkb2M/OiBhbnkpOiBIVE1MRWxlbWVudCB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNyZWF0ZUVsZW1lbnROUyhuczogc3RyaW5nLCB0YWdOYW1lOiBzdHJpbmcsIGRvYz86IGFueSk6IEVsZW1lbnQgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjcmVhdGVUZXh0Tm9kZSh0ZXh0OiBzdHJpbmcsIGRvYz86IGFueSk6IFRleHQgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRIb3N0KGVsOiBhbnkpOiBhbnkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRFbGVtZW50c0J5VGFnTmFtZShlbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZyk6IEhUTUxFbGVtZW50W10geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBhZGRDbGFzcyhlbGVtZW50OiBhbnksIGNsYXNzTmFtZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHJlbW92ZUNsYXNzKGVsZW1lbnQ6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc2V0U3R5bGUoZWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZywgc3R5bGVWYWx1ZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHJlbW92ZVN0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0U3R5bGUoZWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEF0dHJpYnV0ZShlbGVtZW50OiBhbnksIGF0dHJpYnV0ZTogc3RyaW5nKTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc2V0QXR0cmlidXRlKGVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHNldEF0dHJpYnV0ZU5TKGVsZW1lbnQ6IGFueSwgbnM6IHN0cmluZywgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHJlbW92ZUF0dHJpYnV0ZShlbGVtZW50OiBhbnksIGF0dHJpYnV0ZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHJlbW92ZUF0dHJpYnV0ZU5TKGVsZW1lbnQ6IGFueSwgbnM6IHN0cmluZywgYXR0cmlidXRlOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY3JlYXRlSHRtbERvY3VtZW50KCk6IEhUTUxEb2N1bWVudCB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldERlZmF1bHREb2N1bWVudCgpOiBEb2N1bWVudCB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldFRpdGxlKGRvYzogRG9jdW1lbnQpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzZXRUaXRsZShkb2M6IERvY3VtZW50LCBuZXdUaXRsZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGVsZW1lbnRNYXRjaGVzKG46IGFueSwgc2VsZWN0b3I6IHN0cmluZyk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBpc0VsZW1lbnROb2RlKG5vZGU6IGFueSk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBpc1NoYWRvd1Jvb3Qobm9kZTogYW55KTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEV2ZW50S2V5KGV2ZW50OiBhbnkpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzdXBwb3J0c0RPTUV2ZW50cygpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0R2xvYmFsRXZlbnRUYXJnZXQoZG9jOiBEb2N1bWVudCwgdGFyZ2V0OiBzdHJpbmcpOiBhbnkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRIaXN0b3J5KCk6IEhpc3RvcnkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRMb2NhdGlvbigpOiBMb2NhdGlvbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEJhc2VIcmVmKGRvYzogRG9jdW1lbnQpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICByZXNldEJhc2VFbGVtZW50KCk6IHZvaWQgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRVc2VyQWdlbnQoKTogc3RyaW5nIHsgcmV0dXJuICdGYWtlIHVzZXIgYWdlbnQnOyB9XG4gIHBlcmZvcm1hbmNlTm93KCk6IG51bWJlciB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG5cbiAgc3VwcG9ydHNDb29raWVzKCk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cbiAgZ2V0Q29va2llKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG59XG4iXX0=