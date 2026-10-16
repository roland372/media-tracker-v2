import { InjectionKey, Ref } from 'vue';

export interface IMediaDisplayControls {
	hasExpandedMedia: Ref<boolean>;
	collapseAll: () => void;
	registerCollapseHandler: (handler: () => void) => () => void;
}

export const mediaDisplayControlsKey: InjectionKey<IMediaDisplayControls> =
	Symbol('mediaDisplayControls');
