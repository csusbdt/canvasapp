import g       from './canvasapp.js';

document.title = "canvas app example";

// illustrate:
// window.location.assign(url)   // start game
// window.location.replace(url)  // load level
// window.history.back()         // exit to previous game

// fullscreen:
// respond to user exit/enter fullscreen

const sel_fullscreen_loop_frames = g.frames([i_fullscreen_select]);
const sel_fullscreen_once_frames = g.frames([i_fullscreen_select_1, i_fullscreen_select_2, i_fullscreen_select_3], 1/8);
const sel_fullscreen_loop        = g.loop(sel_fullscreen_loop_frames, 11);
const sel_fullscreen_once        = g.once(sel_fullscreen_once_frames, 11);
const sel_windowed_once          = g.once(sel_fullscreen_once_frames, 11);
const sel_fullscreen_touch       = g.touch([g.rect(192, 172, 1108, 488)]);
const sel_windowed_touch         = g.touch([g.rect(756, 550, 1222, 685)]);

sel_fullscreen_touch.stops(sel_fullscreen_loop).starts(s_blop, sel_fullscreen_once);
sel_windowed_touch.stops(sel_fullscreen_loop).starts(s_blop, sel_windowed_once);
sel_fullscreen_once.starts(g.request_fullscreen);

window.addEventListener('load', e => {
	if (g.fullscreen_enabled()) {
		sel_fullscreen_loop.start();
		sel_fullscreen_touch.start();
		sel_windowed_touch.start();
	}
});