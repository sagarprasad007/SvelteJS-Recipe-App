import { EventEmitter } from '../../stencil-public-runtime';
export declare class RfModal {
    open: boolean;
    modalTitle: string;
    rfClose: EventEmitter<void>;
    private handleBackdropClick;
    private handleCloseBtn;
    render(): any;
}
