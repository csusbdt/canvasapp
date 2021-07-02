import g            from './canvasapp.js';
import start_splash from './splash.js';
import start_exit   from './exit.js';

document.title = "canvas app example";

const red_loop_frames    = g.frames([i_red]);
const red_opening_frames = g.frames([i_red_2, i_red_1]);
const red_closing_frames = g.frames([i_red_1, i_red_2]);
const red_loop    = g.loop(red_loop_frames   , 10);
const red_opening = g.once(red_opening_frames, 10);
const red_closing = g.once(red_closing_frames, 10);
const red_delay   = g.delay(.01);
const red_replace = () => window.location.replace('red/');
const red_blop    = g.sound(s_blop);
const red_touch   = g.touch(g.rect(340, 230, 933, 453));

red_opening.starts(red_loop, red_touch);
red_touch.stops(red_loop).starts(red_blop, red_closing);
red_blop.starts(red_replace);
red_closing.starts(red_delay);

const touches = () => {
	red_touch.start();
};

window.addEventListener('load', e => {
	start_splash(start_exit, red_opening, touches);
});
