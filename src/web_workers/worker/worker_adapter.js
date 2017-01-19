/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DomAdapter, setRootDomAdapter } from '../../private_import_platform-browser';
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
    logError(error /** TODO #9100 */) {
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
    log(error /** TODO #9100 */) { console.log(error); }
    /**
     * @param {?} error
     * @return {?}
     */
    logGroup(error /** TODO #9100 */) {
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
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    hasProperty(element /** TODO #9100 */, name) { throw 'not implemented'; }
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
     * @param {?} selector
     * @return {?}
     */
    query(selector) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    querySelector(el /** TODO #9100 */, selector) {
        throw 'not implemented';
    }
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    querySelectorAll(el /** TODO #9100 */, selector) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    on(el /** TODO #9100 */, evt /** TODO #9100 */, listener /** TODO #9100 */) {
        throw 'not implemented';
    }
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    onAndCancel(el /** TODO #9100 */, evt /** TODO #9100 */, listener /** TODO #9100 */) {
        throw 'not implemented';
    }
    /**
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */
    dispatchEvent(el /** TODO #9100 */, evt /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} eventType
     * @return {?}
     */
    createMouseEvent(eventType /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} eventType
     * @return {?}
     */
    createEvent(eventType) { throw 'not implemented'; }
    /**
     * @param {?} evt
     * @return {?}
     */
    preventDefault(evt /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} evt
     * @return {?}
     */
    isPrevented(evt /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getInnerHTML(el /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getTemplateContent(el /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getOuterHTML(el /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    nodeName(node /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    nodeValue(node /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    type(node /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    content(node /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    firstChild(el /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    nextSibling(el /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    parentElement(el /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    childNodes(el /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    childNodesAsList(el /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    clearNodes(el /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    appendChild(el /** TODO #9100 */, node /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    removeChild(el /** TODO #9100 */, node /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} newNode
     * @param {?} oldNode
     * @return {?}
     */
    replaceChild(el /** TODO #9100 */, newNode /** TODO #9100 */, oldNode /** TODO #9100 */) {
        throw 'not implemented';
    }
    /**
     * @param {?} el
     * @return {?}
     */
    remove(el /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    insertBefore(el /** TODO #9100 */, node /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} nodes
     * @return {?}
     */
    insertAllBefore(el /** TODO #9100 */, nodes /** TODO #9100 */) {
        throw 'not implemented';
    }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    insertAfter(el /** TODO #9100 */, node /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setInnerHTML(el /** TODO #9100 */, value /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getText(el /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setText(el /** TODO #9100 */, value) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getValue(el /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setValue(el /** TODO #9100 */, value) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getChecked(el /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setChecked(el /** TODO #9100 */, value) { throw 'not implemented'; }
    /**
     * @param {?} text
     * @return {?}
     */
    createComment(text) { throw 'not implemented'; }
    /**
     * @param {?} html
     * @return {?}
     */
    createTemplate(html /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    createElement(tagName /** TODO #9100 */, doc /** TODO #9100 */) {
        throw 'not implemented';
    }
    /**
     * @param {?} ns
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    createElementNS(ns, tagName, doc /** TODO #9100 */) {
        throw 'not implemented';
    }
    /**
     * @param {?} text
     * @param {?=} doc
     * @return {?}
     */
    createTextNode(text, doc /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} attrName
     * @param {?} attrValue
     * @param {?=} doc
     * @return {?}
     */
    createScriptTag(attrName, attrValue, doc /** TODO #9100 */) {
        throw 'not implemented';
    }
    /**
     * @param {?} css
     * @param {?=} doc
     * @return {?}
     */
    createStyleElement(css, doc /** TODO #9100 */) {
        throw 'not implemented';
    }
    /**
     * @param {?} el
     * @return {?}
     */
    createShadowRoot(el /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getShadowRoot(el /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getHost(el /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getDistributedNodes(el /** TODO #9100 */) { throw 'not implemented'; }
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
    getElementsByClassName(element /** TODO #9100 */, name) {
        throw 'not implemented';
    }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getElementsByTagName(element /** TODO #9100 */, name) {
        throw 'not implemented';
    }
    /**
     * @param {?} element
     * @return {?}
     */
    classList(element /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    addClass(element /** TODO #9100 */, className) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    removeClass(element /** TODO #9100 */, className) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    hasClass(element /** TODO #9100 */, className) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    setStyle(element /** TODO #9100 */, styleName, styleValue) {
        throw 'not implemented';
    }
    /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    removeStyle(element /** TODO #9100 */, styleName) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    getStyle(element /** TODO #9100 */, styleName) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    hasStyle(element /** TODO #9100 */, styleName, styleValue) {
        throw 'not implemented';
    }
    /**
     * @param {?} element
     * @return {?}
     */
    tagName(element /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @return {?}
     */
    attributeMap(element /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    hasAttribute(element /** TODO #9100 */, attribute) {
        throw 'not implemented';
    }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    hasAttributeNS(element /** TODO #9100 */, ns, attribute) {
        throw 'not implemented';
    }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    getAttribute(element /** TODO #9100 */, attribute) {
        throw 'not implemented';
    }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    getAttributeNS(element /** TODO #9100 */, ns, attribute) {
        throw 'not implemented';
    }
    /**
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setAttribute(element /** TODO #9100 */, name, value) {
        throw 'not implemented';
    }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setAttributeNS(element /** TODO #9100 */, ns, name, value) {
        throw 'not implemented';
    }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    removeAttribute(element /** TODO #9100 */, attribute) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    removeAttributeNS(element /** TODO #9100 */, ns, attribute) {
        throw 'not implemented';
    }
    /**
     * @param {?} el
     * @return {?}
     */
    templateAwareRoot(el /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @return {?}
     */
    createHtmlDocument() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    defaultDoc() { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getBoundingClientRect(el /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @return {?}
     */
    getTitle() { throw 'not implemented'; }
    /**
     * @param {?} newTitle
     * @return {?}
     */
    setTitle(newTitle) { throw 'not implemented'; }
    /**
     * @param {?} n
     * @param {?} selector
     * @return {?}
     */
    elementMatches(n /** TODO #9100 */, selector) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    isTemplateElement(el) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    isTextNode(node /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    isCommentNode(node /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    isElementNode(node /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    hasShadowRoot(node /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    isShadowRoot(node /** TODO #9100 */) { throw 'not implemented'; }
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
    getHref(element /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} event
     * @return {?}
     */
    getEventKey(event /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} baseUrl
     * @param {?} href
     * @return {?}
     */
    resolveAndSetHref(element /** TODO #9100 */, baseUrl, href) {
        throw 'not implemented';
    }
    /**
     * @return {?}
     */
    supportsDOMEvents() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    supportsNativeShadowDOM() { throw 'not implemented'; }
    /**
     * @param {?} target
     * @return {?}
     */
    getGlobalEventTarget(target) { throw 'not implemented'; }
    /**
     * @return {?}
     */
    getHistory() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    getLocation() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    getBaseHref() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    resetBaseElement() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    getUserAgent() { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setData(element /** TODO #9100 */, name, value) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @return {?}
     */
    getComputedStyle(element /** TODO #9100 */) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getData(element /** TODO #9100 */, name) { throw 'not implemented'; }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setGlobalVar(name, value) { throw 'not implemented'; }
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
//# sourceMappingURL=worker_adapter.js.map