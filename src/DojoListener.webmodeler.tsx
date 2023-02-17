import { Component, ReactNode, createElement } from "react";
import { DojoListenerContainerProps, DojoListenerPreviewProps } from "../typings/DojoListenerProps";

declare function require(name: string): string;

export class preview extends Component<DojoListenerPreviewProps> {
    render(): ReactNode {
        return <div>No preview available</div>;
    }
}

export function getPreviewCss(): string {
    return require("./ui/index.scss");
}
type VisibilityMap = {
    [P in keyof DojoListenerContainerProps]: boolean;
};

export function getVisibleProperties(props: DojoListenerContainerProps, visibilityMap: VisibilityMap): VisibilityMap {
    // visibilityMap.nodeConstraint = props.nodeDataSource === "xpath";
    // visibilityMap.nodeGetDataMicroflow = props.nodeDataSource === "microflow";
    // visibilityMap.nodeGetDataNanoflow = props.nodeDataSource === "nanoflow";
    console.log(props);

    return visibilityMap;
}
