/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { DomAdapter, setRootDomAdapter } from '../../private_import_platform-browser';
/**
 * This adapter is required to log error messages.
 *
 * Note: other methods all throw as the DOM is not accessible directly in web worker context.
 */
var WorkerDomAdapter = (function (_super) {
    __extends(WorkerDomAdapter, _super);
    function WorkerDomAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    WorkerDomAdapter.makeCurrent = function () { setRootDomAdapter(new WorkerDomAdapter()); };
    /**
     * @param {?} error
     * @return {?}
     */
    WorkerDomAdapter.prototype.logError = function (error) {
        if (console.error) {
            console.error(error);
        }
        else {
            // tslint:disable-next-line:no-console
            console.log(error);
        }
    };
    /**
     * @param {?} error
     * @return {?}
     */
    WorkerDomAdapter.prototype.log = function (error) { console.log(error); };
    /**
     * @param {?} error
     * @return {?}
     */
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
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.logGroupEnd = function () {
        if (console.groupEnd) {
            console.groupEnd();
        }
    };
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    WorkerDomAdapter.prototype.hasProperty = function (element, name) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setProperty = function (el, name, value) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    WorkerDomAdapter.prototype.getProperty = function (el, name) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    WorkerDomAdapter.prototype.invoke = function (el, methodName, args) { throw 'not implemented'; };
    Object.defineProperty(WorkerDomAdapter.prototype, "attrToPropMap", {
        /**
         * @return {?}
         */
        get: function () { throw 'not implemented'; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) { throw 'not implemented'; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} templateHtml
     * @return {?}
     */
    WorkerDomAdapter.prototype.parse = function (templateHtml) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    WorkerDomAdapter.prototype.querySelector = function (el, selector) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    WorkerDomAdapter.prototype.querySelectorAll = function (el, selector) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    WorkerDomAdapter.prototype.on = function (el, evt, listener) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    WorkerDomAdapter.prototype.onAndCancel = function (el, evt, listener) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */
    WorkerDomAdapter.prototype.dispatchEvent = function (el, evt) { throw 'not implemented'; };
    /**
     * @param {?} eventType
     * @return {?}
     */
    WorkerDomAdapter.prototype.createMouseEvent = function (eventType) { throw 'not implemented'; };
    /**
     * @param {?} eventType
     * @return {?}
     */
    WorkerDomAdapter.prototype.createEvent = function (eventType) { throw 'not implemented'; };
    /**
     * @param {?} evt
     * @return {?}
     */
    WorkerDomAdapter.prototype.preventDefault = function (evt) { throw 'not implemented'; };
    /**
     * @param {?} evt
     * @return {?}
     */
    WorkerDomAdapter.prototype.isPrevented = function (evt) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getInnerHTML = function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getTemplateContent = function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getOuterHTML = function (el) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.nodeName = function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.nodeValue = function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.type = function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.content = function (node) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.firstChild = function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.nextSibling = function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.parentElement = function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.childNodes = function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.childNodesAsList = function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.clearNodes = function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.appendChild = function (el, node) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.removeChild = function (el, node) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} newNode
     * @param {?} oldNode
     * @return {?}
     */
    WorkerDomAdapter.prototype.replaceChild = function (el, newNode, oldNode) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.remove = function (el) { throw 'not implemented'; };
    /**
     * @param {?} parent
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.insertBefore = function (parent, el, node) { throw 'not implemented'; };
    /**
     * @param {?} parent
     * @param {?} el
     * @param {?} nodes
     * @return {?}
     */
    WorkerDomAdapter.prototype.insertAllBefore = function (parent, el, nodes) { throw 'not implemented'; };
    /**
     * @param {?} parent
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.insertAfter = function (parent, el, node) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setInnerHTML = function (el, value) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getText = function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setText = function (el, value) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getValue = function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setValue = function (el, value) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getChecked = function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setChecked = function (el, value) { throw 'not implemented'; };
    /**
     * @param {?} text
     * @return {?}
     */
    WorkerDomAdapter.prototype.createComment = function (text) { throw 'not implemented'; };
    /**
     * @param {?} html
     * @return {?}
     */
    WorkerDomAdapter.prototype.createTemplate = function (html) { throw 'not implemented'; };
    /**
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    WorkerDomAdapter.prototype.createElement = function (tagName, doc) { throw 'not implemented'; };
    /**
     * @param {?} ns
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    WorkerDomAdapter.prototype.createElementNS = function (ns, tagName, doc) { throw 'not implemented'; };
    /**
     * @param {?} text
     * @param {?=} doc
     * @return {?}
     */
    WorkerDomAdapter.prototype.createTextNode = function (text, doc) { throw 'not implemented'; };
    /**
     * @param {?} attrName
     * @param {?} attrValue
     * @param {?=} doc
     * @return {?}
     */
    WorkerDomAdapter.prototype.createScriptTag = function (attrName, attrValue, doc) {
        throw 'not implemented';
    };
    /**
     * @param {?} css
     * @param {?=} doc
     * @return {?}
     */
    WorkerDomAdapter.prototype.createStyleElement = function (css, doc) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.createShadowRoot = function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getShadowRoot = function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getHost = function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getDistributedNodes = function (el) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.clone = function (node) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    WorkerDomAdapter.prototype.getElementsByClassName = function (element, name) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    WorkerDomAdapter.prototype.getElementsByTagName = function (element, name) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @return {?}
     */
    WorkerDomAdapter.prototype.classList = function (element) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    WorkerDomAdapter.prototype.addClass = function (element, className) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    WorkerDomAdapter.prototype.removeClass = function (element, className) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    WorkerDomAdapter.prototype.hasClass = function (element, className) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    WorkerDomAdapter.prototype.setStyle = function (element, styleName, styleValue) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    WorkerDomAdapter.prototype.removeStyle = function (element, styleName) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    WorkerDomAdapter.prototype.getStyle = function (element, styleName) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    WorkerDomAdapter.prototype.hasStyle = function (element, styleName, styleValue) {
        throw 'not implemented';
    };
    /**
     * @param {?} element
     * @return {?}
     */
    WorkerDomAdapter.prototype.tagName = function (element) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @return {?}
     */
    WorkerDomAdapter.prototype.attributeMap = function (element) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    WorkerDomAdapter.prototype.hasAttribute = function (element, attribute) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    WorkerDomAdapter.prototype.hasAttributeNS = function (element, ns, attribute) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    WorkerDomAdapter.prototype.getAttribute = function (element, attribute) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    WorkerDomAdapter.prototype.getAttributeNS = function (element, ns, attribute) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setAttribute = function (element, name, value) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setAttributeNS = function (element, ns, name, value) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    WorkerDomAdapter.prototype.removeAttribute = function (element, attribute) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    WorkerDomAdapter.prototype.removeAttributeNS = function (element, ns, attribute) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.templateAwareRoot = function (el) { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.createHtmlDocument = function () { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getBoundingClientRect = function (el) { throw 'not implemented'; };
    /**
     * @param {?} doc
     * @return {?}
     */
    WorkerDomAdapter.prototype.getTitle = function (doc) { throw 'not implemented'; };
    /**
     * @param {?} doc
     * @param {?} newTitle
     * @return {?}
     */
    WorkerDomAdapter.prototype.setTitle = function (doc, newTitle) { throw 'not implemented'; };
    /**
     * @param {?} n
     * @param {?} selector
     * @return {?}
     */
    WorkerDomAdapter.prototype.elementMatches = function (n, selector) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.isTemplateElement = function (el) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.isTextNode = function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.isCommentNode = function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.isElementNode = function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.hasShadowRoot = function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.isShadowRoot = function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.importIntoDoc = function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.adoptNode = function (node) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @return {?}
     */
    WorkerDomAdapter.prototype.getHref = function (element) { throw 'not implemented'; };
    /**
     * @param {?} event
     * @return {?}
     */
    WorkerDomAdapter.prototype.getEventKey = function (event) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} baseUrl
     * @param {?} href
     * @return {?}
     */
    WorkerDomAdapter.prototype.resolveAndSetHref = function (element, baseUrl, href) { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.supportsDOMEvents = function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.supportsNativeShadowDOM = function () { throw 'not implemented'; };
    /**
     * @param {?} doc
     * @param {?} target
     * @return {?}
     */
    WorkerDomAdapter.prototype.getGlobalEventTarget = function (doc, target) { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.getHistory = function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.getLocation = function () { throw 'not implemented'; };
    /**
     * @param {?} doc
     * @return {?}
     */
    WorkerDomAdapter.prototype.getBaseHref = function (doc) { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.resetBaseElement = function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.getUserAgent = function () { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setData = function (element, name, value) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @return {?}
     */
    WorkerDomAdapter.prototype.getComputedStyle = function (element) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    WorkerDomAdapter.prototype.getData = function (element, name) { throw 'not implemented'; };
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setGlobalVar = function (name, value) { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.performanceNow = function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.getAnimationPrefix = function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.getTransitionEnd = function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.supportsAnimation = function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.supportsWebAnimation = function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.supportsCookies = function () { return false; };
    /**
     * @param {?} name
     * @return {?}
     */
    WorkerDomAdapter.prototype.getCookie = function (name) { throw 'not implemented'; };
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setCookie = function (name, value) { throw 'not implemented'; };
    return WorkerDomAdapter;
}(DomAdapter));
export { WorkerDomAdapter };
//# sourceMappingURL=worker_adapter.js.map