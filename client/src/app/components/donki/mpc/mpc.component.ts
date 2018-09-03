import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-mpc',
  templateUrl: 'mpc.component.html'
})
export class MPCComponent {
  socket: any;
  mpc;
  constructor(private _sharedService: SharedService) {
  }

  ngOnInit() {
    this._sharedService.subTitleSubject$.next('Space Weather Database Of Notifications, Knowledge, Information/Magnetopause Crossing')
    this.socket = SocketService.getInstance();

    this.socket.on("send mpc", mpc => {
      this.mpc = mpc;
    });

    this.socket.emit('get mpc');
  }
}