import { Component } from "@angular/core";
import { SocketService } from "../../shared/socket.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-apod",
  template: `    
    <div class="ui-g-12">
      <h1>Apod</h1>
     {{maxDate}}
        <div class="ui-g-10 ui-g-offset-1">
            <p-calendar (ngModelChange)="onDateChanged($event)" [(ngModel)]="model" dateFormat="yy-mm-dd" [maxDate]="model" [readonlyInput]="true"></p-calendar>
        </div>
      
    </div>
    <div *ngIf="apod">
      <h2>{{apod.title}}</h2>
      {{apod.copyright}} {{apod.date}}<br/>
      <div *ngIf="apod.media_type == 'image'">
      <img class="ui-fluid" src="{{apod.hdurl}}">
      </div>
      <div *ngIf="apod.media_type == 'video'" class="video-container">
        <iframe width='420' height='315'
                [src]='safe_url'>
        </iframe>
      </div><br/>
      {{apod.explanation}}<br/>
      
    </div>
  `,
  styles: [
    `
      .video-container {
        position: relative;
        padding-bottom: 56.25%;
        padding-top: 35px;
        height: 0;
        overflow: hidden;
      }
      .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    `
  ]
})
export class ApodComponent {
  socket: any;
  apod: {};
  safe_url: any;
  model: Date;
  maxDate: string;
  constructor(private sanitizer: DomSanitizer) {
    let myDate = new Date();
    const myYear = myDate.getFullYear();
    console.log(myYear)
    const myMonth = myDate.getMonth() + 1;
    console.log(myMonth)
    const day = myDate.getDate();
    console.log(day)
    this.model = myDate;
    this.maxDate = this.model.getFullYear()+'-' + (this.model.getMonth()+1) + '-'+this.model.getDate()
    this.socket = SocketService.getInstance();
    this.socket.on("send apod", data => {
      this.apod = data;
      this.safe_url = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.apod["url"]
      );
    });

  if(this.maxDate){
    this.socket.emit("get apod", this.maxDate)
  }

  }
  onDateChanged(event): void {
    let myDate = new Date(event);
    const myYear = myDate.getFullYear();
    console.log(myYear)
    const myMonth = myDate.getMonth() + 1;
    console.log(myMonth)
    const day = myDate.getDate();
    console.log(day)
    this.model = myDate;
    if(this.model){
      this.socket.emit("get apod", this.model.getFullYear()+'-' + (this.model.getMonth()+1) + '-'+this.model.getDate());
    }
    
  }
}
