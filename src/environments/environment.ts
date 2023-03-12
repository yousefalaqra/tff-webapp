// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: 'http://localhost:3000/api/v1/',
  serverUrl: 'http://localhost:3000',
  auth_api: 'http://localhost:3000/auth/v1/',
  // firebase: {
  //   apiKey: "AIzaSyC_Vtwd_Rbt3V2S8JtWoE0RB7byJbd53Qw",
  //   authDomain: "fragranceday-de253.firebaseapp.com",
  //   projectId: "fragranceday-de253",
  //   storageBucket: "fragranceday-de253.appspot.com",
  //   messagingSenderId: "91212812812",
  //   appId: "1:91212812812:web:4e21f28d977dbbbf521429",
  //   measurementId: 'G-8SV699EYR7',
  // },
  recaptcha: {
    siteKey: '6LdzLewkAAAAALrQbIoBHKPR2-HlIhRvbcM9eK-j',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
