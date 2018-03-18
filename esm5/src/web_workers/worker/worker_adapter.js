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
    /**
     * @return {?}
     */
    WorkerDomAdapter.makeCurrent = /**
     * @return {?}
     */
    function () { setRootDomAdapter(new WorkerDomAdapter()); };
    /**
     * @param {?} error
     * @return {?}
     */
    WorkerDomAdapter.prototype.logError = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
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
    WorkerDomAdapter.prototype.log = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        // tslint:disable-next-line:no-console
        console.log(error);
    };
    /**
     * @param {?} error
     * @return {?}
     */
    WorkerDomAdapter.prototype.logGroup = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
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
    WorkerDomAdapter.prototype.logGroupEnd = /**
     * @return {?}
     */
    function () {
        if (console.groupEnd) {
            console.groupEnd();
        }
    };
    /**
     * @param {?} nodeA
     * @param {?} nodeB
     * @return {?}
     */
    WorkerDomAdapter.prototype.contains = /**
     * @param {?} nodeA
     * @param {?} nodeB
     * @return {?}
     */
    function (nodeA, nodeB) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    WorkerDomAdapter.prototype.hasProperty = /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    function (element, name) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setProperty = /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (el, name, value) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    WorkerDomAdapter.prototype.getProperty = /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    function (el, name) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    WorkerDomAdapter.prototype.invoke = /**
     * @param {?} el
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    function (el, methodName, args) { throw 'not implemented'; };
    Object.defineProperty(WorkerDomAdapter.prototype, "attrToPropMap", {
        get: /**
         * @return {?}
         */
        function () { throw 'not implemented'; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { throw 'not implemented'; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} templateHtml
     * @return {?}
     */
    WorkerDomAdapter.prototype.parse = /**
     * @param {?} templateHtml
     * @return {?}
     */
    function (templateHtml) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    WorkerDomAdapter.prototype.querySelector = /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    function (el, selector) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    WorkerDomAdapter.prototype.querySelectorAll = /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    function (el, selector) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    WorkerDomAdapter.prototype.on = /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    function (el, evt, listener) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    WorkerDomAdapter.prototype.onAndCancel = /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    function (el, evt, listener) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */
    WorkerDomAdapter.prototype.dispatchEvent = /**
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */
    function (el, evt) { throw 'not implemented'; };
    /**
     * @param {?} eventType
     * @return {?}
     */
    WorkerDomAdapter.prototype.createMouseEvent = /**
     * @param {?} eventType
     * @return {?}
     */
    function (eventType) { throw 'not implemented'; };
    /**
     * @param {?} eventType
     * @return {?}
     */
    WorkerDomAdapter.prototype.createEvent = /**
     * @param {?} eventType
     * @return {?}
     */
    function (eventType) { throw 'not implemented'; };
    /**
     * @param {?} evt
     * @return {?}
     */
    WorkerDomAdapter.prototype.preventDefault = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) { throw 'not implemented'; };
    /**
     * @param {?} evt
     * @return {?}
     */
    WorkerDomAdapter.prototype.isPrevented = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getInnerHTML = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getTemplateContent = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getOuterHTML = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.nodeName = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.nodeValue = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.type = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.content = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.firstChild = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.nextSibling = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.parentElement = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.childNodes = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.childNodesAsList = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.clearNodes = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.appendChild = /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    function (el, node) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.removeChild = /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    function (el, node) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} newNode
     * @param {?} oldNode
     * @return {?}
     */
    WorkerDomAdapter.prototype.replaceChild = /**
     * @param {?} el
     * @param {?} newNode
     * @param {?} oldNode
     * @return {?}
     */
    function (el, newNode, oldNode) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.remove = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} parent
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.insertBefore = /**
     * @param {?} parent
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    function (parent, el, node) { throw 'not implemented'; };
    /**
     * @param {?} parent
     * @param {?} el
     * @param {?} nodes
     * @return {?}
     */
    WorkerDomAdapter.prototype.insertAllBefore = /**
     * @param {?} parent
     * @param {?} el
     * @param {?} nodes
     * @return {?}
     */
    function (parent, el, nodes) { throw 'not implemented'; };
    /**
     * @param {?} parent
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.insertAfter = /**
     * @param {?} parent
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    function (parent, el, node) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setInnerHTML = /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    function (el, value) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getText = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setText = /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    function (el, value) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getValue = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setValue = /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    function (el, value) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getChecked = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setChecked = /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    function (el, value) { throw 'not implemented'; };
    /**
     * @param {?} text
     * @return {?}
     */
    WorkerDomAdapter.prototype.createComment = /**
     * @param {?} text
     * @return {?}
     */
    function (text) { throw 'not implemented'; };
    /**
     * @param {?} html
     * @return {?}
     */
    WorkerDomAdapter.prototype.createTemplate = /**
     * @param {?} html
     * @return {?}
     */
    function (html) { throw 'not implemented'; };
    /**
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    WorkerDomAdapter.prototype.createElement = /**
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    function (tagName, doc) { throw 'not implemented'; };
    /**
     * @param {?} ns
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    WorkerDomAdapter.prototype.createElementNS = /**
     * @param {?} ns
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    function (ns, tagName, doc) { throw 'not implemented'; };
    /**
     * @param {?} text
     * @param {?=} doc
     * @return {?}
     */
    WorkerDomAdapter.prototype.createTextNode = /**
     * @param {?} text
     * @param {?=} doc
     * @return {?}
     */
    function (text, doc) { throw 'not implemented'; };
    /**
     * @param {?} attrName
     * @param {?} attrValue
     * @param {?=} doc
     * @return {?}
     */
    WorkerDomAdapter.prototype.createScriptTag = /**
     * @param {?} attrName
     * @param {?} attrValue
     * @param {?=} doc
     * @return {?}
     */
    function (attrName, attrValue, doc) {
        throw 'not implemented';
    };
    /**
     * @param {?} css
     * @param {?=} doc
     * @return {?}
     */
    WorkerDomAdapter.prototype.createStyleElement = /**
     * @param {?} css
     * @param {?=} doc
     * @return {?}
     */
    function (css, doc) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.createShadowRoot = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getShadowRoot = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getHost = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getDistributedNodes = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.clone = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    WorkerDomAdapter.prototype.getElementsByClassName = /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    function (element, name) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    WorkerDomAdapter.prototype.getElementsByTagName = /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    function (element, name) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @return {?}
     */
    WorkerDomAdapter.prototype.classList = /**
     * @param {?} element
     * @return {?}
     */
    function (element) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    WorkerDomAdapter.prototype.addClass = /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    function (element, className) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    WorkerDomAdapter.prototype.removeClass = /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    function (element, className) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    WorkerDomAdapter.prototype.hasClass = /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    function (element, className) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    WorkerDomAdapter.prototype.setStyle = /**
     * @param {?} element
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    function (element, styleName, styleValue) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    WorkerDomAdapter.prototype.removeStyle = /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    function (element, styleName) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    WorkerDomAdapter.prototype.getStyle = /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    function (element, styleName) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    WorkerDomAdapter.prototype.hasStyle = /**
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    function (element, styleName, styleValue) {
        throw 'not implemented';
    };
    /**
     * @param {?} element
     * @return {?}
     */
    WorkerDomAdapter.prototype.tagName = /**
     * @param {?} element
     * @return {?}
     */
    function (element) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @return {?}
     */
    WorkerDomAdapter.prototype.attributeMap = /**
     * @param {?} element
     * @return {?}
     */
    function (element) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    WorkerDomAdapter.prototype.hasAttribute = /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    function (element, attribute) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    WorkerDomAdapter.prototype.hasAttributeNS = /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    function (element, ns, attribute) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    WorkerDomAdapter.prototype.getAttribute = /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    function (element, attribute) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    WorkerDomAdapter.prototype.getAttributeNS = /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    function (element, ns, attribute) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setAttribute = /**
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (element, name, value) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setAttributeNS = /**
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (element, ns, name, value) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    WorkerDomAdapter.prototype.removeAttribute = /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    function (element, attribute) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    WorkerDomAdapter.prototype.removeAttributeNS = /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    function (element, ns, attribute) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.templateAwareRoot = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.createHtmlDocument = /**
     * @return {?}
     */
    function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.getDefaultDocument = /**
     * @return {?}
     */
    function () { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getBoundingClientRect = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} doc
     * @return {?}
     */
    WorkerDomAdapter.prototype.getTitle = /**
     * @param {?} doc
     * @return {?}
     */
    function (doc) { throw 'not implemented'; };
    /**
     * @param {?} doc
     * @param {?} newTitle
     * @return {?}
     */
    WorkerDomAdapter.prototype.setTitle = /**
     * @param {?} doc
     * @param {?} newTitle
     * @return {?}
     */
    function (doc, newTitle) { throw 'not implemented'; };
    /**
     * @param {?} n
     * @param {?} selector
     * @return {?}
     */
    WorkerDomAdapter.prototype.elementMatches = /**
     * @param {?} n
     * @param {?} selector
     * @return {?}
     */
    function (n, selector) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.isTemplateElement = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.isTextNode = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.isCommentNode = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.isElementNode = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.hasShadowRoot = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.isShadowRoot = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.importIntoDoc = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.adoptNode = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @return {?}
     */
    WorkerDomAdapter.prototype.getHref = /**
     * @param {?} element
     * @return {?}
     */
    function (element) { throw 'not implemented'; };
    /**
     * @param {?} event
     * @return {?}
     */
    WorkerDomAdapter.prototype.getEventKey = /**
     * @param {?} event
     * @return {?}
     */
    function (event) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} baseUrl
     * @param {?} href
     * @return {?}
     */
    WorkerDomAdapter.prototype.resolveAndSetHref = /**
     * @param {?} element
     * @param {?} baseUrl
     * @param {?} href
     * @return {?}
     */
    function (element, baseUrl, href) { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.supportsDOMEvents = /**
     * @return {?}
     */
    function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.supportsNativeShadowDOM = /**
     * @return {?}
     */
    function () { throw 'not implemented'; };
    /**
     * @param {?} doc
     * @param {?} target
     * @return {?}
     */
    WorkerDomAdapter.prototype.getGlobalEventTarget = /**
     * @param {?} doc
     * @param {?} target
     * @return {?}
     */
    function (doc, target) { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.getHistory = /**
     * @return {?}
     */
    function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.getLocation = /**
     * @return {?}
     */
    function () { throw 'not implemented'; };
    /**
     * @param {?} doc
     * @return {?}
     */
    WorkerDomAdapter.prototype.getBaseHref = /**
     * @param {?} doc
     * @return {?}
     */
    function (doc) { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.resetBaseElement = /**
     * @return {?}
     */
    function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.getUserAgent = /**
     * @return {?}
     */
    function () { return 'Fake user agent'; };
    /**
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setData = /**
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (element, name, value) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @return {?}
     */
    WorkerDomAdapter.prototype.getComputedStyle = /**
     * @param {?} element
     * @return {?}
     */
    function (element) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    WorkerDomAdapter.prototype.getData = /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    function (element, name) { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.performanceNow = /**
     * @return {?}
     */
    function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.getAnimationPrefix = /**
     * @return {?}
     */
    function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.getTransitionEnd = /**
     * @return {?}
     */
    function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.supportsAnimation = /**
     * @return {?}
     */
    function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.supportsWebAnimation = /**
     * @return {?}
     */
    function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.supportsCookies = /**
     * @return {?}
     */
    function () { return false; };
    /**
     * @param {?} name
     * @return {?}
     */
    WorkerDomAdapter.prototype.getCookie = /**
     * @param {?} name
     * @return {?}
     */
    function (name) { throw 'not implemented'; };
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setCookie = /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (name, value) { throw 'not implemented'; };
    return WorkerDomAdapter;
}(DomAdapter));
/**
 * This adapter is required to log error messages.
 *
 * Note: other methods all throw as the DOM is not accessible directly in web worker context.
 */
export { WorkerDomAdapter };
//# sourceMappingURL=worker_adapter.js.map