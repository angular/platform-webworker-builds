/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ClientMessageBrokerFactory, FnArg, UiArguments } from '../shared/client_message_broker';
import { MessageBus } from '../shared/message_bus';
import { EVENT_2_CHANNEL, RENDERER_2_CHANNEL } from '../shared/messaging_api';
import { RenderStore } from '../shared/render_store';
import { Serializer } from '../shared/serializer';
import * as i0 from "@angular/core";
import * as i1 from "../shared/client_message_broker";
import * as i2 from "../shared/message_bus";
import * as i3 from "../shared/serializer";
import * as i4 from "../shared/render_store";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
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
        /** @type {?} */
        const listeners = this._getListeners(eventName);
        /** @type {?} */
        const index = listeners.indexOf(listener);
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
        /** @type {?} */
        const listeners = this._getListeners(eventName);
        for (let i = 0; i < listeners.length; i++) {
            listeners[i](event);
        }
    }
    /**
     * @private
     * @param {?} eventName
     * @return {?}
     */
    _getListeners(eventName) {
        if (!this._listeners) {
            this._listeners = new Map();
        }
        /** @type {?} */
        let listeners = this._listeners.get(eventName);
        if (!listeners) {
            listeners = [];
            this._listeners.set(eventName, listeners);
        }
        return listeners;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
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
        /** @type {?} */
        const source = bus.from(EVENT_2_CHANNEL);
        source.subscribe({ next: (/**
             * @param {?} message
             * @return {?}
             */
            (message) => this._dispatchEvent(message)) });
    }
    /**
     * @param {?} element
     * @param {?} type
     * @return {?}
     */
    createRenderer(element, type) {
        /** @type {?} */
        const renderer = new WebWorkerRenderer2(this);
        /** @type {?} */
        const id = this.renderStore.allocateId();
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
        /** @type {?} */
        const args = new UiArguments(fnName, fnArgs);
        this._messageBroker.runOnService(args, null);
    }
    /**
     * @return {?}
     */
    allocateNode() {
        /** @type {?} */
        const result = new WebWorkerRenderNode();
        /** @type {?} */
        const id = this.renderStore.allocateId();
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
     * @private
     * @param {?} message
     * @return {?}
     */
    _dispatchEvent(message) {
        /** @type {?} */
        const element = this._serializer.deserialize(message['element'], 2 /* RENDER_STORE_OBJECT */);
        /** @type {?} */
        const eventName = message['eventName'];
        /** @type {?} */
        const target = message['eventTarget'];
        /** @type {?} */
        const event = message['event'];
        if (target) {
            this.globalEvents.dispatchEvent(eventNameWithTarget(target, eventName), event);
        }
        else {
            element.events.dispatchEvent(eventName, event);
        }
    }
}
WebWorkerRendererFactory2.decorators = [
    { type: Injectable },
];
/** @nocollapse */
WebWorkerRendererFactory2.ctorParameters = () => [
    { type: ClientMessageBrokerFactory },
    { type: MessageBus },
    { type: Serializer },
    { type: RenderStore }
];
/** @nocollapse */ WebWorkerRendererFactory2.ɵfac = function WebWorkerRendererFactory2_Factory(t) { return new (t || WebWorkerRendererFactory2)(i0.ɵɵinject(i1.ClientMessageBrokerFactory), i0.ɵɵinject(i2.MessageBus), i0.ɵɵinject(i3.Serializer), i0.ɵɵinject(i4.RenderStore)); };
/** @nocollapse */ WebWorkerRendererFactory2.ɵprov = i0.ɵɵdefineInjectable({ token: WebWorkerRendererFactory2, factory: function (t) { return WebWorkerRendererFactory2.ɵfac(t); }, providedIn: null });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(WebWorkerRendererFactory2, [{
        type: Injectable
    }], function () { return [{ type: i1.ClientMessageBrokerFactory }, { type: i2.MessageBus }, { type: i3.Serializer }, { type: i4.RenderStore }]; }, null); })();
