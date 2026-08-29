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
		client: {start:"_app/immutable/entry/start.D5M4fwMN.js",app:"_app/immutable/entry/app.XtoReL3Q.js",imports:["_app/immutable/entry/start.D5M4fwMN.js","_app/immutable/chunks/BVwiG5Tf.js","_app/immutable/chunks/DYlT9D2Y.js","_app/immutable/chunks/DQ4fPOgk.js","_app/immutable/entry/app.XtoReL3Q.js","_app/immutable/chunks/Dp1pzeXC.js","_app/immutable/chunks/DYlT9D2Y.js","_app/immutable/chunks/BjNnlfgI.js","_app/immutable/chunks/Db0P6IlU.js","_app/immutable/chunks/Biahaxs8.js","_app/immutable/chunks/CUa9IwcI.js","_app/immutable/chunks/A36LNfZn.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js'))
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
