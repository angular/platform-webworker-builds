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
export class NamedEventEmitter {
    /**
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    listen(eventName, callback) { this._getListeners(eventName).push(callback); }
    /**
     * @param {?} eventName
     * @param {?} listener
     * @return {?}
     */
    unlisten(eventName, listener) {
        const /** @type {?} */ listeners = this._getListeners(eventName);
        const /** @type {?} */ index = listeners.indexOf(listener);
        if (index > -1) {
            listeners.splice(index, 1);
        }
    }
    /**
     * @param {?} eventName
     * @param {?} event
     * @return {?}
     */
    dispatchEvent(eventName, event) {
        const /** @type {?} */ listeners = this._getListeners(eventName);
        for (let /** @type {?} */ i = 0; i < listeners.length; i++) {
            listeners[i](event);
        }
    }
    /**
     * @param {?} eventName
     * @return {?}
     */
    _getListeners(eventName) {
        if (!this._listeners) {
            this._listeners = new Map();
        }
        let /** @type {?} */ listeners = this._listeners.get(eventName);
        if (!listeners) {
            listeners = [];
            this._listeners.set(eventName, listeners);
        }
        return listeners;
    }
}
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
    return `${target}:${eventName}`;
}
export class WebWorkerRendererFactory2 {
    /**
     * @param {?} messageBrokerFactory
     * @param {?} bus
     * @param {?} _serializer
     * @param {?} renderStore
     */
    constructor(messageBrokerFactory, bus, _serializer, renderStore) {
        this._serializer = _serializer;
        this.renderStore = renderStore;
        this.globalEvents = new NamedEventEmitter();
        this._messageBroker = messageBrokerFactory.createMessageBroker(RENDERER_2_CHANNEL);
        bus.initChannel(EVENT_2_CHANNEL);
        const /** @type {?} */ source = bus.from(EVENT_2_CHANNEL);
        source.subscribe({ next: (message) => this._dispatchEvent(message) });
    }
    /**
     * @param {?} element
     * @param {?} type
     * @return {?}
     */
    createRenderer(element, type) {
        const /** @type {?} */ renderer = new WebWorkerRenderer2(this);
        const /** @type {?} */ id = this.renderStore.allocateId();
        this.renderStore.store(renderer, id);
        this.callUI('createRenderer', [
            new FnArg(element, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(type, 0 /* RENDERER_TYPE_2 */),
            new FnArg(renderer, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return renderer;
    }
    /**
     * @return {?}
     */
    begin() { }
    /**
     * @return {?}
     */
    end() { }
    /**
     * @param {?} fnName
     * @param {?} fnArgs
     * @return {?}
     */
    callUI(fnName, fnArgs) {
        const /** @type {?} */ args = new UiArguments(fnName, fnArgs);
        this._messageBroker.runOnService(args, null);
    }
    /**
     * @return {?}
     */
    allocateNode() {
        const /** @type {?} */ result = new WebWorkerRenderNode();
        const /** @type {?} */ id = this.renderStore.allocateId();
        this.renderStore.store(result, id);
        return result;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    freeNode(node) { this.renderStore.remove(node); }
    /**
     * @return {?}
     */
    allocateId() { return this.renderStore.allocateId(); }
    /**
     * @param {?} message
     * @return {?}
     */
    _dispatchEvent(message) {
        const /** @type {?} */ element = this._serializer.deserialize(message['element'], 2 /* RENDER_STORE_OBJECT */);
        const /** @type {?} */ eventName = message['eventName'];
        const /** @type {?} */ target = message['eventTarget'];
        const /** @type {?} */ event = message['event'];
        if (target) {
            this.globalEvents.dispatchEvent(eventNameWithTarget(target, eventName), event);
        }
        else {
            element.events.dispatchEvent(eventName, event);
        }
    }
}
WebWorkerRendererFactory2.decorators = [
    { type: Injectable }
];
/** @nocollapse */
WebWorkerRendererFactory2.ctorParameters = () => [
    { type: ClientMessageBrokerFactory },
    { type: MessageBus },
    { type: Serializer },
    { type: RenderStore }
];
function WebWorkerRendererFactory2_tsickle_Closure_declarations() {
    /** @type {?} */
    WebWorkerRendererFactory2.prototype.globalEvents;
    /** @type {?} */
    WebWorkerRendererFactory2.prototype._messageBroker;
    /** @type {?} */
    WebWorkerRendererFactory2.prototype._serializer;
    /** @type {?} */
    WebWorkerRendererFactory2.prototype.renderStore;
}
export class WebWorkerRenderer2 {
    /**
     * @param {?} _rendererFactory
     */
    constructor(_rendererFactory) {
        this._rendererFactory = _rendererFactory;
        this.data = Object.create(null);
        this.asFnArg = new FnArg(this, 2 /* RENDER_STORE_OBJECT */);
    }
    /**
     * @return {?}
     */
    destroy() { this.callUIWithRenderer('destroy'); }
    /**
     * @param {?} node
     * @return {?}
     */
    destroyNode(node) {
        this.callUIWithRenderer('destroyNode', [new FnArg(node, 2 /* RENDER_STORE_OBJECT */)]);
        this._rendererFactory.freeNode(node);
    }
    /**
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    createElement(name, namespace) {
        const /** @type {?} */ node = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('createElement', [
            new FnArg(name),
            new FnArg(namespace),
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return node;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    createComment(value) {
        const /** @type {?} */ node = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('createComment', [
            new FnArg(value),
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return node;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    createText(value) {
        const /** @type {?} */ node = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('createText', [
            new FnArg(value),
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return node;
    }
    /**
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */
    appendChild(parent, newChild) {
        this.callUIWithRenderer('appendChild', [
            new FnArg(parent, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(newChild, 2 /* RENDER_STORE_OBJECT */),
        ]);
    }
    /**
     * @param {?} parent
     * @param {?} newChild
     * @param {?} refChild
     * @return {?}
     */
    insertBefore(parent, newChild, refChild) {
        if (!parent) {
            return;
        }
        this.callUIWithRenderer('insertBefore', [
            new FnArg(parent, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(newChild, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(refChild, 2 /* RENDER_STORE_OBJECT */),
        ]);
    }
    /**
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */
    removeChild(parent, oldChild) {
        this.callUIWithRenderer('removeChild', [
            new FnArg(parent, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(oldChild, 2 /* RENDER_STORE_OBJECT */),
        ]);
    }
    /**
     * @param {?} selectorOrNode
     * @return {?}
     */
    selectRootElement(selectorOrNode) {
        const /** @type {?} */ node = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('selectRootElement', [
            new FnArg(selectorOrNode),
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return node;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    parentNode(node) {
        const /** @type {?} */ res = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('parentNode', [
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(res, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return res;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    nextSibling(node) {
        const /** @type {?} */ res = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('nextSibling', [
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(res, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return res;
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */
    setAttribute(el, name, value, namespace) {
        this.callUIWithRenderer('setAttribute', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
            new FnArg(value),
            new FnArg(namespace),
        ]);
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    removeAttribute(el, name, namespace) {
        this.callUIWithRenderer('removeAttribute', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
            new FnArg(namespace),
        ]);
    }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    addClass(el, name) {
        this.callUIWithRenderer('addClass', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
        ]);
    }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    removeClass(el, name) {
        this.callUIWithRenderer('removeClass', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
        ]);
    }
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?} flags
     * @return {?}
     */
    setStyle(el, style, value, flags) {
        this.callUIWithRenderer('setStyle', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(style),
            new FnArg(value),
            new FnArg(flags),
        ]);
    }
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} flags
     * @return {?}
     */
    removeStyle(el, style, flags) {
        this.callUIWithRenderer('removeStyle', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(style),
            new FnArg(flags),
        ]);
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setProperty(el, name, value) {
        this.callUIWithRenderer('setProperty', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
            new FnArg(value),
        ]);
    }
    /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    setValue(node, value) {
        this.callUIWithRenderer('setValue', [
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(value),
        ]);
    }
    /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} listener
     * @return {?}
     */
    listen(target, eventName, listener) {
        const /** @type {?} */ unlistenId = this._rendererFactory.allocateId();
        const [targetEl, targetName, fullName] = typeof target === 'string' ? [null, target, `${target}:${eventName}`] :
            [target, null, null];
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
        return () => {
            if (fullName) {
                this._rendererFactory.globalEvents.unlisten(fullName, listener);
            }
            else {
                targetEl.events.unlisten(eventName, listener);
            }
            this.callUIWithRenderer('unlisten', [new FnArg(unlistenId)]);
        };
    }
    /**
     * @param {?} fnName
     * @param {?=} fnArgs
     * @return {?}
     */
    callUIWithRenderer(fnName, fnArgs = []) {
        // always pass the renderer as the first arg
        this._rendererFactory.callUI(fnName, [this.asFnArg, ...fnArgs]);
    }
}
function WebWorkerRenderer2_tsickle_Closure_declarations() {
    /** @type {?} */
    WebWorkerRenderer2.prototype.data;
    /** @type {?} */
    WebWorkerRenderer2.prototype.asFnArg;
    /** @type {?} */
    WebWorkerRenderer2.prototype._rendererFactory;
}
export class WebWorkerRenderNode {
    constructor() {
        this.events = new NamedEventEmitter();
    }
}
function WebWorkerRenderNode_tsickle_Closure_declarations() {
    /** @type {?} */
    WebWorkerRenderNode.prototype.events;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci9yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxVQUFVLEVBQWtFLE1BQU0sZUFBZSxDQUFDO0FBRTFHLE9BQU8sRUFBc0IsMEJBQTBCLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BILE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsZUFBZSxFQUFFLGtCQUFrQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDNUUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBQyxVQUFVLEVBQWtCLE1BQU0sc0JBQXNCLENBQUM7QUFFakUsTUFBTTs7Ozs7O0lBR0osTUFBTSxDQUFDLFNBQWlCLEVBQUUsUUFBa0IsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFOzs7Ozs7SUFFL0YsUUFBUSxDQUFDLFNBQWlCLEVBQUUsUUFBa0I7UUFDNUMsdUJBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEQsdUJBQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzVCO0tBQ0Y7Ozs7OztJQUVELGFBQWEsQ0FBQyxTQUFpQixFQUFFLEtBQVU7UUFDekMsdUJBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEQsR0FBRyxDQUFDLENBQUMscUJBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNyQjtLQUNGOzs7OztJQUVPLGFBQWEsQ0FBQyxTQUFpQjtRQUNyQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQXNCLENBQUM7U0FDakQ7UUFDRCxxQkFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2YsU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUMzQztRQUNELE1BQU0sQ0FBQyxTQUFTLENBQUM7O0NBRXBCOzs7Ozs7Ozs7O0FBR0QsNkJBQTZCLE1BQWMsRUFBRSxTQUFpQjtJQUM1RCxNQUFNLENBQUMsR0FBRyxNQUFNLElBQUksU0FBUyxFQUFFLENBQUM7Q0FDakM7QUFHRCxNQUFNOzs7Ozs7O0lBS0osWUFDSSxvQkFBZ0QsRUFBRSxHQUFlLEVBQ3pELGFBQWdDLFdBQXdCO1FBQXhELGdCQUFXLEdBQVgsV0FBVztRQUFxQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTs0QkFOckQsSUFBSSxpQkFBaUIsRUFBRTtRQU9wQyxJQUFJLENBQUMsY0FBYyxHQUFHLG9CQUFvQixDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDbkYsR0FBRyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNqQyx1QkFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN6QyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUMsSUFBSSxFQUFFLENBQUMsT0FBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFDLENBQUMsQ0FBQztLQUMxRTs7Ozs7O0lBRUQsY0FBYyxDQUFDLE9BQVksRUFBRSxJQUF3QjtRQUNuRCx1QkFBTSxRQUFRLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU5Qyx1QkFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRTtZQUM1QixJQUFJLEtBQUssQ0FBQyxPQUFPLDhCQUFzQztZQUN2RCxJQUFJLEtBQUssQ0FBQyxJQUFJLDBCQUFrQztZQUNoRCxJQUFJLEtBQUssQ0FBQyxRQUFRLDhCQUFzQztTQUN6RCxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsUUFBUSxDQUFDO0tBQ2pCOzs7O0lBRUQsS0FBSyxNQUFLOzs7O0lBQ1YsR0FBRyxNQUFLOzs7Ozs7SUFFUixNQUFNLENBQUMsTUFBYyxFQUFFLE1BQWU7UUFDcEMsdUJBQU0sSUFBSSxHQUFHLElBQUksV0FBVyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDOUM7Ozs7SUFFRCxZQUFZO1FBQ1YsdUJBQU0sTUFBTSxHQUFHLElBQUksbUJBQW1CLEVBQUUsQ0FBQztRQUN6Qyx1QkFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbkMsTUFBTSxDQUFDLE1BQU0sQ0FBQztLQUNmOzs7OztJQUVELFFBQVEsQ0FBQyxJQUFTLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTs7OztJQUV0RCxVQUFVLEtBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRTs7Ozs7SUFFdEQsY0FBYyxDQUFDLE9BQTZCO1FBQ2xELHVCQUFNLE9BQU8sR0FDVCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLDhCQUFzQyxDQUFDO1FBRTFGLHVCQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdkMsdUJBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN0Qyx1QkFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRS9CLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWCxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDaEY7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNoRDs7OztZQTVESixVQUFVOzs7O1lBNUNrQiwwQkFBMEI7WUFDL0MsVUFBVTtZQUdWLFVBQVU7WUFEVixXQUFXOzs7Ozs7Ozs7Ozs7QUEwR25CLE1BQU07Ozs7SUFHSixZQUFvQixnQkFBMkM7UUFBM0MscUJBQWdCLEdBQWhCLGdCQUFnQixDQUEyQjtvQkFGbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7dUJBSTlCLElBQUksS0FBSyxDQUFDLElBQUksOEJBQXNDO0tBRkg7Ozs7SUFJbkUsT0FBTyxLQUFXLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFOzs7OztJQUV2RCxXQUFXLENBQUMsSUFBUztRQUNuQixJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSw4QkFBc0MsQ0FBQyxDQUFDLENBQUM7UUFDL0YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0Qzs7Ozs7O0lBRUQsYUFBYSxDQUFDLElBQVksRUFBRSxTQUFrQjtRQUM1Qyx1QkFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2xELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLEVBQUU7WUFDdkMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQ2YsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQ3BCLElBQUksS0FBSyxDQUFDLElBQUksOEJBQXNDO1NBQ3JELENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDYjs7Ozs7SUFFRCxhQUFhLENBQUMsS0FBYTtRQUN6Qix1QkFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2xELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLEVBQUU7WUFDdkMsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ2hCLElBQUksS0FBSyxDQUFDLElBQUksOEJBQXNDO1NBQ3JELENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDYjs7Ozs7SUFFRCxVQUFVLENBQUMsS0FBYTtRQUN0Qix1QkFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2xELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUU7WUFDcEMsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ2hCLElBQUksS0FBSyxDQUFDLElBQUksOEJBQXNDO1NBQ3JELENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDYjs7Ozs7O0lBRUQsV0FBVyxDQUFDLE1BQVcsRUFBRSxRQUFhO1FBQ3BDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUU7WUFDckMsSUFBSSxLQUFLLENBQUMsTUFBTSw4QkFBc0M7WUFDdEQsSUFBSSxLQUFLLENBQUMsUUFBUSw4QkFBc0M7U0FDekQsQ0FBQyxDQUFDO0tBQ0o7Ozs7Ozs7SUFFRCxZQUFZLENBQUMsTUFBVyxFQUFFLFFBQWEsRUFBRSxRQUFhO1FBQ3BELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNaLE1BQU0sQ0FBQztTQUNSO1FBRUQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRTtZQUN0QyxJQUFJLEtBQUssQ0FBQyxNQUFNLDhCQUFzQztZQUN0RCxJQUFJLEtBQUssQ0FBQyxRQUFRLDhCQUFzQztZQUN4RCxJQUFJLEtBQUssQ0FBQyxRQUFRLDhCQUFzQztTQUN6RCxDQUFDLENBQUM7S0FDSjs7Ozs7O0lBRUQsV0FBVyxDQUFDLE1BQVcsRUFBRSxRQUFhO1FBQ3BDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUU7WUFDckMsSUFBSSxLQUFLLENBQUMsTUFBTSw4QkFBc0M7WUFDdEQsSUFBSSxLQUFLLENBQUMsUUFBUSw4QkFBc0M7U0FDekQsQ0FBQyxDQUFDO0tBQ0o7Ozs7O0lBRUQsaUJBQWlCLENBQUMsY0FBMEI7UUFDMUMsdUJBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNsRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLEVBQUU7WUFDM0MsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDO1lBQ3pCLElBQUksS0FBSyxDQUFDLElBQUksOEJBQXNDO1NBQ3JELENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDYjs7Ozs7SUFFRCxVQUFVLENBQUMsSUFBUztRQUNsQix1QkFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2pELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUU7WUFDcEMsSUFBSSxLQUFLLENBQUMsSUFBSSw4QkFBc0M7WUFDcEQsSUFBSSxLQUFLLENBQUMsR0FBRyw4QkFBc0M7U0FDcEQsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQztLQUNaOzs7OztJQUVELFdBQVcsQ0FBQyxJQUFTO1FBQ25CLHVCQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDakQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsRUFBRTtZQUNyQyxJQUFJLEtBQUssQ0FBQyxJQUFJLDhCQUFzQztZQUNwRCxJQUFJLEtBQUssQ0FBQyxHQUFHLDhCQUFzQztTQUNwRCxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDO0tBQ1o7Ozs7Ozs7O0lBRUQsWUFBWSxDQUFDLEVBQU8sRUFBRSxJQUFZLEVBQUUsS0FBYSxFQUFFLFNBQWtCO1FBQ25FLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUU7WUFDdEMsSUFBSSxLQUFLLENBQUMsRUFBRSw4QkFBc0M7WUFDbEQsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQ2YsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ2hCLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQztTQUNyQixDQUFDLENBQUM7S0FDSjs7Ozs7OztJQUVELGVBQWUsQ0FBQyxFQUFPLEVBQUUsSUFBWSxFQUFFLFNBQWtCO1FBQ3ZELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsRUFBRTtZQUN6QyxJQUFJLEtBQUssQ0FBQyxFQUFFLDhCQUFzQztZQUNsRCxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDZixJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUM7U0FDckIsQ0FBQyxDQUFDO0tBQ0o7Ozs7OztJQUVELFFBQVEsQ0FBQyxFQUFPLEVBQUUsSUFBWTtRQUM1QixJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFO1lBQ2xDLElBQUksS0FBSyxDQUFDLEVBQUUsOEJBQXNDO1lBQ2xELElBQUksS0FBSyxDQUFDLElBQUksQ0FBQztTQUNoQixDQUFDLENBQUM7S0FDSjs7Ozs7O0lBRUQsV0FBVyxDQUFDLEVBQU8sRUFBRSxJQUFZO1FBQy9CLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUU7WUFDckMsSUFBSSxLQUFLLENBQUMsRUFBRSw4QkFBc0M7WUFDbEQsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDO1NBQ2hCLENBQUMsQ0FBQztLQUNKOzs7Ozs7OztJQUVELFFBQVEsQ0FBQyxFQUFPLEVBQUUsS0FBYSxFQUFFLEtBQVUsRUFBRSxLQUEwQjtRQUNyRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFO1lBQ2xDLElBQUksS0FBSyxDQUFDLEVBQUUsOEJBQXNDO1lBQ2xELElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQztZQUNoQixJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDaEIsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDO1NBQ2pCLENBQUMsQ0FBQztLQUNKOzs7Ozs7O0lBRUQsV0FBVyxDQUFDLEVBQU8sRUFBRSxLQUFhLEVBQUUsS0FBMEI7UUFDNUQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsRUFBRTtZQUNyQyxJQUFJLEtBQUssQ0FBQyxFQUFFLDhCQUFzQztZQUNsRCxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDaEIsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDO1NBQ2pCLENBQUMsQ0FBQztLQUNKOzs7Ozs7O0lBRUQsV0FBVyxDQUFDLEVBQU8sRUFBRSxJQUFZLEVBQUUsS0FBVTtRQUMzQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxFQUFFO1lBQ3JDLElBQUksS0FBSyxDQUFDLEVBQUUsOEJBQXNDO1lBQ2xELElBQUksS0FBSyxDQUFDLElBQUksQ0FBQztZQUNmLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQztTQUNqQixDQUFDLENBQUM7S0FDSjs7Ozs7O0lBRUQsUUFBUSxDQUFDLElBQVMsRUFBRSxLQUFhO1FBQy9CLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUU7WUFDbEMsSUFBSSxLQUFLLENBQUMsSUFBSSw4QkFBc0M7WUFDcEQsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDO1NBQ2pCLENBQUMsQ0FBQztLQUNKOzs7Ozs7O0lBRUQsTUFBTSxDQUNGLE1BQXNDLEVBQUUsU0FBaUIsRUFDekQsUUFBaUM7UUFDbkMsdUJBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUV0RCxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsR0FDbEMsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLElBQUksU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzFDLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUV0RCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQy9EO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDN0M7UUFFRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxFQUFFO1lBQ2hDLElBQUksS0FBSyxDQUFDLFFBQVEsOEJBQXNDO1lBQ3hELElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQztZQUNyQixJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFDcEIsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDO1NBQ3RCLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxHQUFHLEVBQUU7WUFDVixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUNqRTtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUMvQztZQUNELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDOUQsQ0FBQztLQUNIOzs7Ozs7SUFFTyxrQkFBa0IsQ0FBQyxNQUFjLEVBQUUsU0FBa0IsRUFBRTs7UUFFN0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Q0FFbkU7Ozs7Ozs7OztBQUVELE1BQU07O3NCQUFzQyxJQUFJLGlCQUFpQixFQUFFOztDQUFHIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGUsIFJlbmRlcmVyMiwgUmVuZGVyZXJGYWN0b3J5MiwgUmVuZGVyZXJTdHlsZUZsYWdzMiwgUmVuZGVyZXJUeXBlMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7Q2xpZW50TWVzc2FnZUJyb2tlciwgQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksIEZuQXJnLCBVaUFyZ3VtZW50c30gZnJvbSAnLi4vc2hhcmVkL2NsaWVudF9tZXNzYWdlX2Jyb2tlcic7XG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJy4uL3NoYXJlZC9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge0VWRU5UXzJfQ0hBTk5FTCwgUkVOREVSRVJfMl9DSEFOTkVMfSBmcm9tICcuLi9zaGFyZWQvbWVzc2FnaW5nX2FwaSc7XG5pbXBvcnQge1JlbmRlclN0b3JlfSBmcm9tICcuLi9zaGFyZWQvcmVuZGVyX3N0b3JlJztcbmltcG9ydCB7U2VyaWFsaXplciwgU2VyaWFsaXplclR5cGVzfSBmcm9tICcuLi9zaGFyZWQvc2VyaWFsaXplcic7XG5cbmV4cG9ydCBjbGFzcyBOYW1lZEV2ZW50RW1pdHRlciB7XG4gIHByaXZhdGUgX2xpc3RlbmVyczogTWFwPHN0cmluZywgRnVuY3Rpb25bXT47XG5cbiAgbGlzdGVuKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHsgdGhpcy5fZ2V0TGlzdGVuZXJzKGV2ZW50TmFtZSkucHVzaChjYWxsYmFjayk7IH1cblxuICB1bmxpc3RlbihldmVudE5hbWU6IHN0cmluZywgbGlzdGVuZXI6IEZ1bmN0aW9uKSB7XG4gICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fZ2V0TGlzdGVuZXJzKGV2ZW50TmFtZSk7XG4gICAgY29uc3QgaW5kZXggPSBsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIGxpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIGRpc3BhdGNoRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcsIGV2ZW50OiBhbnkpIHtcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9nZXRMaXN0ZW5lcnMoZXZlbnROYW1lKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgbGlzdGVuZXJzW2ldKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9nZXRMaXN0ZW5lcnMoZXZlbnROYW1lOiBzdHJpbmcpOiBGdW5jdGlvbltdIHtcbiAgICBpZiAoIXRoaXMuX2xpc3RlbmVycykge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzID0gbmV3IE1hcDxzdHJpbmcsIEZ1bmN0aW9uW10+KCk7XG4gICAgfVxuICAgIGxldCBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSk7XG4gICAgaWYgKCFsaXN0ZW5lcnMpIHtcbiAgICAgIGxpc3RlbmVycyA9IFtdO1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLnNldChldmVudE5hbWUsIGxpc3RlbmVycyk7XG4gICAgfVxuICAgIHJldHVybiBsaXN0ZW5lcnM7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBldmVudE5hbWVXaXRoVGFyZ2V0KHRhcmdldDogc3RyaW5nLCBldmVudE5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBgJHt0YXJnZXR9OiR7ZXZlbnROYW1lfWA7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBXZWJXb3JrZXJSZW5kZXJlckZhY3RvcnkyIGltcGxlbWVudHMgUmVuZGVyZXJGYWN0b3J5MiB7XG4gIGdsb2JhbEV2ZW50cyA9IG5ldyBOYW1lZEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgX21lc3NhZ2VCcm9rZXI6IENsaWVudE1lc3NhZ2VCcm9rZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBtZXNzYWdlQnJva2VyRmFjdG9yeTogQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksIGJ1czogTWVzc2FnZUJ1cyxcbiAgICAgIHByaXZhdGUgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIsIHB1YmxpYyByZW5kZXJTdG9yZTogUmVuZGVyU3RvcmUpIHtcbiAgICB0aGlzLl9tZXNzYWdlQnJva2VyID0gbWVzc2FnZUJyb2tlckZhY3RvcnkuY3JlYXRlTWVzc2FnZUJyb2tlcihSRU5ERVJFUl8yX0NIQU5ORUwpO1xuICAgIGJ1cy5pbml0Q2hhbm5lbChFVkVOVF8yX0NIQU5ORUwpO1xuICAgIGNvbnN0IHNvdXJjZSA9IGJ1cy5mcm9tKEVWRU5UXzJfQ0hBTk5FTCk7XG4gICAgc291cmNlLnN1YnNjcmliZSh7bmV4dDogKG1lc3NhZ2U6IGFueSkgPT4gdGhpcy5fZGlzcGF0Y2hFdmVudChtZXNzYWdlKX0pO1xuICB9XG5cbiAgY3JlYXRlUmVuZGVyZXIoZWxlbWVudDogYW55LCB0eXBlOiBSZW5kZXJlclR5cGUyfG51bGwpOiBSZW5kZXJlcjIge1xuICAgIGNvbnN0IHJlbmRlcmVyID0gbmV3IFdlYldvcmtlclJlbmRlcmVyMih0aGlzKTtcblxuICAgIGNvbnN0IGlkID0gdGhpcy5yZW5kZXJTdG9yZS5hbGxvY2F0ZUlkKCk7XG4gICAgdGhpcy5yZW5kZXJTdG9yZS5zdG9yZShyZW5kZXJlciwgaWQpO1xuICAgIHRoaXMuY2FsbFVJKCdjcmVhdGVSZW5kZXJlcicsIFtcbiAgICAgIG5ldyBGbkFyZyhlbGVtZW50LCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICBuZXcgRm5BcmcodHlwZSwgU2VyaWFsaXplclR5cGVzLlJFTkRFUkVSX1RZUEVfMiksXG4gICAgICBuZXcgRm5BcmcocmVuZGVyZXIsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICBdKTtcblxuICAgIHJldHVybiByZW5kZXJlcjtcbiAgfVxuXG4gIGJlZ2luKCkge31cbiAgZW5kKCkge31cblxuICBjYWxsVUkoZm5OYW1lOiBzdHJpbmcsIGZuQXJnczogRm5BcmdbXSkge1xuICAgIGNvbnN0IGFyZ3MgPSBuZXcgVWlBcmd1bWVudHMoZm5OYW1lLCBmbkFyZ3MpO1xuICAgIHRoaXMuX21lc3NhZ2VCcm9rZXIucnVuT25TZXJ2aWNlKGFyZ3MsIG51bGwpO1xuICB9XG5cbiAgYWxsb2NhdGVOb2RlKCk6IFdlYldvcmtlclJlbmRlck5vZGUge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBXZWJXb3JrZXJSZW5kZXJOb2RlKCk7XG4gICAgY29uc3QgaWQgPSB0aGlzLnJlbmRlclN0b3JlLmFsbG9jYXRlSWQoKTtcbiAgICB0aGlzLnJlbmRlclN0b3JlLnN0b3JlKHJlc3VsdCwgaWQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmcmVlTm9kZShub2RlOiBhbnkpIHsgdGhpcy5yZW5kZXJTdG9yZS5yZW1vdmUobm9kZSk7IH1cblxuICBhbGxvY2F0ZUlkKCk6IG51bWJlciB7IHJldHVybiB0aGlzLnJlbmRlclN0b3JlLmFsbG9jYXRlSWQoKTsgfVxuXG4gIHByaXZhdGUgX2Rpc3BhdGNoRXZlbnQobWVzc2FnZToge1trZXk6IHN0cmluZ106IGFueX0pOiB2b2lkIHtcbiAgICBjb25zdCBlbGVtZW50OiBXZWJXb3JrZXJSZW5kZXJOb2RlID1cbiAgICAgICAgdGhpcy5fc2VyaWFsaXplci5kZXNlcmlhbGl6ZShtZXNzYWdlWydlbGVtZW50J10sIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKTtcblxuICAgIGNvbnN0IGV2ZW50TmFtZSA9IG1lc3NhZ2VbJ2V2ZW50TmFtZSddO1xuICAgIGNvbnN0IHRhcmdldCA9IG1lc3NhZ2VbJ2V2ZW50VGFyZ2V0J107XG4gICAgY29uc3QgZXZlbnQgPSBtZXNzYWdlWydldmVudCddO1xuXG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgdGhpcy5nbG9iYWxFdmVudHMuZGlzcGF0Y2hFdmVudChldmVudE5hbWVXaXRoVGFyZ2V0KHRhcmdldCwgZXZlbnROYW1lKSwgZXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LmV2ZW50cy5kaXNwYXRjaEV2ZW50KGV2ZW50TmFtZSwgZXZlbnQpO1xuICAgIH1cbiAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBXZWJXb3JrZXJSZW5kZXJlcjIgaW1wbGVtZW50cyBSZW5kZXJlcjIge1xuICBkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcmVuZGVyZXJGYWN0b3J5OiBXZWJXb3JrZXJSZW5kZXJlckZhY3RvcnkyKSB7fVxuXG4gIHByaXZhdGUgYXNGbkFyZyA9IG5ldyBGbkFyZyh0aGlzLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCk7XG5cbiAgZGVzdHJveSgpOiB2b2lkIHsgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ2Rlc3Ryb3knKTsgfVxuXG4gIGRlc3Ryb3lOb2RlKG5vZGU6IGFueSkge1xuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdkZXN0cm95Tm9kZScsIFtuZXcgRm5Bcmcobm9kZSwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpXSk7XG4gICAgdGhpcy5fcmVuZGVyZXJGYWN0b3J5LmZyZWVOb2RlKG5vZGUpO1xuICB9XG5cbiAgY3JlYXRlRWxlbWVudChuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IGFueSB7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXMuX3JlbmRlcmVyRmFjdG9yeS5hbGxvY2F0ZU5vZGUoKTtcbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcignY3JlYXRlRWxlbWVudCcsIFtcbiAgICAgIG5ldyBGbkFyZyhuYW1lKSxcbiAgICAgIG5ldyBGbkFyZyhuYW1lc3BhY2UpLFxuICAgICAgbmV3IEZuQXJnKG5vZGUsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICBdKTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIGNyZWF0ZUNvbW1lbnQodmFsdWU6IHN0cmluZyk6IGFueSB7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXMuX3JlbmRlcmVyRmFjdG9yeS5hbGxvY2F0ZU5vZGUoKTtcbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcignY3JlYXRlQ29tbWVudCcsIFtcbiAgICAgIG5ldyBGbkFyZyh2YWx1ZSksXG4gICAgICBuZXcgRm5Bcmcobm9kZSwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgIF0pO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgY3JlYXRlVGV4dCh2YWx1ZTogc3RyaW5nKTogYW55IHtcbiAgICBjb25zdCBub2RlID0gdGhpcy5fcmVuZGVyZXJGYWN0b3J5LmFsbG9jYXRlTm9kZSgpO1xuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdjcmVhdGVUZXh0JywgW1xuICAgICAgbmV3IEZuQXJnKHZhbHVlKSxcbiAgICAgIG5ldyBGbkFyZyhub2RlLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgXSk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBhcHBlbmRDaGlsZChwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdhcHBlbmRDaGlsZCcsIFtcbiAgICAgIG5ldyBGbkFyZyhwYXJlbnQsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyhuZXdDaGlsZCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgIF0pO1xuICB9XG5cbiAgaW5zZXJ0QmVmb3JlKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55LCByZWZDaGlsZDogYW55KTogdm9pZCB7XG4gICAgaWYgKCFwYXJlbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcignaW5zZXJ0QmVmb3JlJywgW1xuICAgICAgbmV3IEZuQXJnKHBhcmVudCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgbmV3IEZuQXJnKG5ld0NoaWxkLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICBuZXcgRm5BcmcocmVmQ2hpbGQsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICBdKTtcbiAgfVxuXG4gIHJlbW92ZUNoaWxkKHBhcmVudDogYW55LCBvbGRDaGlsZDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ3JlbW92ZUNoaWxkJywgW1xuICAgICAgbmV3IEZuQXJnKHBhcmVudCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgbmV3IEZuQXJnKG9sZENoaWxkLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgXSk7XG4gIH1cblxuICBzZWxlY3RSb290RWxlbWVudChzZWxlY3Rvck9yTm9kZTogc3RyaW5nfGFueSk6IGFueSB7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXMuX3JlbmRlcmVyRmFjdG9yeS5hbGxvY2F0ZU5vZGUoKTtcbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcignc2VsZWN0Um9vdEVsZW1lbnQnLCBbXG4gICAgICBuZXcgRm5Bcmcoc2VsZWN0b3JPck5vZGUpLFxuICAgICAgbmV3IEZuQXJnKG5vZGUsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICBdKTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHBhcmVudE5vZGUobm9kZTogYW55KTogYW55IHtcbiAgICBjb25zdCByZXMgPSB0aGlzLl9yZW5kZXJlckZhY3RvcnkuYWxsb2NhdGVOb2RlKCk7XG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ3BhcmVudE5vZGUnLCBbXG4gICAgICBuZXcgRm5Bcmcobm9kZSwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgbmV3IEZuQXJnKHJlcywgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgIF0pO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBuZXh0U2libGluZyhub2RlOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IHJlcyA9IHRoaXMuX3JlbmRlcmVyRmFjdG9yeS5hbGxvY2F0ZU5vZGUoKTtcbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcignbmV4dFNpYmxpbmcnLCBbXG4gICAgICBuZXcgRm5Bcmcobm9kZSwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgbmV3IEZuQXJnKHJlcywgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgIF0pO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBzZXRBdHRyaWJ1dGUoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcignc2V0QXR0cmlidXRlJywgW1xuICAgICAgbmV3IEZuQXJnKGVsLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICBuZXcgRm5BcmcobmFtZSksXG4gICAgICBuZXcgRm5BcmcodmFsdWUpLFxuICAgICAgbmV3IEZuQXJnKG5hbWVzcGFjZSksXG4gICAgXSk7XG4gIH1cblxuICByZW1vdmVBdHRyaWJ1dGUoZWw6IGFueSwgbmFtZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcigncmVtb3ZlQXR0cmlidXRlJywgW1xuICAgICAgbmV3IEZuQXJnKGVsLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICBuZXcgRm5BcmcobmFtZSksXG4gICAgICBuZXcgRm5BcmcobmFtZXNwYWNlKSxcbiAgICBdKTtcbiAgfVxuXG4gIGFkZENsYXNzKGVsOiBhbnksIG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdhZGRDbGFzcycsIFtcbiAgICAgIG5ldyBGbkFyZyhlbCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgbmV3IEZuQXJnKG5hbWUpLFxuICAgIF0pO1xuICB9XG5cbiAgcmVtb3ZlQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ3JlbW92ZUNsYXNzJywgW1xuICAgICAgbmV3IEZuQXJnKGVsLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICBuZXcgRm5BcmcobmFtZSksXG4gICAgXSk7XG4gIH1cblxuICBzZXRTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCB2YWx1ZTogYW55LCBmbGFnczogUmVuZGVyZXJTdHlsZUZsYWdzMik6IHZvaWQge1xuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdzZXRTdHlsZScsIFtcbiAgICAgIG5ldyBGbkFyZyhlbCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgbmV3IEZuQXJnKHN0eWxlKSxcbiAgICAgIG5ldyBGbkFyZyh2YWx1ZSksXG4gICAgICBuZXcgRm5BcmcoZmxhZ3MpLFxuICAgIF0pO1xuICB9XG5cbiAgcmVtb3ZlU3R5bGUoZWw6IGFueSwgc3R5bGU6IHN0cmluZywgZmxhZ3M6IFJlbmRlcmVyU3R5bGVGbGFnczIpOiB2b2lkIHtcbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcigncmVtb3ZlU3R5bGUnLCBbXG4gICAgICBuZXcgRm5BcmcoZWwsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyhzdHlsZSksXG4gICAgICBuZXcgRm5BcmcoZmxhZ3MpLFxuICAgIF0pO1xuICB9XG5cbiAgc2V0UHJvcGVydHkoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ3NldFByb3BlcnR5JywgW1xuICAgICAgbmV3IEZuQXJnKGVsLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICBuZXcgRm5BcmcobmFtZSksXG4gICAgICBuZXcgRm5BcmcodmFsdWUpLFxuICAgIF0pO1xuICB9XG5cbiAgc2V0VmFsdWUobm9kZTogYW55LCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ3NldFZhbHVlJywgW1xuICAgICAgbmV3IEZuQXJnKG5vZGUsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyh2YWx1ZSksXG4gICAgXSk7XG4gIH1cblxuICBsaXN0ZW4oXG4gICAgICB0YXJnZXQ6ICd3aW5kb3cnfCdkb2N1bWVudCd8J2JvZHknfGFueSwgZXZlbnROYW1lOiBzdHJpbmcsXG4gICAgICBsaXN0ZW5lcjogKGV2ZW50OiBhbnkpID0+IGJvb2xlYW4pOiAoKSA9PiB2b2lkIHtcbiAgICBjb25zdCB1bmxpc3RlbklkID0gdGhpcy5fcmVuZGVyZXJGYWN0b3J5LmFsbG9jYXRlSWQoKTtcblxuICAgIGNvbnN0IFt0YXJnZXRFbCwgdGFyZ2V0TmFtZSwgZnVsbE5hbWVdOiBbYW55LCBzdHJpbmcgfCBudWxsLCBzdHJpbmcgfCBudWxsXSA9XG4gICAgICAgIHR5cGVvZiB0YXJnZXQgPT09ICdzdHJpbmcnID8gW251bGwsIHRhcmdldCwgYCR7dGFyZ2V0fToke2V2ZW50TmFtZX1gXSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RhcmdldCwgbnVsbCwgbnVsbF07XG5cbiAgICBpZiAoZnVsbE5hbWUpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyRmFjdG9yeS5nbG9iYWxFdmVudHMubGlzdGVuKGZ1bGxOYW1lLCBsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldEVsLmV2ZW50cy5saXN0ZW4oZXZlbnROYW1lLCBsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ2xpc3RlbicsIFtcbiAgICAgIG5ldyBGbkFyZyh0YXJnZXRFbCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgbmV3IEZuQXJnKHRhcmdldE5hbWUpLFxuICAgICAgbmV3IEZuQXJnKGV2ZW50TmFtZSksXG4gICAgICBuZXcgRm5BcmcodW5saXN0ZW5JZCksXG4gICAgXSk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKGZ1bGxOYW1lKSB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyRmFjdG9yeS5nbG9iYWxFdmVudHMudW5saXN0ZW4oZnVsbE5hbWUsIGxpc3RlbmVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldEVsLmV2ZW50cy51bmxpc3RlbihldmVudE5hbWUsIGxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCd1bmxpc3RlbicsIFtuZXcgRm5BcmcodW5saXN0ZW5JZCldKTtcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBjYWxsVUlXaXRoUmVuZGVyZXIoZm5OYW1lOiBzdHJpbmcsIGZuQXJnczogRm5BcmdbXSA9IFtdKSB7XG4gICAgLy8gYWx3YXlzIHBhc3MgdGhlIHJlbmRlcmVyIGFzIHRoZSBmaXJzdCBhcmdcbiAgICB0aGlzLl9yZW5kZXJlckZhY3RvcnkuY2FsbFVJKGZuTmFtZSwgW3RoaXMuYXNGbkFyZywgLi4uZm5BcmdzXSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFdlYldvcmtlclJlbmRlck5vZGUgeyBldmVudHMgPSBuZXcgTmFtZWRFdmVudEVtaXR0ZXIoKTsgfVxuIl19