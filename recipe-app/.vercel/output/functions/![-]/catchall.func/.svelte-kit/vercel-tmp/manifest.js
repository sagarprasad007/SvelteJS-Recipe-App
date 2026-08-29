export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.BoMABY-u.js",app:"_app/immutable/entry/app.BGgiUwiG.js",imports:["_app/immutable/entry/start.BoMABY-u.js","_app/immutable/chunks/Cc0F4m0N.js","_app/immutable/chunks/CQ1_TAHT.js","_app/immutable/chunks/CjiCADzm.js","_app/immutable/entry/app.BGgiUwiG.js","_app/immutable/chunks/Dp1pzeXC.js","_app/immutable/chunks/CQ1_TAHT.js","_app/immutable/chunks/Xr4AKBUp.js","_app/immutable/chunks/D4PAkmaq.js","_app/immutable/chunks/BrTykeZj.js","_app/immutable/chunks/oqflgiyj.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js')),
			__memo(() => import('../output/server/nodes/6.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/favorites",
				pattern: /^\/favorites\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/meal-planner",
				pattern: /^\/meal-planner\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/my-recipes",
				pattern: /^\/my-recipes\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/recipes/[id]",
				pattern: /^\/recipes\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
