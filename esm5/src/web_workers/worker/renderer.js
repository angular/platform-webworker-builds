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
import { Injectable } from '@angular/core';
import { ClientMessageBrokerFactory, FnArg, UiArguments } from '../shared/client_message_broker';
import { MessageBus } from '../shared/message_bus';
import { EVENT_2_CHANNEL, RENDERER_2_CHANNEL } from '../shared/messaging_api';
import { RenderStore } from '../shared/render_store';
import { Serializer } from '../shared/serializer';
var NamedEventEmitter = /** @class */ (function () {
    function NamedEventEmitter() {
    }
    /**
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    NamedEventEmitter.prototype.listen = /**
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    function (eventName, callback) { this._getListeners(eventName).push(callback); };
    /**
     * @param {?} eventName
     * @param {?} listener
     * @return {?}
     */
    NamedEventEmitter.prototype.unlisten = /**
     * @param {?} eventName
     * @param {?} listener
     * @return {?}
     */
    function (eventName, listener) {
        var /** @type {?} */ listeners = this._getListeners(eventName);
        var /** @type {?} */ index = listeners.indexOf(listener);
        if (index > -1) {
            listeners.splice(index, 1);
        }
    };
    /**
     * @param {?} eventName
     * @param {?} event
     * @return {?}
     */
    NamedEventEmitter.prototype.dispatchEvent = /**
     * @param {?} eventName
     * @param {?} event
     * @return {?}
     */
    function (eventName, event) {
        var /** @type {?} */ listeners = this._getListeners(eventName);
        for (var /** @type {?} */ i = 0; i < listeners.length; i++) {
            listeners[i](event);
        }
    };
    /**
     * @param {?} eventName
     * @return {?}
     */
    NamedEventEmitter.prototype._getListeners = /**
     * @param {?} eventName
     * @return {?}
     */
    function (eventName) {
        if (!this._listeners) {
            this._listeners = new Map();
        }
        var /** @type {?} */ listeners = this._listeners.get(eventName);
        if (!listeners) {
            listeners = [];
            this._listeners.set(eventName, listeners);
        }
        return listeners;
    };
    return NamedEventEmitter;
}());
export { NamedEventEmitter };
function NamedEventEmitter_tsickle_Closure_declarations() {
    /** @type {?} */
    NamedEventEmitter.prototype._listeners;
}
/**
 * @param {?} target
 * @param {?} eventName
 * @return {?}
 */
