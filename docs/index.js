import g       from './canvasapp.js';

document.title = "canvas app example";

// illustrate:
// window.location.assign(url)   // start game
// window.location.replace(url)  // load level
// window.history.back()         // exit to previous game

const splash_loop_frames     = g.frames([i_splash]);
const fullscreen_loop_frames = g.frames([i_fullscreen]);
const red_loop_frames        = g.frames([i_red]);
const red_opening_frames     = g.frames([i_red_1, i_red_2]);
const red_closing_frames     = g.frames([i_red_2, i_red_1]);

const splash_loop     = g.loop(splash_loop_frames, 11);
const fullscreen_loop = g.loop(fullscreen_loop_frames, 11);
const red_loop        = g.loop(red_loop_frames, 10);

const red_opening     = g.once(red_opening_frames, 10);
const red_closing     = g.once(red_closing_frames, 10);

const splash_fullscreen_touch = g.touch([g.circle(642, 360, 290)]);
const splash_windowed_touch   = g.touch([g.rect(0, 0, 1920, 720)]);
const fullscreen_touch        = g.touch([g.circle(1210, 73, 50)]);
const red_touch               = g.touch(g.rect(100, 100, 700, 325));

g.set_on_fullscreen(() => {
	fullscreen_loop.stop();
	fullscreen_touch.stop();
});

g.set_on_windowed(() => {
	fullscreen_loop.start();
	fullscreen_touch.start();		
});

const fullscreen = () => {
	if (g.fullscreen_enabled() && !g.fullscreen_active()) {
		fullscreen_touch.start();		
	}
};

const touches = () => {
	fullscreen();
	red_touch.start();
};

red_closing.starts(() => window.location.replace('red/'));

splash_fullscreen_touch.stops(splash_loop);
splash_windowed_touch.stops(splash_loop);
fullscreen_touch.stops(fullscreen_loop);
red_touch.stops(red_loop);

splash_fullscreen_touch.starts(s_tick, g.request_fullscreen);
splash_windowed_touch.starts(s_tick, fullscreen_loop, fullscreen_touch);
fullscreen_touch.starts(s_tick, g.request_fullscreen);
red_touch.starts(red_closing);

window.addEventListener('load', e => {
	red_loop.start();
	if (g.fullscreen_enabled()) {
		splash_loop.start();
		splash_fullscreen_touch.start();
		splash_windowed_touch.start();
	} else {
		touches();
	}
});
