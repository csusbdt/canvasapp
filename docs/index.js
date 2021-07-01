import g            from './canvasapp.js';
import start_splash from './splash.js';

document.title = "canvas app example";

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
