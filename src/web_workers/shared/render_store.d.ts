import * as i0 from "@angular/core";
export declare class RenderStore {
    private _nextIndex;
    private _lookupById;
    private _lookupByObject;
    allocateId(): number;
    store(obj: any, id: number): void;
    remove(obj: any): void;
    deserialize(id: number): any;
    serialize(obj: any): number | null | undefined;
    static ngInjectableDef: i0.ΔInjectableDef<RenderStore>;
}
