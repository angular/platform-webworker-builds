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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRfZGlzcGF0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvdWkvZXZlbnRfZGlzcGF0Y2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVQSxPQUFPLEVBQUMsd0JBQXdCLEVBQUUscUJBQXFCLEVBQUUsc0JBQXNCLEVBQUUsbUJBQW1CLEVBQUUsd0JBQXdCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUUxSixNQUFNLE9BQU8sZUFBZTtJQUMxQixZQUFvQixLQUF3QixFQUFVLFdBQXVCO1FBQXpELFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFBRyxDQUFDO0lBRWpGLHNCQUFzQixDQUFDLE1BQVcsRUFBRSxTQUFpQixFQUFFLE9BQVk7UUFDakUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDZCxTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyw4QkFBc0M7WUFDbkYsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSw4QkFBc0M7WUFDMUYsV0FBVyxFQUFFLFNBQVM7U0FDdkIsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsbUJBQW1CLENBQUMsT0FBWSxFQUFFLFdBQW1CLEVBQUUsU0FBaUIsRUFBRSxLQUFVO1FBQ2xGLElBQUksZUFBb0IsQ0FBQztRQUN6QixrREFBa0Q7UUFDbEQsUUFBUSxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ2xCLEtBQUssT0FBTyxDQUFDO1lBQ2IsS0FBSyxTQUFTLENBQUM7WUFDZixLQUFLLFdBQVcsQ0FBQztZQUNqQixLQUFLLFVBQVUsQ0FBQztZQUNoQixLQUFLLGFBQWEsQ0FBQztZQUNuQixLQUFLLFlBQVksQ0FBQztZ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QztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTZXJpYWxpemVyLCBTZXJpYWxpemVyVHlwZXN9IGZyb20gJy4uL3NoYXJlZC9zZXJpYWxpemVyJztcblxuaW1wb3J0IHtzZXJpYWxpemVFdmVudFdpdGhUYXJnZXQsIHNlcmlhbGl6ZUdlbmVyaWNFdmVudCwgc2VyaWFsaXplS2V5Ym9hcmRFdmVudCwgc2VyaWFsaXplTW91c2VFdmVudCwgc2VyaWFsaXplVHJhbnNpdGlvbkV2ZW50fSBmcm9tICcuL2V2ZW50X3NlcmlhbGl6ZXInO1xuXG5leHBvcnQgY2xhc3MgRXZlbnREaXNwYXRjaGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2luazogRXZlbnRFbWl0dGVyPGFueT4sIHByaXZhdGUgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIpIHt9XG5cbiAgZGlzcGF0Y2hBbmltYXRpb25FdmVudChwbGF5ZXI6IGFueSwgcGhhc2VOYW1lOiBzdHJpbmcsIGVsZW1lbnQ6IGFueSk6IGJvb2xlYW4ge1xuICAgIHRoaXMuX3NpbmsuZW1pdCh7XG4gICAgICAnZWxlbWVudCc6IHRoaXMuX3NlcmlhbGl6ZXIuc2VyaWFsaXplKGVsZW1lbnQsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgICdhbmltYXRpb25QbGF5ZXInOiB0aGlzLl9zZXJpYWxpemVyLnNlcmlhbGl6ZShwbGF5ZXIsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgICdwaGFzZU5hbWUnOiBwaGFzZU5hbWUsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBkaXNwYXRjaFJlbmRlckV2ZW50KGVsZW1lbnQ6IGFueSwgZXZlbnRUYXJnZXQ6IHN0cmluZywgZXZlbnROYW1lOiBzdHJpbmcsIGV2ZW50OiBhbnkpOiBib29sZWFuIHtcbiAgICBsZXQgc2VyaWFsaXplZEV2ZW50OiBhbnk7XG4gICAgLy8gVE9ETyAoanRlcGxpdHo2MDIpOiBzdXBwb3J0IGN1c3RvbSBldmVudHMgIzMzNTBcbiAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgIGNhc2UgJ2NsaWNrJzpcbiAgICAgIGNhc2UgJ21vdXNldXAnOlxuICAgICAgY2FzZSAnbW91c2Vkb3duJzpcbiAgICAgIGNhc2UgJ2RibGNsaWNrJzpcbiAgICAgIGNhc2UgJ2NvbnRleHRtZW51JzpcbiAgICAgIGNhc2UgJ21vdXNlZW50ZXInOlxuICAgICAgY2FzZSAnbW91c2VsZWF2ZSc6XG4gICAgICBjYXNlICdtb3VzZW1vdmUnOlxuICAgICAgY2FzZSAnbW91c2VvdXQnOlxuICAgICAgY2FzZSAnbW91c2VvdmVyJzpcbiAgICAgIGNhc2UgJ3Nob3cnOlxuICAgICAgICBzZXJpYWxpemVkRXZlbnQgPSBzZXJpYWxpemVNb3VzZUV2ZW50KGV2ZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdrZXlkb3duJzpcbiAgICAgIGNhc2UgJ2tleXByZXNzJzpcbiAgICAgIGNhc2UgJ2tleXVwJzpcbiAgICAgICAgc2VyaWFsaXplZEV2ZW50ID0gc2VyaWFsaXplS2V5Ym9hcmRFdmVudChldmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaW5wdXQnOlxuICAgICAgY2FzZSAnY2hhbmdlJzpcbiAgICAgIGNhc2UgJ2JsdXInOlxuICAgICAgICBzZXJpYWxpemVkRXZlbnQgPSBzZXJpYWxpemVFdmVudFdpdGhUYXJnZXQoZXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2Fib3J0JzpcbiAgICAgIGNhc2UgJ2FmdGVycHJpbnQnOlxuICAgICAgY2FzZSAnYmVmb3JlcHJpbnQnOlxuICAgICAgY2FzZSAnY2FjaGVkJzpcbiAgICAgIGNhc2UgJ2NhbnBsYXknOlxuICAgICAgY2FzZSAnY2FucGxheXRocm91Z2gnOlxuICAgICAgY2FzZSAnY2hhcmdpbmdjaGFuZ2UnOlxuICAgICAgY2FzZSAnY2hhcmdpbmd0aW1lY2hhbmdlJzpcbiAgICAgIGNhc2UgJ2Nsb3NlJzpcbiAgICAgIGNhc2UgJ2Rpc2NoYXJnaW5ndGltZWNoYW5nZSc6XG4gICAgICBjYXNlICdET01Db250ZW50TG9hZGVkJzpcbiAgICAgIGNhc2UgJ2Rvd25sb2FkaW5nJzpcbiAgICAgIGNhc2UgJ2R1cmF0aW9uY2hhbmdlJzpcbiAgICAgIGNhc2UgJ2VtcHRpZWQnOlxuICAgICAgY2FzZSAnZW5kZWQnOlxuICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgY2FzZSAnZnVsbHNjcmVlbmNoYW5nZSc6XG4gICAgICBjYXNlICdmdWxsc2NyZWVuZXJyb3InOlxuICAgICAgY2FzZSAnaW52YWxpZCc6XG4gICAgICBjYXNlICdsYW5ndWFnZWNoYW5nZSc6XG4gICAgICBjYXNlICdsZXZlbGZjaGFuZ2UnOlxuICAgICAgY2FzZSAnbG9hZGVkZGF0YSc6XG4gICAgICBjYXNlICdsb2FkZWRtZXRhZGF0YSc6XG4gICAgICBjYXNlICdvYnNvbGV0ZSc6XG4gICAgICBjYXNlICdvZmZsaW5lJzpcbiAgICAgIGNhc2UgJ29ubGluZSc6XG4gICAgICBjYXNlICdvcGVuJzpcbiAgICAgIGNhc2UgJ29yaWVudGF0b2luY2hhbmdlJzpcbiAgICAgIGNhc2UgJ3BhdXNlJzpcbiAgICAgIGNhc2UgJ3BvaW50ZXJsb2NrY2hhbmdlJzpcbiAgICAgIGNhc2UgJ3BvaW50ZXJsb2NrZXJyb3InOlxuICAgICAgY2FzZSAncGxheSc6XG4gICAgICBjYXNlICdwbGF5aW5nJzpcbiAgICAgIGNhc2UgJ3JhdGVjaGFuZ2UnOlxuICAgICAgY2FzZSAncmVhZHlzdGF0ZWNoYW5nZSc6XG4gICAgICBjYXNlICdyZXNldCc6XG4gICAgICBjYXNlICdzY3JvbGwnOlxuICAgICAgY2FzZSAnc2Vla2VkJzpcbiAgICAgIGNhc2UgJ3NlZWtpbmcnOlxuICAgICAgY2FzZSAnc3RhbGxlZCc6XG4gICAgICBjYXNlICdzdWJtaXQnOlxuICAgICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICBjYXNlICdzdXNwZW5kJzpcbiAgICAgIGNhc2UgJ3RpbWV1cGRhdGUnOlxuICAgICAgY2FzZSAndXBkYXRlcmVhZHknOlxuICAgICAgY2FzZSAndmlzaWJpbGl0eWNoYW5nZSc6XG4gICAgICBjYXNlICd2b2x1bWVjaGFuZ2UnOlxuICAgICAgY2FzZSAnd2FpdGluZyc6XG4gICAgICAgIHNlcmlhbGl6ZWRFdmVudCA9IHNlcmlhbGl6ZUdlbmVyaWNFdmVudChldmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndHJhbnNpdGlvbmVuZCc6XG4gICAgICAgIHNlcmlhbGl6ZWRFdmVudCA9IHNlcmlhbGl6ZVRyYW5zaXRpb25FdmVudChldmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGV2ZW50TmFtZSArICcgbm90IHN1cHBvcnRlZCBvbiBXZWJXb3JrZXJzJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fc2luay5lbWl0KHtcbiAgICAgICdlbGVtZW50JzogdGhpcy5fc2VyaWFsaXplci5zZXJpYWxpemUoZWxlbWVudCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgJ2V2ZW50TmFtZSc6IGV2ZW50TmFtZSxcbiAgICAgICdldmVudFRhcmdldCc6IGV2ZW50VGFyZ2V0LFxuICAgICAgJ2V2ZW50Jzogc2VyaWFsaXplZEV2ZW50LFxuICAgIH0pO1xuXG4gICAgLy8gVE9ETyhrZWdsdW5lcSk6IEV2ZW50dWFsbHksIHdlIHdhbnQgdGhlIHVzZXIgdG8gaW5kaWNhdGUgZnJvbSB0aGUgVUkgc2lkZSB3aGV0aGVyIHRoZSBldmVudFxuICAgIC8vIHNob3VsZCBiZSBjYW5jZWxlZCwgYnV0IGZvciBub3cganVzdCBjYWxsIGBwcmV2ZW50RGVmYXVsdGAgb24gdGhlIG9yaWdpbmFsIERPTSBldmVudC5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==