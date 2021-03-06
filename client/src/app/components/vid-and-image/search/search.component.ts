import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { SocketService } from '../../../shared/socket.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
@Component({
	selector: 'app-search',
	templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
	socket: any;
	isLoading: boolean;
	media;
	model = 'apollo';
	hrefs = [];
	srts = [];
	mp4s = [];
	mp4;
	pngs = [];
	jsons = [];
	m4as = [];
	jsonData;
	constructor(
		private _sharedService: SharedService,
		private _http: HttpClient
	) {}

	ngOnInit() {
		this._sharedService.subTitleSubject$.next('Image and Video Search');
		this.socket = SocketService.getInstance();
		this.socket.on('send media', media => {
			this.media = media.collection;
			this.media.items.forEach(med => {
				this.hrefs.push(med.href);
			});
			this.hrefs.forEach(href => {
				this._http
					.get(href)
					.pipe()
					.subscribe(data => {
						this.srts.push(data);
						if (this.srts[0]) {
							this.srts.forEach(srt => {
								srt.forEach((url, i) => {
									if (
										url.slice(-3) == 'mp4' &&
										url.slice(-10) == 'medium.mp4'
									) {
										if (!this.mp4s.includes(url)) {
											this.mp4s.push(url);
										}
									}

									if (
										url.slice(-3) == 'png' ||
										(url.slice(-3) == 'jpg' &&
											url.slice(-10).split('.')[0] ==
												'medium')
									) {
										if (!this.pngs.includes(url)) {
											this.pngs.push(url);
										}
									}

									if (
										url.slice(-3) == 'm4a' &&
										url.slice(-8) == '128k.m4a'
									) {
										if (!this.m4as.includes(url)) {
											this.m4as.push(url);
										}
									}
									if (url.slice(-4) == 'json') {
										if (!this.jsons.includes(url)) {
											this.jsons.push(url);
										}
									}
								});
							});
						}
					});
			});

			let mp4s = of(this.mp4s);

			mp4s.subscribe(data => {
				this.mp4s = data;
				this.isLoading = false;
			});
		});
	}
	getData() {
		this.isLoading = true;
		this.jsons = [];
		this.mp4s = [];
		this.pngs = [];
		this.media = [];
		this.hrefs = [];
		this.srts = [];
		this.m4as = [];
		this.socket.emit('get media', { q: this.model });
	}

	getJson(url) {
		return this._http.get(url).subscribe(data => {
			this.jsonData = data;
		});
	}
}
