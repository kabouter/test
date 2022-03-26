import $ from 'dom7';
import Framework7, { getDevice } from 'framework7/bundle';

// Import F7 Styles
import 'framework7/framework7-bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';

// Import Capacitor APIs
import capacitorApp from './capacitor-app.js';
// Import Routes
import routes from './routes.js';
// Import Store
import store from './store.js';

// Import main app component
import App from '../app.f7';
// load Geolocation
import { Geolocation } from '@capacitor/geolocation';
var device = getDevice();
var app = new Framework7({
  name: 'My App', // App name
  theme: 'auto', // Automatic theme detection
  el: '#app', // App root element
  component: App, // App main component
  id: 'io.framework7.myapp', // App bundle ID
  // App store
  store: store,
  // App routes
  routes: routes,

  // Input settings
  input: {
    scrollIntoViewOnFocus: device.capacitor,
    scrollIntoViewCentered: device.capacitor,
  },
  // Capacitor Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.capacitor) {
        // Init capacitor APIs (see capacitor-app.js)
        capacitorApp.init(f7);
      }
     
    },
    pageInit: function (page) {
      // do something on page init
//console.log(page.name);
    

    
      if (page.name == 'home') {
       
        
       
        $('#gpsaankomst').on('click', () => {
          checkPermissions();
        

        });}}
  },
});


// requestPermissions
async function requestPermissions() {
  const permResult = await Geolocation.requestPermissions().catch(err => {
    console.error(err);
  });

}


// get location and alert the latitude
const printCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition().catch(err => {
    console.error(err);
  });

  alert('Current position:', coordinates.coords.latitude);
};

// checkPermissions, if necessary ask Permissions and get CurrentPosition
function checkPermissions() {

  Geolocation.checkPermissions().then(data => { 
if(data.location =='prompt' || data.location =='prompt-with-rationale' ){
  console.log(data.location);
  requestPermissions();

} else if (data.location =='granted') {
  console.log('granted ? ' +data.location);
  printCurrentPosition()
} else {
  console.log(data.location);
  alert('You didnt give permission to use your location.');
  requestPermissions();
}


}).catch(err => {
  console.error(err);
});

}