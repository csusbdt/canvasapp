import g       from './../canvasapp.js';

document.title = "red";

//#region fullscreen

const splash_loop_frames      = g.frames([i_splash]);
const fullscreen_loop_frames  = g.frames([i_fullscreen]);
const splash_loop             = g.loop(splash_loop_frames, 11);
const fullscreen_loop         = g.loop(fullscreen_loop_frames, 11);
const splash_fullscreen_touch = g.touch([g.circle(642, 360, 290)]).make_independent();
const splash_windowed_touch   = g.touch([g.rect(0, 0, 1920, 720)]).make_independent();
const fullscreen_touch        = g.touch([g.circle(1210, 73, 50)]).make_independent();
function start_fullscreen() {
	fullscreen_loop.start();
	fullscreen_touch.start();
}
function stop_fullscreen() {
	fullscreen_loop.stop();
	fullscreen_touch.stop();
}
g.set_on_fullscreen(stop_fullscreen);
g.set_on_windowed(start_fullscreen);
splash_fullscreen_touch.stops(splash_loop, splash_windowed_touch);
splash_windowed_touch.stops(splash_loop, splash_fullscreen_touch);
fullscreen_touch.stops(fullscreen_loop);
splash_fullscreen_touch.starts(s_tick, g.request_fullscreen);
splash_windowed_touch.starts(s_tick, start_fullscreen);
fullscreen_touch.starts(s_tick, g.request_fullscreen);
function start_splash() {
	if (g.fullscreen_enabled()) {
		splash_loop.start();
		splash_fullscreen_touch.start();
		splash_windowed_touch.start();
	}
}

//#endregion

const blue_loop_frames        = g.frames([i_blue]);
const blue_opening_frames     = g.frames([i_blue_2, i_blue_1]);
const blue_closing_frames     = g.frames([i_blue_1, i_blue_2]);

const blue_loop        = g.loop(blue_loop_frames, 10);

const blue_opening     = g.once(blue_opening_frames, 10);
const blue_closing     = g.once(blue_closing_frames, 10);

const blue_touch       = g.touch(g.circle(585, 330, 190));

const touches = () => {
	blue_touch.start();
};

blue_closing.starts(() => window.location.replace('../'));

blue_touch.stops(blue_loop);

blue_touch.starts(s_blop, blue_closing);

window.addEventListener('load', e => {
	start_splash();
	blue_loop.start();
	touches();
});
