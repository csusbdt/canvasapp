import g       from './canvasapp.js';

document.title = "canvas app example";

// illustrate:
// window.location.assign(url)   // start game
// window.location.replace(url)  // load level
// window.history.back()         // exit to previous game

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
function start_splash(...start_set) {
	if (g.fullscreen_enabled()) {
		splash_loop.start();
		splash_fullscreen_touch.start();
		splash_windowed_touch.start();
		start_set.forEach(o => {
			splash_fullscreen_touch.starts(o);
			splash_windowed_touch.starts(o);	
		});
	} else {
		start_set.forEach(o => o.start());
	}
}

//#endregion

const exit_loop_frames    = g.frames([i_exit]);
const exit_opening_frames = g.frames([i_exit_2, i_exit_1]);
const exit_closing_frames = g.frames([i_exit_1, i_exit_2]);

const exit_loop        = g.loop(exit_loop_frames, 10);

const exit_opening     = g.once(exit_opening_frames, 10);
const exit_closing     = g.once(exit_closing_frames, 10);

const exit_touch       = g.touch(g.rect(0, 0, 222, 126));

exit_closing.starts(() => window.location.assign('home.html'));

exit_touch.stops(exit_loop);

exit_touch.starts(s_blop, exit_closing);

const red_loop_frames        = g.frames([i_red]);
const red_opening_frames     = g.frames([i_red_2, i_red_1]);
const red_closing_frames     = g.frames([i_red_1, i_red_2]);

const red_loop        = g.loop(red_loop_frames, 10);

const red_opening     = g.once(red_opening_frames, 10);
const red_closing     = g.once(red_closing_frames, 10);

const red_touch       = g.touch(g.rect(340, 230, 933, 453));

red_closing.starts(() => window.location.replace('red/'));

red_touch.stops(red_loop);

red_touch.starts(s_blop, red_closing);

const touches = () => {
	exit_touch.start();
	red_touch.start();
};

window.addEventListener('load', e => {
	start_splash(exit_loop, red_loop, touches);
});
