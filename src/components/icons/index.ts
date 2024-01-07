import type { JSX } from 'preact/jsx-runtime';

export type EvaProps = JSX.SVGAttributes<SVGSVGElement>;
export type EvaIcon = (props: EvaProps) => JSX.Element;

export { BrushIcon } from './brush.tsx';
export { CodeIcon } from './code.tsx';
export { CompassIcon } from './compass.tsx';
export { LoginIcon } from './login.tsx';
export { LogoutIcon } from './logout.tsx';
export { MoreIcon } from './more.tsx';
export { PaperPlaneIcon } from './paper-plane.tsx';
export { PersonIcon } from './person.tsx';
export { RefreshIcon } from './refresh.tsx';
export { SearchIcon } from './search.tsx';
export { SettingsIcon } from './settings.tsx';
