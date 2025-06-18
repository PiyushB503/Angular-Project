import 'zone.js';  // Included with Angular CLI.
import { getTestBed } from '@angular/core/testing';
import { App } from './app/app';
import { BrowserDynamicTestingModule, } from '@angular/platform-browser-dynamic/testing';
// Test environment setup
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Bootstrap Angular tests
const appModule = App;
function platformBrowserDynamicTesting(): import("@angular/core").PlatformRef {
    throw new Error('Function not implemented.');
}