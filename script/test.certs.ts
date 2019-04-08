import * as rimraf from 'rimraf';
import * as execa from 'execa';
import * as fs from 'fs';
import * as path from 'path';

const authDir = path.join(process.cwd(), './auth');

rimraf.sync(authDir);
fs.mkdirSync(authDir);

execa.shellSync(`openssl req -x509 -newkey rsa:4096 -keyout ${authDir}/server_key.pem -out ${authDir}/server_cert.pem -nodes -days 365 \
-subj "/CN=localhost/O=Client\ Certificate\ Test"`);
execa.shellSync(`openssl req -newkey rsa:4096 -keyout ${authDir}/Alice_key.pem -out ${authDir}/Alice_csr.pem -nodes -days 365 \
-subj "/CN=Alice"`);
execa.shellSync(`openssl x509 -req -in ${authDir}/Alice_csr.pem -CA ${authDir}/server_cert.pem -CAkey ${authDir}/server_key.pem \
-out ${authDir}/Alice_cert.pem -set_serial 01 -days 365`);
