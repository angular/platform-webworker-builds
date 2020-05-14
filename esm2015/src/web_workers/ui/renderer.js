/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-webworker/src/web_workers/ui/renderer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, RendererFactory2 } from '@angular/core';
import { MessageBus } from '../shared/message_bus';
import { EVENT_2_CHANNEL, RENDERER_2_CHANNEL } from '../shared/messaging_api';
import { RenderStore } from '../shared/render_store';
import { Serializer } from '../shared/serializer';
import { ServiceMessageBrokerFactory } from '../shared/service_message_broker';
import { EventDispatcher } from '../ui/event_dispatcher';
let MessageBasedRenderer2 = /** @class */ (() => {
    class MessageBasedRenderer2 {
        /**
         * @param {?} _brokerFactory
         * @param {?} _bus
         * @param {?} _serializer
         * @param {?} _renderStore
         * @param {?} _rendererFactory
         */
        constructor(_brokerFactory, _bus, _serializer, _renderStore, _rendererFactory) {
            this._brokerFactory = _brokerFactory;
            this._bus = _bus;
            this._serializer = _serializer;
            this._renderStore = _renderStore;
            this._rendererFactory = _rendererFactory;
        }
        /**
         * @return {?}
         */
        start() {
            /** @type {?} */
            const broker = this._brokerFactory.createMessageBroker(RENDERER_2_CHANNEL);
            this._bus.initChannel(EVENT_2_CHANNEL);
            this._eventDispatcher = new EventDispatcher(this._bus.to(EVENT_2_CHANNEL), this._serializer);
            const [RSO, P, CRT] = [
                2 /* RENDER_STORE_OBJECT */,
                1 /* PRIMITIVE */,
                0 /* RENDERER_TYPE_2 */,
            ];
            /** @type {?} */
            const methods = [
                ['createRenderer', this.createRenderer, RSO, CRT, P],
                ['createElement', this.createElement, RSO, P, P, P],
                ['createComment', this.createComment, RSO, P, P],
                ['createText', this.createText, RSO, P, P],
                ['appendChild', this.appendChild, RSO, RSO, RSO],
                ['insertBefore', this.insertBefore, RSO, RSO, RSO, RSO],
                ['removeChild', this.removeChild, RSO, RSO, RSO],
                ['selectRootElement', this.selectRootElement, RSO, P, P],
                ['parentNode', this.parentNode, RSO, RSO, P],
                ['nextSibling', this.nextSibling, RSO, RSO, P],
                ['setAttribute', this.setAttribute, RSO, RSO, P, P, P],
                ['removeAttribute', this.removeAttribute, RSO, RSO, P, P],
                ['addClass', this.addClass, RSO, RSO, P],
                ['removeClass', this.removeClass, RSO, RSO, P],
                ['setStyle', this.setStyle, RSO, RSO, P, P, P],
                ['removeStyle', this.removeStyle, RSO, RSO, P, P],
                ['setProperty', this.setProperty, RSO, RSO, P, P],
                ['setValue', this.setValue, RSO, RSO, P],
                ['listen', this.listen, RSO, RSO, P, P, P],
                ['unlisten', this.unlisten, RSO, RSO],
                ['destroy', this.destroy, RSO],
                ['destroyNode', this.destroyNode, RSO, P]
            ];
            methods.forEach((/**
             * @param {?} __0
             * @return {?}
             */
            ([name, method, ...argTypes]) => {
                broker.registerMethod(name, argTypes, method.bind(this));
            }));
        }
        /**
         * @private
         * @param {?} r
         * @return {?}
         */
        destroy(r) {
            r.destroy();
        }
        /**
         * @private
         * @param {?} r
         * @param {?} node
         * @return {?}
         */
        destroyNode(r, node) {
            if (r.destroyNode) {
                r.destroyNode(node);
            }
            this._renderStore.remove(node);
        }
        /**
         * @private
         * @param {?} el
         * @param {?} type
         * @param {?} id
         * @return {?}
         */
        createRenderer(el, type, id) {
            this._renderStore.store(this._rendererFactory.createRenderer(el, type), id);
        }
        /**
         * @private
         * @param {?} r
         * @param {?} name
         * @param {?} namespace
         * @param {?} id
         * @return {?}
         */
        createElement(r, name, namespace, id) {
            this._renderStore.store(r.createElement(name, namespace), id);
        }
        /**
         * @private
         * @param {?} r
         * @param {?} value
         * @param {?} id
         * @return {?}
         */
        createComment(r, value, id) {
            this._renderStore.store(r.createComment(value), id);
        }
        /**
         * @private
         * @param {?} r
         * @param {?} value
         * @param {?} id
         * @return {?}
         */
        createText(r, value, id) {
            this._renderStore.store(r.createText(value), id);
        }
        /**
         * @private
         * @param {?} r
         * @param {?} parent
         * @param {?} child
         * @return {?}
         */
        appendChild(r, parent, child) {
            r.appendChild(parent, child);
        }
        /**
         * @private
         * @param {?} r
         * @param {?} parent
         * @param {?} child
         * @param {?} ref
         * @return {?}
         */
        insertBefore(r, parent, child, ref) {
            r.insertBefore(parent, child, ref);
        }
        /**
         * @private
         * @param {?} r
         * @param {?} parent
         * @param {?} child
         * @return {?}
         */
        removeChild(r, parent, child) {
            r.removeChild(parent, child);
        }
        /**
         * @private
         * @param {?} r
         * @param {?} selector
         * @param {?} id
         * @return {?}
         */
        selectRootElement(r, selector, id) {
            this._renderStore.store(r.selectRootElement(selector), id);
        }
        /**
         * @private
         * @param {?} r
         * @param {?} node
         * @param {?} id
         * @return {?}
         */
        parentNode(r, node, id) {
            this._renderStore.store(r.parentNode(node), id);
        }
        /**
         * @private
         * @param {?} r
         * @param {?} node
         * @param {?} id
         * @return {?}
         */
        nextSibling(r, node, id) {
            this._renderStore.store(r.nextSibling(node), id);
        }
        /**
         * @private
         * @param {?} r
         * @param {?} el
         * @param {?} name
         * @param {?} value
         * @param {?} namespace
         * @return {?}
         */
        setAttribute(r, el, name, value, namespace) {
            r.setAttribute(el, name, value, namespace);
        }
        /**
         * @private
         * @param {?} r
         * @param {?} el
         * @param {?} name
         * @param {?} namespace
         * @return {?}
         */
        removeAttribute(r, el, name, namespace) {
            r.removeAttribute(el, name, namespace);
        }
        /**
         * @private
         * @param {?} r
         * @param {?} el
         * @param {?} name
         * @return {?}
         */
        addClass(r, el, name) {
            r.addClass(el, name);
        }
        /**
         * @private
         * @param {?} r
         * @param {?} el
         * @param {?} name
         * @return {?}
         */
        removeClass(r, el, name) {
            r.removeClass(el, name);
        }
        /**
         * @private
         * @param {?} r
         * @param {?} el
         * @param {?} style
         * @param {?} value
         * @param {?} flags
         * @return {?}
         */
        setStyle(r, el, style, value, flags) {
            r.setStyle(el, style, value, flags);
        }
        /**
         * @private
         * @param {?} r
         * @param {?} el
         * @param {?} style
         * @param {?} flags
         * @return {?}
         */
        removeStyle(r, el, style, flags) {
            r.removeStyle(el, style, flags);
        }
        /**
         * @private
         * @param {?} r
         * @param {?} el
         * @param {?} name
         * @param {?} value
         * @return {?}
         */
        setProperty(r, el, name, value) {
            r.setProperty(el, name, value);
        }
        /**
         * @private
         * @param {?} r
         * @param {?} node
         * @param {?} value
         * @return {?}
         */
        setValue(r, node, value) {
            r.setValue(node, value);
        }
        /**
         * @private
         * @param {?} r
         * @param {?} el
         * @param {?} elName
         * @param {?} eventName
         * @param {?} unlistenId
         * @return {?}
         */
        listen(r, el, elName, eventName, unlistenId) {
            /** @type {?} */
            const listener = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                return this._eventDispatcher.dispatchRenderEvent(el, elName, eventName, event);
            });
            /** @type {?} */
            const unlisten = r.listen(el || elName, eventName, listener);
            this._renderStore.store(unlisten, unlistenId);
        }
        /**
         * @private
         * @param {?} r
         * @param {?} unlisten
         * @return {?}
         */
        unlisten(r, unlisten) {
            unlisten();
        }
    }
    MessageBasedRenderer2.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    MessageBasedRenderer2.ctorParameters = () => [
        { type: ServiceMessageBrokerFactory },
        { type: MessageBus },
        { type: Serializer },
        { type: RenderStore },
        { type: RendererFactory2 }
    ];
    return MessageBasedRenderer2;
})();
export { MessageBasedRenderer2 };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MessageBasedRenderer2.prototype._eventDispatcher;
    /**
     * @type {?}
     * @private
     */
    MessageBasedRenderer2.prototype._brokerFactory;
    /**
     * @type {?}
     * @private
     */
    MessageBasedRenderer2.prototype._bus;
    /**
     * @type {?}
     * @private
     */
    MessageBasedRenderer2.prototype._serializer;
    /**
     * @type {?}
     * @private
     */
    MessageBasedRenderer2.prototype._renderStore;
    /**
     * @type {?}
     * @private
     */
    MessageBasedRenderer2.prototype._rendererFactory;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3VpL3JlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxVQUFVLEVBQWEsZ0JBQWdCLEVBQXFDLE1BQU0sZUFBZSxDQUFDO0FBRTFHLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsZUFBZSxFQUFFLGtCQUFrQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDNUUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBQyxVQUFVLEVBQWtCLE1BQU0sc0JBQXNCLENBQUM7QUFDakUsT0FBTyxFQUF1QiwyQkFBMkIsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ25HLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUV2RDtJQUFBLE1BQ2EscUJBQXFCOzs7Ozs7OztRQUloQyxZQUNZLGNBQTJDLEVBQVUsSUFBZ0IsRUFDckUsV0FBdUIsRUFBVSxZQUF5QixFQUMxRCxnQkFBa0M7WUFGbEMsbUJBQWMsR0FBZCxjQUFjLENBQTZCO1lBQVUsU0FBSSxHQUFKLElBQUksQ0FBWTtZQUNyRSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtZQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFhO1lBQzFELHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBRyxDQUFDOzs7O1FBRWxELEtBQUs7O2tCQUNHLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDO1lBRTFFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxnQkFBZ0Is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IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGUsIFJlbmRlcmVyMiwgUmVuZGVyZXJGYWN0b3J5MiwgUmVuZGVyZXJTdHlsZUZsYWdzMiwgUmVuZGVyZXJUeXBlMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7TWVzc2FnZUJ1c30gZnJvbSAnLi4vc2hhcmVkL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7RVZFTlRfMl9DSEFOTkVMLCBSRU5ERVJFUl8yX0NIQU5ORUx9IGZyb20gJy4uL3NoYXJlZC9tZXNzYWdpbmdfYXBpJztcbmltcG9ydCB7UmVuZGVyU3RvcmV9IGZyb20gJy4uL3NoYXJlZC9yZW5kZXJfc3RvcmUnO1xuaW1wb3J0IHtTZXJpYWxpemVyLCBTZXJpYWxpemVyVHlwZXN9IGZyb20gJy4uL3NoYXJlZC9zZXJpYWxpemVyJztcbmltcG9ydCB7U2VydmljZU1lc3NhZ2VCcm9rZXIsIFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeX0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VfbWVzc2FnZV9icm9rZXInO1xuaW1wb3J0IHtFdmVudERpc3BhdGNoZXJ9IGZyb20gJy4uL3VpL2V2ZW50X2Rpc3BhdGNoZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWVzc2FnZUJhc2VkUmVuZGVyZXIyIHtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHByaXZhdGUgX2V2ZW50RGlzcGF0Y2hlciE6IEV2ZW50RGlzcGF0Y2hlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2Jyb2tlckZhY3Rvcnk6IFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSwgcHJpdmF0ZSBfYnVzOiBNZXNzYWdlQnVzLFxuICAgICAgcHJpdmF0ZSBfc2VyaWFsaXplcjogU2VyaWFsaXplciwgcHJpdmF0ZSBfcmVuZGVyU3RvcmU6IFJlbmRlclN0b3JlLFxuICAgICAgcHJpdmF0ZSBfcmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyKSB7fVxuXG4gIHN0YXJ0KCk6IHZvaWQge1xuICAgIGNvbnN0IGJyb2tlciA9IHRoaXMuX2Jyb2tlckZhY3RvcnkuY3JlYXRlTWVzc2FnZUJyb2tlcihSRU5ERVJFUl8yX0NIQU5ORUwpO1xuXG4gICAgdGhpcy5fYnVzLmluaXRDaGFubmVsKEVWRU5UXzJfQ0hBTk5FTCk7XG4gICAgdGhpcy5fZXZlbnREaXNwYXRjaGVyID0gbmV3IEV2ZW50RGlzcGF0Y2hlcih0aGlzLl9idXMudG8oRVZFTlRfMl9DSEFOTkVMKSwgdGhpcy5fc2VyaWFsaXplcik7XG5cbiAgICBjb25zdCBbUlNPLCBQLCBDUlRdID0gW1xuICAgICAgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QsXG4gICAgICBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFLFxuICAgICAgU2VyaWFsaXplclR5cGVzLlJFTkRFUkVSX1RZUEVfMixcbiAgICBdO1xuXG4gICAgY29uc3QgbWV0aG9kczogYW55W11bXSA9IFtcbiAgICAgIFsnY3JlYXRlUmVuZGVyZXInLCB0aGlzLmNyZWF0ZVJlbmRlcmVyLCBSU08sIENSVCwgUF0sXG4gICAgICBbJ2NyZWF0ZUVsZW1lbnQnLCB0aGlzLmNyZWF0ZUVsZW1lbnQsIFJTTywgUCwgUCwgUF0sXG4gICAgICBbJ2NyZWF0ZUNvbW1lbnQnLCB0aGlzLmNyZWF0ZUNvbW1lbnQsIFJTTywgUCwgUF0sXG4gICAgICBbJ2NyZWF0ZVRleHQnLCB0aGlzLmNyZWF0ZVRleHQsIFJTTywgUCwgUF0sXG4gICAgICBbJ2FwcGVuZENoaWxkJywgdGhpcy5hcHBlbmRDaGlsZCwgUlNPLCBSU08sIFJTT10sXG4gICAgICBbJ2luc2VydEJlZm9yZScsIHRoaXMuaW5zZXJ0QmVmb3JlLCBSU08sIFJTTywgUlNPLCBSU09dLFxuICAgICAgWydyZW1vdmVDaGlsZCcsIHRoaXMucmVtb3ZlQ2hpbGQsIFJTTywgUlNPLCBSU09dLFxuICAgICAgWydzZWxlY3RSb290RWxlbWVudCcsIHRoaXMuc2VsZWN0Um9vdEVsZW1lbnQsIFJTTywgUCwgUF0sXG4gICAgICBbJ3BhcmVudE5vZGUnLCB0aGlzLnBhcmVudE5vZGUsIFJTTywgUlNPLCBQXSxcbiAgICAgIFsnbmV4dFNpYmxpbmcnLCB0aGlzLm5leHRTaWJsaW5nLCBSU08sIFJTTywgUF0sXG4gICAgICBbJ3NldEF0dHJpYnV0ZScsIHRoaXMuc2V0QXR0cmlidXRlLCBSU08sIFJTTywgUCwgUCwgUF0sXG4gICAgICBbJ3JlbW92ZUF0dHJpYnV0ZScsIHRoaXMucmVtb3ZlQXR0cmlidXRlLCBSU08sIFJTTywgUCwgUF0sXG4gICAgICBbJ2FkZENsYXNzJywgdGhpcy5hZGRDbGFzcywgUlNPLCBSU08sIFBdLFxuICAgICAgWydyZW1vdmVDbGFzcycsIHRoaXMucmVtb3ZlQ2xhc3MsIFJTTywgUlNPLCBQXSxcbiAgICAgIFsnc2V0U3R5bGUnLCB0aGlzLnNldFN0eWxlLCBSU08sIFJTTywgUCwgUCwgUF0sXG4gICAgICBbJ3JlbW92ZVN0eWxlJywgdGhpcy5yZW1vdmVTdHlsZSwgUlNPLCBSU08sIFAsIFBdLFxuICAgICAgWydzZXRQcm9wZXJ0eScsIHRoaXMuc2V0UHJvcGVydHksIFJTTywgUlNPLCBQLCBQXSxcbiAgICAgIFsnc2V0VmFsdWUnLCB0aGlzLnNldFZhbHVlLCBSU08sIFJTTywgUF0sXG4gICAgICBbJ2xpc3RlbicsIHRoaXMubGlzdGVuLCBSU08sIFJTTywgUCwgUCwgUF0sXG4gICAgICBbJ3VubGlzdGVuJywgdGhpcy51bmxpc3RlbiwgUlNPLCBSU09dLFxuICAgICAgWydkZXN0cm95JywgdGhpcy5kZXN0cm95LCBSU09dLFxuICAgICAgWydkZXN0cm95Tm9kZScsIHRoaXMuZGVzdHJveU5vZGUsIFJTTywgUF1cblxuICAgIF07XG5cbiAgICBtZXRob2RzLmZvckVhY2goKFtuYW1lLCBtZXRob2QsIC4uLmFyZ1R5cGVzXTogYW55W10pID0+IHtcbiAgICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChuYW1lLCBhcmdUeXBlcywgbWV0aG9kLmJpbmQodGhpcykpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXN0cm95KHI6IFJlbmRlcmVyMikge1xuICAgIHIuZGVzdHJveSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXN0cm95Tm9kZShyOiBSZW5kZXJlcjIsIG5vZGU6IGFueSkge1xuICAgIGlmIChyLmRlc3Ryb3lOb2RlKSB7XG4gICAgICByLmRlc3Ryb3lOb2RlKG5vZGUpO1xuICAgIH1cbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5yZW1vdmUobm9kZSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVJlbmRlcmVyKGVsOiBhbnksIHR5cGU6IFJlbmRlcmVyVHlwZTIsIGlkOiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZSh0aGlzLl9yZW5kZXJlckZhY3RvcnkuY3JlYXRlUmVuZGVyZXIoZWwsIHR5cGUpLCBpZCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUVsZW1lbnQocjogUmVuZGVyZXIyLCBuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZTogc3RyaW5nLCBpZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUoci5jcmVhdGVFbGVtZW50KG5hbWUsIG5hbWVzcGFjZSksIGlkKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQ29tbWVudChyOiBSZW5kZXJlcjIsIHZhbHVlOiBzdHJpbmcsIGlkOiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZShyLmNyZWF0ZUNvbW1lbnQodmFsdWUpLCBpZCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVRleHQocjogUmVuZGVyZXIyLCB2YWx1ZTogc3RyaW5nLCBpZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUoci5jcmVhdGVUZXh0KHZhbHVlKSwgaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBlbmRDaGlsZChyOiBSZW5kZXJlcjIsIHBhcmVudDogYW55LCBjaGlsZDogYW55KSB7XG4gICAgci5hcHBlbmRDaGlsZChwYXJlbnQsIGNoaWxkKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5zZXJ0QmVmb3JlKHI6IFJlbmRlcmVyMiwgcGFyZW50OiBhbnksIGNoaWxkOiBhbnksIHJlZjogYW55KSB7XG4gICAgci5pbnNlcnRCZWZvcmUocGFyZW50LCBjaGlsZCwgcmVmKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlQ2hpbGQocjogUmVuZGVyZXIyLCBwYXJlbnQ6IGFueSwgY2hpbGQ6IGFueSkge1xuICAgIHIucmVtb3ZlQ2hpbGQocGFyZW50LCBjaGlsZCk7XG4gIH1cblxuICBwcml2YXRlIHNlbGVjdFJvb3RFbGVtZW50KHI6IFJlbmRlcmVyMiwgc2VsZWN0b3I6IHN0cmluZywgaWQ6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHIuc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3IpLCBpZCk7XG4gIH1cblxuICBwcml2YXRlIHBhcmVudE5vZGUocjogUmVuZGVyZXIyLCBub2RlOiBhbnksIGlkOiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZShyLnBhcmVudE5vZGUobm9kZSksIGlkKTtcbiAgfVxuXG4gIHByaXZhdGUgbmV4dFNpYmxpbmcocjogUmVuZGVyZXIyLCBub2RlOiBhbnksIGlkOiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZShyLm5leHRTaWJsaW5nKG5vZGUpLCBpZCk7XG4gIH1cblxuICBwcml2YXRlIHNldEF0dHJpYnV0ZShyOiBSZW5kZXJlcjIsIGVsOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgbmFtZXNwYWNlOiBzdHJpbmcpIHtcbiAgICByLnNldEF0dHJpYnV0ZShlbCwgbmFtZSwgdmFsdWUsIG5hbWVzcGFjZSk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUF0dHJpYnV0ZShyOiBSZW5kZXJlcjIsIGVsOiBhbnksIG5hbWU6IHN0cmluZywgbmFtZXNwYWNlOiBzdHJpbmcpIHtcbiAgICByLnJlbW92ZUF0dHJpYnV0ZShlbCwgbmFtZSwgbmFtZXNwYWNlKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkQ2xhc3MocjogUmVuZGVyZXIyLCBlbDogYW55LCBuYW1lOiBzdHJpbmcpIHtcbiAgICByLmFkZENsYXNzKGVsLCBuYW1lKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlQ2xhc3MocjogUmVuZGVyZXIyLCBlbDogYW55LCBuYW1lOiBzdHJpbmcpIHtcbiAgICByLnJlbW92ZUNsYXNzKGVsLCBuYW1lKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0U3R5bGUocjogUmVuZGVyZXIyLCBlbDogYW55LCBzdHlsZTogc3RyaW5nLCB2YWx1ZTogYW55LCBmbGFnczogUmVuZGVyZXJTdHlsZUZsYWdzMikge1xuICAgIHIuc2V0U3R5bGUoZWwsIHN0eWxlLCB2YWx1ZSwgZmxhZ3MpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVTdHlsZShyOiBSZW5kZXJlcjIsIGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIGZsYWdzOiBSZW5kZXJlclN0eWxlRmxhZ3MyKSB7XG4gICAgci5yZW1vdmVTdHlsZShlbCwgc3R5bGUsIGZsYWdzKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0UHJvcGVydHkocjogUmVuZGVyZXIyLCBlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICByLnNldFByb3BlcnR5KGVsLCBuYW1lLCB2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIHNldFZhbHVlKHI6IFJlbmRlcmVyMiwgbm9kZTogYW55LCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgci5zZXRWYWx1ZShub2RlLCB2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbihyOiBSZW5kZXJlcjIsIGVsOiBhbnksIGVsTmFtZTogc3RyaW5nLCBldmVudE5hbWU6IHN0cmluZywgdW5saXN0ZW5JZDogbnVtYmVyKSB7XG4gICAgY29uc3QgbGlzdGVuZXIgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50RGlzcGF0Y2hlci5kaXNwYXRjaFJlbmRlckV2ZW50KGVsLCBlbE5hbWUsIGV2ZW50TmFtZSwgZXZlbnQpO1xuICAgIH07XG5cbiAgICBjb25zdCB1bmxpc3RlbiA9IHIubGlzdGVuKGVsIHx8IGVsTmFtZSwgZXZlbnROYW1lLCBsaXN0ZW5lcik7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUodW5saXN0ZW4sIHVubGlzdGVuSWQpO1xuICB9XG5cbiAgcHJpdmF0ZSB1bmxpc3RlbihyOiBSZW5kZXJlcjIsIHVubGlzdGVuOiAoKSA9PiBib29sZWFuKSB7XG4gICAgdW5saXN0ZW4oKTtcbiAgfVxufVxuIl19