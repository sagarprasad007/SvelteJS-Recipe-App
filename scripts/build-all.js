import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function run(cmd, cwd) {
  console.log(`\n> [BUILD] Running: ${cmd} (in ${cwd})`);
  execSync(cmd, { cwd, stdio: 'inherit' });
}

try {
  const componentsDir = path.join(rootDir, 'recipe-components');
  const appDir = path.join(rootDir, 'recipe-app');
  const staticStencilDir = path.join(appDir, 'static', 'stencil');

  // 1. Build Stencil component library
  run('npm install', componentsDir);
  run('npm run build', componentsDir);
  run('npm pack', componentsDir);

  // 2. Copy tarball to recipe-app
  const tarballName = 'recipe-finder-ui-components-1.0.1.tgz';
  const srcTarball = path.join(componentsDir, tarballName);
  const destTarball = path.join(appDir, tarballName);
  fs.copyFileSync(srcTarball, destTarball);
  console.log(`> [BUILD] Copied ${tarballName} to recipe-app`);

  // 3. Copy Stencil dist chunks to recipe-app/static/stencil
  fs.mkdirSync(staticStencilDir, { recursive: true });
  const stencilDist = path.join(componentsDir, 'dist', 'recipe-finder-ui-components');
  if (fs.existsSync(stencilDist)) {
    const files = fs.readdirSync(stencilDist);
    for (const file of files) {
      fs.copyFileSync(path.join(stencilDist, file), path.join(staticStencilDir, file));
    }
    console.log(`> [BUILD] Copied ${files.length} Stencil chunk files to static/stencil`);
  }

  // 4. Install tarball and build SvelteKit app
  run(`npm install --force ./${tarballName}`, appDir);
  run('npm run build', appDir);

  console.log('\n✅ [BUILD SUCCESS] Workspace build completed successfully!');
} catch (err) {
  console.error('\n❌ [BUILD ERROR]', err);
  process.exit(1);
}
