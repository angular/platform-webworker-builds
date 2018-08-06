/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci93b3JrZXJfYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxXQUFXLElBQUksVUFBVSxFQUFFLGtCQUFrQixJQUFJLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7Ozs7OztBQU83RyxNQUFNLHVCQUF3QixTQUFRLFVBQVU7Ozs7SUFDOUMsTUFBTSxDQUFDLFdBQVcsS0FBSyxpQkFBaUIsQ0FBQyxJQUFJLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxFQUFFOzs7OztJQUVuRSxRQUFRLENBQUMsS0FBVTtRQUNqQixJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN0QjthQUFNOztZQUVMLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEI7S0FDRjs7Ozs7SUFFRCxHQUFHLENBQUMsS0FBVTs7UUFFWixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3BCOzs7OztJQUVELFFBQVEsQ0FBQyxLQUFVO1FBQ2pCLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtZQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEI7YUFBTTs7WUFFTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BCO0tBQ0Y7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQ3BCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNwQjtLQUNGOzs7Ozs7SUFFRCxRQUFRLENBQUMsS0FBVSxFQUFFLEtBQVUsSUFBYSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7OztJQUN0RSxXQUFXLENBQUMsT0FBWSxFQUFFLElBQVksSUFBYSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7Ozs7SUFDN0UsV0FBVyxDQUFDLEVBQVcsRUFBRSxJQUFZLEVBQUUsS0FBVSxJQUFJLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7O0lBQy9FLFdBQVcsQ0FBQyxFQUFXLEVBQUUsSUFBWSxJQUFTLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7OztJQUN4RSxNQUFNLENBQUMsRUFBVyxFQUFFLFVBQWtCLEVBQUUsSUFBVyxJQUFTLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7OztJQUV0RixJQUFJLGFBQWEsS0FBOEIsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7OztJQUN6RSxJQUFJLGFBQWEsQ0FBQyxLQUE4QixJQUFJLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7SUFFOUUsS0FBSyxDQUFDLFlBQW9CLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7Ozs7SUFDeEQsYUFBYSxDQUFDLEVBQU8sRUFBRSxRQUFnQixJQUFpQixNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7OztJQUNsRixnQkFBZ0IsQ0FBQyxFQUFPLEVBQUUsUUFBZ0IsSUFBVyxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7Ozs7SUFDL0UsRUFBRSxDQUFDLEVBQU8sRUFBRSxHQUFRLEVBQUUsUUFBYSxJQUFJLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7OztJQUNqRSxXQUFXLENBQUMsRUFBTyxFQUFFLEdBQVEsRUFBRSxRQUFhLElBQWMsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7Ozs7SUFDcEYsYUFBYSxDQUFDLEVBQU8sRUFBRSxHQUFRLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7OztJQUM3RCxnQkFBZ0IsQ0FBQyxTQUFjLElBQVMsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7OztJQUNsRSxXQUFXLENBQUMsU0FBaUIsSUFBUyxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7O0lBQ2hFLGNBQWMsQ0FBQyxHQUFRLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7OztJQUNyRCxXQUFXLENBQUMsR0FBUSxJQUFhLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7SUFDM0QsWUFBWSxDQUFDLEVBQU8sSUFBWSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7O0lBQzFELGtCQUFrQixDQUFDLEVBQU8sSUFBUyxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7O0lBQzdELFlBQVksQ0FBQyxFQUFPLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7OztJQUMxRCxRQUFRLENBQUMsSUFBUyxJQUFZLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7SUFDeEQsU0FBUyxDQUFDLElBQVMsSUFBWSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7O0lBQ3pELElBQUksQ0FBQyxJQUFTLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7OztJQUNwRCxPQUFPLENBQUMsSUFBUyxJQUFTLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7SUFDcEQsVUFBVSxDQUFDLEVBQU8sSUFBVSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7O0lBQ3RELFdBQVcsQ0FBQyxFQUFPLElBQVUsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7OztJQUN2RCxhQUFhLENBQUMsRUFBTyxJQUFVLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7SUFDekQsVUFBVSxDQUFDLEVBQU8sSUFBWSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7O0lBQ3hELGdCQUFnQixDQUFDLEVBQU8sSUFBWSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7O0lBQzlELFVBQVUsQ0FBQyxFQUFPLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7Ozs7SUFDaEQsV0FBVyxDQUFDLEVBQU8sRUFBRSxJQUFTLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7Ozs7SUFDNUQsV0FBVyxDQUFDLEVBQU8sRUFBRSxJQUFTLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7Ozs7O0lBQzVELFlBQVksQ0FBQyxFQUFPLEVBQUUsT0FBWSxFQUFFLE9BQVksSUFBSSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7O0lBQzlFLE1BQU0sQ0FBQyxFQUFPLElBQVUsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7Ozs7O0lBQ2xELFlBQVksQ0FBQyxNQUFXLEVBQUUsRUFBTyxFQUFFLElBQVMsSUFBSSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7Ozs7SUFDMUUsZUFBZSxDQUFDLE1BQVcsRUFBRSxFQUFPLEVBQUUsS0FBVSxJQUFJLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7OztJQUM5RSxXQUFXLENBQUMsTUFBVyxFQUFFLEVBQU8sRUFBRSxJQUFTLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7Ozs7SUFDekUsWUFBWSxDQUFDLEVBQU8sRUFBRSxLQUFVLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7OztJQUM5RCxPQUFPLENBQUMsRUFBTyxJQUFZLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7O0lBQ3JELE9BQU8sQ0FBQyxFQUFPLEVBQUUsS0FBYSxJQUFJLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7SUFDNUQsUUFBUSxDQUFDLEVBQU8sSUFBWSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7OztJQUN0RCxRQUFRLENBQUMsRUFBTyxFQUFFLEtBQWEsSUFBSSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7O0lBQzdELFVBQVUsQ0FBQyxFQUFPLElBQWEsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7Ozs7SUFDekQsVUFBVSxDQUFDLEVBQU8sRUFBRSxLQUFjLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7OztJQUNoRSxhQUFhLENBQUMsSUFBWSxJQUFTLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7SUFDN0QsY0FBYyxDQUFDLElBQVMsSUFBaUIsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7Ozs7SUFDbkUsYUFBYSxDQUFDLE9BQVksRUFBRSxHQUFTLElBQWlCLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7OztJQUNoRixlQUFlLENBQUMsRUFBVSxFQUFFLE9BQWUsRUFBRSxHQUFTLElBQWEsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7Ozs7SUFDN0YsY0FBYyxDQUFDLElBQVksRUFBRSxHQUFTLElBQVUsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7Ozs7O0lBQzFFLGVBQWUsQ0FBQyxRQUFnQixFQUFFLFNBQWlCLEVBQUUsR0FBUztRQUM1RCxNQUFNLGlCQUFpQixDQUFDO0tBQ3pCOzs7Ozs7SUFDRCxrQkFBa0IsQ0FBQyxHQUFXLEVBQUUsR0FBUyxJQUFzQixNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7O0lBQ3pGLGdCQUFnQixDQUFDLEVBQU8sSUFBUyxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7O0lBQzNELGFBQWEsQ0FBQyxFQUFPLElBQVMsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7OztJQUN4RCxPQUFPLENBQUMsRUFBTyxJQUFTLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7SUFDbEQsbUJBQW1CLENBQUMsRUFBTyxJQUFZLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7SUFDakUsS0FBSyxDQUFDLElBQVUsSUFBVSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7OztJQUNwRCxzQkFBc0IsQ0FBQyxPQUFZLEVBQUUsSUFBWSxJQUFtQixNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7OztJQUM5RixvQkFBb0IsQ0FBQyxPQUFZLEVBQUUsSUFBWSxJQUFtQixNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7O0lBQzVGLFNBQVMsQ0FBQyxPQUFZLElBQVcsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7Ozs7SUFDM0QsUUFBUSxDQUFDLE9BQVksRUFBRSxTQUFpQixJQUFJLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7O0lBQ3RFLFdBQVcsQ0FBQyxPQUFZLEVBQUUsU0FBaUIsSUFBSSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7OztJQUN6RSxRQUFRLENBQUMsT0FBWSxFQUFFLFNBQWlCLElBQWEsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7Ozs7O0lBQy9FLFFBQVEsQ0FBQyxPQUFZLEVBQUUsU0FBaUIsRUFBRSxVQUFrQixJQUFJLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7O0lBQzFGLFdBQVcsQ0FBQyxPQUFZLEVBQUUsU0FBaUIsSUFBSSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7OztJQUN6RSxRQUFRLENBQUMsT0FBWSxFQUFFLFNBQWlCLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7Ozs7O0lBQzlFLFFBQVEsQ0FBQyxPQUFZLEVBQUUsU0FBaUIsRUFBRSxVQUFtQjtRQUMzRCxNQUFNLGlCQUFpQixDQUFDO0tBQ3pCOzs7OztJQUNELE9BQU8sQ0FBQyxPQUFZLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7OztJQUMxRCxZQUFZLENBQUMsT0FBWSxJQUF5QixNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7OztJQUM1RSxZQUFZLENBQUMsT0FBWSxFQUFFLFNBQWlCLElBQWEsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7Ozs7O0lBQ25GLGNBQWMsQ0FBQyxPQUFZLEVBQUUsRUFBVSxFQUFFLFNBQWlCLElBQWEsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7Ozs7SUFDakcsWUFBWSxDQUFDLE9BQVksRUFBRSxTQUFpQixJQUFZLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7OztJQUNsRixjQUFjLENBQUMsT0FBWSxFQUFFLEVBQVUsRUFBRSxTQUFpQixJQUFZLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7OztJQUNoRyxZQUFZLENBQUMsT0FBWSxFQUFFLElBQVksRUFBRSxLQUFhLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7Ozs7OztJQUNwRixjQUFjLENBQUMsT0FBWSxFQUFFLEVBQVUsRUFBRSxJQUFZLEVBQUUsS0FBYSxJQUFJLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7O0lBQ2xHLGVBQWUsQ0FBQyxPQUFZLEVBQUUsU0FBaUIsSUFBSSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7Ozs7SUFDN0UsaUJBQWlCLENBQUMsT0FBWSxFQUFFLEVBQVUsRUFBRSxTQUFpQixJQUFJLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7SUFDM0YsaUJBQWlCLENBQUMsRUFBTyxJQUFJLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7OztJQUN2RCxrQkFBa0IsS0FBbUIsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7O0lBQy9ELGtCQUFrQixLQUFlLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7SUFDM0QscUJBQXFCLENBQUMsRUFBTyxJQUFJLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7SUFDM0QsUUFBUSxDQUFDLEdBQWEsSUFBWSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7OztJQUM1RCxRQUFRLENBQUMsR0FBYSxFQUFFLFFBQWdCLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7Ozs7SUFDdEUsY0FBYyxDQUFDLENBQU0sRUFBRSxRQUFnQixJQUFhLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7SUFDOUUsaUJBQWlCLENBQUMsRUFBTyxJQUFhLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7SUFDaEUsVUFBVSxDQUFDLElBQVMsSUFBYSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7O0lBQzNELGFBQWEsQ0FBQyxJQUFTLElBQWEsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7OztJQUM5RCxhQUFhLENBQUMsSUFBUyxJQUFhLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7SUFDOUQsYUFBYSxDQUFDLElBQVMsSUFBYSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7O0lBQzlELFlBQVksQ0FBQyxJQUFTLElBQWEsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7OztJQUM3RCxhQUFhLENBQUMsSUFBVSxJQUFVLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7SUFDNUQsU0FBUyxDQUFDLElBQVUsSUFBVSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7O0lBQ3hELE9BQU8sQ0FBQyxPQUFZLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7OztJQUMxRCxXQUFXLENBQUMsS0FBVSxJQUFZLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7OztJQUM1RCxpQkFBaUIsQ0FBQyxPQUFZLEVBQUUsT0FBZSxFQUFFLElBQVksSUFBSSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7SUFDM0YsaUJBQWlCLEtBQWMsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7O0lBQ3pELHVCQUF1QixLQUFjLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7O0lBQy9ELG9CQUFvQixDQUFDLEdBQWEsRUFBRSxNQUFjLElBQVMsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7O0lBQ3JGLFVBQVUsS0FBYyxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7SUFDbEQsV0FBVyxLQUFlLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7SUFDcEQsV0FBVyxDQUFDLEdBQWEsSUFBWSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7SUFDL0QsZ0JBQWdCLEtBQVcsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7O0lBQ3JELFlBQVksS0FBYSxPQUFPLGlCQUFpQixDQUFDLEVBQUU7Ozs7Ozs7SUFDcEQsT0FBTyxDQUFDLE9BQVksRUFBRSxJQUFZLEVBQUUsS0FBYSxJQUFJLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7SUFDL0UsZ0JBQWdCLENBQUMsT0FBWSxJQUFTLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7O0lBQ2hFLE9BQU8sQ0FBQyxPQUFZLEVBQUUsSUFBWSxJQUFZLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7OztJQUN4RSxjQUFjLEtBQWEsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7O0lBQ3JELGtCQUFrQixLQUFhLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7OztJQUN6RCxnQkFBZ0IsS0FBYSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7SUFDdkQsaUJBQWlCLEtBQWMsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7O0lBQ3pELG9CQUFvQixLQUFjLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7OztJQUU1RCxlQUFlLEtBQWMsT0FBTyxLQUFLLENBQUMsRUFBRTs7Ozs7SUFDNUMsU0FBUyxDQUFDLElBQVksSUFBWSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7OztJQUM1RCxTQUFTLENBQUMsSUFBWSxFQUFFLEtBQWEsSUFBSSxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Q0FDcEUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7ybVEb21BZGFwdGVyIGFzIERvbUFkYXB0ZXIsIMm1c2V0Um9vdERvbUFkYXB0ZXIgYXMgc2V0Um9vdERvbUFkYXB0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG4vKipcbiAqIFRoaXMgYWRhcHRlciBpcyByZXF1aXJlZCB0byBsb2cgZXJyb3IgbWVzc2FnZXMuXG4gKlxuICogTm90ZTogb3RoZXIgbWV0aG9kcyBhbGwgdGhyb3cgYXMgdGhlIERPTSBpcyBub3QgYWNjZXNzaWJsZSBkaXJlY3RseSBpbiB3ZWIgd29ya2VyIGNvbnRleHQuXG4gKi9cbmV4cG9ydCBjbGFzcyBXb3JrZXJEb21BZGFwdGVyIGV4dGVuZHMgRG9tQWRhcHRlciB7XG4gIHN0YXRpYyBtYWtlQ3VycmVudCgpIHsgc2V0Um9vdERvbUFkYXB0ZXIobmV3IFdvcmtlckRvbUFkYXB0ZXIoKSk7IH1cblxuICBsb2dFcnJvcihlcnJvcjogYW55KSB7XG4gICAgaWYgKGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGxvZyhlcnJvcjogYW55KSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH1cblxuICBsb2dHcm91cChlcnJvcjogYW55KSB7XG4gICAgaWYgKGNvbnNvbGUuZ3JvdXApIHtcbiAgICAgIGNvbnNvbGUuZ3JvdXAoZXJyb3IpO1xuICAgICAgdGhpcy5sb2dFcnJvcihlcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgbG9nR3JvdXBFbmQoKSB7XG4gICAgaWYgKGNvbnNvbGUuZ3JvdXBFbmQpIHtcbiAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgICB9XG4gIH1cblxuICBjb250YWlucyhub2RlQTogYW55LCBub2RlQjogYW55KTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGhhc1Byb3BlcnR5KGVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nKTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHNldFByb3BlcnR5KGVsOiBFbGVtZW50LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0UHJvcGVydHkoZWw6IEVsZW1lbnQsIG5hbWU6IHN0cmluZyk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGludm9rZShlbDogRWxlbWVudCwgbWV0aG9kTmFtZTogc3RyaW5nLCBhcmdzOiBhbnlbXSk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG5cbiAgZ2V0IGF0dHJUb1Byb3BNYXAoKToge1trZXk6IHN0cmluZ106IHN0cmluZ30geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzZXQgYXR0clRvUHJvcE1hcCh2YWx1ZToge1trZXk6IHN0cmluZ106IHN0cmluZ30pIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cblxuICBwYXJzZSh0ZW1wbGF0ZUh0bWw6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBxdWVyeVNlbGVjdG9yKGVsOiBhbnksIHNlbGVjdG9yOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHF1ZXJ5U2VsZWN0b3JBbGwoZWw6IGFueSwgc2VsZWN0b3I6IHN0cmluZyk6IGFueVtdIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgb24oZWw6IGFueSwgZXZ0OiBhbnksIGxpc3RlbmVyOiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgb25BbmRDYW5jZWwoZWw6IGFueSwgZXZ0OiBhbnksIGxpc3RlbmVyOiBhbnkpOiBGdW5jdGlvbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGRpc3BhdGNoRXZlbnQoZWw6IGFueSwgZXZ0OiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY3JlYXRlTW91c2VFdmVudChldmVudFR5cGU6IGFueSk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNyZWF0ZUV2ZW50KGV2ZW50VHlwZTogc3RyaW5nKTogYW55IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcHJldmVudERlZmF1bHQoZXZ0OiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaXNQcmV2ZW50ZWQoZXZ0OiBhbnkpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0SW5uZXJIVE1MKGVsOiBhbnkpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRUZW1wbGF0ZUNvbnRlbnQoZWw6IGFueSk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldE91dGVySFRNTChlbDogYW55KTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgbm9kZU5hbWUobm9kZTogYW55KTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgbm9kZVZhbHVlKG5vZGU6IGFueSk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHR5cGUobm9kZTogYW55KTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY29udGVudChub2RlOiBhbnkpOiBhbnkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBmaXJzdENoaWxkKGVsOiBhbnkpOiBOb2RlIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgbmV4dFNpYmxpbmcoZWw6IGFueSk6IE5vZGUgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBwYXJlbnRFbGVtZW50KGVsOiBhbnkpOiBOb2RlIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY2hpbGROb2RlcyhlbDogYW55KTogTm9kZVtdIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY2hpbGROb2Rlc0FzTGlzdChlbDogYW55KTogTm9kZVtdIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY2xlYXJOb2RlcyhlbDogYW55KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGFwcGVuZENoaWxkKGVsOiBhbnksIG5vZGU6IGFueSkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICByZW1vdmVDaGlsZChlbDogYW55LCBub2RlOiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcmVwbGFjZUNoaWxkKGVsOiBhbnksIG5ld05vZGU6IGFueSwgb2xkTm9kZTogYW55KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHJlbW92ZShlbDogYW55KTogTm9kZSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGluc2VydEJlZm9yZShwYXJlbnQ6IGFueSwgZWw6IGFueSwgbm9kZTogYW55KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGluc2VydEFsbEJlZm9yZShwYXJlbnQ6IGFueSwgZWw6IGFueSwgbm9kZXM6IGFueSkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBpbnNlcnRBZnRlcihwYXJlbnQ6IGFueSwgZWw6IGFueSwgbm9kZTogYW55KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHNldElubmVySFRNTChlbDogYW55LCB2YWx1ZTogYW55KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldFRleHQoZWw6IGFueSk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHNldFRleHQoZWw6IGFueSwgdmFsdWU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRWYWx1ZShlbDogYW55KTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc2V0VmFsdWUoZWw6IGFueSwgdmFsdWU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRDaGVja2VkKGVsOiBhbnkpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc2V0Q2hlY2tlZChlbDogYW55LCB2YWx1ZTogYm9vbGVhbikgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjcmVhdGVDb21tZW50KHRleHQ6IHN0cmluZyk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNyZWF0ZVRlbXBsYXRlKGh0bWw6IGFueSk6IEhUTUxFbGVtZW50IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY3JlYXRlRWxlbWVudCh0YWdOYW1lOiBhbnksIGRvYz86IGFueSk6IEhUTUxFbGVtZW50IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY3JlYXRlRWxlbWVudE5TKG5zOiBzdHJpbmcsIHRhZ05hbWU6IHN0cmluZywgZG9jPzogYW55KTogRWxlbWVudCB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNyZWF0ZVRleHROb2RlKHRleHQ6IHN0cmluZywgZG9jPzogYW55KTogVGV4dCB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNyZWF0ZVNjcmlwdFRhZyhhdHRyTmFtZTogc3RyaW5nLCBhdHRyVmFsdWU6IHN0cmluZywgZG9jPzogYW55KTogSFRNTEVsZW1lbnQge1xuICAgIHRocm93ICdub3QgaW1wbGVtZW50ZWQnO1xuICB9XG4gIGNyZWF0ZVN0eWxlRWxlbWVudChjc3M6IHN0cmluZywgZG9jPzogYW55KTogSFRNTFN0eWxlRWxlbWVudCB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNyZWF0ZVNoYWRvd1Jvb3QoZWw6IGFueSk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldFNoYWRvd1Jvb3QoZWw6IGFueSk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEhvc3QoZWw6IGFueSk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldERpc3RyaWJ1dGVkTm9kZXMoZWw6IGFueSk6IE5vZGVbXSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNsb25lKG5vZGU6IE5vZGUpOiBOb2RlIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShlbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZyk6IEhUTUxFbGVtZW50W10geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRFbGVtZW50c0J5VGFnTmFtZShlbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZyk6IEhUTUxFbGVtZW50W10geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjbGFzc0xpc3QoZWxlbWVudDogYW55KTogYW55W10geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBhZGRDbGFzcyhlbGVtZW50OiBhbnksIGNsYXNzTmFtZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHJlbW92ZUNsYXNzKGVsZW1lbnQ6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaGFzQ2xhc3MoZWxlbWVudDogYW55LCBjbGFzc05hbWU6IHN0cmluZyk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzZXRTdHlsZShlbGVtZW50OiBhbnksIHN0eWxlTmFtZTogc3RyaW5nLCBzdHlsZVZhbHVlOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcmVtb3ZlU3R5bGUoZWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRTdHlsZShlbGVtZW50OiBhbnksIHN0eWxlTmFtZTogc3RyaW5nKTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaGFzU3R5bGUoZWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZywgc3R5bGVWYWx1ZT86IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHRocm93ICdub3QgaW1wbGVtZW50ZWQnO1xuICB9XG4gIHRhZ05hbWUoZWxlbWVudDogYW55KTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgYXR0cmlidXRlTWFwKGVsZW1lbnQ6IGFueSk6IE1hcDxzdHJpbmcsIHN0cmluZz4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBoYXNBdHRyaWJ1dGUoZWxlbWVudDogYW55LCBhdHRyaWJ1dGU6IHN0cmluZyk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBoYXNBdHRyaWJ1dGVOUyhlbGVtZW50OiBhbnksIG5zOiBzdHJpbmcsIGF0dHJpYnV0ZTogc3RyaW5nKTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEF0dHJpYnV0ZShlbGVtZW50OiBhbnksIGF0dHJpYnV0ZTogc3RyaW5nKTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0QXR0cmlidXRlTlMoZWxlbWVudDogYW55LCBuczogc3RyaW5nLCBhdHRyaWJ1dGU6IHN0cmluZyk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHNldEF0dHJpYnV0ZShlbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzZXRBdHRyaWJ1dGVOUyhlbGVtZW50OiBhbnksIG5zOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICByZW1vdmVBdHRyaWJ1dGUoZWxlbWVudDogYW55LCBhdHRyaWJ1dGU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICByZW1vdmVBdHRyaWJ1dGVOUyhlbGVtZW50OiBhbnksIG5zOiBzdHJpbmcsIGF0dHJpYnV0ZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHRlbXBsYXRlQXdhcmVSb290KGVsOiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY3JlYXRlSHRtbERvY3VtZW50KCk6IEhUTUxEb2N1bWVudCB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldERlZmF1bHREb2N1bWVudCgpOiBEb2N1bWVudCB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEJvdW5kaW5nQ2xpZW50UmVjdChlbDogYW55KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldFRpdGxlKGRvYzogRG9jdW1lbnQpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzZXRUaXRsZShkb2M6IERvY3VtZW50LCBuZXdUaXRsZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGVsZW1lbnRNYXRjaGVzKG46IGFueSwgc2VsZWN0b3I6IHN0cmluZyk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBpc1RlbXBsYXRlRWxlbWVudChlbDogYW55KTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGlzVGV4dE5vZGUobm9kZTogYW55KTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGlzQ29tbWVudE5vZGUobm9kZTogYW55KTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGlzRWxlbWVudE5vZGUobm9kZTogYW55KTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGhhc1NoYWRvd1Jvb3Qobm9kZTogYW55KTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGlzU2hhZG93Um9vdChub2RlOiBhbnkpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaW1wb3J0SW50b0RvYyhub2RlOiBOb2RlKTogTm9kZSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGFkb3B0Tm9kZShub2RlOiBOb2RlKTogTm9kZSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEhyZWYoZWxlbWVudDogYW55KTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0RXZlbnRLZXkoZXZlbnQ6IGFueSk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHJlc29sdmVBbmRTZXRIcmVmKGVsZW1lbnQ6IGFueSwgYmFzZVVybDogc3RyaW5nLCBocmVmOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc3VwcG9ydHNET01FdmVudHMoKTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHN1cHBvcnRzTmF0aXZlU2hhZG93RE9NKCk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRHbG9iYWxFdmVudFRhcmdldChkb2M6IERvY3VtZW50LCB0YXJnZXQ6IHN0cmluZyk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEhpc3RvcnkoKTogSGlzdG9yeSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldExvY2F0aW9uKCk6IExvY2F0aW9uIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0QmFzZUhyZWYoZG9jOiBEb2N1bWVudCk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHJlc2V0QmFzZUVsZW1lbnQoKTogdm9pZCB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldFVzZXJBZ2VudCgpOiBzdHJpbmcgeyByZXR1cm4gJ0Zha2UgdXNlciBhZ2VudCc7IH1cbiAgc2V0RGF0YShlbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQ6IGFueSk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldERhdGEoZWxlbWVudDogYW55LCBuYW1lOiBzdHJpbmcpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBwZXJmb3JtYW5jZU5vdygpOiBudW1iZXIgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRBbmltYXRpb25QcmVmaXgoKTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0VHJhbnNpdGlvbkVuZCgpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzdXBwb3J0c0FuaW1hdGlvbigpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc3VwcG9ydHNXZWJBbmltYXRpb24oKTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG5cbiAgc3VwcG9ydHNDb29raWVzKCk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cbiAgZ2V0Q29va2llKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHNldENvb2tpZShuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbn1cbiJdfQ==