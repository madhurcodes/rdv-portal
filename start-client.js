/**
 * Created by Nikhil on 22/05/17.
 */

const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'client', shell: true };
require('child_process').spawn('npm', args, opts);