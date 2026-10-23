import { createRequire } from 'node:module';
import { fileURLToPath,pathToFileURL } from 'node:url';
import path from 'node:path';
const root=path.dirname(fileURLToPath(import.meta.url));
const require=createRequire(process.env.MOSS_BUILD_DEPENDENCIES || new URL('./package.json',import.meta.url));
const {build}=await import(pathToFileURL(require.resolve('vite')).href);
const {default:vue}=await import(pathToFileURL(require.resolve('@vitejs/plugin-vue')).href);
await build({configFile:false,root,plugins:[vue()],resolve:{alias:{'@':path.join(root,'src'),'vue':require.resolve('vue/dist/vue.runtime.esm-bundler.js')}},define:{'process.env.NODE_ENV':JSON.stringify('production'),__VUE_OPTIONS_API__:true,__VUE_PROD_DEVTOOLS__:false,__VUE_PROD_HYDRATION_MISMATCH_DETAILS__:false},build:{outDir:'../web',emptyOutDir:true,lib:{entry:path.join(root,'src/extension.js'),formats:['es'],fileName:()=> 'moss_layout.js'},rollupOptions:{external:['../../scripts/app.js','../../scripts/api.js'],output:{inlineDynamicImports:true,assetFileNames:'moss_layout.[ext]'}}}});
