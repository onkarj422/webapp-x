import { InjectionToken, NgModule } from '@angular/core';
import { BREAKPOINTS, DEFAULT_BREAKPOINTS } from '@angular/flex-layout';

const CUSTOM_BREAKPOINTS = [
  {
    alias: 'xs',
    suffix: 'Xs',
    mediaQuery: '(min-width: 0px) and (max-width: 470px)',
    overlapping: false
  },
  {
    alias: 'sm',
    suffix: 'Sm',
    mediaQuery: '(min-width: 470px) and (max-width: 768px)',
    overlapping: false
  }
];

export const BreakPointsProvider = {
  provide: BREAKPOINTS,
  useValue: [DEFAULT_BREAKPOINTS]
}

export const CustomBreakPointsProvider = {
  provide: BREAKPOINTS,
  useValue: [CUSTOM_BREAKPOINTS]
}

@NgModule({
  providers: [
    BreakPointsProvider,     // Supports developer overrides of list of known breakpoints
    CustomBreakPointsProvider
 // BreakPointRegistry,      // Registry of known/used BreakPoint(s)
 // MatchMedia,              // Low-level service to publish observables w/ window.matchMedia()
 // MediaMonitor,            // MediaQuery monitor service observes all known breakpoints
 // ObservableMediaProvider  // easy subscription injectable `media$` matchMedia observable
  ]
})
export class MyBreakPointsModule { }
