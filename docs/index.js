import g       from './canvasapp.js';

document.title = "canvas app example";

// illustrate:
// window.location.assign(url)   // start game
// window.location.replace(url)  // load level
// window.history.back()         // exit to previous game

// fullscreen:
// respond to user exit/enter fullscreen

//#region splash screen

const splash_screen_loop_frames   = g.frames([i_splash_screen]);
const splash_screen_once_frames   = g.frames([i_splash_screen_1, i_splash_screen_2, i_splash_screen_3], 1/8);
const splash_screen_loop          = g.loop(splash_screen_loop_frames, 11);
const splash_fullscreen_once      = g.once(splash_screen_once_frames, 11);
const splash_windowed_once        = g.once(splash_screen_once_frames, 11);
const splash_fullscreen_touch     = g.touch([g.rect(192, 172, 1108, 488)]);
const splash_windowed_touch       = g.touch([g.rect(756, 550, 1222, 685)]);
splash_fullscreen_touch.stops(splash_screen_loop).starts(s_blop, splash_fullscreen_once);
splash_windowed_touch.stops(splash_screen_loop).starts(s_blop, splash_windowed_once);
splash_fullscreen_once.starts(g.request_fullscreen);

//#endregion

//#region fullscreen toggle

const fullscreen_loop_frames   = g.frames([i_fullscreen]);
const fullscreen_once_frames   = g.frames([i_fullscreen_1, i_fullscreen_2, i_fullscreen_3], 1/8);
const fullscreen_loop          = g.loop(fullscreen_loop_frames, 11);
const fullscreen_once          = g.once(fullscreen_once_frames, 11);
const fullscreen_touch         = g.touch([g.circle(1202, 75, 50)]);
fullscreen_touch.stops(fullscreen_loop).starts(s_blop, fullscreen_once);
splash_windowed_once.starts(fullscreen_loop, fullscreen_touch);

const windowed_loop_frames   = g.frames([i_windowed]);
const windowed_once_frames   = g.frames([i_windowed_1, i_windowed_2, i_windowed_3], 1/8);
const windowed_loop          = g.loop(windowed_loop_frames, 11);
const windowed_once          = g.once(windowed_once_frames, 11);
const windowed_touch         = g.touch([g.rect(1150, 38, 1250, 100)]);
windowed_touch.stops(windowed_loop).starts(s_blop, windowed_once);
splash_fullscreen_once.starts(windowed_loop, windowed_touch);

//#endregion

window.addEventListener('load', e => {
	if (g.fullscreen_enabled()) {
		splash_screen_loop.start();
		splash_fullscreen_touch.start();
		splash_windowed_touch.start();
	}
});
