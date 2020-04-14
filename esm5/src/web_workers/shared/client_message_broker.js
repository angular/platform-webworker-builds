/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, ɵstringify as stringify } from '@angular/core';
import { MessageBus } from './message_bus';
import { Serializer } from './serializer';
import * as i0 from "@angular/core";
import * as i1 from "./message_bus";
import * as i2 from "./serializer";
/**
 * @publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
 */
var ClientMessageBrokerFactory = /** @class */ (function () {
    /** @internal */
    function ClientMessageBrokerFactory(_messageBus, _serializer) {
        this._messageBus = _messageBus;
        this._serializer = _serializer;
    }
    /**
     * Initializes the given channel and attaches a new {@link ClientMessageBroker} to it.
     */
    ClientMessageBrokerFactory.prototype.createMessageBroker = function (channel, runInZone) {
        if (runInZone === void 0) { runInZone = true; }
        this._messageBus.initChannel(channel, runInZone);
        return new ClientMessageBroker(this._messageBus, this._serializer, channel);
    };
    ClientMessageBrokerFactory.ɵfac = function ClientMessageBrokerFactory_Factory(t) { return new (t || ClientMessageBrokerFactory)(i0.ɵɵinject(i1.MessageBus), i0.ɵɵinject(i2.Serializer)); };
    ClientMessageBrokerFactory.ɵprov = i0.ɵɵdefineInjectable({ token: ClientMessageBrokerFactory, factory: ClientMessageBrokerFactory.ɵfac });
    return ClientMessageBrokerFactory;
}());
export { ClientMessageBrokerFactory };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ClientMessageBrokerFactory, [{
        type: Injectable
    }], function () { return [{ type: i1.MessageBus }, { type: i2.Serializer }]; }, null); })();
/**
 * @publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
 */
var ClientMessageBroker = /** @class */ (function () {
    /** @internal */
    function ClientMessageBroker(messageBus, _serializer, channel) {
        var _this = this;
        this.channel = channel;
        this._pending = new Map();
        this._sink = messageBus.to(channel);
        this._serializer = _serializer;
        var source = messageBus.from(channel);
        source.subscribe({ next: function (message) { return _this._handleMessage(message); } });
    }
    ClientMessageBroker.prototype._generateMessageId = function (name) {
        var time = stringify(new Date().getTime());
        var iteration = 0;
        var id = name + time + stringify(iteration);
        while (this._pending.has(id)) {
            id = "" + name + time + iteration;
            iteration++;
        }
        return id;
    };
    ClientMessageBroker.prototype.runOnService = function (args, returnType) {
        var _this = this;
        var fnArgs = [];
        if (args.args) {
            args.args.forEach(function (argument) {
                if (argument.type != null) {
                    fnArgs.push(_this._serializer.serialize(argument.value, argument.type));
                }
                else {
                    fnArgs.push(argument.value);
                }
            });
        }
        var promise;
        var id = null;
        if (returnType != null) {
            var completer_1 = undefined;
            promise = new Promise(function (resolve, reject) {
                completer_1 = { resolve: resolve, reject: reject };
            });
            id = this._generateMessageId(args.method);
            this._pending.set(id, completer_1);
            promise.catch(function (err) {
                if (console && console.error) {
                    // tslint:disable-next-line:no-console
                    console.error(err);
                }
                completer_1.reject(err);
            });
            promise = promise.then(function (v) { return _this._serializer ? _this._serializer.deserialize(v, returnType) : v; });
        }
        else {
            promise = null;
        }
        var message = {
            'method': args.method,
            'args': fnArgs,
        };
        if (id != null) {
            message['id'] = id;
        }
        this._sink.emit(message);
        return promise;
    };
    ClientMessageBroker.prototype._handleMessage = function (message) {
        if (message.type === 'result' || message.type === 'error') {
            var id = message.id;
            if (this._pending.has(id)) {
                if (message.type === 'result') {
                    this._pending.get(id).resolve(message.value);
                }
                else {
                    this._pending.get(id).reject(message.value);
                }
                this._pending.delete(id);
            }
        }
    };
    return ClientMessageBroker;
}());
export { ClientMessageBroker };
/**
 * @publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
 */
