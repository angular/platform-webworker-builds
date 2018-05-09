/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
    logError(error) {
        if (console.error) {
            console.error(error);
        }
        else {
            // tslint:disable-next-line:no-console
            console.log(error);
        }
    }
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
            this.logError(error);
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
     * @param {?} nodeA
     * @param {?} nodeB
     * @return {?}
     */
    contains(nodeA, nodeB) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    hasProperty(element, name) { throw 'not implemented'; }
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
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    invoke(el, methodName, args) { throw 'not implemented'; }
    /**
     * @return {?}
     */
    get attrToPropMap() { throw 'not implemented'; }
    /**
     * @param {?} value
     * @return {?}
     */
    set attrToPropMap(value) { throw 'not implemented'; }
    /**
     * @param {?} templateHtml
     * @return {?}
     */
    parse(templateHtml) { throw 'not implemented'; }
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
    on(el, evt, listener) { throw 'not implemented'; }
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
     * @param {?} eventType
     * @return {?}
     */
    createMouseEvent(eventType) { throw 'not implemented'; }
    /**
     * @param {?} eventType
     * @return {?}
     */
    createEvent(eventType) { throw 'not implemented'; }
    /**
     * @param {?} evt
     * @return {?}
     */
    preventDefault(evt) { throw 'not implemented'; }
    /**
     * @param {?} evt
     * @return {?}
     */
    isPrevented(evt) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getInnerHTML(el) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getTemplateContent(el) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getOuterHTML(el) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    nodeName(node) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    nodeValue(node) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    type(node) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    content(node) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    firstChild(el) { throw 'not implemented'; }
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
    childNodes(el) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    childNodesAsList(el) { throw 'not implemented'; }
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
     * @param {?} newNode
     * @param {?} oldNode
     * @return {?}
     */
    replaceChild(el, newNode, oldNode) { throw 'not implemented'; }
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
     * @param {?} parent
     * @param {?} el
     * @param {?} nodes
     * @return {?}
     */
    insertAllBefore(parent, el, nodes) { throw 'not implemented'; }
    /**
     * @param {?} parent
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    insertAfter(parent, el, node) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setInnerHTML(el, value) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getText(el) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setText(el, value) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getValue(el) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setValue(el, value) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getChecked(el) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setChecked(el, value) { throw 'not implemented'; }
    /**
     * @param {?} text
     * @return {?}
     */
    createComment(text) { throw 'not implemented'; }
    /**
     * @param {?} html
     * @return {?}
     */
    createTemplate(html) { throw 'not implemented'; }
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
     * @param {?} attrName
     * @param {?} attrValue
     * @param {?=} doc
     * @return {?}
     */
    createScriptTag(attrName, attrValue, doc) {
        throw 'not implemented';
    }
    /**
     * @param {?} css
     * @param {?=} doc
     * @return {?}
     */
    createStyleElement(css, doc) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    createShadowRoot(el) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getShadowRoot(el) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getHost(el) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getDistributedNodes(el) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    clone(node) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getElementsByClassName(element, name) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getElementsByTagName(element, name) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @return {?}
     */
    classList(element) { throw 'not implemented'; }
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
     * @param {?} className
     * @return {?}
     */
    hasClass(element, className) { throw 'not implemented'; }
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
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    hasStyle(element, styleName, styleValue) {
        throw 'not implemented';
    }
    /**
     * @param {?} element
     * @return {?}
     */
    tagName(element) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @return {?}
     */
    attributeMap(element) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    hasAttribute(element, attribute) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    hasAttributeNS(element, ns, attribute) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    getAttribute(element, attribute) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    getAttributeNS(element, ns, attribute) { throw 'not implemented'; }
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
     * @param {?} el
     * @return {?}
     */
    templateAwareRoot(el) { throw 'not implemented'; }
    /**
     * @return {?}
     */
    createHtmlDocument() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    getDefaultDocument() { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getBoundingClientRect(el) { throw 'not implemented'; }
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
     * @param {?} el
     * @return {?}
     */
    isTemplateElement(el) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    isTextNode(node) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    isCommentNode(node) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    isElementNode(node) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    hasShadowRoot(node) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    isShadowRoot(node) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    importIntoDoc(node) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    adoptNode(node) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @return {?}
     */
    getHref(element) { throw 'not implemented'; }
    /**
     * @param {?} event
     * @return {?}
     */
    getEventKey(event) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} baseUrl
     * @param {?} href
     * @return {?}
     */
    resolveAndSetHref(element, baseUrl, href) { throw 'not implemented'; }
    /**
     * @return {?}
     */
    supportsDOMEvents() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    supportsNativeShadowDOM() { throw 'not implemented'; }
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
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setData(element, name, value) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @return {?}
     */
    getComputedStyle(element) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getData(element, name) { throw 'not implemented'; }
    /**
     * @return {?}
     */
    performanceNow() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    getAnimationPrefix() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    getTransitionEnd() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    supportsAnimation() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    supportsWebAnimation() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    supportsCookies() { return false; }
    /**
     * @param {?} name
     * @return {?}
     */
    getCookie(name) { throw 'not implemented'; }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setCookie(name, value) { throw 'not implemented'; }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci93b3JrZXJfYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxXQUFXLElBQUksVUFBVSxFQUFFLGtCQUFrQixJQUFJLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7Ozs7OztBQU83RyxNQUFNLHVCQUF3QixTQUFRLFVBQVU7Ozs7SUFDOUMsTUFBTSxDQUFDLFdBQVcsS0FBSyxpQkFBaUIsQ0FBQyxJQUFJLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxFQUFFOzs7OztJQUVuRSxRQUFRLENBQUMsS0FBVTtRQUNqQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNsQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3RCO1FBQUMsSUFBSSxDQUFDLENBQUM7O1lBRU4sT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQjtLQUNGOzs7OztJQUVELEdBQUcsQ0FBQyxLQUFVOztRQUVaLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDcEI7Ozs7O0lBRUQsUUFBUSxDQUFDLEtBQVU7UUFDakIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3RCO1FBQUMsSUFBSSxDQUFDLENBQUM7O1lBRU4sT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQjtLQUNGOzs7O0lBRUQsV0FBVztRQUNULEVB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S0FBYSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7SUFDckQsa0JBQWtCLEtBQWEsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7O0lBQ3pELGdCQUFnQixLQUFhLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7OztJQUN2RCxpQkFBaUIsS0FBYyxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7SUFDekQsb0JBQW9CLEtBQWMsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7O0lBRTVELGVBQWUsS0FBYyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7Ozs7O0lBQzVDLFNBQVMsQ0FBQyxJQUFZLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7Ozs7SUFDNUQsU0FBUyxDQUFDLElBQVksRUFBRSxLQUFhLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFO0NBQ3BFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge8m1RG9tQWRhcHRlciBhcyBEb21BZGFwdGVyLCDJtXNldFJvb3REb21BZGFwdGVyIGFzIHNldFJvb3REb21BZGFwdGVyfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuLyoqXG4gKiBUaGlzIGFkYXB0ZXIgaXMgcmVxdWlyZWQgdG8gbG9nIGVycm9yIG1lc3NhZ2VzLlxuICpcbiAqIE5vdGU6IG90aGVyIG1ldGhvZHMgYWxsIHRocm93IGFzIHRoZSBET00gaXMgbm90IGFjY2Vzc2libGUgZGlyZWN0bHkgaW4gd2ViIHdvcmtlciBjb250ZXh0LlxuICovXG5leHBvcnQgY2xhc3MgV29ya2VyRG9tQWRhcHRlciBleHRlbmRzIERvbUFkYXB0ZXIge1xuICBzdGF0aWMgbWFrZUN1cnJlbnQoKSB7IHNldFJvb3REb21BZGFwdGVyKG5ldyBXb3JrZXJEb21BZGFwdGVyKCkpOyB9XG5cbiAgbG9nRXJyb3IoZXJyb3I6IGFueSkge1xuICAgIGlmIChjb25zb2xlLmVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBsb2coZXJyb3I6IGFueSkge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICB9XG5cbiAgbG9nR3JvdXAoZXJyb3I6IGFueSkge1xuICAgIGlmIChjb25zb2xlLmdyb3VwKSB7XG4gICAgICBjb25zb2xlLmdyb3VwKGVycm9yKTtcbiAgICAgIHRoaXMubG9nRXJyb3IoZXJyb3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGxvZ0dyb3VwRW5kKCkge1xuICAgIGlmIChjb25zb2xlLmdyb3VwRW5kKSB7XG4gICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgfVxuICB9XG5cbiAgY29udGFpbnMobm9kZUE6IGFueSwgbm9kZUI6IGFueSk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBoYXNQcm9wZXJ0eShlbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZyk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzZXRQcm9wZXJ0eShlbDogRWxlbWVudCwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldFByb3BlcnR5KGVsOiBFbGVtZW50LCBuYW1lOiBzdHJpbmcpOiBhbnkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBpbnZva2UoZWw6IEVsZW1lbnQsIG1ldGhvZE5hbWU6IHN0cmluZywgYXJnczogYW55W10pOiBhbnkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuXG4gIGdldCBhdHRyVG9Qcm9wTWFwKCk6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc2V0IGF0dHJUb1Byb3BNYXAodmFsdWU6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG5cbiAgcGFyc2UodGVtcGxhdGVIdG1sOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcXVlcnlTZWxlY3RvcihlbDogYW55LCBzZWxlY3Rvcjogc3RyaW5nKTogSFRNTEVsZW1lbnQgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBxdWVyeVNlbGVjdG9yQWxsKGVsOiBhbnksIHNlbGVjdG9yOiBzdHJpbmcpOiBhbnlbXSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIG9uKGVsOiBhbnksIGV2dDogYW55LCBsaXN0ZW5lcjogYW55KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIG9uQW5kQ2FuY2VsKGVsOiBhbnksIGV2dDogYW55LCBsaXN0ZW5lcjogYW55KTogRnVuY3Rpb24geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBkaXNwYXRjaEV2ZW50KGVsOiBhbnksIGV2dDogYW55KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNyZWF0ZU1vdXNlRXZlbnQoZXZlbnRUeXBlOiBhbnkpOiBhbnkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjcmVhdGVFdmVudChldmVudFR5cGU6IHN0cmluZyk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHByZXZlbnREZWZhdWx0KGV2dDogYW55KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGlzUHJldmVudGVkKGV2dDogYW55KTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldElubmVySFRNTChlbDogYW55KTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0VGVtcGxhdGVDb250ZW50KGVsOiBhbnkpOiBhbnkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRPdXRlckhUTUwoZWw6IGFueSk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIG5vZGVOYW1lKG5vZGU6IGFueSk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIG5vZGVWYWx1ZShub2RlOiBhbnkpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICB0eXBlKG5vZGU6IGFueSk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNvbnRlbnQobm9kZTogYW55KTogYW55IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZmlyc3RDaGlsZChlbDogYW55KTogTm9kZSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIG5leHRTaWJsaW5nKGVsOiBhbnkpOiBOb2RlIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcGFyZW50RWxlbWVudChlbDogYW55KTogTm9kZSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNoaWxkTm9kZXMoZWw6IGFueSk6IE5vZGVbXSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNoaWxkTm9kZXNBc0xpc3QoZWw6IGFueSk6IE5vZGVbXSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNsZWFyTm9kZXMoZWw6IGFueSkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBhcHBlbmRDaGlsZChlbDogYW55LCBub2RlOiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcmVtb3ZlQ2hpbGQoZWw6IGFueSwgbm9kZTogYW55KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHJlcGxhY2VDaGlsZChlbDogYW55LCBuZXdOb2RlOiBhbnksIG9sZE5vZGU6IGFueSkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICByZW1vdmUoZWw6IGFueSk6IE5vZGUgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBpbnNlcnRCZWZvcmUocGFyZW50OiBhbnksIGVsOiBhbnksIG5vZGU6IGFueSkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBpbnNlcnRBbGxCZWZvcmUocGFyZW50OiBhbnksIGVsOiBhbnksIG5vZGVzOiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaW5zZXJ0QWZ0ZXIocGFyZW50OiBhbnksIGVsOiBhbnksIG5vZGU6IGFueSkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzZXRJbm5lckhUTUwoZWw6IGFueSwgdmFsdWU6IGFueSkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRUZXh0KGVsOiBhbnkpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzZXRUZXh0KGVsOiBhbnksIHZhbHVlOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0VmFsdWUoZWw6IGFueSk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHNldFZhbHVlKGVsOiBhbnksIHZhbHVlOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0Q2hlY2tlZChlbDogYW55KTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHNldENoZWNrZWQoZWw6IGFueSwgdmFsdWU6IGJvb2xlYW4pIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY3JlYXRlQ29tbWVudCh0ZXh0OiBzdHJpbmcpOiBhbnkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjcmVhdGVUZW1wbGF0ZShodG1sOiBhbnkpOiBIVE1MRWxlbWVudCB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNyZWF0ZUVsZW1lbnQodGFnTmFtZTogYW55LCBkb2M/OiBhbnkpOiBIVE1MRWxlbWVudCB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNyZWF0ZUVsZW1lbnROUyhuczogc3RyaW5nLCB0YWdOYW1lOiBzdHJpbmcsIGRvYz86IGFueSk6IEVsZW1lbnQgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjcmVhdGVUZXh0Tm9kZSh0ZXh0OiBzdHJpbmcsIGRvYz86IGFueSk6IFRleHQgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjcmVhdGVTY3JpcHRUYWcoYXR0ck5hbWU6IHN0cmluZywgYXR0clZhbHVlOiBzdHJpbmcsIGRvYz86IGFueSk6IEhUTUxFbGVtZW50IHtcbiAgICB0aHJvdyAnbm90IGltcGxlbWVudGVkJztcbiAgfVxuICBjcmVhdGVTdHlsZUVsZW1lbnQoY3NzOiBzdHJpbmcsIGRvYz86IGFueSk6IEhUTUxTdHlsZUVsZW1lbnQgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjcmVhdGVTaGFkb3dSb290KGVsOiBhbnkpOiBhbnkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRTaGFkb3dSb290KGVsOiBhbnkpOiBhbnkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRIb3N0KGVsOiBhbnkpOiBhbnkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXREaXN0cmlidXRlZE5vZGVzKGVsOiBhbnkpOiBOb2RlW10geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjbG9uZShub2RlOiBOb2RlKTogTm9kZSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEVsZW1lbnRzQnlDbGFzc05hbWUoZWxlbWVudDogYW55LCBuYW1lOiBzdHJpbmcpOiBIVE1MRWxlbWVudFtdIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0RWxlbWVudHNCeVRhZ05hbWUoZWxlbWVudDogYW55LCBuYW1lOiBzdHJpbmcpOiBIVE1MRWxlbWVudFtdIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY2xhc3NMaXN0KGVsZW1lbnQ6IGFueSk6IGFueVtdIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgYWRkQ2xhc3MoZWxlbWVudDogYW55LCBjbGFzc05hbWU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICByZW1vdmVDbGFzcyhlbGVtZW50OiBhbnksIGNsYXNzTmFtZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGhhc0NsYXNzKGVsZW1lbnQ6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc2V0U3R5bGUoZWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZywgc3R5bGVWYWx1ZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHJlbW92ZVN0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0U3R5bGUoZWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGhhc1N0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcsIHN0eWxlVmFsdWU/OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICB0aHJvdyAnbm90IGltcGxlbWVudGVkJztcbiAgfVxuICB0YWdOYW1lKGVsZW1lbnQ6IGFueSk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGF0dHJpYnV0ZU1hcChlbGVtZW50OiBhbnkpOiBNYXA8c3RyaW5nLCBzdHJpbmc+IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaGFzQXR0cmlidXRlKGVsZW1lbnQ6IGFueSwgYXR0cmlidXRlOiBzdHJpbmcpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaGFzQXR0cmlidXRlTlMoZWxlbWVudDogYW55LCBuczogc3RyaW5nLCBhdHRyaWJ1dGU6IHN0cmluZyk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRBdHRyaWJ1dGUoZWxlbWVudDogYW55LCBhdHRyaWJ1dGU6IHN0cmluZyk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEF0dHJpYnV0ZU5TKGVsZW1lbnQ6IGFueSwgbnM6IHN0cmluZywgYXR0cmlidXRlOiBzdHJpbmcpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzZXRBdHRyaWJ1dGUoZWxlbWVudDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc2V0QXR0cmlidXRlTlMoZWxlbWVudDogYW55LCBuczogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcmVtb3ZlQXR0cmlidXRlKGVsZW1lbnQ6IGFueSwgYXR0cmlidXRlOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcmVtb3ZlQXR0cmlidXRlTlMoZWxlbWVudDogYW55LCBuczogc3RyaW5nLCBhdHRyaWJ1dGU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICB0ZW1wbGF0ZUF3YXJlUm9vdChlbDogYW55KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNyZWF0ZUh0bWxEb2N1bWVudCgpOiBIVE1MRG9jdW1lbnQgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXREZWZhdWx0RG9jdW1lbnQoKTogRG9jdW1lbnQgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWw6IGFueSkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRUaXRsZShkb2M6IERvY3VtZW50KTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc2V0VGl0bGUoZG9jOiBEb2N1bWVudCwgbmV3VGl0bGU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBlbGVtZW50TWF0Y2hlcyhuOiBhbnksIHNlbGVjdG9yOiBzdHJpbmcpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaXNUZW1wbGF0ZUVsZW1lbnQoZWw6IGFueSk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBpc1RleHROb2RlKG5vZGU6IGFueSk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBpc0NvbW1lbnROb2RlKG5vZGU6IGFueSk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBpc0VsZW1lbnROb2RlKG5vZGU6IGFueSk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBoYXNTaGFkb3dSb290KG5vZGU6IGFueSk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBpc1NoYWRvd1Jvb3Qobm9kZTogYW55KTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGltcG9ydEludG9Eb2Mobm9kZTogTm9kZSk6IE5vZGUgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBhZG9wdE5vZGUobm9kZTogTm9kZSk6IE5vZGUgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRIcmVmKGVsZW1lbnQ6IGFueSk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEV2ZW50S2V5KGV2ZW50OiBhbnkpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICByZXNvbHZlQW5kU2V0SHJlZihlbGVtZW50OiBhbnksIGJhc2VVcmw6IHN0cmluZywgaHJlZjogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHN1cHBvcnRzRE9NRXZlbnRzKCk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzdXBwb3J0c05hdGl2ZVNoYWRvd0RPTSgpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0R2xvYmFsRXZlbnRUYXJnZXQoZG9jOiBEb2N1bWVudCwgdGFyZ2V0OiBzdHJpbmcpOiBhbnkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRIaXN0b3J5KCk6IEhpc3RvcnkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRMb2NhdGlvbigpOiBMb2NhdGlvbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEJhc2VIcmVmKGRvYzogRG9jdW1lbnQpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICByZXNldEJhc2VFbGVtZW50KCk6IHZvaWQgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRVc2VyQWdlbnQoKTogc3RyaW5nIHsgcmV0dXJuICdGYWtlIHVzZXIgYWdlbnQnOyB9XG4gIHNldERhdGEoZWxlbWVudDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50OiBhbnkpOiBhbnkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXREYXRhKGVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nKTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcGVyZm9ybWFuY2VOb3coKTogbnVtYmVyIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0QW5pbWF0aW9uUHJlZml4KCk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldFRyYW5zaXRpb25FbmQoKTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc3VwcG9ydHNBbmltYXRpb24oKTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHN1cHBvcnRzV2ViQW5pbWF0aW9uKCk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuXG4gIHN1cHBvcnRzQ29va2llcygpOiBib29sZWFuIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGdldENvb2tpZShuYW1lOiBzdHJpbmcpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzZXRDb29raWUobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG59XG4iXX0=