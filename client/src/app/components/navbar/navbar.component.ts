import { Component, ViewChild, ElementRef } from "@angular/core";
import { MenuItem } from "primeng/api";
import { PanelMenu, BasePanelMenuItem } from "primeng/panelmenu";
import { SharedService } from "../../shared/shared.service";
import { Subscription } from "rxjs";

@Component({
  moduleId: module.id,
  selector: "app-navbar",
  templateUrl: "navbar.component.html"
})
export class NavbarComponent {
  items: MenuItem[];
  private _subTitle: string;
  private _subscription: Subscription;
  @ViewChild('el') el: PanelMenu;
  constructor(private _sharedService: SharedService) {
    
  }
  ngOnInit(){
    this._subscription = this._sharedService.subTitleObservable$
    .subscribe((sub) => {
      this._subTitle = sub;
      this.items[0].title = this._subTitle;
      console.log(this.items)
    })

    this.items = [
      {
        label: "Node-Bowshock",
        title: '',
        items: [
          {
            label: "Home",
            routerLink: ["/"],
            routerLinkActiveOptions: {exact: true},
            command: (event: any) => {
              console.log(this.el);
              this.el.model[0].expanded = false;
            }
          },
          {
            label: "APOD",
            routerLink: ["/apod"],
            command: (event: any) => {
              this.el.model[0].expanded = false;
            }
          },
          {
            label: "EVA",
            routerLink: ["/eva"],
            command: (event: any) => {
              this.el.model[0].expanded = false;
            }
          },
          {
            label: "DONKI",
            items: [
              {
                label: "CME",
                routerLink: ["/donki/cme"],
                command: (event: any) => {
                  this.el.model[0].expanded = false;
                }
              },
              {
                label: "CMEA",
                routerLink: ["/donki/cmea"],
                command: (event: any) => {
                  this.el.model[0].expanded = false;
                }
              },
              {
                label: "FLR",
                routerLink: ["/donki/flr"],
                command: (event: any) => {
                  this.el.model[0].expanded = false;
                }
              },
              {
                label: "GST",
                routerLink: ["/donki/gst"],
                command: (event: any) => {
                  this.el.model[0].expanded = false;
                }
              },
              {
                label: "HSS",
                routerLink: ["/donki/hss"],
                command: (event: any) => {
                  this.el.model[0].expanded = false;
                }
              },
              {
                label: "IPS",
                routerLink: ["/donki/ips"],
                command: (event: any) => {
                  this.el.model[0].expanded = false;
                }
              },
              {
                label: "MPC",
                routerLink: ["/donki/mpc"],
                command: (event: any) => {
                  this.el.model[0].expanded = false;
                }
              },
              {
                label: "RBE",
                routerLink: ["/donki/rbe"],
                command: (event: any) => {
                  this.el.model[0].expanded = false;
                }
              },
              {
                label: "SEP",
                routerLink: ["/donki/sep"],
                command: (event: any) => {
                  this.el.model[0].expanded = false;
                }
              },
              {
                label: "WSASim",
                routerLink: ["/donki/wsasim"],
                command: (event: any) => {
                  this.el.model[0].expanded = false;
                }
              },
              {
                label: "Notifications",
                routerLink: ["/donki/notifications"],
                command: (event: any) => {
                  this.el.model[0].expanded = false;
                }
              },
            ]
          },
          {
            label: "Mars",
            items: [
              {
                label: "Curiosity",
                routerLink: ["/mars/curiosity"],
                command: (event: any) => {
                  this.el.model[0].expanded = false;
                }
              },
              {
                label: "Opportunity",
                routerLink: ["/mars/opportunity"],
                command: (event: any) => {
                  this.el.model[0].expanded = false;
                }
              },
              {
                label: "Spirit",
                routerLink: ["/mars/spirit"],
                command: (event: any) => {
                  this.el.model[0].expanded = false;
                }
              },
              {
                label: "Manifest",
                routerLink: ["/mars/manifest"],
                command: (event: any) => {
                  this.el.model[0].expanded = false;
                }
              },
            ]
          },
          {
            label: "NEOWS",
            items: [
              {
                label: "Today",
                routerLink: ["/neows/today"],
                command: (event: any) => {
                  this.el.model[0].expanded = false;
                }
              },
              {
                label: "Feed",
                routerLink: ["/neows/feed"],
                command: (event: any) => {
                  this.el.model[0].expanded = false;
                }
              }
            ]
          }
        ],
      }
    ];
  }
  ngOnDestroy(){
    this._subscription.unsubscribe();
  }
}
