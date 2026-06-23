import {
	MediaFiltersDefaults,
	useMediaFiltersStore,
} from '@/stores/useMediaFiltersStore';
import { EMediaType } from '@/types';
import { toRefs } from 'vue';

export function useMediaPageFilters(
	mediaType: EMediaType,
	defaults: MediaFiltersDefaults = {}
) {
	const store = useMediaFiltersStore();
	const filters = store.getFilters(mediaType, defaults);

	return toRefs(filters);
}
