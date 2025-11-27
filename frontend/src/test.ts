// src/test.ts

// Import Zone.js testing patches (must be first)
import "zone.js/testing";

import { getTestBed } from "@angular/core/testing";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from "@angular/platform-browser-dynamic/testing";

// Initialize the Angular testing environment
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Optionally, you can auto-load all spec files if using Karma
// const context = require.context('./', true, /\.spec\.ts$/);
// context.keys().forEach(context);
