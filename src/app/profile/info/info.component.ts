import { Component, OnInit } from '@angular/core';
import { Info, User, UserService } from "../../services/user.service";
import { TokenService } from "../../services/token.service";
import { FormControl } from "@angular/forms";
import { AnnouncerService } from "../../services/announcer.service";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  providers: [AnnouncerService]
})
export class InfoComponent implements OnInit {
  userInfo: Info = {
    age: 0,
    sex: ''
  }

  user: User = {
    name: '',
    email: '',
    info: this.userInfo
  }

  newAge = new FormControl('');
  newSex = new FormControl('');
  history: string[] = [];

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private announcerService: AnnouncerService
  ) {
    announcerService.playlistCreated$.subscribe(
      playlist => {
        this.history.push(`User created ${playlist}`);
      }
    )
  }

  ngOnInit(): void {
    this.userService.getUserInfo()
      .then((info: Info) => {
        console.log(this.tokenService.getUserName());
        this.user = {
          name: this.tokenService.getUserName(),
          email: this.tokenService.getUserEmail(),
          info: info
        }
      }).catch(console.error);
  }

  updateUserInfo() {
    this.userService.updateUserInfo(this.newAge.value, this.newSex.value);
  }

}
