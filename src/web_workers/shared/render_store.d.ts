/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export declare class RenderStore {
    private _nextIndex;
    private _lookupById;
    private _lookupByObject;
    allocateId(): number;
    store(obj: any, id: number): void;
    remove(obj: any): void;
    deserialize(id: number): any;
    serialize(obj: any): number | null | undefined;
}
