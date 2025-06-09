import { default as React } from 'react';
interface SidePanelProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    width?: string;
}
declare const SidePanel: React.FC<SidePanelProps>;
export default SidePanel;
