import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {spawnSync} from 'node:child_process';

const root=path.dirname(fileURLToPath(import.meta.url));
const require=createRequire(process.env.MOSS_BUILD_DEPENDENCIES || new URL('./package.json',import.meta.url));
const directory=mkdtempSync(path.join(tmpdir(),'moss-types-'));
try {
  const config=path.join(directory,'tsconfig.json');
  writeFileSync(config,JSON.stringify({extends:path.join(root,'tsconfig.json'),compilerOptions:{paths:{
    '@/*':[path.join(root,'src/*')],
    'vue':[path.join(path.dirname(require.resolve('vue/package.json')),'dist/vue.d.ts')],
  }}}));
  const result=spawnSync(process.execPath,[require.resolve('vue-tsc/bin/vue-tsc.js'),'--project',config],{cwd:root,stdio:'inherit',windowsHide:true});
  if(result.error)throw result.error;
  process.exitCode=result.status ?? 1;
} finally { rmSync(directory,{recursive:true,force:true}); }
