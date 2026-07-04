declare module "react" {
  export type ReactNode = unknown;
  export const StrictMode: (props: { children?: ReactNode }) => ReactNode;
  export function useState<T>(initialValue: T): [T, (value: T) => void];
}

declare module "react-dom/client" {
  import type { ReactNode } from "react";

  export function createRoot(container: Element | DocumentFragment): {
    render(children: ReactNode): void;
  };
}

declare module "react/jsx-runtime" {
  export const Fragment: unknown;
  export function jsx(type: unknown, props: unknown, key?: unknown): unknown;
  export function jsxs(type: unknown, props: unknown, key?: unknown): unknown;
}

declare namespace JSX {
  interface IntrinsicAttributes {
    key?: unknown;
  }

  interface IntrinsicElements {
    [elementName: string]: unknown;
  }
}
