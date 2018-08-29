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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci93b3JrZXJfYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxXQUFXLElBQUksVUFBVSxFQUFFLGtCQUFrQixJQUFJLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7Ozs7OztBQU83RyxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsVUFBVTs7OztJQUM5QyxNQUFNLENBQUMsV0FBVyxLQUFLLGlCQUFpQixDQUFDLElBQUksZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Ozs7O0lBRW5FLFFBQVEsQ0FBQyxLQUFVO1FBQ2pCLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtZQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3RCO2FBQU07O1lBRUwsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQjtLQUNGOzs7OztJQUVELEdBQUcsQ0FBQyxLQUFVOztRQUVaLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDcEI7Ozs7O0lBRUQsUUFBUSxDQUFDLEtBQVU7UUFDakIsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN0QjthQUFNOztZQUVMLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEI7S0FDRjs7OztJQUVELFdBQVc7UUFDVCxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDcEIsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ3BCO0tBQ0Y7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LE1BQU0saUJBQWlCLENBQUMsRUFBRTs7OztJQUN2RCxpQkFBaUIsS0FBYyxNQUFNLGlCQUFpQixDQUFDLEVBQUU7Ozs7SUFDekQsb0JBQW9CLEtBQWMsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFOzs7O0lBRTVELGVBQWUsS0FBYyxPQUFPLEtBQUssQ0FBQyxFQUFFOzs7OztJQUM1QyxTQUFTLENBQUMsSUFBWSxJQUFZLE1BQU0saUJBQWlCLENBQUMsRUFBRTs7Ozs7O0lBQzVELFNBQVMsQ0FBQyxJQUFZLEVBQUUsS0FBYSxJQUFJLE1BQU0saUJBQWlCLENBQUMsRUFBRTtDQUNwRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHvJtURvbUFkYXB0ZXIgYXMgRG9tQWRhcHRlciwgybVzZXRSb290RG9tQWRhcHRlciBhcyBzZXRSb290RG9tQWRhcHRlcn0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbi8qKlxuICogVGhpcyBhZGFwdGVyIGlzIHJlcXVpcmVkIHRvIGxvZyBlcnJvciBtZXNzYWdlcy5cbiAqXG4gKiBOb3RlOiBvdGhlciBtZXRob2RzIGFsbCB0aHJvdyBhcyB0aGUgRE9NIGlzIG5vdCBhY2Nlc3NpYmxlIGRpcmVjdGx5IGluIHdlYiB3b3JrZXIgY29udGV4dC5cbiAqL1xuZXhwb3J0IGNsYXNzIFdvcmtlckRvbUFkYXB0ZXIgZXh0ZW5kcyBEb21BZGFwdGVyIHtcbiAgc3RhdGljIG1ha2VDdXJyZW50KCkgeyBzZXRSb290RG9tQWRhcHRlcihuZXcgV29ya2VyRG9tQWRhcHRlcigpKTsgfVxuXG4gIGxvZ0Vycm9yKGVycm9yOiBhbnkpIHtcbiAgICBpZiAoY29uc29sZS5lcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgbG9nKGVycm9yOiBhbnkpIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfVxuXG4gIGxvZ0dyb3VwKGVycm9yOiBhbnkpIHtcbiAgICBpZiAoY29uc29sZS5ncm91cCkge1xuICAgICAgY29uc29sZS5ncm91cChlcnJvcik7XG4gICAgICB0aGlzLmxvZ0Vycm9yKGVycm9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBsb2dHcm91cEVuZCgpIHtcbiAgICBpZiAoY29uc29sZS5ncm91cEVuZCkge1xuICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnRhaW5zKG5vZGVBOiBhbnksIG5vZGVCOiBhbnkpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaGFzUHJvcGVydHkoZWxlbWVudDogYW55LCBuYW1lOiBzdHJpbmcpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc2V0UHJvcGVydHkoZWw6IEVsZW1lbnQsIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRQcm9wZXJ0eShlbDogRWxlbWVudCwgbmFtZTogc3RyaW5nKTogYW55IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaW52b2tlKGVsOiBFbGVtZW50LCBtZXRob2ROYW1lOiBzdHJpbmcsIGFyZ3M6IGFueVtdKTogYW55IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cblxuICBnZXQgYXR0clRvUHJvcE1hcCgpOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHNldCBhdHRyVG9Qcm9wTWFwKHZhbHVlOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuXG4gIHBhcnNlKHRlbXBsYXRlSHRtbDogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHF1ZXJ5U2VsZWN0b3IoZWw6IGFueSwgc2VsZWN0b3I6IHN0cmluZyk6IEhUTUxFbGVtZW50IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcXVlcnlTZWxlY3RvckFsbChlbDogYW55LCBzZWxlY3Rvcjogc3RyaW5nKTogYW55W10geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBvbihlbDogYW55LCBldnQ6IGFueSwgbGlzdGVuZXI6IGFueSkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBvbkFuZENhbmNlbChlbDogYW55LCBldnQ6IGFueSwgbGlzdGVuZXI6IGFueSk6IEZ1bmN0aW9uIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZGlzcGF0Y2hFdmVudChlbDogYW55LCBldnQ6IGFueSkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjcmVhdGVNb3VzZUV2ZW50KGV2ZW50VHlwZTogYW55KTogYW55IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY3JlYXRlRXZlbnQoZXZlbnRUeXBlOiBzdHJpbmcpOiBhbnkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBwcmV2ZW50RGVmYXVsdChldnQ6IGFueSkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBpc1ByZXZlbnRlZChldnQ6IGFueSk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRJbm5lckhUTUwoZWw6IGFueSk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldFRlbXBsYXRlQ29udGVudChlbDogYW55KTogYW55IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0T3V0ZXJIVE1MKGVsOiBhbnkpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBub2RlTmFtZShub2RlOiBhbnkpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBub2RlVmFsdWUobm9kZTogYW55KTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgdHlwZShub2RlOiBhbnkpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjb250ZW50KG5vZGU6IGFueSk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGZpcnN0Q2hpbGQoZWw6IGFueSk6IE5vZGUgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBuZXh0U2libGluZyhlbDogYW55KTogTm9kZSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHBhcmVudEVsZW1lbnQoZWw6IGFueSk6IE5vZGUgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjaGlsZE5vZGVzKGVsOiBhbnkpOiBOb2RlW10geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjaGlsZE5vZGVzQXNMaXN0KGVsOiBhbnkpOiBOb2RlW10geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjbGVhck5vZGVzKGVsOiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgYXBwZW5kQ2hpbGQoZWw6IGFueSwgbm9kZTogYW55KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHJlbW92ZUNoaWxkKGVsOiBhbnksIG5vZGU6IGFueSkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICByZXBsYWNlQ2hpbGQoZWw6IGFueSwgbmV3Tm9kZTogYW55LCBvbGROb2RlOiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcmVtb3ZlKGVsOiBhbnkpOiBOb2RlIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaW5zZXJ0QmVmb3JlKHBhcmVudDogYW55LCBlbDogYW55LCBub2RlOiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaW5zZXJ0QWxsQmVmb3JlKHBhcmVudDogYW55LCBlbDogYW55LCBub2RlczogYW55KSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGluc2VydEFmdGVyKHBhcmVudDogYW55LCBlbDogYW55LCBub2RlOiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc2V0SW5uZXJIVE1MKGVsOiBhbnksIHZhbHVlOiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0VGV4dChlbDogYW55KTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc2V0VGV4dChlbDogYW55LCB2YWx1ZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldFZhbHVlKGVsOiBhbnkpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzZXRWYWx1ZShlbDogYW55LCB2YWx1ZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldENoZWNrZWQoZWw6IGFueSk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzZXRDaGVja2VkKGVsOiBhbnksIHZhbHVlOiBib29sZWFuKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNyZWF0ZUNvbW1lbnQodGV4dDogc3RyaW5nKTogYW55IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY3JlYXRlVGVtcGxhdGUoaHRtbDogYW55KTogSFRNTEVsZW1lbnQgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjcmVhdGVFbGVtZW50KHRhZ05hbWU6IGFueSwgZG9jPzogYW55KTogSFRNTEVsZW1lbnQgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjcmVhdGVFbGVtZW50TlMobnM6IHN0cmluZywgdGFnTmFtZTogc3RyaW5nLCBkb2M/OiBhbnkpOiBFbGVtZW50IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY3JlYXRlVGV4dE5vZGUodGV4dDogc3RyaW5nLCBkb2M/OiBhbnkpOiBUZXh0IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY3JlYXRlU2NyaXB0VGFnKGF0dHJOYW1lOiBzdHJpbmcsIGF0dHJWYWx1ZTogc3RyaW5nLCBkb2M/OiBhbnkpOiBIVE1MRWxlbWVudCB7XG4gICAgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7XG4gIH1cbiAgY3JlYXRlU3R5bGVFbGVtZW50KGNzczogc3RyaW5nLCBkb2M/OiBhbnkpOiBIVE1MU3R5bGVFbGVtZW50IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY3JlYXRlU2hhZG93Um9vdChlbDogYW55KTogYW55IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0U2hhZG93Um9vdChlbDogYW55KTogYW55IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0SG9zdChlbDogYW55KTogYW55IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0RGlzdHJpYnV0ZWROb2RlcyhlbDogYW55KTogTm9kZVtdIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgY2xvbmUobm9kZTogTm9kZSk6IE5vZGUgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nKTogSFRNTEVsZW1lbnRbXSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEVsZW1lbnRzQnlUYWdOYW1lKGVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nKTogSFRNTEVsZW1lbnRbXSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGNsYXNzTGlzdChlbGVtZW50OiBhbnkpOiBhbnlbXSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGFkZENsYXNzKGVsZW1lbnQ6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcmVtb3ZlQ2xhc3MoZWxlbWVudDogYW55LCBjbGFzc05hbWU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBoYXNDbGFzcyhlbGVtZW50OiBhbnksIGNsYXNzTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHNldFN0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcsIHN0eWxlVmFsdWU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICByZW1vdmVTdHlsZShlbGVtZW50OiBhbnksIHN0eWxlTmFtZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldFN0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBoYXNTdHlsZShlbGVtZW50OiBhbnksIHN0eWxlTmFtZTogc3RyaW5nLCBzdHlsZVZhbHVlPzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7XG4gIH1cbiAgdGFnTmFtZShlbGVtZW50OiBhbnkpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBhdHRyaWJ1dGVNYXAoZWxlbWVudDogYW55KTogTWFwPHN0cmluZywgc3RyaW5nPiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGhhc0F0dHJpYnV0ZShlbGVtZW50OiBhbnksIGF0dHJpYnV0ZTogc3RyaW5nKTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGhhc0F0dHJpYnV0ZU5TKGVsZW1lbnQ6IGFueSwgbnM6IHN0cmluZywgYXR0cmlidXRlOiBzdHJpbmcpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0QXR0cmlidXRlKGVsZW1lbnQ6IGFueSwgYXR0cmlidXRlOiBzdHJpbmcpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRBdHRyaWJ1dGVOUyhlbGVtZW50OiBhbnksIG5zOiBzdHJpbmcsIGF0dHJpYnV0ZTogc3RyaW5nKTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc2V0QXR0cmlidXRlKGVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHNldEF0dHJpYnV0ZU5TKGVsZW1lbnQ6IGFueSwgbnM6IHN0cmluZywgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHJlbW92ZUF0dHJpYnV0ZShlbGVtZW50OiBhbnksIGF0dHJpYnV0ZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHJlbW92ZUF0dHJpYnV0ZU5TKGVsZW1lbnQ6IGFueSwgbnM6IHN0cmluZywgYXR0cmlidXRlOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgdGVtcGxhdGVBd2FyZVJvb3QoZWw6IGFueSkgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBjcmVhdGVIdG1sRG9jdW1lbnQoKTogSFRNTERvY3VtZW50IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0RGVmYXVsdERvY3VtZW50KCk6IERvY3VtZW50IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsOiBhbnkpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0VGl0bGUoZG9jOiBEb2N1bWVudCk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHNldFRpdGxlKGRvYzogRG9jdW1lbnQsIG5ld1RpdGxlOiBzdHJpbmcpIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZWxlbWVudE1hdGNoZXMobjogYW55LCBzZWxlY3Rvcjogc3RyaW5nKTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGlzVGVtcGxhdGVFbGVtZW50KGVsOiBhbnkpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaXNUZXh0Tm9kZShub2RlOiBhbnkpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaXNDb21tZW50Tm9kZShub2RlOiBhbnkpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaXNFbGVtZW50Tm9kZShub2RlOiBhbnkpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaGFzU2hhZG93Um9vdChub2RlOiBhbnkpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgaXNTaGFkb3dSb290KG5vZGU6IGFueSk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBpbXBvcnRJbnRvRG9jKG5vZGU6IE5vZGUpOiBOb2RlIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgYWRvcHROb2RlKG5vZGU6IE5vZGUpOiBOb2RlIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0SHJlZihlbGVtZW50OiBhbnkpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRFdmVudEtleShldmVudDogYW55KTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcmVzb2x2ZUFuZFNldEhyZWYoZWxlbWVudDogYW55LCBiYXNlVXJsOiBzdHJpbmcsIGhyZWY6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzdXBwb3J0c0RPTUV2ZW50cygpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc3VwcG9ydHNOYXRpdmVTaGFkb3dET00oKTogYm9vbGVhbiB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEdsb2JhbEV2ZW50VGFyZ2V0KGRvYzogRG9jdW1lbnQsIHRhcmdldDogc3RyaW5nKTogYW55IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0SGlzdG9yeSgpOiBIaXN0b3J5IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0TG9jYXRpb24oKTogTG9jYXRpb24geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRCYXNlSHJlZihkb2M6IERvY3VtZW50KTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcmVzZXRCYXNlRWxlbWVudCgpOiB2b2lkIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0VXNlckFnZW50KCk6IHN0cmluZyB7IHJldHVybiAnRmFrZSB1c2VyIGFnZW50JzsgfVxuICBzZXREYXRhKGVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldENvbXB1dGVkU3R5bGUoZWxlbWVudDogYW55KTogYW55IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0RGF0YShlbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZyk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHBlcmZvcm1hbmNlTm93KCk6IG51bWJlciB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIGdldEFuaW1hdGlvblByZWZpeCgpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRUcmFuc2l0aW9uRW5kKCk6IHN0cmluZyB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHN1cHBvcnRzQW5pbWF0aW9uKCk6IGJvb2xlYW4geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzdXBwb3J0c1dlYkFuaW1hdGlvbigpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cblxuICBzdXBwb3J0c0Nvb2tpZXMoKTogYm9vbGVhbiB7IHJldHVybiBmYWxzZTsgfVxuICBnZXRDb29raWUobmFtZTogc3RyaW5nKTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgc2V0Q29va2llKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxufVxuIl19