import { createElement, useEffect, useMemo } from "react";

import { DojoListenerContainerProps } from "../typings/DojoListenerProps";

import "./ui/index.scss";

import { Observer } from "mobx-react";
import { Store } from "./store";
import { useUnmount } from "ahooks";

import on from "dojo/on";
// import lang from "dojo/_base/lang";
import { fireNanoflow } from "@jeltemx/mendix-react-widget-utils";
import { get } from "lodash";

const parseStyle = (style = ""): { [key: string]: string } => {
    try {
        return style.split(";").reduce<{ [key: string]: string }>((styleObject, line) => {
            const pair = line.split(":");
            if (pair.length === 2) {
                const name = pair[0].trim().replace(/(-.)/g, match => match[1].toUpperCase());
                styleObject[name] = pair[1].trim();
            }
            return styleObject;
        }, {});
    } catch (_) {
        return {};
    }
};

export default function DojoListener(props: DojoListenerContainerProps) {
    const store = useMemo(() => new Store(props), []);

    useEffect(() => {
        store.mxOption = props;
        const ctx = new mendix.lib.MxContext();
        ctx.setTrackObject(props.mxObject!);

        const signal = on(window, props.event, (e: Event) => {
            props.mapping.forEach(m => {
                props.mxObject!.set(m.bindAtt, get(e, m.mapKey));
            })
            fireNanoflow(props.nf, ctx, props.mxform);
        });

        return () => {
            signal.remove();
        };
    }, [store, props]);

    useUnmount(() => {
        store.dispose();
    });

    return <Observer>{() => <div className={props.class} style={parseStyle(props.style)}></div>}</Observer>;
}
