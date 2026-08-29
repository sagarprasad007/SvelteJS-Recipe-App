
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/favorites" | "/meal-planner" | "/my-recipes" | "/recipes" | "/recipes/[id]";
		RouteParams(): {
			"/recipes/[id]": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string | undefined };
			"/favorites": Record<string, never>;
			"/meal-planner": Record<string, never>;
			"/my-recipes": Record<string, never>;
			"/recipes": { id?: string | undefined };
			"/recipes/[id]": { id: string }
		};
		Pathname(): "/" | "/favorites" | "/meal-planner" | "/my-recipes" | `/recipes/${string}` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): string & {};
	}
}