import g            from './../canvasapp.js';
import start_splash from './../splash.js';
import start_exit   from './../exit.js';

document.title = "red";

const blue_loop_frames    = g.frames([i_blue]);
const blue_opening_frames = g.frames([i_blue_2, i_blue_1]);
const blue_closing_frames = g.frames([i_blue_1, i_blue_2]);

const blue_loop = g.loop(blue_loop_frames, 10);

const blue_opening = g.once(blue_opening_frames, 10);
const blue_closing = g.once(blue_closing_frames, 10);

const blue_touch = g.touch(g.circle(585, 330, 190));

blue_opening.starts(blue_loop, blue_touch);
blue_closing.starts(g.delay(.01).starts(() => window.location.replace('../')));

blue_touch.stops(blue_loop);

blue_touch.starts(s_blop, blue_closing);

window.addEventListener('load', e => {
	start_splash(start_exit, blue_opening);
});
