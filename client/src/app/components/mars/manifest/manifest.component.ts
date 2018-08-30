import { Component } from '@angular/core';
import {SocketService} from '../../../shared/socket.service';
import {SelectItem} from 'primeng/api';
@Component({
  selector: 'app-manifest',
  template: `
  <h1 class="ui-g ui-g-offset-5">Manifest</h1>
  <div class="ui-g ui-fluid">
    <div class="ui-g-12">
        <div class="ui-inputgroup">
        <p-dropdown [options]="rovers" [(ngModel)]="selectedRover" (onChange)="roverSelected(selectedRover)"></p-dropdown>        
        </div>
        <div class="ui-inputgroup">
    <span class="ui-inputgroup-addon"><i class="fa fa-user"></i></span>
    <input type="number" pInputText placeholder="Sol" max="manifest.photos.length - 1">         
</div>

    </div>
    <div *ngIf="manifest">
    <ul>
    <li>Rover: {{manifest.name}}</li>
    <li>Landing Date: {{manifest.landing_date}}</li>
    <li>Launch Date: {{manifest.launch_date}}</li>
    <li>Status: {{manifest.status}}</li>
    <li>Max Sol: {{manifest.max_sol}}</li>
    <li>Max Date: {{manifest.max_date}}</li>
    <li>Total Photos: {{manifest.total_photos}}</li>
    </ul>
    
  <div *ngFor="let item of manifest.photos">
  Photos:
  <li>Sol: {{item.sol}}</li>
  <li>Earth Date: {{item.earth_date}}</li>
  <li>Total Photos: {{item.total_photos}}</li>
  <div class="ui-inputgroup">
        <p-dropdown [options]="item.cameras" [(ngModel)]="selectedCamera" (onChange)="cameraSelected(selectedCamera)"></p-dropdown>        
        </div>
 Cameras:
 <div class="ui-g-12" *ngFor="let camera of item.cameras">
 <li>{{camera}}</li>
 </div>
 </div>
    </div>

    
 
  </div>
    
    
  `
})
export class ManifestComponent {
  socket: any;
  manifest;
  selectedRover;
  selectedCamera;
  cameras;
  rovers: SelectItem[];
  constructor() {
    this.socket = SocketService.getInstance();
    this.rovers = [
        {label:'Select Rover', value:null},
            {label: 'Curiosity', value: 'curiosity'},
            {label: 'Opportunity', value: 'opportunity'},
            {label: 'Spirit', value: 'spirit'},
    ]
    this.cameras = [
      {label:'Select Camera', value:null}
          
  ]
  if(this.manifest){
    this.manifest.photos.forEach((photo) => {
      photo.cameras.forEach((camera) => {
        this.cameras.push({label: camera, value: camera})
      })
    })
    
  }
  
    this.socket.on('send manifest', (manifest) => {
      this.manifest = manifest.photo_manifest;
    });
    
  }
  
  roverSelected(selectedRover): void {
    this.socket.emit('get manifest', selectedRover )
  }


}
