# 重命名

-   发射事件（在 js action 中）

```js
async function injectDeps(deps) {
    return await new Promise((resolve, reject) => {
        if (!Array.isArray(deps)) {
            deps = [deps];
        }
        window.dojoDynamicRequire(deps, function() {
            resolve(Array.from(arguments));
        });
    });
}

export async function your_js_action() {
    // BEGIN USER CODE

    const [on] = await injectDeps(["dojo/on"]);
    on.emit(container, "your_event_name", {
        bubbles: true,
        key: { to: ["your", "data"], and: "other" }
    });
    // END USER CODE
}
```