var FnArg = /** @class */ (function () {
    function FnArg(value, type) {
        if (type === void 0) { type = 1 /* PRIMITIVE */; }
        this.value = value;
        this.type = type;
    }
    return FnArg;
}());
export { FnArg };
/**
 * @publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
 */
var UiArguments = /** @class */ (function () {
    function UiArguments(method, args) {
        this.method = method;
        this.args = args;
    }
    return UiArguments;
}());
export { UiArguments };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50X21lc3NhZ2VfYnJva2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvY2xpZW50X21lc3NhZ2VfYnJva2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBZSxVQUFVLEVBQVEsVUFBVSxJQUFJLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN0RixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxVQUFVLEVBQWtCLE1BQU0sY0FBYyxDQUFDOzs7O0FBRXpEOzs7R0FHRztBQUNIO0lBS0UsZ0JBQWdCO0lBQ2hCLG9DQUFvQixXQUF1QixFQUFFLFdBQXVCO1FBQWhELGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3pDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7T0FFRztJQUNILHdEQUFtQixHQUFuQixVQUFvQixPQUFlLEVBQUUsU0FBeUI7UUFBekIsMEJBQUEsRUFBQSxnQkFBeUI7UUFDNUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUUsQ0FBQzt3R0FmVSwwQkFBMEI7c0VBQTFCLDBCQUEwQixXQUExQiwwQkFBMEI7cUNBakJ2QztDQWlDQyxBQWpCRCxJQWlCQztTQWhCWSwwQkFBMEI7a0RBQTFCLDBCQUEwQjtjQUR0QyxVQUFVOztBQXdCWDs7O0dBR0c7QUFDSDtJQU1FLGdCQUFnQjtJQUNoQiw2QkFBWSxVQUFzQixFQUFFLFdBQXVCLEVB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QWNEOzs7R0FHRztBQUNIO0lBQ0UsZUFDVyxLQUFVLEVBQVMsSUFBMkQ7UUFBM0QscUJBQUEsRUFBQSx3QkFBMkQ7UUFBOUUsVUFBSyxHQUFMLEtBQUssQ0FBSztRQUFTLFNBQUksR0FBSixJQUFJLENBQXVEO0lBQUcsQ0FBQztJQUMvRixZQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7O0FBRUQ7OztHQUdHO0FBQ0g7SUFDRSxxQkFBbUIsTUFBYyxFQUFTLElBQWM7UUFBckMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLFNBQUksR0FBSixJQUFJLENBQVU7SUFBRyxDQUFDO0lBQzlELGtCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlLCBUeXBlLCDJtXN0cmluZ2lmeSBhcyBzdHJpbmdpZnl9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICcuL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7U2VyaWFsaXplciwgU2VyaWFsaXplclR5cGVzfSBmcm9tICcuL3NlcmlhbGl6ZXInO1xuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIHBsYXRmb3JtLXdlYndvcmtlciBpcyBkZXByZWNhdGVkIGluIEFuZ3VsYXIgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB2ZXJzaW9uIDEwXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXI7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tZXNzYWdlQnVzOiBNZXNzYWdlQnVzLCBfc2VyaWFsaXplcjogU2VyaWFsaXplcikge1xuICAgIHRoaXMuX3NlcmlhbGl6ZXIgPSBfc2VyaWFsaXplcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgZ2l2ZW4gY2hhbm5lbCBhbmQgYXR0YWNoZXMgYSBuZXcge0BsaW5rIENsaWVudE1lc3NhZ2VCcm9rZXJ9IHRvIGl0LlxuICAgKi9cbiAgY3JlYXRlTWVzc2FnZUJyb2tlcihjaGFubmVsOiBzdHJpbmcsIHJ1bkluWm9uZTogYm9vbGVhbiA9IHRydWUpOiBDbGllbnRNZXNzYWdlQnJva2VyIHtcbiAgICB0aGlzLl9tZXNzYWdlQnVzLmluaXRDaGFubmVsKGNoYW5uZWwsIHJ1bkluWm9uZSk7XG4gICAgcmV0dXJuIG5ldyBDbGllbnRNZXNzYWdlQnJva2VyKHRoaXMuX21lc3NhZ2VCdXMsIHRoaXMuX3NlcmlhbGl6ZXIsIGNoYW5uZWwpO1xuICB9XG59XG5cbmludGVyZmFjZSBQcm9taXNlQ29tcGxldGVyIHtcbiAgcmVzb2x2ZTogKHJlc3VsdDogYW55KSA9PiB2b2lkO1xuICByZWplY3Q6IChlcnI6IGFueSkgPT4gdm9pZDtcbn1cblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdmVyc2lvbiAxMFxuICovXG5leHBvcnQgY2xhc3MgQ2xpZW50TWVzc2FnZUJyb2tlciB7XG4gIHByaXZhdGUgX3BlbmRpbmcgPSBuZXcgTWFwPHN0cmluZywgUHJvbWlzZUNvbXBsZXRlcj4oKTtcbiAgcHJpdmF0ZSBfc2luazogRXZlbnRFbWl0dGVyPGFueT47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgY29uc3RydWN0b3IobWVzc2FnZUJ1czogTWVzc2FnZUJ1cywgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIsIHByaXZhdGUgY2hhbm5lbDogYW55KSB7XG4gICAgdGhpcy5fc2luayA9IG1lc3NhZ2VCdXMudG8oY2hhbm5lbCk7XG4gICAgdGhpcy5fc2VyaWFsaXplciA9IF9zZXJpYWxpemVyO1xuICAgIGNvbnN0IHNvdXJjZSA9IG1lc3NhZ2VCdXMuZnJvbShjaGFubmVsKTtcblxuICAgIHNvdXJjZS5zdWJzY3JpYmUoe25leHQ6IChtZXNzYWdlOiBSZXNwb25zZU1lc3NhZ2VEYXRhKSA9PiB0aGlzLl9oYW5kbGVNZXNzYWdlKG1lc3NhZ2UpfSk7XG4gIH1cblxuICBwcml2YXRlIF9nZW5lcmF0ZU1lc3NhZ2VJZChuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHRpbWU6IHN0cmluZyA9IHN0cmluZ2lmeShuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG4gICAgbGV0IGl0ZXJhdGlvbjogbnVtYmVyID0gMDtcbiAgICBsZXQgaWQ6IHN0cmluZyA9IG5hbWUgKyB0aW1lICsgc3RyaW5naWZ5KGl0ZXJhdGlvbik7XG4gICAgd2hpbGUgKHRoaXMuX3BlbmRpbmcuaGFzKGlkKSkge1xuICAgICAgaWQgPSBgJHtuYW1lfSR7dGltZX0ke2l0ZXJhdGlvbn1gO1xuICAgICAgaXRlcmF0aW9uKys7XG4gICAgfVxuICAgIHJldHVybiBpZDtcbiAgfVxuXG4gIHJ1bk9uU2VydmljZShhcmdzOiBVaUFyZ3VtZW50cywgcmV0dXJuVHlwZTogVHlwZTxhbnk+fFNlcmlhbGl6ZXJUeXBlc3xudWxsKTogUHJvbWlzZTxhbnk+fG51bGwge1xuICAgIGNvbnN0IGZuQXJnczogYW55W10gPSBbXTtcbiAgICBpZiAoYXJncy5hcmdzKSB7XG4gICAgICBhcmdzLmFyZ3MuZm9yRWFjaChhcmd1bWVudCA9PiB7XG4gICAgICAgIGlmIChhcmd1bWVudC50eXBlICE9IG51bGwpIHtcbiAgICAgICAgICBmbkFyZ3MucHVzaCh0aGlzLl9zZXJpYWxpemVyLnNlcmlhbGl6ZShhcmd1bWVudC52YWx1ZSwgYXJndW1lbnQudHlwZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZuQXJncy5wdXNoKGFyZ3VtZW50LnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgbGV0IHByb21pc2U6IFByb21pc2U8YW55PnxudWxsO1xuICAgIGxldCBpZDogc3RyaW5nfG51bGwgPSBudWxsO1xuICAgIGlmIChyZXR1cm5UeXBlICE9IG51bGwpIHtcbiAgICAgIGxldCBjb21wbGV0ZXI6IFByb21pc2VDb21wbGV0ZXIgPSB1bmRlZmluZWQhO1xuICAgICAgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29tcGxldGVyID0ge3Jlc29sdmUsIHJlamVjdH07XG4gICAgICB9KTtcbiAgICAgIGlkID0gdGhpcy5fZ2VuZXJhdGVNZXNzYWdlSWQoYXJncy5tZXRob2QpO1xuICAgICAgdGhpcy5fcGVuZGluZy5zZXQoaWQsIGNvbXBsZXRlcik7XG5cbiAgICAgIHByb21pc2UuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBpZiAoY29uc29sZSAmJiBjb25zb2xlLmVycm9yKSB7XG4gICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIH1cblxuICAgICAgICBjb21wbGV0ZXIucmVqZWN0KGVycik7XG4gICAgICB9KTtcblxuICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihcbiAgICAgICAgICAodjogYW55KSA9PiB0aGlzLl9zZXJpYWxpemVyID8gdGhpcy5fc2VyaWFsaXplci5kZXNlcmlhbGl6ZSh2LCByZXR1cm5UeXBlKSA6IHYpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9taXNlID0gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlOiBSZXF1ZXN0TWVzc2FnZURhdGEgPSB7XG4gICAgICAnbWV0aG9kJzogYXJncy5tZXRob2QsXG4gICAgICAnYXJncyc6IGZuQXJncyxcbiAgICB9O1xuICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICBtZXNzYWdlWydpZCddID0gaWQ7XG4gICAgfVxuICAgIHRoaXMuX3NpbmsuZW1pdChtZXNzYWdlKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlTWVzc2FnZShtZXNzYWdlOiBSZXNwb25zZU1lc3NhZ2VEYXRhKTogdm9pZCB7XG4gICAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gJ3Jlc3VsdCcgfHwgbWVzc2FnZS50eXBlID09PSAnZXJyb3InKSB7XG4gICAgICBjb25zdCBpZCA9IG1lc3NhZ2UuaWQhO1xuICAgICAgaWYgKHRoaXMuX3BlbmRpbmcuaGFzKGlkKSkge1xuICAgICAgICBpZiAobWVzc2FnZS50eXBlID09PSAncmVzdWx0Jykge1xuICAgICAgICAgIHRoaXMuX3BlbmRpbmcuZ2V0KGlkKSEucmVzb2x2ZShtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9wZW5kaW5nLmdldChpZCkhLnJlamVjdChtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wZW5kaW5nLmRlbGV0ZShpZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmludGVyZmFjZSBSZXF1ZXN0TWVzc2FnZURhdGEge1xuICBtZXRob2Q6IHN0cmluZztcbiAgYXJncz86IGFueVtdO1xuICBpZD86IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIFJlc3BvbnNlTWVzc2FnZURhdGEge1xuICB0eXBlOiAncmVzdWx0J3wnZXJyb3InO1xuICB2YWx1ZT86IGFueTtcbiAgaWQ/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICogQGRlcHJlY2F0ZWQgcGxhdGZvcm0td2Vid29ya2VyIGlzIGRlcHJlY2F0ZWQgaW4gQW5ndWxhciBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHZlcnNpb24gMTBcbiAqL1xuZXhwb3J0IGNsYXNzIEZuQXJnIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgdmFsdWU6IGFueSwgcHVibGljIHR5cGU6IFR5cGU8YW55PnxTZXJpYWxpemVyVHlwZXMgPSBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSB7fVxufVxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIHBsYXRmb3JtLXdlYndvcmtlciBpcyBkZXByZWNhdGVkIGluIEFuZ3VsYXIgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB2ZXJzaW9uIDEwXG4gKi9cbmV4cG9ydCBjbGFzcyBVaUFyZ3VtZW50cyB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtZXRob2Q6IHN0cmluZywgcHVibGljIGFyZ3M/OiBGbkFyZ1tdKSB7fVxufVxuIl19