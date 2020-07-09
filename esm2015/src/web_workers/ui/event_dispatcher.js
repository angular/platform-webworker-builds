import { serializeEventWithTarget, serializeGenericEvent, serializeKeyboardEvent, serializeMouseEvent, serializeTransitionEvent } from './event_serializer';
export class EventDispatcher {
    constructor(_sink, _serializer) {
        this._sink = _sink;
        this._serializer = _serializer;
    }
    dispatchAnimationEvent(player, phaseName, element) {
        this._sink.emit({
            'element': this._serializer.serialize(element, 2 /* RENDER_STORE_OBJECT */),
            'animationPlayer': this._serializer.serialize(player, 2 /* RENDER_STORE_OBJECT */),
            'phaseName': phaseName,
        });
        return true;
    }
    dispatchRenderEvent(element, eventTarget, eventName, event) {
        let serializedEvent;
        // TODO (jteplitz602): support custom events #3350
        switch (event.type) {
            case 'click':
            case 'mouseup':
            case 'mousedown':
            case 'dblclick':
            case 'contextmenu':
            case 'mouseenter':
            case 'mouseleave':
            case 'mousemove':
            case 'mouseout':
            case 'mouseover':
            case 'show':
                serializedEvent = serializeMouseEvent(event);
                break;
            case 'keydown':
            case 'keypress':
            case 'keyup':
                serializedEvent = serializeKeyboardEvent(event);
                break;
            case 'input':
            case 'change':
            case 'blur':
                serializedEvent = serializeEventWithTarget(event);
                break;
            case 'abort':
            case 'afterprint':
            case 'beforeprint':
            case 'cached':
            case 'canplay':
            case 'canplaythrough':
            case 'chargingchange':
            case 'chargingtimechange':
            case 'close':
            case 'dischargingtimechange':
            case 'DOMContentLoaded':
            case 'downloading':
            case 'durationchange':
            case 'emptied':
            case 'ended':
            case 'error':
            case 'fullscreenchange':
            case 'fullscreenerror':
            case 'invalid':
            case 'languagechange':
            case 'levelfchange':
            case 'loadeddata':
            case 'loadedmetadata':
            case 'obsolete':
            case 'offline':
            case 'online':
            case 'open':
            case 'orientatoinchange':
            case 'pause':
            case 'pointerlockchange':
            case 'pointerlockerror':
            case 'play':
            case 'playing':
            case 'ratechange':
            case 'readystatechange':
            case 'reset':
            case 'scroll':
            case 'seeked':
            case 'seeking':
            case 'stalled':
            case 'submit':
            case 'success':
            case 'suspend':
            case 'timeupdate':
            case 'updateready':
            case 'visibilitychange':
            case 'volumechange':
            case 'waiting':
                serializedEvent = serializeGenericEvent(event);
                break;
            case 'transitionend':
                serializedEvent = serializeTransitionEvent(event);
                break;
            default:
                throw new Error(eventName + ' not supported on WebWorkers');
        }
        this._sink.emit({
            'element': this._serializer.serialize(element, 2 /* RENDER_STORE_OBJECT */),
            'eventName': eventName,
            'eventTarget': eventTarget,
            'event': serializedEvent,
        });
        // TODO(kegluneq): Eventually, we want the user to indicate from the UI side whether the event
        // should be canceled, but for now just call `preventDefault` on the original DOM event.
        return false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRfZGlzcGF0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvdWkvZXZlbnRfZGlzcGF0Y2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVQSxPQUFPLEVBQUMsd0JBQXdCLEVBQUUscUJBQXFCLEVBQUUsc0JBQXNCLEVBQUUsbUJBQW1CLEVBQUUsd0JBQXdCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUUxSixNQUFNLE9BQU8sZUFBZTtJQUMxQixZQUFvQixLQUF3QixFQUFVLFdBQXVCO1FBQXpELFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFBRyxDQUFDO0lBRWpGLHNCQUFzQixDQUFDLE1BQVcsRUFBRSxTQUFpQixFQUFFLE9BQVk7UUFDakUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDZCxTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyw4QkFBc0M7WUFDbkYsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSw4QkFBc0M7WUFDMUYsV0FBVyxFQUFFLFNBQVM7U0FDdkIsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsbUJBQW1CLENBQUMsT0FBWSxFQUFFLFdBQW1CLEVBQUUsU0FBaUIsRUFBRSxLQUFVO1FBQ2xGLElBQUksZUFBb0IsQ0FBQztRQUN6QixrREFBa0Q7UUFDbEQsUUFBUSxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ2xCLEtBQUssT0FBTyxDQUFDO1lBQ2IsS0FBSyxTQUFTLENBQUM7WUFDZixLQUFLLFdBQVcsQ0FBQztZQUNqQixLQUFLLFVBQVUsQ0FBQztZQUNoQixLQUFLLGFBQWEsQ0FBQztZQUNuQixLQUFLLFlBQVksQ0FBQztZ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QztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NlcmlhbGl6ZXIsIFNlcmlhbGl6ZXJUeXBlc30gZnJvbSAnLi4vc2hhcmVkL3NlcmlhbGl6ZXInO1xuXG5pbXBvcnQge3NlcmlhbGl6ZUV2ZW50V2l0aFRhcmdldCwgc2VyaWFsaXplR2VuZXJpY0V2ZW50LCBzZXJpYWxpemVLZXlib2FyZEV2ZW50LCBzZXJpYWxpemVNb3VzZUV2ZW50LCBzZXJpYWxpemVUcmFuc2l0aW9uRXZlbnR9IGZyb20gJy4vZXZlbnRfc2VyaWFsaXplcic7XG5cbmV4cG9ydCBjbGFzcyBFdmVudERpc3BhdGNoZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zaW5rOiBFdmVudEVtaXR0ZXI8YW55PiwgcHJpdmF0ZSBfc2VyaWFsaXplcjogU2VyaWFsaXplcikge31cblxuICBkaXNwYXRjaEFuaW1hdGlvbkV2ZW50KHBsYXllcjogYW55LCBwaGFzZU5hbWU6IHN0cmluZywgZWxlbWVudDogYW55KTogYm9vbGVhbiB7XG4gICAgdGhpcy5fc2luay5lbWl0KHtcbiAgICAgICdlbGVtZW50JzogdGhpcy5fc2VyaWFsaXplci5zZXJpYWxpemUoZWxlbWVudCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgJ2FuaW1hdGlvblBsYXllcic6IHRoaXMuX3NlcmlhbGl6ZXIuc2VyaWFsaXplKHBsYXllciwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgJ3BoYXNlTmFtZSc6IHBoYXNlTmFtZSxcbiAgICB9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGRpc3BhdGNoUmVuZGVyRXZlbnQoZWxlbWVudDogYW55LCBldmVudFRhcmdldDogc3RyaW5nLCBldmVudE5hbWU6IHN0cmluZywgZXZlbnQ6IGFueSk6IGJvb2xlYW4ge1xuICAgIGxldCBzZXJpYWxpemVkRXZlbnQ6IGFueTtcbiAgICAvLyBUT0RPIChqdGVwbGl0ejYwMik6IHN1cHBvcnQgY3VzdG9tIGV2ZW50cyAjMzM1MFxuICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgY2FzZSAnY2xpY2snOlxuICAgICAgY2FzZSAnbW91c2V1cCc6XG4gICAgICBjYXNlICdtb3VzZWRvd24nOlxuICAgICAgY2FzZSAnZGJsY2xpY2snOlxuICAgICAgY2FzZSAnY29udGV4dG1lbnUnOlxuICAgICAgY2FzZSAnbW91c2VlbnRlcic6XG4gICAgICBjYXNlICdtb3VzZWxlYXZlJzpcbiAgICAgIGNhc2UgJ21vdXNlbW92ZSc6XG4gICAgICBjYXNlICdtb3VzZW91dCc6XG4gICAgICBjYXNlICdtb3VzZW92ZXInOlxuICAgICAgY2FzZSAnc2hvdyc6XG4gICAgICAgIHNlcmlhbGl6ZWRFdmVudCA9IHNlcmlhbGl6ZU1vdXNlRXZlbnQoZXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2tleWRvd24nOlxuICAgICAgY2FzZSAna2V5cHJlc3MnOlxuICAgICAgY2FzZSAna2V5dXAnOlxuICAgICAgICBzZXJpYWxpemVkRXZlbnQgPSBzZXJpYWxpemVLZXlib2FyZEV2ZW50KGV2ZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdpbnB1dCc6XG4gICAgICBjYXNlICdjaGFuZ2UnOlxuICAgICAgY2FzZSAnYmx1cic6XG4gICAgICAgIHNlcmlhbGl6ZWRFdmVudCA9IHNlcmlhbGl6ZUV2ZW50V2l0aFRhcmdldChldmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYWJvcnQnOlxuICAgICAgY2FzZSAnYWZ0ZXJwcmludCc6XG4gICAgICBjYXNlICdiZWZvcmVwcmludCc6XG4gICAgICBjYXNlICdjYWNoZWQnOlxuICAgICAgY2FzZSAnY2FucGxheSc6XG4gICAgICBjYXNlICdjYW5wbGF5dGhyb3VnaCc6XG4gICAgICBjYXNlICdjaGFyZ2luZ2NoYW5nZSc6XG4gICAgICBjYXNlICdjaGFyZ2luZ3RpbWVjaGFuZ2UnOlxuICAgICAgY2FzZSAnY2xvc2UnOlxuICAgICAgY2FzZSAnZGlzY2hhcmdpbmd0aW1lY2hhbmdlJzpcbiAgICAgIGNhc2UgJ0RPTUNvbnRlbnRMb2FkZWQnOlxuICAgICAgY2FzZSAnZG93bmxvYWRpbmcnOlxuICAgICAgY2FzZSAnZHVyYXRpb25jaGFuZ2UnOlxuICAgICAgY2FzZSAnZW1wdGllZCc6XG4gICAgICBjYXNlICdlbmRlZCc6XG4gICAgICBjYXNlICdlcnJvcic6XG4gICAgICBjYXNlICdmdWxsc2NyZWVuY2hhbmdlJzpcbiAgICAgIGNhc2UgJ2Z1bGxzY3JlZW5lcnJvcic6XG4gICAgICBjYXNlICdpbnZhbGlkJzpcbiAgICAgIGNhc2UgJ2xhbmd1YWdlY2hhbmdlJzpcbiAgICAgIGNhc2UgJ2xldmVsZmNoYW5nZSc6XG4gICAgICBjYXNlICdsb2FkZWRkYXRhJzpcbiAgICAgIGNhc2UgJ2xvYWRlZG1ldGFkYXRhJzpcbiAgICAgIGNhc2UgJ29ic29sZXRlJzpcbiAgICAgIGNhc2UgJ29mZmxpbmUnOlxuICAgICAgY2FzZSAnb25saW5lJzpcbiAgICAgIGNhc2UgJ29wZW4nOlxuICAgICAgY2FzZSAnb3JpZW50YXRvaW5jaGFuZ2UnOlxuICAgICAgY2FzZSAncGF1c2UnOlxuICAgICAgY2FzZSAncG9pbnRlcmxvY2tjaGFuZ2UnOlxuICAgICAgY2FzZSAncG9pbnRlcmxvY2tlcnJvcic6XG4gICAgICBjYXNlICdwbGF5JzpcbiAgICAgIGNhc2UgJ3BsYXlpbmcnOlxuICAgICAgY2FzZSAncmF0ZWNoYW5nZSc6XG4gICAgICBjYXNlICdyZWFkeXN0YXRlY2hhbmdlJzpcbiAgICAgIGNhc2UgJ3Jlc2V0JzpcbiAgICAgIGNhc2UgJ3Njcm9sbCc6XG4gICAgICBjYXNlICdzZWVrZWQnOlxuICAgICAgY2FzZSAnc2Vla2luZyc6XG4gICAgICBjYXNlICdzdGFsbGVkJzpcbiAgICAgIGNhc2UgJ3N1Ym1pdCc6XG4gICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgIGNhc2UgJ3N1c3BlbmQnOlxuICAgICAgY2FzZSAndGltZXVwZGF0ZSc6XG4gICAgICBjYXNlICd1cGRhdGVyZWFkeSc6XG4gICAgICBjYXNlICd2aXNpYmlsaXR5Y2hhbmdlJzpcbiAgICAgIGNhc2UgJ3ZvbHVtZWNoYW5nZSc6XG4gICAgICBjYXNlICd3YWl0aW5nJzpcbiAgICAgICAgc2VyaWFsaXplZEV2ZW50ID0gc2VyaWFsaXplR2VuZXJpY0V2ZW50KGV2ZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0cmFuc2l0aW9uZW5kJzpcbiAgICAgICAgc2VyaWFsaXplZEV2ZW50ID0gc2VyaWFsaXplVHJhbnNpdGlvbkV2ZW50KGV2ZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXZlbnROYW1lICsgJyBub3Qgc3VwcG9ydGVkIG9uIFdlYldvcmtlcnMnKTtcbiAgICB9XG5cbiAgICB0aGlzLl9zaW5rLmVtaXQoe1xuICAgICAgJ2VsZW1lbnQnOiB0aGlzLl9zZXJpYWxpemVyLnNlcmlhbGl6ZShlbGVtZW50LCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICAnZXZlbnROYW1lJzogZXZlbnROYW1lLFxuICAgICAgJ2V2ZW50VGFyZ2V0JzogZXZlbnRUYXJnZXQsXG4gICAgICAnZXZlbnQnOiBzZXJpYWxpemVkRXZlbnQsXG4gICAgfSk7XG5cbiAgICAvLyBUT0RPKGtlZ2x1bmVxKTogRXZlbnR1YWxseSwgd2Ugd2FudCB0aGUgdXNlciB0byBpbmRpY2F0ZSBmcm9tIHRoZSBVSSBzaWRlIHdoZXRoZXIgdGhlIGV2ZW50XG4gICAgLy8gc2hvdWxkIGJlIGNhbmNlbGVkLCBidXQgZm9yIG5vdyBqdXN0IGNhbGwgYHByZXZlbnREZWZhdWx0YCBvbiB0aGUgb3JpZ2luYWwgRE9NIGV2ZW50LlxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19