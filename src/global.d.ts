declare module '*.module.scss' {
    const value: {
        [index: string]: string;
    };
    export default value;
}

declare module '*.svg' {
    import type * as React from 'react';

    export const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement>
    >;
    const source: string;
    export default source;
}
