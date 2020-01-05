import { Component, OnInit } from '@angular/core';
import { CocktailServiceService } from '../cocktail-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {SMS} from '@ionic-native/sms/ngx';
import {AlertController} from '@ionic/angular';
@Component({
  selector: 'app-drink',
  templateUrl: './drink.page.html',
  styleUrls: ['./drink.page.scss'],
})
export class DrinkPage implements OnInit {

  drinksData: any;
  data: any;
  location: any;
  value: any;
  selectedIng: Array<any> = [];
  drinks;
  glasses;

    // tslint:disable-next-line:max-line-length
  constructor(public cocktailServiceService: CocktailServiceService, private route: ActivatedRoute, private router: Router, private geolocation: Geolocation, private sms: SMS, public alertController: AlertController ) {
    this.drinksData = [];
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.telnumber;
        this.value = this.router.getCurrentNavigation().extras.state.value;
      }
    });
  }

  ngOnInit() {
    this.getAllDrinks();
    console.log(this.data);
    console.log(this.value);
    this.selectedIng.length = this.value;
    console.log(this.selectedIng.length);
  }
  glasscocktail() {
      this.glasses = 'Cocktail';
  }
  glassmartini() {
      this.glasses = 'Martini';
  }
  glasshanukkah() {
      this.glasses = 'Hanukkah';
  }
  glasswine() {
      this.glasses = 'Wine';
  }
  drink() {
      if (this.value === 0) {
          console.log('error');
          this.presentAlert();
      } else {
          this.selectedIng.push(this.drinks);
          this.value--;
          console.log(this.value);
          console.log(this.selectedIng);
      }
  }
    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Alert',
            subHeader: '',
            message: 'Time to call for help',
            buttons: ['OK']
        });

        await alert.present();
    }
    async presentAlert2() {
        const alert = await this.alertController.create({
            header: 'Alert',
            subHeader: '',
            message: 'The Event has been Deleted',
            buttons: ['OK']
        });

        await alert.present();
    }
    dustbin() {
      this.presentAlert2().then(r => this.router.navigateByUrl('/home')
    );
      console.log('in dustbin');
    }
  getAllDrinks() {
    this.cocktailServiceService.getList().subscribe(response => {
      // console.log(response);
      this.drinksData = response.drinks;
    });
  }
  Needhelp() {
      this.getlocation();
  }
  getlocation() {
      const options = {timeout: 15000, enableHighAccuracy: true};
      this.geolocation.getCurrentPosition(options).then((resp) => {
          this.location = '@' + resp.coords.latitude.toString() + ',' + resp.coords.longitude.toString() + ',14z';
          console.log('Resp Location ' + this.location);
          this.sendsms(this.data);
          console.log('inNeedHelp()');
      }).catch((error) => {
          console.log('Error getting location', error);
      });
  }
  sendsms(data) {
      const options = {
          replaceLineBreaks: false
      };
      const message = 'Need help. I am at https://www.google.com/maps/' + this.location.toString();

      // tslint:disable-next-line:only-arrow-functions
      const success = function() { alert('Message sent successfully'); };
      // tslint:disable-next-line:only-arrow-functions
      const error = function(e) { alert('Message Failed:' + e); };
      // @ts-ignore
      this.sms.send(data, message, options, success, error);
  }
}
