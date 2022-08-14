import { Service } from 'node-windows';

var svc = new Service({
  name:'LA.Workstation.Sync',
  description: 'LA.Workstation.Sync',
  script: 'C:/_LA.Workstation/_LA.Workstation.Sync/server.js',
});

svc.uninstall();