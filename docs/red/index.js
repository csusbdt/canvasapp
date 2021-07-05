import g            from '../canvasapp.js';
import start_exit   from '../scripts/exit.js';

document.title = "red level";

g.set_splash_image(i_splash);
g.set_fullscreen_image(i_fullscreen);
g.set_splash_shapes([g.circle(642, 360, 290)]);
g.set_fullscreen_shapes([g.circle(1210, 73, 50)]);

const door_closed_frames  = g.frames([i_door_0]);
const door_opening_frames = g.frames([i_door_1, i_door_2]);
const door_opened_frames  = g.frames([i_door_3]);
const door_closing_frames = g.frames([i_door_2, i_door_1]);
const door_closed         = g.loop(door_closed_frames);
const door_opened         = g.loop(door_opened_frames);
const door_opening        = g.once(door_opening_frames);
const door_closing        = g.once(door_closing_frames);
const door_open           = g.touch(g.rect(86, 149, 195, 270)).starts(g.sound(s_blop));
const door_close          = g.touch(g.rect(50, 159, 80, 336)).starts(g.sound(s_tick));
const start_door_touch = () => {
	if (door_closed.started() || door_closing.started()) {
		door_open.start();
	} else {
		door_close.start();
	} 
}

const blue_loop_frames    = g.frames([i_blue_0]);
const blue_opening_frames = g.frames([i_blue_2, i_blue_1], .088);
const blue_closing_frames = g.frames([i_blue_1, i_blue_2], .088);
const blue_loop    = g.loop(blue_loop_frames   , 10);
const blue_opening = g.once(blue_opening_frames, 10);
const blue_closing = g.once(blue_closing_frames, 10);
const blue_replace = () => window.location.replace('../blue/');
const blue_blop    = g.sound(s_blop);
const blue_touch   = g.touch(g.circle(585, 330, 190));

const start_touches = () => {
	blue_touch.start();
	start_door_touch();
};

door_open.stops(door_closed).starts(door_opening);
door_close.stops(door_opened).starts(door_closing);
door_opening.starts(door_opened, start_touches);
door_closing.starts(door_closed, start_touches);

blue_opening.starts(blue_loop, start_touches);
blue_touch.stops(blue_loop).starts(blue_blop, blue_closing);
blue_blop.starts(blue_replace);

window.addEventListener('load', e => {
	localStorage.setItem('current_level', 'red');
	start_exit();
	blue_opening.start();
	door_closed.start();
});
