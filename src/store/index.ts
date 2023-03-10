import { configure, makeObservable, when } from "mobx";
import { DojoListenerContainerProps } from "../../typings/DojoListenerProps";

configure({ enforceActions: "observed", isolateGlobalState: true, useProxies: "never" });

export class Store {
    sub?: mx.Subscription;
    /**
     * dispose
     */
    public dispose() {}

    constructor(public mxOption: DojoListenerContainerProps) {
        makeObservable(this, {});

        when(
            () => !!this.mxOption.mxObject,
            () => {
                this.update();

                this.sub = mx.data.subscribe(
                    {
                        guid: this.mxOption.mxObject!.getGuid(),
                        callback: () => {
                            this.update();
                            //等待视图刷新
                            setTimeout(() => {
                                this.drawSelection();
                            }, 1);
                        }
                    },
                    //@ts-ignore
                    this.mxOption.mxform
                );
            },
            {
                onError(e) {
                    console.error(e);
                }
            }
        );
    }
    update() {
        throw new Error("Method not implemented.");
    }
    drawSelection() {
        throw new Error("Method not implemented.");
    }
}
