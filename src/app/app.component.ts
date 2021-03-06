import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService} from '@ngx-translate/core';
import { Network } from '@ionic-native/network';
import { HelperProvider } from '../providers/helper/helper';



import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
   pages:any[]=[
   {title:'PRIVACY_POLICY', component:'PrivacyPolicyPage', icon:'lock'},
    {title:'CONTACT_US', component:'ContactUsPage', icon:'mail'}
  ]
  rootPage: any = HomePage;
  constructor(
    public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, private translate: TranslateService,
    private network:Network, private helper:HelperProvider
   ) {
    this.initializeApp();


  }

  initializeApp() {
    this.platform.ready().then(() => {
    this.statusBar.styleDefault();
    this.statusBar.overlaysWebView(false);
    this.helper.changeConnection((this.network.type != "none"));
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
        // this language will be used as a fallback when a translation isn't found in the current language
      this.translate.setDefaultLang('ar');
         // the lang to use, if the lang isn't available, it will use the current loader to get them
      this.translate.use('ar');
      this.network.onDisconnect().subscribe((data) => {
          this.helper.changeConnection(false);
      });

      this.network.onConnect().subscribe((data) => {
          this.helper.changeConnection(true);
        });

      this.splashScreen.hide();
    });
  }

    openPage(page) {
     this.nav.push(page.component);
  }

}
