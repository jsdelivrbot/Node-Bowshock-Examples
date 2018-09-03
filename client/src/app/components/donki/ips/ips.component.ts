import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-ips',
  templateUrl: 'ips.component.html'
})
export class IPSComponent {
  socket: any;
  ips;
  constructor(private _sharedService: SharedService) {
  }

  ngOnInit() {
    this._sharedService.subTitleSubject$.next('Space Weather Database Of Notifications, Knowledge, Information/Interplanetary Shock')
    this.socket = SocketService.getInstance();

    this.socket.on("send ips", ips => {
      this.ips = ips;
    });

    this.socket.emit('get ips');
  }
}