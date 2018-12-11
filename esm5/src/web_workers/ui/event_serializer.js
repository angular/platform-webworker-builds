/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var MOUSE_EVENT_PROPERTIES = [
    'altKey', 'button', 'clientX', 'clientY', 'metaKey', 'movementX', 'movementY', 'offsetX',
    'offsetY', 'region', 'screenX', 'screenY', 'shiftKey'
];
var KEYBOARD_EVENT_PROPERTIES = [
    'altkey', 'charCode', 'code', 'ctrlKey', 'isComposing', 'key', 'keyCode', 'location', 'metaKey',
    'repeat', 'shiftKey', 'which'
];
var TRANSITION_EVENT_PROPERTIES = ['propertyName', 'elapsedTime', 'pseudoElement'];
var EVENT_PROPERTIES = ['type', 'bubbles', 'cancelable'];
var NODES_WITH_VALUE = new Set(['input', 'select', 'option', 'button', 'li', 'meter', 'progress', 'param', 'textarea']);
export function serializeGenericEvent(e) {
    return serializeEvent(e, EVENT_PROPERTIES);
}
// TODO(jteplitz602): Allow users to specify the properties they need rather than always
// adding value and files #3374
export function serializeEventWithTarget(e) {
    var serializedEvent = serializeEvent(e, EVENT_PROPERTIES);
    return addTarget(e, serializedEvent);
}
export function serializeMouseEvent(e) {
    return serializeEvent(e, MOUSE_EVENT_PROPERTIES);
}
export function serializeKeyboardEvent(e) {
    var serializedEvent = serializeEvent(e, KEYBOARD_EVENT_PROPERTIES);
    return addTarget(e, serializedEvent);
}
export function serializeTransitionEvent(e) {
    var serializedEvent = serializeEvent(e, TRANSITION_EVENT_PROPERTIES);
    return addTarget(e, serializedEvent);
}
// TODO(jteplitz602): #3374. See above.
function addTarget(e, serializedEvent) {
    if (NODES_WITH_VALUE.has(e.target.tagName.toLowerCase())) {
        var target = e.target;
        serializedEvent['target'] = { 'value': target.value };
        if (target.files) {
            serializedEvent['target']['files'] = target.files;
        }
    }
    return serializedEvent;
}
function serializeEvent(e, properties) {
    var serialized = {};
    for (var i = 0; i < properties.length; i++) {
        var prop = properties[i];
        serialized[prop] = e[prop];
    }
    return serialized;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRfc2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvdWkvZXZlbnRfc2VyaWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxJQUFNLHNCQUFzQixHQUFHO0lBQzdCLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxTQUFTO0lBQ3hGLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVO0NBQ3RELENBQUM7QUFFRixJQUFNLHlCQUF5QixHQUFHO0lBQ2hDLFFBQVEsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUztJQUMvRixRQUFRLEVBQUUsVUFBVSxFQUFFLE9BQU87Q0FDOUIsQ0FBQztBQUVGLElBQU0sMkJBQTJCLEdBQUcsQ0FBQyxjQUFjLEVBQUUsYUFBYSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBRXJGLElBQU0sZ0JBQWdCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBRTNELElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxHQUFHLENBQzVCLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO0FBRTdGLE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxDQUFRO0lBQzVDLE9BQU8sY0FBYyxDQUFDLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzdDLENBQUM7QUFFRCx3RkFBd0Y7QUFDeEYsK0JBQStCO0FBQy9CLE1BQU0sVUFBVSx3QkFBd0IsQ0FBQyxDQUFRO0lBQy9DLElBQU0sZUFBZSxHQUFHLGNBQWMsQ0FBQyxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUM1RCxPQUFPLFNBQVMsQ0FBQyxDQUFDLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFDdkMsQ0FBQztBQUVELE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxDQUFhO0lBQy9DLE9BQU8sY0FBYyxDQUFDLENBQUMsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO0FBQ25ELENBQUM7QUFFRCxNQUFNLFVBQVUsc0JBQXNCLENBQUMsQ0FBZ0I7SUFDckQsSUFBTSxlQUFlLEdBQUcsY0FBYyxDQUFDLENBQUMsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO0lBQ3JFLE9BQU8sU0FBUyxDQUFDLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQztBQUN2QyxDQUFDO0FBRUQsTUFBTSxVQUFVLHdCQUF3QixDQUFDLENBQWtCO0lBQ3pELElBQU0sZUFBZSxHQUFHLGNBQWMsQ0FBQyxDQUFDLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztJQUN2RSxPQUFPLFNBQVMsQ0FBQyxDQUFDLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFDdkMsQ0FBQztBQUVELHVDQUF1QztBQUN2QyxTQUFTLFNBQVMsQ0FBQyxDQUFRLEVBQUUsZUFBcUM7SUFDaEUsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLENBQWUsQ0FBQyxDQUFDLE1BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRTtRQUN2RSxJQUFNLE1BQU0sR0FBcUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUMxQyxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBQyxDQUFDO1FBQ3BELElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNoQixlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNuRDtLQUNGO0lBQ0QsT0FBTyxlQUFlLENBQUM7QUFDekIsQ0FBQztBQUVELFNBQVMsY0FBYyxDQUFDLENBQU0sRUFBRSxVQUFvQjtJQUNsRCxJQUFNLFVBQVUsR0FBdUIsRUFBRSxDQUFDO0lBQzFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzFDLElBQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzVCO0lBQ0QsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuY29uc3QgTU9VU0VfRVZFTlRfUFJPUEVSVElFUyA9IFtcbiAgJ2FsdEtleScsICdidXR0b24nLCAnY2xpZW50WCcsICdjbGllbnRZJywgJ21ldGFLZXknLCAnbW92ZW1lbnRYJywgJ21vdmVtZW50WScsICdvZmZzZXRYJyxcbiAgJ29mZnNldFknLCAncmVnaW9uJywgJ3NjcmVlblgnLCAnc2NyZWVuWScsICdzaGlmdEtleSdcbl07XG5cbmNvbnN0IEtFWUJPQVJEX0VWRU5UX1BST1BFUlRJRVMgPSBbXG4gICdhbHRrZXknLCAnY2hhckNvZGUnLCAnY29kZScsICdjdHJsS2V5JywgJ2lzQ29tcG9zaW5nJywgJ2tleScsICdrZXlDb2RlJywgJ2xvY2F0aW9uJywgJ21ldGFLZXknLFxuICAncmVwZWF0JywgJ3NoaWZ0S2V5JywgJ3doaWNoJ1xuXTtcblxuY29uc3QgVFJBTlNJVElPTl9FVkVOVF9QUk9QRVJUSUVTID0gWydwcm9wZXJ0eU5hbWUnLCAnZWxhcHNlZFRpbWUnLCAncHNldWRvRWxlbWVudCddO1xuXG5jb25zdCBFVkVOVF9QUk9QRVJUSUVTID0gWyd0eXBlJywgJ2J1YmJsZXMnLCAnY2FuY2VsYWJsZSddO1xuXG5jb25zdCBOT0RFU19XSVRIX1ZBTFVFID0gbmV3IFNldChcbiAgICBbJ2lucHV0JywgJ3NlbGVjdCcsICdvcHRpb24nLCAnYnV0dG9uJywgJ2xpJywgJ21ldGVyJywgJ3Byb2dyZXNzJywgJ3BhcmFtJywgJ3RleHRhcmVhJ10pO1xuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplR2VuZXJpY0V2ZW50KGU6IEV2ZW50KToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICByZXR1cm4gc2VyaWFsaXplRXZlbnQoZSwgRVZFTlRfUFJPUEVSVElFUyk7XG59XG5cbi8vIFRPRE8oanRlcGxpdHo2MDIpOiBBbGxvdyB1c2VycyB0byBzcGVjaWZ5IHRoZSBwcm9wZXJ0aWVzIHRoZXkgbmVlZCByYXRoZXIgdGhhbiBhbHdheXNcbi8vIGFkZGluZyB2YWx1ZSBhbmQgZmlsZXMgIzMzNzRcbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVFdmVudFdpdGhUYXJnZXQoZTogRXZlbnQpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gIGNvbnN0IHNlcmlhbGl6ZWRFdmVudCA9IHNlcmlhbGl6ZUV2ZW50KGUsIEVWRU5UX1BST1BFUlRJRVMpO1xuICByZXR1cm4gYWRkVGFyZ2V0KGUsIHNlcmlhbGl6ZWRFdmVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVNb3VzZUV2ZW50KGU6IE1vdXNlRXZlbnQpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gIHJldHVybiBzZXJpYWxpemVFdmVudChlLCBNT1VTRV9FVkVOVF9QUk9QRVJUSUVTKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZUtleWJvYXJkRXZlbnQoZTogS2V5Ym9hcmRFdmVudCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgY29uc3Qgc2VyaWFsaXplZEV2ZW50ID0gc2VyaWFsaXplRXZlbnQoZSwgS0VZQk9BUkRfRVZFTlRfUFJPUEVSVElFUyk7XG4gIHJldHVybiBhZGRUYXJnZXQoZSwgc2VyaWFsaXplZEV2ZW50KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZVRyYW5zaXRpb25FdmVudChlOiBUcmFuc2l0aW9uRXZlbnQpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gIGNvbnN0IHNlcmlhbGl6ZWRFdmVudCA9IHNlcmlhbGl6ZUV2ZW50KGUsIFRSQU5TSVRJT05fRVZFTlRfUFJPUEVSVElFUyk7XG4gIHJldHVybiBhZGRUYXJnZXQoZSwgc2VyaWFsaXplZEV2ZW50KTtcbn1cblxuLy8gVE9ETyhqdGVwbGl0ejYwMik6ICMzMzc0LiBTZWUgYWJvdmUuXG5mdW5jdGlvbiBhZGRUYXJnZXQoZTogRXZlbnQsIHNlcmlhbGl6ZWRFdmVudDoge1trZXk6IHN0cmluZ106IGFueX0pOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gIGlmIChOT0RFU19XSVRIX1ZBTFVFLmhhcygoPEhUTUxFbGVtZW50PmUudGFyZ2V0KS50YWdOYW1lLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZS50YXJnZXQ7XG4gICAgc2VyaWFsaXplZEV2ZW50Wyd0YXJnZXQnXSA9IHsndmFsdWUnOiB0YXJnZXQudmFsdWV9O1xuICAgIGlmICh0YXJnZXQuZmlsZXMpIHtcbiAgICAgIHNlcmlhbGl6ZWRFdmVudFsndGFyZ2V0J11bJ2ZpbGVzJ10gPSB0YXJnZXQuZmlsZXM7XG4gICAgfVxuICB9XG4gIHJldHVybiBzZXJpYWxpemVkRXZlbnQ7XG59XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZUV2ZW50KGU6IGFueSwgcHJvcGVydGllczogc3RyaW5nW10pOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gIGNvbnN0IHNlcmlhbGl6ZWQ6IHtbazogc3RyaW5nXTogYW55fSA9IHt9O1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBwcm9wID0gcHJvcGVydGllc1tpXTtcbiAgICBzZXJpYWxpemVkW3Byb3BdID0gZVtwcm9wXTtcbiAgfVxuICByZXR1cm4gc2VyaWFsaXplZDtcbn1cbiJdfQ==