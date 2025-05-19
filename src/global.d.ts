declare module '*.module.scss' {
    const value: {
        [index: string]: string;
    };
    export default value;
}

declare module '*.svg' {
    import type * as React from 'react';
    const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & { title?: string }
    >;
    export default ReactComponent;
}