function eventNameWithTarget(target, eventName) {
    return target + ":" + eventName;
}
var WebWorkerRendererFactory2 = /** @class */ (function () {
    function WebWorkerRendererFactory2(messageBrokerFactory, bus, _serializer, renderStore) {
        var _this = this;
        this._serializer = _serializer;
        this.renderStore = renderStore;
        this.globalEvents = new NamedEventEmitter();
        this._messageBroker = messageBrokerFactory.createMessageBroker(RENDERER_2_CHANNEL);
        bus.initChannel(EVENT_2_CHANNEL);
        var /** @type {?} */ source = bus.from(EVENT_2_CHANNEL);
        source.subscribe({ next: function (message) { return _this._dispatchEvent(message); } });
    }
    /**
     * @param {?} element
     * @param {?} type
     * @return {?}
     */
    WebWorkerRendererFactory2.prototype.createRenderer = /**
     * @param {?} element
     * @param {?} type
     * @return {?}
     */
    function (element, type) {
        var /** @type {?} */ renderer = new WebWorkerRenderer2(this);
        var /** @type {?} */ id = this.renderStore.allocateId();
        this.renderStore.store(renderer, id);
        this.callUI('createRenderer', [
            new FnArg(element, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(type, 0 /* RENDERER_TYPE_2 */),
            new FnArg(renderer, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return renderer;
    };
    /**
     * @return {?}
     */
    WebWorkerRendererFactory2.prototype.begin = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    WebWorkerRendererFactory2.prototype.end = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} fnName
     * @param {?} fnArgs
     * @return {?}
     */
    WebWorkerRendererFactory2.prototype.callUI = /**
     * @param {?} fnName
     * @param {?} fnArgs
     * @return {?}
     */
    function (fnName, fnArgs) {
        var /** @type {?} */ args = new UiArguments(fnName, fnArgs);
        this._messageBroker.runOnService(args, null);
    };
    /**
     * @return {?}
     */
    WebWorkerRendererFactory2.prototype.allocateNode = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ result = new WebWorkerRenderNode();
        var /** @type {?} */ id = this.renderStore.allocateId();
        this.renderStore.store(result, id);
        return result;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    WebWorkerRendererFactory2.prototype.freeNode = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { this.renderStore.remove(node); };
    /**
     * @return {?}
     */
    WebWorkerRendererFactory2.prototype.allocateId = /**
     * @return {?}
     */
    function () { return this.renderStore.allocateId(); };
    /**
     * @param {?} message
     * @return {?}
     */
    WebWorkerRendererFactory2.prototype._dispatchEvent = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        var /** @type {?} */ element = this._serializer.deserialize(message['element'], 2 /* RENDER_STORE_OBJECT */);
        var /** @type {?} */ eventName = message['eventName'];
        var /** @type {?} */ target = message['eventTarget'];
        var /** @type {?} */ event = message['event'];
        if (target) {
            this.globalEvents.dispatchEvent(eventNameWithTarget(target, eventName), event);
        }
        else {
            element.events.dispatchEvent(eventName, event);
        }
    };
    WebWorkerRendererFactory2.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    WebWorkerRendererFactory2.ctorParameters = function () { return [
        { type: ClientMessageBrokerFactory, },
        { type: MessageBus, },
        { type: Serializer, },
        { type: RenderStore, },
    ]; };
    return WebWorkerRendererFactory2;
}());
export { WebWorkerRendererFactory2 };
function WebWorkerRendererFactory2_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    WebWorkerRendererFactory2.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    WebWorkerRendererFactory2.ctorParameters;
    /** @type {?} */
    WebWorkerRendererFactory2.prototype.globalEvents;
    /** @type {?} */
    WebWorkerRendererFactory2.prototype._messageBroker;
    /** @type {?} */
    WebWorkerRendererFactory2.prototype._serializer;
    /** @type {?} */
    WebWorkerRendererFactory2.prototype.renderStore;
}
var WebWorkerRenderer2 = /** @class */ (function () {
    function WebWorkerRenderer2(_rendererFactory) {
        this._rendererFactory = _rendererFactory;
        this.data = Object.create(null);
        this.asFnArg = new FnArg(this, 2 /* RENDER_STORE_OBJECT */);
    }
    /**
     * @return {?}
     */
    WebWorkerRenderer2.prototype.destroy = /**
     * @return {?}
     */
    function () { this.callUIWithRenderer('destroy'); };
    /**
     * @param {?} node
     * @return {?}
     */
    WebWorkerRenderer2.prototype.destroyNode = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        this.callUIWithRenderer('destroyNode', [new FnArg(node, 2 /* RENDER_STORE_OBJECT */)]);
        this._rendererFactory.freeNode(node);
    };
    /**
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    WebWorkerRenderer2.prototype.createElement = /**
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    function (name, namespace) {
        var /** @type {?} */ node = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('createElement', [
            new FnArg(name),
            new FnArg(namespace),
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return node;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    WebWorkerRenderer2.prototype.createComment = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var /** @type {?} */ node = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('createComment', [
            new FnArg(value),
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return node;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    WebWorkerRenderer2.prototype.createText = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var /** @type {?} */ node = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('createText', [
            new FnArg(value),
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return node;
    };
    /**
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */
    WebWorkerRenderer2.prototype.appendChild = /**
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */
    function (parent, newChild) {
        this.callUIWithRenderer('appendChild', [
            new FnArg(parent, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(newChild, 2 /* RENDER_STORE_OBJECT */),
        ]);
    };
    /**
     * @param {?} parent
     * @param {?} newChild
     * @param {?} refChild
     * @return {?}
     */
    WebWorkerRenderer2.prototype.insertBefore = /**
     * @param {?} parent
     * @param {?} newChild
     * @param {?} refChild
     * @return {?}
     */
    function (parent, newChild, refChild) {
        if (!parent) {
            return;
        }
        this.callUIWithRenderer('insertBefore', [
            new FnArg(parent, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(newChild, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(refChild, 2 /* RENDER_STORE_OBJECT */),
        ]);
    };
    /**
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */
    WebWorkerRenderer2.prototype.removeChild = /**
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */
    function (parent, oldChild) {
        this.callUIWithRenderer('removeChild', [
            new FnArg(parent, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(oldChild, 2 /* RENDER_STORE_OBJECT */),
        ]);
    };
    /**
     * @param {?} selectorOrNode
     * @return {?}
     */
    WebWorkerRenderer2.prototype.selectRootElement = /**
     * @param {?} selectorOrNode
     * @return {?}
     */
    function (selectorOrNode) {
        var /** @type {?} */ node = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('selectRootElement', [
            new FnArg(selectorOrNode),
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return node;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    WebWorkerRenderer2.prototype.parentNode = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        var /** @type {?} */ res = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('parentNode', [
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(res, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return res;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    WebWorkerRenderer2.prototype.nextSibling = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        var /** @type {?} */ res = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('nextSibling', [
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(res, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return res;
    };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */
    WebWorkerRenderer2.prototype.setAttribute = /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */
    function (el, name, value, namespace) {
        this.callUIWithRenderer('setAttribute', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
            new FnArg(value),
            new FnArg(namespace),
        ]);
    };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    WebWorkerRenderer2.prototype.removeAttribute = /**
     * @param {?} el
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    function (el, name, namespace) {
        this.callUIWithRenderer('removeAttribute', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
            new FnArg(namespace),
        ]);
    };
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    WebWorkerRenderer2.prototype.addClass = /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    function (el, name) {
        this.callUIWithRenderer('addClass', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
        ]);
    };
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    WebWorkerRenderer2.prototype.removeClass = /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    function (el, name) {
        this.callUIWithRenderer('removeClass', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
        ]);
    };
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?} flags
     * @return {?}
     */
    WebWorkerRenderer2.prototype.setStyle = /**
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?} flags
     * @return {?}
     */
    function (el, style, value, flags) {
        this.callUIWithRenderer('setStyle', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(style),
            new FnArg(value),
            new FnArg(flags),
        ]);
    };
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} flags
     * @return {?}
     */
    WebWorkerRenderer2.prototype.removeStyle = /**
     * @param {?} el
     * @param {?} style
     * @param {?} flags
     * @return {?}
     */
    function (el, style, flags) {
        this.callUIWithRenderer('removeStyle', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(style),
            new FnArg(flags),
        ]);
    };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    WebWorkerRenderer2.prototype.setProperty = /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (el, name, value) {
        this.callUIWithRenderer('setProperty', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
            new FnArg(value),
        ]);
    };
    /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    WebWorkerRenderer2.prototype.setValue = /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    function (node, value) {
        this.callUIWithRenderer('setValue', [
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(value),
        ]);
    };
    /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} listener
     * @return {?}
     */
    WebWorkerRenderer2.prototype.listen = /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} listener
     * @return {?}
     */
    function (target, eventName, listener) {
        var _this = this;
        var /** @type {?} */ unlistenId = this._rendererFactory.allocateId();
        var _a = typeof target === 'string' ? [null, target, target + ":" + eventName] :
            [target, null, null], targetEl = _a[0], targetName = _a[1], fullName = _a[2];
        if (fullName) {
            this._rendererFactory.globalEvents.listen(fullName, listener);
        }
        else {
            targetEl.events.listen(eventName, listener);
        }
        this.callUIWithRenderer('listen', [
            new FnArg(targetEl, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(targetName),
            new FnArg(eventName),
            new FnArg(unlistenId),
        ]);
        return function () {
            if (fullName) {
                _this._rendererFactory.globalEvents.unlisten(fullName, listener);
            }
            else {
                targetEl.events.unlisten(eventName, listener);
            }
            _this.callUIWithRenderer('unlisten', [new FnArg(unlistenId)]);
        };
    };
    /**
     * @param {?} fnName
     * @param {?=} fnArgs
     * @return {?}
     */
    WebWorkerRenderer2.prototype.callUIWithRenderer = /**
     * @param {?} fnName
     * @param {?=} fnArgs
     * @return {?}
     */
    function (fnName, fnArgs) {
        if (fnArgs === void 0) { fnArgs = []; }
        // always pass the renderer as the first arg
        this._rendererFactory.callUI(fnName, [this.asFnArg].concat(fnArgs));
    };
    return WebWorkerRenderer2;
}());
export { WebWorkerRenderer2 };
function WebWorkerRenderer2_tsickle_Closure_declarations() {
    /** @type {?} */
    WebWorkerRenderer2.prototype.data;
    /** @type {?} */
    WebWorkerRenderer2.prototype.asFnArg;
    /** @type {?} */
    WebWorkerRenderer2.prototype._rendererFactory;
}
var WebWorkerRenderNode = /** @class */ (function () {
    function WebWorkerRenderNode() {
        this.events = new NamedEventEmitter();
    }
    return WebWorkerRenderNode;
}());
export { WebWorkerRenderNode };
function WebWorkerRenderNode_tsickle_Closure_declarations() {
    /** @type {?} */
    WebWorkerRenderNode.prototype.events;
}
//# sourceMappingURL=renderer.js.map