if (false) {
    /** @type {?} */
    WebWorkerRendererFactory2.prototype.globalEvents;
    /**
     * @type {?}
     * @private
     */
    WebWorkerRendererFactory2.prototype._messageBroker;
    /**
     * @type {?}
     * @private
     */
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
        /** @type {?} */
        const node = this._rendererFactory.allocateNode();
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
        /** @type {?} */
        const node = this._rendererFactory.allocateNode();
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
        /** @type {?} */
        const node = this._rendererFactory.allocateNode();
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
        /** @type {?} */
        const node = this._rendererFactory.allocateNode();
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
        /** @type {?} */
        const res = this._rendererFactory.allocateNode();
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
        /** @type {?} */
        const res = this._rendererFactory.allocateNode();
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
        /** @type {?} */
        const unlistenId = this._rendererFactory.allocateId();
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
        return (/**
         * @return {?}
         */
        () => {
            if (fullName) {
                this._rendererFactory.globalEvents.unlisten(fullName, listener);
            }
            else {
                targetEl.events.unlisten(eventName, listener);
            }
            this.callUIWithRenderer('unlisten', [new FnArg(unlistenId)]);
        });
    }
    /**
     * @private
     * @param {?} fnName
     * @param {?=} fnArgs
     * @return {?}
     */
    callUIWithRenderer(fnName, fnArgs = []) {
        // always pass the renderer as the first arg
        this._rendererFactory.callUI(fnName, [this.asFnArg, ...fnArgs]);
    }
}
if (false) {
    /** @type {?} */
    WebWorkerRenderer2.prototype.data;
    /**
     * @type {?}
     * @private
     */
    WebWorkerRenderer2.prototype.asFnArg;
    /**
     * @type {?}
     * @private
     */
    WebWorkerRenderer2.prototype._rendererFactory;
}
export class WebWorkerRenderNode {
    constructor() {
        this.events = new NamedEventEmitter();
    }
}
if (false) {
    /** @type {?} */
    WebWorkerRenderNode.prototype.events;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci9yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBUUEsT0FBTyxFQUFDLFVBQVUsRUFBa0UsTUFBTSxlQUFlLENBQUM7QUFFMUcsT0FBTyxFQUFzQiwwQkFBMEIsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDcEgsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBQyxlQUFlLEVBQUUsa0JBQWtCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDbkQsT0FBTyxFQUFDLFVBQVUsRUFBa0IsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7Ozs7Ozs7OztBQUVqRSxNQUFNLE9BQU8saUJBQWlCOzs7Ozs7SUFJNUIsTUFBTSxDQUFDLFNBQWlCLEVBQUUsUUFBa0IsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUUvRixRQUFRLENBQUMsU0FBaUIsRUFBRSxRQUFrQjs7Y0FDdEMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDOztjQUN6QyxLQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDekMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDZCxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM1QjtJQUNILENBQUM7Ozs7OztJQUVELGFBQWEsQ0FBQyxTQUFpQixFQUFFLEtBQVU7O2NBQ25DLFNBQVMs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QUMsQ0FBQztRQUVIOzs7UUFBTyxHQUFHLEVBQUU7WUFDVixJQUFJLFFBQVEsRUFBRTtnQkFDWixJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDakU7aUJBQU07Z0JBQ0wsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQy9DO1lBQ0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRCxDQUFDLEVBQUM7SUFDSixDQUFDOzs7Ozs7O0lBRU8sa0JBQWtCLENBQUMsTUFBYyxFQUFFLFNBQWtCLEVBQUU7UUFDN0QsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQztDQUNGOzs7SUFqTUMsa0NBQWlEOzs7OztJQUlqRCxxQ0FBdUU7Ozs7O0lBRjNELDhDQUFtRDs7QUFpTWpFLE1BQU0sT0FBTyxtQkFBbUI7SUFBaEM7UUFBbUMsV0FBTSxHQUFHLElBQUksaUJBQWlCLEVBQUUsQ0FBQztJQUFDLENBQUM7Q0FBQTs7O0lBQW5DLHFDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlLCBSZW5kZXJlcjIsIFJlbmRlcmVyRmFjdG9yeTIsIFJlbmRlcmVyU3R5bGVGbGFnczIsIFJlbmRlcmVyVHlwZTJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0NsaWVudE1lc3NhZ2VCcm9rZXIsIENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LCBGbkFyZywgVWlBcmd1bWVudHN9IGZyb20gJy4uL3NoYXJlZC9jbGllbnRfbWVzc2FnZV9icm9rZXInO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICcuLi9zaGFyZWQvbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtFVkVOVF8yX0NIQU5ORUwsIFJFTkRFUkVSXzJfQ0hBTk5FTH0gZnJvbSAnLi4vc2hhcmVkL21lc3NhZ2luZ19hcGknO1xuaW1wb3J0IHtSZW5kZXJTdG9yZX0gZnJvbSAnLi4vc2hhcmVkL3JlbmRlcl9zdG9yZSc7XG5pbXBvcnQge1NlcmlhbGl6ZXIsIFNlcmlhbGl6ZXJUeXBlc30gZnJvbSAnLi4vc2hhcmVkL3NlcmlhbGl6ZXInO1xuXG5leHBvcnQgY2xhc3MgTmFtZWRFdmVudEVtaXR0ZXIge1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBfbGlzdGVuZXJzICE6IE1hcDxzdHJpbmcsIEZ1bmN0aW9uW10+O1xuXG4gIGxpc3RlbihldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7IHRoaXMuX2dldExpc3RlbmVycyhldmVudE5hbWUpLnB1c2goY2FsbGJhY2spOyB9XG5cbiAgdW5saXN0ZW4oZXZlbnROYW1lOiBzdHJpbmcsIGxpc3RlbmVyOiBGdW5jdGlvbikge1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2dldExpc3RlbmVycyhldmVudE5hbWUpO1xuICAgIGNvbnN0IGluZGV4ID0gbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICBsaXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBkaXNwYXRjaEV2ZW50KGV2ZW50TmFtZTogc3RyaW5nLCBldmVudDogYW55KSB7XG4gICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fZ2V0TGlzdGVuZXJzKGV2ZW50TmFtZSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxpc3RlbmVyc1tpXShldmVudCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0TGlzdGVuZXJzKGV2ZW50TmFtZTogc3RyaW5nKTogRnVuY3Rpb25bXSB7XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycyA9IG5ldyBNYXA8c3RyaW5nLCBGdW5jdGlvbltdPigpO1xuICAgIH1cbiAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzLmdldChldmVudE5hbWUpO1xuICAgIGlmICghbGlzdGVuZXJzKSB7XG4gICAgICBsaXN0ZW5lcnMgPSBbXTtcbiAgICAgIHRoaXMuX2xpc3RlbmVycy5zZXQoZXZlbnROYW1lLCBsaXN0ZW5lcnMpO1xuICAgIH1cbiAgICByZXR1cm4gbGlzdGVuZXJzO1xuICB9XG59XG5cblxuZnVuY3Rpb24gZXZlbnROYW1lV2l0aFRhcmdldCh0YXJnZXQ6IHN0cmluZywgZXZlbnROYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gYCR7dGFyZ2V0fToke2V2ZW50TmFtZX1gO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV2ViV29ya2VyUmVuZGVyZXJGYWN0b3J5MiBpbXBsZW1lbnRzIFJlbmRlcmVyRmFjdG9yeTIge1xuICBnbG9iYWxFdmVudHMgPSBuZXcgTmFtZWRFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIF9tZXNzYWdlQnJva2VyOiBDbGllbnRNZXNzYWdlQnJva2VyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgbWVzc2FnZUJyb2tlckZhY3Rvcnk6IENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LCBidXM6IE1lc3NhZ2VCdXMsXG4gICAgICBwcml2YXRlIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyLCBwdWJsaWMgcmVuZGVyU3RvcmU6IFJlbmRlclN0b3JlKSB7XG4gICAgdGhpcy5fbWVzc2FnZUJyb2tlciA9IG1lc3NhZ2VCcm9rZXJGYWN0b3J5LmNyZWF0ZU1lc3NhZ2VCcm9rZXIoUkVOREVSRVJfMl9DSEFOTkVMKTtcbiAgICBidXMuaW5pdENoYW5uZWwoRVZFTlRfMl9DSEFOTkVMKTtcbiAgICBjb25zdCBzb3VyY2UgPSBidXMuZnJvbShFVkVOVF8yX0NIQU5ORUwpO1xuICAgIHNvdXJjZS5zdWJzY3JpYmUoe25leHQ6IChtZXNzYWdlOiBhbnkpID0+IHRoaXMuX2Rpc3BhdGNoRXZlbnQobWVzc2FnZSl9KTtcbiAgfVxuXG4gIGNyZWF0ZVJlbmRlcmVyKGVsZW1lbnQ6IGFueSwgdHlwZTogUmVuZGVyZXJUeXBlMnxudWxsKTogUmVuZGVyZXIyIHtcbiAgICBjb25zdCByZW5kZXJlciA9IG5ldyBXZWJXb3JrZXJSZW5kZXJlcjIodGhpcyk7XG5cbiAgICBjb25zdCBpZCA9IHRoaXMucmVuZGVyU3RvcmUuYWxsb2NhdGVJZCgpO1xuICAgIHRoaXMucmVuZGVyU3RvcmUuc3RvcmUocmVuZGVyZXIsIGlkKTtcbiAgICB0aGlzLmNhbGxVSSgnY3JlYXRlUmVuZGVyZXInLCBbXG4gICAgICBuZXcgRm5BcmcoZWxlbWVudCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgbmV3IEZuQXJnKHR5cGUsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJFUl9UWVBFXzIpLFxuICAgICAgbmV3IEZuQXJnKHJlbmRlcmVyLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgXSk7XG5cbiAgICByZXR1cm4gcmVuZGVyZXI7XG4gIH1cblxuICBiZWdpbigpIHt9XG4gIGVuZCgpIHt9XG5cbiAgY2FsbFVJKGZuTmFtZTogc3RyaW5nLCBmbkFyZ3M6IEZuQXJnW10pIHtcbiAgICBjb25zdCBhcmdzID0gbmV3IFVpQXJndW1lbnRzKGZuTmFtZSwgZm5BcmdzKTtcbiAgICB0aGlzLl9tZXNzYWdlQnJva2VyLnJ1bk9uU2VydmljZShhcmdzLCBudWxsKTtcbiAgfVxuXG4gIGFsbG9jYXRlTm9kZSgpOiBXZWJXb3JrZXJSZW5kZXJOb2RlIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgV2ViV29ya2VyUmVuZGVyTm9kZSgpO1xuICAgIGNvbnN0IGlkID0gdGhpcy5yZW5kZXJTdG9yZS5hbGxvY2F0ZUlkKCk7XG4gICAgdGhpcy5yZW5kZXJTdG9yZS5zdG9yZShyZXN1bHQsIGlkKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnJlZU5vZGUobm9kZTogYW55KSB7IHRoaXMucmVuZGVyU3RvcmUucmVtb3ZlKG5vZGUpOyB9XG5cbiAgYWxsb2NhdGVJZCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5yZW5kZXJTdG9yZS5hbGxvY2F0ZUlkKCk7IH1cblxuICBwcml2YXRlIF9kaXNwYXRjaEV2ZW50KG1lc3NhZ2U6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogdm9pZCB7XG4gICAgY29uc3QgZWxlbWVudDogV2ViV29ya2VyUmVuZGVyTm9kZSA9XG4gICAgICAgIHRoaXMuX3NlcmlhbGl6ZXIuZGVzZXJpYWxpemUobWVzc2FnZVsnZWxlbWVudCddLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCk7XG5cbiAgICBjb25zdCBldmVudE5hbWUgPSBtZXNzYWdlWydldmVudE5hbWUnXTtcbiAgICBjb25zdCB0YXJnZXQgPSBtZXNzYWdlWydldmVudFRhcmdldCddO1xuICAgIGNvbnN0IGV2ZW50ID0gbWVzc2FnZVsnZXZlbnQnXTtcblxuICAgIGlmICh0YXJnZXQpIHtcbiAgICAgIHRoaXMuZ2xvYmFsRXZlbnRzLmRpc3BhdGNoRXZlbnQoZXZlbnROYW1lV2l0aFRhcmdldCh0YXJnZXQsIGV2ZW50TmFtZSksIGV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5ldmVudHMuZGlzcGF0Y2hFdmVudChldmVudE5hbWUsIGV2ZW50KTtcbiAgICB9XG4gIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgV2ViV29ya2VyUmVuZGVyZXIyIGltcGxlbWVudHMgUmVuZGVyZXIyIHtcbiAgZGF0YToge1trZXk6IHN0cmluZ106IGFueX0gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JlbmRlcmVyRmFjdG9yeTogV2ViV29ya2VyUmVuZGVyZXJGYWN0b3J5Mikge31cblxuICBwcml2YXRlIGFzRm5BcmcgPSBuZXcgRm5BcmcodGhpcywgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpO1xuXG4gIGRlc3Ryb3koKTogdm9pZCB7IHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdkZXN0cm95Jyk7IH1cblxuICBkZXN0cm95Tm9kZShub2RlOiBhbnkpIHtcbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcignZGVzdHJveU5vZGUnLCBbbmV3IEZuQXJnKG5vZGUsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKV0pO1xuICAgIHRoaXMuX3JlbmRlcmVyRmFjdG9yeS5mcmVlTm9kZShub2RlKTtcbiAgfVxuXG4gIGNyZWF0ZUVsZW1lbnQobmFtZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IG5vZGUgPSB0aGlzLl9yZW5kZXJlckZhY3RvcnkuYWxsb2NhdGVOb2RlKCk7XG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ2NyZWF0ZUVsZW1lbnQnLCBbXG4gICAgICBuZXcgRm5BcmcobmFtZSksXG4gICAgICBuZXcgRm5BcmcobmFtZXNwYWNlKSxcbiAgICAgIG5ldyBGbkFyZyhub2RlLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgXSk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBjcmVhdGVDb21tZW50KHZhbHVlOiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IG5vZGUgPSB0aGlzLl9yZW5kZXJlckZhY3RvcnkuYWxsb2NhdGVOb2RlKCk7XG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ2NyZWF0ZUNvbW1lbnQnLCBbXG4gICAgICBuZXcgRm5BcmcodmFsdWUpLFxuICAgICAgbmV3IEZuQXJnKG5vZGUsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICBdKTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIGNyZWF0ZVRleHQodmFsdWU6IHN0cmluZyk6IGFueSB7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXMuX3JlbmRlcmVyRmFjdG9yeS5hbGxvY2F0ZU5vZGUoKTtcbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcignY3JlYXRlVGV4dCcsIFtcbiAgICAgIG5ldyBGbkFyZyh2YWx1ZSksXG4gICAgICBuZXcgRm5Bcmcobm9kZSwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgIF0pO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgYXBwZW5kQ2hpbGQocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcignYXBwZW5kQ2hpbGQnLCBbXG4gICAgICBuZXcgRm5BcmcocGFyZW50LCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICBuZXcgRm5BcmcobmV3Q2hpbGQsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICBdKTtcbiAgfVxuXG4gIGluc2VydEJlZm9yZShwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSwgcmVmQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIGlmICghcGFyZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ2luc2VydEJlZm9yZScsIFtcbiAgICAgIG5ldyBGbkFyZyhwYXJlbnQsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyhuZXdDaGlsZCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgbmV3IEZuQXJnKHJlZkNoaWxkLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgXSk7XG4gIH1cblxuICByZW1vdmVDaGlsZChwYXJlbnQ6IGFueSwgb2xkQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdyZW1vdmVDaGlsZCcsIFtcbiAgICAgIG5ldyBGbkFyZyhwYXJlbnQsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyhvbGRDaGlsZCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgIF0pO1xuICB9XG5cbiAgc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3JPck5vZGU6IHN0cmluZ3xhbnkpOiBhbnkge1xuICAgIGNvbnN0IG5vZGUgPSB0aGlzLl9yZW5kZXJlckZhY3RvcnkuYWxsb2NhdGVOb2RlKCk7XG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ3NlbGVjdFJvb3RFbGVtZW50JywgW1xuICAgICAgbmV3IEZuQXJnKHNlbGVjdG9yT3JOb2RlKSxcbiAgICAgIG5ldyBGbkFyZyhub2RlLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgXSk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBwYXJlbnROb2RlKG5vZGU6IGFueSk6IGFueSB7XG4gICAgY29uc3QgcmVzID0gdGhpcy5fcmVuZGVyZXJGYWN0b3J5LmFsbG9jYXRlTm9kZSgpO1xuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdwYXJlbnROb2RlJywgW1xuICAgICAgbmV3IEZuQXJnKG5vZGUsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyhyZXMsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICBdKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgbmV4dFNpYmxpbmcobm9kZTogYW55KTogYW55IHtcbiAgICBjb25zdCByZXMgPSB0aGlzLl9yZW5kZXJlckZhY3RvcnkuYWxsb2NhdGVOb2RlKCk7XG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ25leHRTaWJsaW5nJywgW1xuICAgICAgbmV3IEZuQXJnKG5vZGUsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyhyZXMsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICBdKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgc2V0QXR0cmlidXRlKGVsOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ3NldEF0dHJpYnV0ZScsIFtcbiAgICAgIG5ldyBGbkFyZyhlbCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgbmV3IEZuQXJnKG5hbWUpLFxuICAgICAgbmV3IEZuQXJnKHZhbHVlKSxcbiAgICAgIG5ldyBGbkFyZyhuYW1lc3BhY2UpLFxuICAgIF0pO1xuICB9XG5cbiAgcmVtb3ZlQXR0cmlidXRlKGVsOiBhbnksIG5hbWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ3JlbW92ZUF0dHJpYnV0ZScsIFtcbiAgICAgIG5ldyBGbkFyZyhlbCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgbmV3IEZuQXJnKG5hbWUpLFxuICAgICAgbmV3IEZuQXJnKG5hbWVzcGFjZSksXG4gICAgXSk7XG4gIH1cblxuICBhZGRDbGFzcyhlbDogYW55LCBuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcignYWRkQ2xhc3MnLCBbXG4gICAgICBuZXcgRm5BcmcoZWwsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyhuYW1lKSxcbiAgICBdKTtcbiAgfVxuXG4gIHJlbW92ZUNsYXNzKGVsOiBhbnksIG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdyZW1vdmVDbGFzcycsIFtcbiAgICAgIG5ldyBGbkFyZyhlbCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgbmV3IEZuQXJnKG5hbWUpLFxuICAgIF0pO1xuICB9XG5cbiAgc2V0U3R5bGUoZWw6IGFueSwgc3R5bGU6IHN0cmluZywgdmFsdWU6IGFueSwgZmxhZ3M6IFJlbmRlcmVyU3R5bGVGbGFnczIpOiB2b2lkIHtcbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcignc2V0U3R5bGUnLCBbXG4gICAgICBuZXcgRm5BcmcoZWwsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyhzdHlsZSksXG4gICAgICBuZXcgRm5BcmcodmFsdWUpLFxuICAgICAgbmV3IEZuQXJnKGZsYWdzKSxcbiAgICBdKTtcbiAgfVxuXG4gIHJlbW92ZVN0eWxlKGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIGZsYWdzOiBSZW5kZXJlclN0eWxlRmxhZ3MyKTogdm9pZCB7XG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ3JlbW92ZVN0eWxlJywgW1xuICAgICAgbmV3IEZuQXJnKGVsLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICBuZXcgRm5Bcmcoc3R5bGUpLFxuICAgICAgbmV3IEZuQXJnKGZsYWdzKSxcbiAgICBdKTtcbiAgfVxuXG4gIHNldFByb3BlcnR5KGVsOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdzZXRQcm9wZXJ0eScsIFtcbiAgICAgIG5ldyBGbkFyZyhlbCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgbmV3IEZuQXJnKG5hbWUpLFxuICAgICAgbmV3IEZuQXJnKHZhbHVlKSxcbiAgICBdKTtcbiAgfVxuXG4gIHNldFZhbHVlKG5vZGU6IGFueSwgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdzZXRWYWx1ZScsIFtcbiAgICAgIG5ldyBGbkFyZyhub2RlLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICBuZXcgRm5BcmcodmFsdWUpLFxuICAgIF0pO1xuICB9XG5cbiAgbGlzdGVuKFxuICAgICAgdGFyZ2V0OiAnd2luZG93J3wnZG9jdW1lbnQnfCdib2R5J3xhbnksIGV2ZW50TmFtZTogc3RyaW5nLFxuICAgICAgbGlzdGVuZXI6IChldmVudDogYW55KSA9PiBib29sZWFuKTogKCkgPT4gdm9pZCB7XG4gICAgY29uc3QgdW5saXN0ZW5JZCA9IHRoaXMuX3JlbmRlcmVyRmFjdG9yeS5hbGxvY2F0ZUlkKCk7XG5cbiAgICBjb25zdCBbdGFyZ2V0RWwsIHRhcmdldE5hbWUsIGZ1bGxOYW1lXTogW2FueSwgc3RyaW5nIHwgbnVsbCwgc3RyaW5nIHwgbnVsbF0gPVxuICAgICAgICB0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJyA/IFtudWxsLCB0YXJnZXQsIGAke3RhcmdldH06JHtldmVudE5hbWV9YF0gOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0YXJnZXQsIG51bGwsIG51bGxdO1xuXG4gICAgaWYgKGZ1bGxOYW1lKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlckZhY3RvcnkuZ2xvYmFsRXZlbnRzLmxpc3RlbihmdWxsTmFtZSwgbGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXRFbC5ldmVudHMubGlzdGVuKGV2ZW50TmFtZSwgbGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdsaXN0ZW4nLCBbXG4gICAgICBuZXcgRm5BcmcodGFyZ2V0RWwsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyh0YXJnZXROYW1lKSxcbiAgICAgIG5ldyBGbkFyZyhldmVudE5hbWUpLFxuICAgICAgbmV3IEZuQXJnKHVubGlzdGVuSWQpLFxuICAgIF0pO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChmdWxsTmFtZSkge1xuICAgICAgICB0aGlzLl9yZW5kZXJlckZhY3RvcnkuZ2xvYmFsRXZlbnRzLnVubGlzdGVuKGZ1bGxOYW1lLCBsaXN0ZW5lcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRFbC5ldmVudHMudW5saXN0ZW4oZXZlbnROYW1lLCBsaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcigndW5saXN0ZW4nLCBbbmV3IEZuQXJnKHVubGlzdGVuSWQpXSk7XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgY2FsbFVJV2l0aFJlbmRlcmVyKGZuTmFtZTogc3RyaW5nLCBmbkFyZ3M6IEZuQXJnW10gPSBbXSkge1xuICAgIC8vIGFsd2F5cyBwYXNzIHRoZSByZW5kZXJlciBhcyB0aGUgZmlyc3QgYXJnXG4gICAgdGhpcy5fcmVuZGVyZXJGYWN0b3J5LmNhbGxVSShmbk5hbWUsIFt0aGlzLmFzRm5BcmcsIC4uLmZuQXJnc10pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBXZWJXb3JrZXJSZW5kZXJOb2RlIHsgZXZlbnRzID0gbmV3IE5hbWVkRXZlbnRFbWl0dGVyKCk7IH1cbiJdfQ==