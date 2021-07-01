import g       from './../canvasapp.js';

document.title = "red";

//#region fullscreen

const splash_loop_frames     = g.frames([i_splash]);
const fullscreen_loop_frames = g.frames([i_fullscreen]);

const splash_loop     = g.loop(splash_loop_frames, 11);
const fullscreen_loop = g.loop(fullscreen_loop_frames, 11);

const splash_fullscreen_touch = g.touch([g.circle(642, 360, 290)]);
const splash_windowed_touch   = g.touch([g.rect(0, 0, 1920, 720)]);
const fullscreen_touch        = g.touch([g.circle(1210, 73, 50)]);

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
	// other touches
};

splash_fullscreen_touch.stops(splash_loop).starts(s_tick, g.request_fullscreen, touches);
splash_windowed_touch.stops(splash_loop).starts(s_tick, fullscreen_loop, touches);
fullscreen_touch.stops(fullscreen_loop).starts(s_tick, g.request_fullscreen, touches);

//#endregion

window.addEventListener('load', e => {
	if (g.fullscreen_enabled()) {
		splash_loop.start();
		splash_fullscreen_touch.start();
		splash_windowed_touch.start();
	} else {
		touches();
	}
});
