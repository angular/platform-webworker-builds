import { serializeEventWithTarget, serializeGenericEvent, serializeKeyboardEvent, serializeMouseEvent, serializeTransitionEvent } from './event_serializer';
var EventDispatcher = /** @class */ (function () {
    function EventDispatcher(_sink, _serializer) {
        this._sink = _sink;
        this._serializer = _serializer;
    }
    EventDispatcher.prototype.dispatchAnimationEvent = function (player, phaseName, element) {
        this._sink.emit({
            'element': this._serializer.serialize(element, 2 /* RENDER_STORE_OBJECT */),
            'animationPlayer': this._serializer.serialize(player, 2 /* RENDER_STORE_OBJECT */),
            'phaseName': phaseName,
        });
        return true;
    };
    EventDispatcher.prototype.dispatchRenderEvent = function (element, eventTarget, eventName, event) {
        var serializedEvent;
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
    };
    return EventDispatcher;
}());
export { EventDispatcher };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRfZGlzcGF0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvdWkvZXZlbnRfZGlzcGF0Y2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVQSxPQUFPLEVBQUMsd0JBQXdCLEVBQUUscUJBQXFCLEVBQUUsc0JBQXNCLEVBQUUsbUJBQW1CLEVBQUUsd0JBQXdCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUUxSjtJQUNFLHlCQUFvQixLQUF3QixFQUFVLFdBQXVCO1FBQXpELFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFBRyxDQUFDO0lBRWpGLGdEQUFzQixHQUF0QixVQUF1QixNQUFXLEVBQUUsU0FBaUIsRUFBRSxPQUFZO1FBQ2pFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQ2QsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sOEJBQXNDO1lBQ25GLGlCQUFpQixFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sOEJBQXNDO1lBQzFGLFdBQVcsRUFBRSxTQUFTO1NBQ3ZCLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELDZDQUFtQixHQUFuQixVQUFvQixPQUFZLEVBQUUsV0FBbUIsRUFBRSxTQUFpQixFQUFFLEtBQVU7UUFDbEYsSUFBSSxlQUFvQixDQUFDO1FBQ3pCLGtEQUFrRDtRQUNsRCxRQUFRLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDbEIsS0FBSyxPQUFPLENBQUM7WUFDYixLQUFLLFNBQVMsQ0FBQztZQUNmLEtBQUssV0FBVyxDQUFDO1lBQ2pCLEtBQUssVUFBVSxDQUFDO1lBQ2hCLEtBQUssYUFBYSxDQUFDO1lBQ25CLEtBQUssWUFB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SUFDZixDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBM0dELElBMkdDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTZXJpYWxpemVyLCBTZXJpYWxpemVyVHlwZXN9IGZyb20gJy4uL3NoYXJlZC9zZXJpYWxpemVyJztcblxuaW1wb3J0IHtzZXJpYWxpemVFdmVudFdpdGhUYXJnZXQsIHNlcmlhbGl6ZUdlbmVyaWNFdmVudCwgc2VyaWFsaXplS2V5Ym9hcmRFdmVudCwgc2VyaWFsaXplTW91c2VFdmVudCwgc2VyaWFsaXplVHJhbnNpdGlvbkV2ZW50fSBmcm9tICcuL2V2ZW50X3NlcmlhbGl6ZXInO1xuXG5leHBvcnQgY2xhc3MgRXZlbnREaXNwYXRjaGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2luazogRXZlbnRFbWl0dGVyPGFueT4sIHByaXZhdGUgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIpIHt9XG5cbiAgZGlzcGF0Y2hBbmltYXRpb25FdmVudChwbGF5ZXI6IGFueSwgcGhhc2VOYW1lOiBzdHJpbmcsIGVsZW1lbnQ6IGFueSk6IGJvb2xlYW4ge1xuICAgIHRoaXMuX3NpbmsuZW1pdCh7XG4gICAgICAnZWxlbWVudCc6IHRoaXMuX3NlcmlhbGl6ZXIuc2VyaWFsaXplKGVsZW1lbnQsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgICdhbmltYXRpb25QbGF5ZXInOiB0aGlzLl9zZXJpYWxpemVyLnNlcmlhbGl6ZShwbGF5ZXIsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgICdwaGFzZU5hbWUnOiBwaGFzZU5hbWUsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBkaXNwYXRjaFJlbmRlckV2ZW50KGVsZW1lbnQ6IGFueSwgZXZlbnRUYXJnZXQ6IHN0cmluZywgZXZlbnROYW1lOiBzdHJpbmcsIGV2ZW50OiBhbnkpOiBib29sZWFuIHtcbiAgICBsZXQgc2VyaWFsaXplZEV2ZW50OiBhbnk7XG4gICAgLy8gVE9ETyAoanRlcGxpdHo2MDIpOiBzdXBwb3J0IGN1c3RvbSBldmVudHMgIzMzNTBcbiAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgIGNhc2UgJ2NsaWNrJzpcbiAgICAgIGNhc2UgJ21vdXNldXAnOlxuICAgICAgY2FzZSAnbW91c2Vkb3duJzpcbiAgICAgIGNhc2UgJ2RibGNsaWNrJzpcbiAgICAgIGNhc2UgJ2NvbnRleHRtZW51JzpcbiAgICAgIGNhc2UgJ21vdXNlZW50ZXInOlxuICAgICAgY2FzZSAnbW91c2VsZWF2ZSc6XG4gICAgICBjYXNlICdtb3VzZW1vdmUnOlxuICAgICAgY2FzZSAnbW91c2VvdXQnOlxuICAgICAgY2FzZSAnbW91c2VvdmVyJzpcbiAgICAgIGNhc2UgJ3Nob3cnOlxuICAgICAgICBzZXJpYWxpemVkRXZlbnQgPSBzZXJpYWxpemVNb3VzZUV2ZW50KGV2ZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdrZXlkb3duJzpcbiAgICAgIGNhc2UgJ2tleXByZXNzJzpcbiAgICAgIGNhc2UgJ2tleXVwJzpcbiAgICAgICAgc2VyaWFsaXplZEV2ZW50ID0gc2VyaWFsaXplS2V5Ym9hcmRFdmVudChldmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaW5wdXQnOlxuICAgICAgY2FzZSAnY2hhbmdlJzpcbiAgICAgIGNhc2UgJ2JsdXInOlxuICAgICAgICBzZXJpYWxpemVkRXZlbnQgPSBzZXJpYWxpemVFdmVudFdpdGhUYXJnZXQoZXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2Fib3J0JzpcbiAgICAgIGNhc2UgJ2FmdGVycHJpbnQnOlxuICAgICAgY2FzZSAnYmVmb3JlcHJpbnQnOlxuICAgICAgY2FzZSAnY2FjaGVkJzpcbiAgICAgIGNhc2UgJ2NhbnBsYXknOlxuICAgICAgY2FzZSAnY2FucGxheXRocm91Z2gnOlxuICAgICAgY2FzZSAnY2hhcmdpbmdjaGFuZ2UnOlxuICAgICAgY2FzZSAnY2hhcmdpbmd0aW1lY2hhbmdlJzpcbiAgICAgIGNhc2UgJ2Nsb3NlJzpcbiAgICAgIGNhc2UgJ2Rpc2NoYXJnaW5ndGltZWNoYW5nZSc6XG4gICAgICBjYXNlICdET01Db250ZW50TG9hZGVkJzpcbiAgICAgIGNhc2UgJ2Rvd25sb2FkaW5nJzpcbiAgICAgIGNhc2UgJ2R1cmF0aW9uY2hhbmdlJzpcbiAgICAgIGNhc2UgJ2VtcHRpZWQnOlxuICAgICAgY2FzZSAnZW5kZWQnOlxuICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgY2FzZSAnZnVsbHNjcmVlbmNoYW5nZSc6XG4gICAgICBjYXNlICdmdWxsc2NyZWVuZXJyb3InOlxuICAgICAgY2FzZSAnaW52YWxpZCc6XG4gICAgICBjYXNlICdsYW5ndWFnZWNoYW5nZSc6XG4gICAgICBjYXNlICdsZXZlbGZjaGFuZ2UnOlxuICAgICAgY2FzZSAnbG9hZGVkZGF0YSc6XG4gICAgICBjYXNlICdsb2FkZWRtZXRhZGF0YSc6XG4gICAgICBjYXNlICdvYnNvbGV0ZSc6XG4gICAgICBjYXNlICdvZmZsaW5lJzpcbiAgICAgIGNhc2UgJ29ubGluZSc6XG4gICAgICBjYXNlICdvcGVuJzpcbiAgICAgIGNhc2UgJ29yaWVudGF0b2luY2hhbmdlJzpcbiAgICAgIGNhc2UgJ3BhdXNlJzpcbiAgICAgIGNhc2UgJ3BvaW50ZXJsb2NrY2hhbmdlJzpcbiAgICAgIGNhc2UgJ3BvaW50ZXJsb2NrZXJyb3InOlxuICAgICAgY2FzZSAncGxheSc6XG4gICAgICBjYXNlICdwbGF5aW5nJzpcbiAgICAgIGNhc2UgJ3JhdGVjaGFuZ2UnOlxuICAgICAgY2FzZSAncmVhZHlzdGF0ZWNoYW5nZSc6XG4gICAgICBjYXNlICdyZXNldCc6XG4gICAgICBjYXNlICdzY3JvbGwnOlxuICAgICAgY2FzZSAnc2Vla2VkJzpcbiAgICAgIGNhc2UgJ3NlZWtpbmcnOlxuICAgICAgY2FzZSAnc3RhbGxlZCc6XG4gICAgICBjYXNlICdzdWJtaXQnOlxuICAgICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICBjYXNlICdzdXNwZW5kJzpcbiAgICAgIGNhc2UgJ3RpbWV1cGRhdGUnOlxuICAgICAgY2FzZSAndXBkYXRlcmVhZHknOlxuICAgICAgY2FzZSAndmlzaWJpbGl0eWNoYW5nZSc6XG4gICAgICBjYXNlICd2b2x1bWVjaGFuZ2UnOlxuICAgICAgY2FzZSAnd2FpdGluZyc6XG4gICAgICAgIHNlcmlhbGl6ZWRFdmVudCA9IHNlcmlhbGl6ZUdlbmVyaWNFdmVudChldmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndHJhbnNpdGlvbmVuZCc6XG4gICAgICAgIHNlcmlhbGl6ZWRFdmVudCA9IHNlcmlhbGl6ZVRyYW5zaXRpb25FdmVudChldmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGV2ZW50TmFtZSArICcgbm90IHN1cHBvcnRlZCBvbiBXZWJXb3JrZXJzJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fc2luay5lbWl0KHtcbiAgICAgICdlbGVtZW50JzogdGhpcy5fc2VyaWFsaXplci5zZXJpYWxpemUoZWxlbWVudCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgJ2V2ZW50TmFtZSc6IGV2ZW50TmFtZSxcbiAgICAgICdldmVudFRhcmdldCc6IGV2ZW50VGFyZ2V0LFxuICAgICAgJ2V2ZW50Jzogc2VyaWFsaXplZEV2ZW50LFxuICAgIH0pO1xuXG4gICAgLy8gVE9ETyhrZWdsdW5lcSk6IEV2ZW50dWFsbHksIHdlIHdhbnQgdGhlIHVzZXIgdG8gaW5kaWNhdGUgZnJvbSB0aGUgVUkgc2lkZSB3aGV0aGVyIHRoZSBldmVudFxuICAgIC8vIHNob3VsZCBiZSBjYW5jZWxlZCwgYnV0IGZvciBub3cganVzdCBjYWxsIGBwcmV2ZW50RGVmYXVsdGAgb24gdGhlIG9yaWdpbmFsIERPTSBldmVudC5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==