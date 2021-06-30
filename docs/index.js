import g       from './canvasapp.js';

document.title = "canvas app example";

// illustrate:
// window.location.assign(url)   // start game
// window.location.replace(url)  // load level
// window.history.back()         // exit to previous game

// fullscreen:
// respond to user exit/enter fullscreen

//#region fullscreen

const splash_loop_frames     = g.frames([i_splash]);
const fullscreen_loop_frames = g.frames([i_fullscreen]);
const windowed_loop_frames   = g.frames([i_windowed]);

const splash_closing_frames     = g.frames([i_splash_1, i_splash_2, i_splash_3], 1/8);
const fullscreen_closing_frames = g.frames([i_fullscreen_1, i_fullscreen_2, i_fullscreen_3], 1/8);
const windowed_closing_frames   = g.frames([i_windowed_1, i_windowed_2, i_windowed_3], 1/8);

const splash_loop     = g.loop(splash_loop_frames, 11);
const fullscreen_loop = g.loop(fullscreen_loop_frames, 11);
const windowed_loop   = g.loop(windowed_loop_frames, 11);

const splash_fullscreen_closing = g.once(splash_closing_frames, 11);
const splash_windowed_closing   = g.once(splash_closing_frames, 11);
const fullscreen_closing        = g.once(fullscreen_closing_frames, 11);
const windowed_closing          = g.once(windowed_closing_frames, 11);

const splash_fullscreen_touch = g.touch([g.rect(192, 172, 1108, 488)]);
const splash_windowed_touch   = g.touch([g.rect(756, 550, 1222, 685)]);
const fullscreen_touch        = g.touch([g.circle(1202, 75, 50)]);
const windowed_touch          = g.touch([g.rect(1150, 38, 1250, 100)]);

const touches = () => {
	if (g.fullscreen_enabled()) {
		if (fullscreen_loop.started()) {
			fullscreen_touch.start();		
		} else {
			windowed_touch.start();		
		}	
	}
};

splash_fullscreen_touch.stops(splash_loop);
splash_windowed_touch.stops(splash_loop);
fullscreen_touch.stops(fullscreen_loop);
windowed_touch.stops(windowed_loop);

splash_fullscreen_touch.starts(s_blop, splash_fullscreen_closing);
splash_windowed_touch.starts(s_blop, splash_windowed_closing);
fullscreen_touch.starts(s_blop, fullscreen_closing);
windowed_touch.starts(s_blop, windowed_closing);

splash_fullscreen_closing.starts(g.request_fullscreen, windowed_loop, touches);
splash_windowed_closing.starts(fullscreen_loop, touches);
fullscreen_closing.starts(g.request_fullscreen, windowed_loop, touches);
windowed_closing.starts(g.exit_fullscreen, fullscreen_loop, touches);

//#endregion

window.addEventListener('load', e => {
	if (g.fullscreen_enabled()) {
		splash_loop.start();
		splash_fullscreen_touch.start();
		splash_windowed_touch.start();
	}
});
