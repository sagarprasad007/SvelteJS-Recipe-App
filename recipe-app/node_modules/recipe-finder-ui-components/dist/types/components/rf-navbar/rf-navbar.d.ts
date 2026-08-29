import { EventEmitter } from '../../stencil-public-runtime';
export declare class RfNavbar {
    brandName: string;
    activeRoute: string;
    rfNavigate: EventEmitter<{
        path: string;
    }>;
    private navigate;
    render(): any;
}
