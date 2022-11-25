Missions: Rune Trials

//Question 1
//The function mirror shows a rune next to its mirror image.

function mirror(rune) {
    return beside(rune, flip_horiz(rune));
}


/*The function more_love takes a rune as
argument and returns a rune that shows
it next to a red heart.*/


function more_love(rune) {
    return beside(rune, red(heart));
}

show(more_love(mirror(sail)));

//Question 2
/*
The function mosaic arranges 4 runes in a 2 by 2 square,
starting from the top-right corner and going clockwise.
*/
function mosaic(r1, r2, r3, r4) {
    return beside(stack(r4,r3),stack(r1,r2));
}

// Test
show(mosaic(rcross, sail, corner, nova));

//Question 3
/*
The function mosaic arranges 4 runes in a 2 by 2 square,
starting from the top-right corner and going clockwise.
*/
function mosaic(r1, r2, r3, r4) {
    return beside(stack(r4,r3),stack(r1,r2));
}

/* The function upside_down_mosaic creates a mosaic that 
is rotated 180 degrees.
*/
function upside_down_mosaic(r1, r2, r3, r4) {
    return turn_upside_down(mosaic(r1,r2,r3,r4));
}

// Test
show(upside_down_mosaic(rcross, sail, corner, nova));

//Question 4
/*
The function mosaic arranges 4 runes in a 2 by 2 square,
starting from the top-right corner and going clockwise.
*/
function mosaic(r1, r2, r3, r4) {
    return beside(stack(r4,r3),stack(r1,r2));
}

/* 
The function transform_mosaic takes in 4 runes and a 
transformation function. It returns the transformed mosaic
of these 4 runes.
*/
function transform_mosaic(r1, r2, r3, r4, transform) {
    return transform(mosaic(r1,r2,r3,r4));
}

// Test
show(transform_mosaic(rcross, sail, corner, nova, make_cross));

----------------------------------------------------------------------------------------------------

Missions: Rune Reading

//Question 1
function fractal(pic, n) {
    return n===1
    ? pic
    : beside_frac(0.5,pic,fractal(stack(pic,pic),n-1));
}

// Test
show(fractal(make_cross(rcross), 5));

//Question 2
function hook(frac) {
    return stack(square,beside_frac(1-frac,blank,square));
}

// Test
show(hook(1/5));

//Question 3
function hook(frac) {
    return stack(square,beside_frac(1-frac,blank,square));
}

function spiral(thickness, depth) {
    return depth===0
           ? blank
           : stack_frac(thickness,hook(0.5*thickness),quarter_turn_right(spiral(thickness,depth-1)));
}


// Test
show(spiral(1/5,20));

----------------------------------------------------------------------------------------------------

Missions: Beyond the Second Dimension

//Question 1
function mosaic(r1, r2, r3, r4) {

    return beside(stack(r4, r3), stack(r1, r2));

}



function steps(r1, r2, r3, r4) {

    return overlay(

        overlay(

            mosaic(blank, blank, blank, r4),

            mosaic(blank, blank, r3, blank)

        ),

        overlay(

            mosaic(blank, r2, blank, blank),

            mosaic(r1, blank, blank, blank))

    );

}



// Tests

show(steps(rcross, triangle, corner, nova));

hollusion(steps(rcross, triangle, corner, nova));

anaglyph(steps(rcross, triangle, corner, nova));

//Question 2
function cone(n, rune) {

    return n === 1 

        ? rune

        : overlay_frac(1 - 1 / n,

            cone(n - 1, scale(1 - 1 / n, rune)),

            rune

        );

}



// Tests

show(cone(4, circle));

hollusion(cone(15, circle));

----------------------------------------------------------------------------------------------------

Missions: Curve Introduction

//Question 1
// Part 1
// unit_line_at : (Number)->Curve

// Part 2
function vertical_line(pt, length) {
    return t => make_point(x_of(pt),length * t + y_of(pt));
}


// Part 3
// vertical_line: (Point,Number)->Curve

// Part 4
draw_connected(100)(vertical_line(make_point(0.5,0.25),0.5));

//Question 2
function three_quarters(pt) {

  return (t) =>

    make_point(

      math_cos(1.5 * math_PI * t) + x_of(pt),

      math_sin(1.5 * math_PI * t) + y_of(pt)

    );

}



// Test

draw_connected_full_view_proportional(200)(

  three_quarters(make_point(0.5, 0.25))

);



//Question 3
function s_generator(pt) {

  const x = x_of(pt);

  const y = y_of(pt);

  return (t) =>

    t < 0.5

      ? make_point(

          math_cos(3 * math_PI * t) + x,

          math_sin(3 * math_PI * t) + y + 1

        )

      : make_point(

          math_cos(3 * math_PI * t) + x,

          -math_sin(3 * math_PI * t) + y - 1

        );

}



// Test

draw_connected_full_view_proportional(200)(s_generator(make_point(0.5, 0.25)));



----------------------------------------------------------------------------------------------------

Missions: Curve Manipulation

//Question 1
function s_generator(pt) {
  const x = x_of(pt);
  const y = y_of(pt);
  return (t) =>
    t < 0.5
      ? make_point(
          math_cos(3 * math_PI * t) + x,
          math_sin(3 * math_PI * t) + y + 1
        )
      : make_point(
          math_cos(3 * math_PI * t) + x,
          -math_sin(3 * math_PI * t) + y - 1
        );
}
function reflect_through_y_axis(curve) {
    return t => make_point(-x_of(curve(t)),y_of(curve(t)));
}


//test
const my_s = s_generator(make_point(0,0));
(draw_connected_full_view_proportional(200))(reflect_through_y_axis(my_s));


//Question 2
function s_generator(pt) {
  const x = x_of(pt);
  const y = y_of(pt);
  return (t) =>
    t < 0.5
      ? make_point(
          math_cos(3 * math_PI * t) + x,
          math_sin(3 * math_PI * t) + y + 1
        )
      : make_point(
          math_cos(3 * math_PI * t) + x,
          -math_sin(3 * math_PI * t) + y - 1
        );
}
function reflect_through_y_axis(curve) {
    return t => make_point(-x_of(curve(t)),y_of(curve(t)));
}
function close(curve) {
  return t => t <= 0.5
                ? curve(2 * t) 
                : curve(-2 * t + 2);
}
const my_s_curve = s_generator(make_point(0,0));

//test
draw_connected_full_view_proportional(200)(connect_ends(close(my_s_curve), reflect_through_y_axis(my_s_curve)));

----------------------------------------------------------------------------------------------------

Missions: Beyond the First Dimension

//Question 1
function fractal(level, transformation, curve) {
    return level === 0
            ? curve
            : fractal(level - 1,transformation,transformation(curve));
}

function levycize(curve) {
    const f = math_sqrt(2) / 2;
    const scaled_curve = (scale(f, f, 1))(curve);
    return connect_rigidly(
        (rotate_around_origin(0, 0, math_PI / 4))(scaled_curve),
        (translate(0.5, 0.5, 0))
            ((rotate_around_origin(0, 0, -math_PI / 4))(scaled_curve)));
}

// Test
draw_connected_full_view_proportional(10000)
    (fractal(11, levycize, unit_line));

//Question 2
function invert(curve) {
    return t => curve(1 - t);
}

function fractal(level, transformation, curve) {
    return level === 0
            ? curve
            : fractal(level - 1,transformation,transformation(curve));
}


function dragonize(c) {
    return put_in_standard_position(connect_ends
                   (invert((rotate_around_origin(0, 0, -math_PI / 2))(c)), c));
}

// Test
draw_connected_full_view_proportional(10000)
    (fractal(11, dragonize, unit_line));

//Question 3
function kochize(curve) {
    const up_60 = rotate_around_origin(0, 0, math_PI / 3);
    const down_60 = rotate_around_origin(0, 0, - math_PI / 3);
    return put_in_standard_position(
               connect_ends(curve,
                            connect_ends(up_60(curve),
                                         connect_ends(down_60(curve),
                                                      curve))));
}

function fractal(level, transformation, curve) {
    return level === 0
            ? curve
            : fractal(level - 1,transformation,transformation(curve));
}

function snowflake(n) {
    const nKochCurve = fractal(n,kochize,unit_line);
    return connect_ends( 
                nKochCurve,
                connect_ends(
                    rotate_around_origin(0, 0, -2 * math_PI / 3)(nKochCurve),
                    rotate_around_origin(0, 0, 2 * math_PI / 3)(nKochCurve)
                    )
                );
}

// Test
draw_connected_full_view_proportional(10000)(snowflake(5));

----------------------------------------------------------------------------------------------------

Missions: Premorseal Communications

//Question 1
// Task 1

function noise_sound(duration) {
    const wave = t => math_random() * 2 - 1;
    return make_sound(wave, duration);
}

function cut_sound(sound, duration) {
    return make_sound(get_wave(sound),duration);
}

// Play test sound.
play(cut_sound(noise_sound(2), 1));

//Question 2
// Task 2

function sine_sound(freq, duration) {
    return make_sound(t => math_sin(2 * math_PI * freq * t),duration);
}

// Play test sound.
play(sine_sound(436, 1));

//Question 3
// Task 3

function sine_sound(freq, duration) {
    return make_sound(t => math_sin(2 * math_PI * freq * t),duration);
}

function two_consecutively(s1, s2) {
    return make_sound(
        t => t < get_duration(s1)
                ? get_wave(s1)(t)
                : get_wave(s2)(t - get_duration(s1)),
        get_duration(s1) + get_duration(s2));
}

const my_sine_1 = sine_sound(500, 1);
const my_sine_2 = sine_sound(750, 2);

// Play test sound.
play(two_consecutively(my_sine_1, my_sine_2));

//Question 4
// Task 4

function sine_sound(freq, duration) {
    return make_sound(t => math_sin(2 * math_PI * freq * t),duration);
}

function two_consecutively(s1, s2) {
    return make_sound(
        t => t < get_duration(s1)
                ? get_wave(s1)(t)
                : get_wave(s2)(t - get_duration(s1)),
        get_duration(s1) + get_duration(s2));
}


function consecutively(list_of_sounds) {
    return is_null(list_of_sounds)
            ? make_sound(null,0)
            : two_consecutively(head(list_of_sounds),
                                consecutively(tail(list_of_sounds))
                                );
}

const my_sine_1 = sine_sound(800, 0.5);
const my_sine_2 = sine_sound(750, 1);
const my_sine_3 = sine_sound(500, 0.5);

// Play test sound.
play(consecutively(list(my_sine_1, my_sine_2, my_sine_3)));

//Question 5
// Task 5

function sine_sound(freq, duration) {
    return make_sound(t => math_sin(2 * math_PI * freq * t),duration);
}

function two_consecutively(s1, s2) {
    return make_sound(
        t => t < get_duration(s1)
                ? get_wave(s1)(t)
                : get_wave(s2)(t - get_duration(s1)),
        get_duration(s1) + get_duration(s2));
}


function consecutively(list_of_sounds) {
    return is_null(list_of_sounds)
            ? make_sound(null,0)
            : two_consecutively(head(list_of_sounds),
                                consecutively(tail(list_of_sounds))
                                );
}

const dot_duration = 0.125;
const dash_duration = 3 * dot_duration;
const morse_freq = 800;
const silence_freq = 0;

// Create dot, dash and pause sounds first.
const dot_sound = sine_sound(morse_freq,dot_duration);
const dash_sound = sine_sound(morse_freq,dash_duration);
const dot_pause = sine_sound(silence_freq,dot_duration);
const dash_pause = sine_sound(silence_freq,dash_duration);

// Create sounds for each letter.
const S_sound = consecutively(list(dot_sound,dot_pause,dot_sound,dot_pause,dot_sound));
const O_sound = consecutively(list(dash_sound,dot_pause,dash_sound,dot_pause,dash_sound));

// Build the signal out of letter sounds and pauses.
const distress_signal = consecutively(list(S_sound,dash_pause,O_sound,dash_pause,S_sound));

// Play distress signal.
play(distress_signal);

----------------------------------------------------------------------------------------------------

Missions: POTS and Pans

//Question 1
// Task 1

// Function type: Number -> pair_of_numbers
// where input is between 0 - 15 inclusive.
// where 0 - 9 represent the digits
// 10 represents *, 11 represents #,
// and 12 - 15 represent the letters A-D.

function get_dtmf_frequencies(number) {
  const rows = list(697, 770, 852, 941);
  const cols = list(1209, 1336, 1477, 1633);

  const dtmf_table = list(
    pair(3, 1),
    pair(0, 0),
    pair(0, 1),
    pair(0, 2),
    pair(1, 0),
    pair(1, 1),
    pair(1, 2),
    pair(2, 0),
    pair(2, 1),
    pair(2, 2),
    pair(3, 0),
    pair(3, 2),
    pair(0, 3),
    pair(1, 3),
    pair(2, 3),
    pair(3, 3)
  );

  const dtmf_coordinates = list_ref(dtmf_table, number);

  return pair(
    list_ref(rows, head(dtmf_coordinates)),
    list_ref(cols, tail(dtmf_coordinates))
  );
}


//Question 2
// Task 2

function get_dtmf_frequencies(number) {
  const rows = list(697, 770, 852, 941);
  const cols = list(1209, 1336, 1477, 1633);

  const dtmf_table = list(
    pair(3, 1),
    pair(0, 0),
    pair(0, 1),
    pair(0, 2),
    pair(1, 0),
    pair(1, 1),
    pair(1, 2),
    pair(2, 0),
    pair(2, 1),
    pair(2, 2),
    pair(3, 0),
    pair(3, 2),
    pair(0, 3),
    pair(1, 3),
    pair(2, 3),
    pair(3, 3)
  );

  const dtmf_coordinates = list_ref(dtmf_table, number);

  return pair(
    list_ref(rows, head(dtmf_coordinates)),
    list_ref(cols, tail(dtmf_coordinates))
  );
}
function make_dtmf_tone(frequency_pair) {
    return simultaneously(list(sine_sound(head(frequency_pair),0.5),
                               sine_sound(tail(frequency_pair),0.5)
                          ));
}

//Question 3
// Task 3
function get_dtmf_frequencies(number) {
  const rows = list(697, 770, 852, 941);
  const cols = list(1209, 1336, 1477, 1633);

  const dtmf_table = list(
    pair(3, 1),
    pair(0, 0),
    pair(0, 1),
    pair(0, 2),
    pair(1, 0),
    pair(1, 1),
    pair(1, 2),
    pair(2, 0),
    pair(2, 1),
    pair(2, 2),
    pair(3, 0),
    pair(3, 2),
    pair(0, 3),
    pair(1, 3),
    pair(2, 3),
    pair(3, 3)
  );

  const dtmf_coordinates = list_ref(dtmf_table, number);

  return pair(
    list_ref(rows, head(dtmf_coordinates)),
    list_ref(cols, tail(dtmf_coordinates))
  );
}
function make_dtmf_tone(frequency_pair) {
    return simultaneously(list(sine_sound(head(frequency_pair),0.5),
                               sine_sound(tail(frequency_pair),0.5)
                          ));
}

function dial(list_of_digits) {
    return is_null(list_of_digits) 
            ? silence_sound(0)
            : consecutively(
                list(
                    make_dtmf_tone(get_dtmf_frequencies(head(list_of_digits))),
                    silence_sound(0.1),
                    dial(tail(list_of_digits))
                    )
                );
}

// Test
play(dial(list(6,2,3,5,8,5,7,7)));

//Question 4
// Task 4

// Task 3
function get_dtmf_frequencies(number) {
  const rows = list(697, 770, 852, 941);
  const cols = list(1209, 1336, 1477, 1633);

  const dtmf_table = list(
    pair(3, 1),
    pair(0, 0),
    pair(0, 1),
    pair(0, 2),
    pair(1, 0),
    pair(1, 1),
    pair(1, 2),
    pair(2, 0),
    pair(2, 1),
    pair(2, 2),
    pair(3, 0),
    pair(3, 2),
    pair(0, 3),
    pair(1, 3),
    pair(2, 3),
    pair(3, 3)
  );

  const dtmf_coordinates = list_ref(dtmf_table, number);

  return pair(
    list_ref(rows, head(dtmf_coordinates)),
    list_ref(cols, tail(dtmf_coordinates))
  );
}
function make_dtmf_tone(frequency_pair) {
    return simultaneously(list(sine_sound(head(frequency_pair),0.5),
                               sine_sound(tail(frequency_pair),0.5)
                          ));
}

function dial(list_of_digits) {
    return is_null(list_of_digits) 
            ? silence_sound(0)
            : consecutively(
                list(
                    make_dtmf_tone(get_dtmf_frequencies(head(list_of_digits))),
                    silence_sound(0.1),
                    dial(tail(list_of_digits))
                    )
                );
}
// function dial_all(list_of_numbers) {
//     return accumulate((x,y) => append(x,y),
//                     list(),list_of_numbers);
// }
  const evil_number = list(1, 8, 0, 0, 5, 2, 1, 1, 9, 8, 0);

  function is_evil_number(number) {
    return !equal(number, evil_number);
  }

function dial_all(list_of_numbers) {
    return accumulate((x,y) => consecutively(
                                list(x,
                                     make_dtmf_tone(get_dtmf_frequencies(11)),
                                     y)),
                    silence_sound(0),map(dial, filter(is_evil_number, list_of_numbers)));
}

//Test
play(dial_all(
 list(
     list(1,8,0,0,5,2,1,1,9,8,0),  // not played!!!
     list(6,2,3,5,8,5,7,7),
     list(0,0,8,6,1,3,7,7,0,9,5,0,0,6,1))
 ));

----------------------------------------------------------------------------------------------------

Missions: Musical Diversions

//Question 1
const drum_envelope = adsr(0.05, 0.95, 0, 0);

function snare_drum(note, duration) {
    return drum_envelope(noise_sound(duration));
}

function bass_drum(note, duration) {
    return drum_envelope(
        simultaneously(
            map(x => sine_sound(x,duration),
            list(79,
                 83,
                 89,
                 97,
                 101,
                 103,
                 107,
                 109,
                 113,
                 127,
                 131,
                 137,
                 139,
                 149))));
}

function mute(note, duration) {
    return silence_sound(duration);
}

// Test
play(snare_drum(50, 0.2));
play(bass_drum(50, 0.2));
play(sine_sound(200,1));

play(consecutively(list(snare_drum(50, 0.2), mute(0, 0.2), bass_drum(50, 0.2),
                        mute(0, 0.2),
                        snare_drum(50, 0.2), mute(0, 0.2), bass_drum(50, 0.2))));

//Question 2
function generate_list_of_note(letter_name, list_of_interval) {
    const tonic = letter_name_to_midi_note(letter_name);
    function generate_list_of_note_helper(note,list_of_interval){
        return is_null(list_of_interval)
                    ? pair(note,null)
                    : pair(note,generate_list_of_note_helper(note + head(list_of_interval),tail(list_of_interval)));
    }
    return generate_list_of_note_helper(tonic,list_of_interval);
}

const major_scale_interval = list(2, 2, 1, 2, 2, 2, 1, -1, -2, -2, -2, -1, -2, -2);
const c_major_scale = generate_list_of_note("C4", major_scale_interval);
display(c_major_scale);

function list_to_sound(list_of_midi_note, duration, instrument) {
    return consecutively(map(
                note => instrument(note,duration),
                list_of_midi_note
            ));
}

const c_major_scale_sound = list_to_sound(c_major_scale, 0.4, cello);
play(c_major_scale_sound);

const harmonic_minor_scale_interval = list(2, 1, 2, 2, 1, 3, 1, -1, -3, -1, -2, -2, -1, -2);

const melodic_minor_scale_interval = list(2, 1, 2, 2, 2, 2, 1, -2, -2, -1, -2, -2, -1, -2);


const c_harmonic_minor_scale = generate_list_of_note("C4",harmonic_minor_scale_interval);
const c_harmonic_minor_scale_sound = list_to_sound(c_harmonic_minor_scale, 0.4, cello);
play(c_harmonic_minor_scale_sound);

const c_melodic_minor_scale = generate_list_of_note("C4",melodic_minor_scale_interval);
const c_melodic_minor_scale_sound = list_to_sound(c_melodic_minor_scale, 0.4, cello);
play(c_melodic_minor_scale_sound);

//Question 3
function generate_list_of_note(letter_name, list_of_interval) {
    const tonic = letter_name_to_midi_note(letter_name);
    function generate_list_of_note_helper(note,list_of_interval){
        return is_null(list_of_interval)
                    ? pair(note,null)
                    : pair(note,generate_list_of_note_helper(note + head(list_of_interval),tail(list_of_interval)));
    }
    return generate_list_of_note_helper(tonic,list_of_interval);
}
function list_to_sound(list_of_midi_note, duration, instrument) {
    return consecutively(map(
                note => instrument(note,duration),
                list_of_midi_note
            ));
}

const major_arpeggio_interval = list(4, 3, 5, 4, 3, 5);
const minor_arpeggio_interval = list(3, 4, 5, 3, 4, 5);

function generate_arpeggio(letter_name, list_of_interval) {
    return generate_list_of_note(letter_name, list_of_interval);
}

function arpeggiator_up(arpeggio, duration_each, instrument) {
    return length(arpeggio) < 4
            ? silence_sound(0)
            : consecutively(list(
                instrument(list_ref(arpeggio,0),duration_each),
                instrument(list_ref(arpeggio,1),duration_each),
                instrument(list_ref(arpeggio,2),duration_each),
                instrument(list_ref(arpeggio,3),duration_each),
                arpeggiator_up(tail(arpeggio),duration_each,instrument)
              ));
}

// Test
play(arpeggiator_up(generate_arpeggio("C4", major_arpeggio_interval), 0.1, cello));

//Question 4
function simplify_rhythm(rhythm) {
    function repeat_rhythm(accum_rhythm,rhythm,n){
    return n === 0
            ? accum_rhythm
            : repeat_rhythm(append(accum_rhythm,rhythm),rhythm,n - 1);
    }
    return is_null(rhythm)
            ? null
            : is_number(rhythm)
                ? list(rhythm)
                : is_list(rhythm)
                    ? append(simplify_rhythm(head(rhythm)),simplify_rhythm(tail(rhythm)))
                    : repeat_rhythm(null,simplify_rhythm(head(rhythm)),tail(rhythm));
    
}
const my_rhythm = pair(list(pair(list(1,2,0,1), 2), list(1,3,0,1,3,1,0,3)), 3);
const my_simple_rhythm = simplify_rhythm(my_rhythm);
display_list(my_simple_rhythm);

const correct_simple_rhythm = list(1,2,0,1,1,2,0,1,1,3,0,1,3,1,0,3,1,2,0,1,1,
        2,0,1,1,3,0,1,3,1,0,3,1,2,0,1,1,2,0,1,1,3,0,1,3,1,0,3);
equal(my_simple_rhythm, correct_simple_rhythm);

//Question 5
const drum_envelope = adsr(0.05, 0.95, 0, 0);
function snare_drum(note, duration) {
    return drum_envelope(noise_sound(duration));
}
function mute(note, duration) {
    return silence_sound(duration);
}
function list_to_sound(list_of_midi_note, duration, instrument) {
    return consecutively(map(
                note => instrument(note,duration),
                list_of_midi_note
            ));
}
function simplify_rhythm(rhythm) {
    function repeat_rhythm(accum_rhythm,rhythm,n){
    return n === 0
            ? accum_rhythm
            : repeat_rhythm(append(accum_rhythm,rhythm),rhythm,n - 1);
    }
    return is_null(rhythm)
            ? null
            : is_number(rhythm)
                ? list(rhythm)
                : is_list(rhythm)
                    ? append(simplify_rhythm(head(rhythm)),simplify_rhythm(tail(rhythm)))
                    : repeat_rhythm(null,simplify_rhythm(head(rhythm)),tail(rhythm));
    
}


function percussions(distance, list_of_sounds, rhythm) {
    const simplified_rhythm = simplify_rhythm(rhythm);
    function generate_rhythm(rhythm,n){
        return n === length(simplified_rhythm)
                ? null
                : pair(consecutively(list(silence_sound(n * distance),list_ref(list_of_sounds,head(rhythm)))),
                        generate_rhythm(tail(rhythm),n + 1));
    }
    return simultaneously(generate_rhythm(simplified_rhythm,0));
}


//Test
const my_mute_sound = mute(50, 0.7);
const my_snare_drum = snare_drum(50, 0.7);
const my_cello = cello(50, 0.7);
const my_bell = bell(72, 1);
play(percussions(0.5,
         list(my_mute_sound,
              my_snare_drum,
              my_cello,
              my_bell),
         list(1,2,1,0,3,1,0)));

----------------------------------------------------------------------------------------------------

Missions: Search and Rescue

//Question 1
function binary_search_tree_to_string(bst) {
    return is_empty_tree(bst)
            ? ""
            : binary_search_tree_to_string(left_branch(bst)) 
            + entry(bst) 
            + "; "
            + binary_search_tree_to_string(right_branch(bst));
}

const h = make_tree("h", make_empty_tree(), make_empty_tree());
const a = make_tree("a", make_empty_tree(), make_empty_tree());
const n = make_tree("n", h, make_empty_tree());
const c = make_tree("c", a, make_empty_tree());
const test_bst = make_tree("e", c, n);

//Test
binary_search_tree_to_string(test_bst);
binary_search_tree_to_string(cadet_names);

//Question 2
function find(bst, name) {
    return is_empty_tree(bst)
            ? false
            : entry(bst) === name 
            || find(left_branch(bst),name) 
            || find(right_branch(bst),name);
}

// Test
find(cadet_names, "NG YIN JOE");

//Question 3
function insert(bst, item) {
    return is_empty_tree(bst)
            ? make_tree(item,make_empty_tree(),make_empty_tree())
            : item < entry(bst)
                ? make_tree(entry(bst),insert(left_branch(bst),item),right_branch(bst))
                : make_tree(entry(bst),left_branch(bst),insert(right_branch(bst),item));
}

function binary_search_tree_to_string(bst) {
    return is_empty_tree(bst)
            ? ""
            : binary_search_tree_to_string(left_branch(bst)) 
            + entry(bst) 
            + "; "
            + binary_search_tree_to_string(right_branch(bst));
}

// Test

display(binary_search_tree_to_string(insert(make_empty_tree(), "x")));
// Should produce "x; "

const bst = accumulate((item, bst) => insert(bst, item),
                      make_empty_tree(),
                      list("g", "a", "r", "x", "p"));
display(binary_search_tree_to_string(bst));
// Should produce "a; g; p; r; x; "

const cadet_names_with_aaaaron =  insert(cadet_names, "AAAARON NORAAAA");
binary_search_tree_to_string(cadet_names_with_aaaaron);
// Should produce "AAAARON NORAAAA; ..."


----------------------------------------------------------------------------------------------------

Missions: Sorting Things Out

//Question 1
// Task 1

function partition(xs, p) {
    return pair(filter(x => x <= p,xs),filter(x => x > p,xs));
}

// Test
const my_list = list(1, 2, 3, 4, 5, 6);
partition(my_list, 4);

//Question 2
// Task 2

function partition(xs, p) {
    return pair(filter(x => x <= p,xs),filter(x => x > p,xs));
}

function quicksort(xs) {
    if(is_null(xs)){
        return null;
    }
    else{
        const partition_pair = partition(tail(xs),head(xs));
        return append(quicksort(head(partition_pair)),pair(head(xs),quicksort(tail(partition_pair))));
    }
}

// Test
const my_list = list(23, 12, 56, 92, -2, 0);
quicksort(my_list);

//Question 3
2

//Question 4
4

//Question 5
3

----------------------------------------------------------------------------------------------------

Missions: Robotic Trials

//Question 1
ev3_speak("Hello world my name is Jeff");

//Question 2
/*

Some data from real world testing

1. Perimeter of wheel is 18cm

2. The robot moves at 11.4 cm/s @ speed = 200

*/



function go_some_dist(motorA, motorB, dist) {

    ev3_runForTime(motorA, (dist * 1000) / 11.4, 200);

    ev3_runForTime(motorB, (dist * 1000) / 11.4, 200);

    ev3_pause((dist * 1000) / 11.4);

}



const motorA = ev3_motorA();

const motorB = ev3_motorB();



display(ev3_connected(motorA) ? "A connected" : "A not connected");

display(ev3_connected(motorB) ? "B connected" : "B not connected");



go_some_dist(motorA, motorB, 10);

//Question 3
// move wheels by 9cm (half of the wheel's perimeter)

function cw_90(motorA, motorB) {

    ev3_runForTime(motorA, (9 * 1000) / 11.4, 200);

    ev3_runForTime(motorB, (9 * 1000) / 11.4, -200);

    ev3_pause((9 * 1000) / 11.4);

}



function ccw_90(motorA, motorB) {

    cw_90(motorB, motorA);

}



const motorA = ev3_motorA();

const motorB = ev3_motorB();



display(ev3_connected(motorA) ? "A connected" : "A not connected");

display(ev3_connected(motorB) ? "B connected" : "B not connected");



ccw_90(motorA, motorB);

//Question 4
/*

Some data from real world testing

1. Perimeter of wheel is 18cm

2. The robot moves at 11.4 cm/s @ speed = 200

*/



function go_some_dist(motorA, motorB, dist) {

    ev3_runForTime(motorA, (dist * 1000) / 11.4, 200);

    ev3_runForTime(motorB, (dist * 1000) / 11.4, 200);

    ev3_pause((dist * 1000) / 11.4);

}



// move wheels by 9cm (half of the wheel's perimeter)

function cw_90(motorA, motorB) {

    ev3_runForTime(motorA, (9 * 1000) / 11.4, 200);

    ev3_runForTime(motorB, (9 * 1000) / 11.4, -200);

    ev3_pause((9 * 1000) / 11.4);

}



function ccw_90(motorA, motorB) {

    cw_90(motorB, motorA);

}



const motorA = ev3_motorA();

const motorB = ev3_motorB();



display(ev3_connected(motorA) ? "A connected" : "A not connected");

display(ev3_connected(motorB) ? "B connected" : "B not connected");



go_some_dist(motorA, motorB, 10);

ccw_90(motorA, motorB);

go_some_dist(motorA, motorB, 5);

cw_90(motorA, motorB);

go_some_dist(motorA, motorB, 15);

----------------------------------------------------------------------------------------------------

Missions: Moving about on Planet Y

//Question 1
//gets distance in cm
display(ev3_ultrasonicSensorDistance(ev3_ultrasonicSensor()) / 10);

//Question 2
function go_some_dist(motorA, motorB, distance) {

    const speed = distance > 0 ? 200:-200;

    const dist = math_abs(distance);

    ev3_runForTime(motorA, (dist * 1000) / 11.4, speed);

    ev3_runForTime(motorB, (dist * 1000) / 11.4, speed);

    ev3_pause((dist * 1000) / 11.4);

}

function getDistance(){

    return ev3_ultrasonicSensorDistance(ev3_ultrasonicSensor()) / 10;

}



const motorA = ev3_motorA();

const motorB = ev3_motorB();



while(true){

    go_some_dist(motorA, motorB, 1);

    if(getDistance()<10){

        ev3_pause(2000 / 11.4);

        go_some_dist(motorA,motorB,-30);

        break;

    }

}



//Question 3
function go_some_dist(motorA, motorB, distance) {

    const speed = distance > 0 ? 200:-200;

    const dist = math_abs(distance);

    ev3_runForTime(motorA, (dist * 1000) / 11.4, speed);

    ev3_runForTime(motorB, (dist * 1000) / 11.4, speed);

    ev3_pause((dist * 1000) / 11.4);

}

function cw_90(motorA, motorB) {

    ev3_runForTime(motorA, (9 * 1000) / 11.4, 200);

    ev3_runForTime(motorB, (9 * 1000) / 11.4, -200);

    ev3_pause((9 * 1000) / 11.4);

}



function ccw_90(motorA, motorB) {

    cw_90(motorB, motorA);

}

function getDistance(){

    return ev3_ultrasonicSensorDistance(ev3_ultrasonicSensor()) / 10;

}



const robot_size=17;

const box_length=40;

const box_width=30;

const motorA = ev3_motorA();

const motorB = ev3_motorB();



while(true){

    go_some_dist(motorA, motorB, 1);

    if(getDistance()<10){

        ev3_pause(2000 / 11.4);

        if(math_random() > 0.5){

            cw_90(motorA,motorB);

            go_some_dist(motorA, motorB, box_length / 2 + robot_size);

            ccw_90(motorA,motorB);

            go_some_dist(motorA, motorB, box_width);

        }

        else{

            ccw_90(motorA,motorB);

            go_some_dist(motorA, motorB, box_length / 2 + robot_size);

            cw_90(motorA,motorB);

            go_some_dist(motorA, motorB, box_width);

        }

        

        break;

    }

}





----------------------------------------------------------------------------------------------------

Missions: Know Your Environment

//Question 1
function d_reverse(xs) {
    if (is_null(xs)) {
        return xs;
    } else if (is_null(tail(xs))) {
        return xs;
    } else {
        const temp = d_reverse(tail(xs));
        set_tail(tail(xs), xs);
        set_tail(xs, null);
        return temp;
    }
}
const L = list(2, 3);
const M = d_reverse(L);
M;


//Question 2
const twice = f => (x => f(f(x)));
const yy = (twice(x => 2 * x + 1))(3);
yy;


//Question 3
function d_map(fun, xs) {
    if (!is_null(xs)) {
        const h = head(xs);
        set_head(xs, fun(h));
        d_map(fun, tail(xs));
    }
}
const L = list(5);
d_map(x => y => x + y, L);


----------------------------------------------------------------------------------------------------

Missions: Finding ELDRIC

//Question 1
const touch_sensor = ev3_touchSensor1();

const color_sensor = ev3_colorSensor();



while (true) {

    if (ev3_touchSensorPressed(touch_sensor)) {

        break;

    }

    

    display(ev3_reflectedLightIntensity(color_sensor));

    ev3_pause(1000);

}

//Question 2
const touch_sensor = ev3_touchSensor1();

const color_sensor = ev3_colorSensor();

const motorA = ev3_motorA();

const motorB = ev3_motorB();



function go_some_dist(motorA, motorB, distance) {

    const speed = distance > 0 ? 200 : -200;

    const dist = math_abs(distance);

    ev3_runForTime(motorA, (dist * 1000) / 11.4, speed);

    ev3_runForTime(motorB, (dist * 1000) / 11.4, speed);

    ev3_pause((dist * 1000) / 11.4);

}



function go_some_dist_one_wheel(motorA, motorB, distance) {

    const speed = distance > 0 ? 150:-150;

    const dist = math_abs(distance);

    ev3_runForTime(motorA, (dist * 1000) / 11.4, speed);

    // ev3_runForTime(motorB, (dist * 1000) / 11.4, -speed);

    ev3_pause((dist * 1000) / 11.4);

}



while(true) {

    if (ev3_touchSensorPressed(touch_sensor)) {

        break;

    }

    

    if (ev3_reflectedLightIntensity(color_sensor) <= 40) {

        go_some_dist_one_wheel(motorB, motorA, 0.5);

    } else if (ev3_reflectedLightIntensity(color_sensor) >= 60) {

        go_some_dist_one_wheel(motorA, motorB, 0.5);

    } else {

        go_some_dist(motorA, motorB, 0.5);

    }

}

//Question 3
const touch_sensor = ev3_touchSensor1();

const color_sensor = ev3_colorSensor();

const motorA = ev3_motorA();

const motorB = ev3_motorB();



function go_some_dist(motorA, motorB, distance) {

    const speed = distance > 0 ? 200 : -200;

    const dist = math_abs(distance);

    ev3_runForTime(motorA, (dist * 1000) / 11.4, speed);

    ev3_runForTime(motorB, (dist * 1000) / 11.4, speed);

    ev3_pause((dist * 1000) / 11.4);

}



function go_some_dist_one_wheel(motorA, motorB, distance) {

    const speed = distance > 0 ? 200 : -200;

    const dist = math_abs(distance);

    ev3_runForTime(motorA, (dist * 1000) / 11.4, speed);

    ev3_runForTime(motorB, (dist * 1000) / 11.4, -speed);

    ev3_pause((dist * 1000) / 11.4);

}



while(true) {

    if (ev3_touchSensorPressed(touch_sensor)) {

        break;

    }

    

    if (ev3_reflectedLightIntensity(color_sensor) <= 40) {

        go_some_dist_one_wheel(motorA, motorB, 0.2);

    } else if (ev3_reflectedLightIntensity(color_sensor) >= 70) {

        go_some_dist_one_wheel(motorB, motorA, 0.2);

    } else {

        go_some_dist(motorA, motorB, 0.2);

    }

}

----------------------------------------------------------------------------------------------------

Missions: Corrective Sky Surgery

//Question 1
const WIDTH = 400;

const HEIGHT = 300;

const FPS = 15;



function my_first_filter(src, dest) {

    const width = image_width();

    const height = image_height();



    for (let y = 0; y < height; y = y + 1) {

        for (let x = 0; x < width; x = x + 1) {

            dest[y][x][0] = y * 255/299;

            dest[y][x][1] = x * 255/399; 

            dest[y][x][2] = 255 - y * 255/299 - x * 255/399;

            dest[y][x][3] = 255;                // always 255

        }

    }

}



install_filter(my_first_filter);

set_dimensions(WIDTH, HEIGHT);

keep_aspect_ratio(true);

set_fps(FPS);

start();

//Question 2
const WIDTH = 400;

const HEIGHT = 300;

const FPS = 15;



function copy(src, dest) {

    const width = image_width();

    const height = image_height();



    for (let i = 0; i < height; i = i + 1) {

        for (let j = 0; j < width; j = j + 1) {

           dest[i][j][0] = src[i][j][0];

           dest[i][j][1] = src[i][j][1];

           dest[i][j][2] = src[i][j][2];

           dest[i][j][3] = src[i][j][3];

        }

    }

}



function crosshair(src, dest) {

    const width = image_width();

    const height = image_height();

    const x_mid = WIDTH/2;

    const y_mid = HEIGHT/2;

    const thickness = 25;



    for (let i = 0; i < height; i = i + 1) {

        for (let j = 0; j < width; j = j + 1) {

        if(i<150){

           if(j<200){

               dest[i][j][0] = src[i][j][0];

               dest[i][j][1] = src[i][j][1];

               dest[i][j][2] = math_floor(math_sqrt((i - y_mid)*(i - y_mid)+

                                         (j - x_mid)*(j - x_mid))/thickness)%2===0

                               ? src[i][j][2]

                               : 255;

               dest[i][j][3] = 255;

           }

           else if(j===200){

               dest[i][j][0] = 255;

               dest[i][j][1] = src[i][j][1];

               dest[i][j][2] = math_floor(math_sqrt((i - y_mid)*(i - y_mid)+

                                         (j - x_mid)*(j - x_mid))/thickness)%2===0

                               ? src[i][j][2]

                               : 255;

               dest[i][j][3] = 255;

           }

           else{

               dest[i][j][0] = src[i][j][0];

               dest[i][j][1] = src[i][j][1];

               dest[i][j][2] = math_floor(math_sqrt((i - y_mid)*(i - y_mid)+

                                         (j - x_mid)*(j - x_mid))/thickness)%2===0

                               ? src[i][j][2]

                               : 255;

               dest[i][j][3] = 255;

           }

        }

        else if(i===150){

               dest[i][j][0] = 255;

               dest[i][j][1] = src[i][j][1];

               dest[i][j][2] = math_floor(math_sqrt((i - y_mid)*(i - y_mid)+

                                         (j - x_mid)*(j - x_mid))/thickness)%2===0

                               ? src[i][j][2]

                               : 255;

               dest[i][j][3] = 255;

        }

        else{

           if(j<200){

               dest[i][j][0] = src[i][j][0];

               dest[i][j][1] = src[i][j][1];

               dest[i][j][2] = math_floor(math_sqrt((i - y_mid)*(i - y_mid)+

                                         (j - x_mid)*(j - x_mid))/thickness)%2===0

                               ? src[i][j][2]

                               : 255;

               dest[i][j][3] = 255;

           }

           else if(j===200){

               dest[i][j][0] = 255;

               dest[i][j][1] = src[i][j][1];

               dest[i][j][2] = math_floor(math_sqrt((i - y_mid)*(i - y_mid)+

                                         (j - x_mid)*(j - x_mid))/thickness)%2===0

                               ? src[i][j][2]

                               : 255;

               dest[i][j][3] = 255;

           }

           else{

               dest[i][j][0] = src[i][j][0];

               dest[i][j][1] = src[i][j][1];

               dest[i][j][2] = math_floor(math_sqrt((i - y_mid)*(i - y_mid)+

                                         (j - x_mid)*(j - x_mid))/thickness)%2===0

                               ? src[i][j][2]

                               : 255;

           }

           

}}}}

//Question 3


const WIDTH = 400;

const HEIGHT = 300;

const FPS = 15;



function zoom(factor) {

    // your solution here

   function copy(src, dest) {

    const width = image_width();

    const height = image_height();

    const ii = (HEIGHT-HEIGHT/factor)/2;

    const jj = (WIDTH - WIDTH/factor)/2;



    for (let i = 0; i < height; i = i + 1) {

        for (let j = 0; j < width; j = j + 1) {

          const iiii = ii + math_floor(i/factor);

          const jjjj = jj + math_floor(j/factor);

          

          dest[i][j][0] = src[iiii][jjjj][0];//red

          dest[i][j][1] = src[iiii][jjjj][1];//green

          dest[i][j][2] = src[iiii][jjjj][2];//blue

          dest[i][j][3] = 255;

        }

    }

    }

    

return copy;

}



install_filter(zoom(2));



set_dimensions(WIDTH, HEIGHT);

keep_aspect_ratio(true);

set_fps(FPS);

start();

//Question 4
// TASK 4



const WIDTH = 400;

const HEIGHT = 300;

const FPS = 15;



function flip_vertically(src, dest) {

    const width = image_width();

    const height = image_height();



    for (let i = 0; i < height; i = i + 1) {

        for (let j = 0; j < width; j = j + 1) {

            for (let k = 0; k < 4; k = k + 1) {

                dest[i][j][k] = src[height - 1 - i][j][k];

            }

        }

    }

}



function color_invert(src, dest) {

    const width = image_width();

    const height = image_height();



    for (let i = 0; i < height; i = i + 1){

        for (let j = 0; j < width; j = j + 1){

            for (let c = 0; c < 4; c = c + 1) {

                dest[i][j][c] = c < 3 ? 255 - src[i][j][c] : src[i][j][c];

            }

        }

    }

}





// Copy your solution for Task 3 (zoom) here.

function zoom(factor) {

    // your solution here

   function copy(src, dest) {

    const width = image_width();

    const height = image_height();

    const ii = (HEIGHT-HEIGHT/factor)/2;

    const jj = (WIDTH - WIDTH/factor)/2;



    for (let i = 0; i < height; i = i + 1) {

        for (let j = 0; j < width; j = j + 1) {

          const iiii = ii + math_floor(i/factor);

          const jjjj = jj + math_floor(j/factor);

          

          dest[i][j][0] = src[iiii][jjjj][0];//red

          dest[i][j][1] = src[iiii][jjjj][1];//green

          dest[i][j][2] = src[iiii][jjjj][2];//blue

          dest[i][j][3] = 255;

        // dest[i][j][0] = src[i][j][0];

        //   dest[i][j][1] = src[i][j][1];

        //   dest[i][j][2] = src[i][j][2];

        //   dest[i][j][3] = src[i][j][3];

        }

    }

    }

    

return copy;

}





function make_image(width, height) {

    const img = [];

    for (let i = 0; i < height; i = i + 1) {

        const row = [];

        img[i] = row;

        for (let j = 0; j < width; j = j + 1) {

            const pixel = [];

            row[j] = pixel;

            for (let z = 0; z < 4; z = z + 1) {

                pixel[z] = 255;

            }

        }

    }

    return img;

}



function stack(filter1, filter2) {

    const temp1 = make_image(WIDTH, HEIGHT);

    const temp2 = make_image(WIDTH, HEIGHT);



    return (src, dest) => {

        const width = image_width();

        const height = image_height();

        const half_height = math_floor(height / 2);



        filter1(src, temp1);

        filter2(src, temp2);



        for (let i = 0; i < half_height; i = i + 1) {

            dest[i] = temp1[i * 2];

            dest[i + half_height] = temp2[i * 2];

        }



        // take last row from temp2, if height is odd

        for (let i = half_height * 2; i < height; i = i + 1) {

            dest[i] = temp2[i];

        }

    };

}



function beside(filter1, filter2) {

    // your program goes here

    const temp1 = make_image(WIDTH, HEIGHT);

    const temp2 = make_image(WIDTH, HEIGHT);



    return (src, dest) => {

        const width = image_width();

        const height = image_height();

        const half_width = math_floor(width / 2);



        filter1(src, temp1);

        filter2(src, temp2);

        

        for(let i = 0; i < height; i = i + 1){

          for (let j = 0; j < half_width; j = j + 1) {

            dest[i][j] = temp1[i][j * 2];

            dest[i][j + half_width] = temp2[i][j * 2];

        }  

        }

        

        for(let i = 0; i < height; i = i + 1){

            for (let j = half_width * 2; j < width; j = j + 1) {

            dest[i][j] = temp2[i][j];

        }

        }

    };

}





install_filter(stack(beside(flip_vertically, color_invert),

                     beside(copy_image, zoom(2))));



set_dimensions(WIDTH, HEIGHT);

keep_aspect_ratio(true);

set_fps(FPS);

start();

//Question 5
const WIDTH = 400;

const HEIGHT = 300;

const FPS = 15;



function flip_vertically(src, dest) {

    const width = image_width();

    const height = image_height();



    for (let i = 0; i < height; i = i + 1) {

        for (let j = 0; j < width; j = j + 1) {

            for (let k = 0; k < 4; k = k + 1) {

                dest[i][j][k] = src[height - 1 - i][j][k];

            }

        }

    }

}



function color_invert(src, dest) {

    const width = image_width();

    const height = image_height();



    for (let i = 0; i < height; i = i + 1){

        for (let j = 0; j < width; j = j + 1){

            for (let c = 0; c < 4; c = c + 1) {

                dest[i][j][c] = c < 3 ? 255 - src[i][j][c] : src[i][j][c];

            }

        }

    }

}



function make_image(width, height) {

    const img = [];

    for (let i = 0; i < height; i = i + 1) {

        const row = [];

        img[i] = row;

        for (let j = 0; j < width; j = j + 1) {

            const pixel = [];

            row[j] = pixel;

            for (let z = 0; z < 4; z = z + 1) {

                pixel[z] = 255;

            }

        }

    }

    return img;

}



function compose(filter1, filter2) {

    // your program goes here

    return (src, dest) => {

        const width = image_width();

        const height = image_height();

        const img = make_image(width, height);

        

        filter1(src, img);

        filter2(img, dest);

    };

}



install_filter(compose( flip_vertically, color_invert));



set_dimensions(WIDTH, HEIGHT);

keep_aspect_ratio(true);

set_fps(FPS);

start();

----------------------------------------------------------------------------------------------------

Missions: Reuse Your Pairs

//Question 1
// TASK 1

function d_split_list(xs) {
    const ans=pair(xs,null);
    let ys=xs;
    for(let i=0;i<math_ceil(length(xs)/2)-1;i=i+1){
        ys=tail(ys);
    }
    set_tail(ans,tail(ys));
    set_tail(ys,null);
    return ans;
}

//TEST:
const my_list1 = list(1, 2, 3, 4, 5, 6);
const my_list2 = list(5, 4, 3, 2, 1);
d_split_list(my_list1);
//d_split_list(my_list2);


//Question 2
// TASK 2

function d_merge(xs, ys) {
    if(head(ys)<head(xs)){
        let temp=xs;
        xs=ys;
        ys=temp;
    }
    let x_prev=xs;
    let x=tail(xs);
    while(!is_null(ys) && !is_null(x)){
        if(head(ys)<=head(x)){
            let y=ys;
            ys=tail(ys);
            set_tail(x_prev,y);
            set_tail(y,x);
            x_prev=y;
        }
        else{
            x_prev=x;
            x=tail(x);
        }
    }
    if(is_null(x)){
        set_tail(x_prev,ys);
    }
    return xs;
}

// TEST:
const my_list1 = list(2,3);
const my_list2 = list(1,4,5);
d_merge(my_list1, my_list2);

//Question 3
// TASK 3

function d_split_list(xs) {
    const ans=pair(xs,null);
    let ys=xs;
    for(let i=0;i<math_ceil(length(xs)/2)-1;i=i+1){
        ys=tail(ys);
    }
    set_tail(ans,tail(ys));
    set_tail(ys,null);
    return ans;
}
function d_merge(xs, ys) {
    if(head(ys)<head(xs)){
        let temp=xs;
        xs=ys;
        ys=temp;
    }
    let x_prev=xs;
    let x=tail(xs);
    while(!is_null(ys) && !is_null(x)){
        if(head(ys)<=head(x)){
            let y=ys;
            ys=tail(ys);
            set_tail(x_prev,y);
            set_tail(y,x);
            x_prev=y;
        }
        else{
            x_prev=x;
            x=tail(x);
        }
    }
    if(is_null(x)){
        set_tail(x_prev,ys);
    }
    return xs;
}

function d_merge_sort(xs) {
    if(is_null(xs) || is_null(tail(xs))){
        return xs;
    }
    const splitted_list=d_split_list(xs);
    return d_merge(d_merge_sort(head(splitted_list)),d_merge_sort(tail(splitted_list)));
}

// TEST:
// const my_list = list(7, 2, 4, 6, 9, 1, 5, 8, 3, 6);
// d_merge_sort(my_list);

----------------------------------------------------------------------------------------------------

Missions: Streaming the Anomaly

//Question 1
// TASK 1

function array_to_stream(a) {
    function helper(idx){
        return idx === array_length(a)
                ? null
                : pair(a[idx],()=>helper(idx+1));
    }
    return helper(0);
}


display(array_length(anomaly_data) ===
        stream_length(array_to_stream(anomaly_data)));
display(anomaly_data[7] ===
        stream_ref(array_to_stream(anomaly_data), 7));


//Question 2
// TASK 2

const FPS = 10;

function array_to_stream(a) {
    function helper(idx){
        return idx === array_length(a)
                ? null
                : pair(a[idx],()=>helper(idx+1));
    }
    return helper(0);
}
function stream_to_filter(s) {
    return (src,dest)=>{
          const pic = head(s);
          copy_image(pic,dest);
          if(!is_null(stream_tail(s))){
              s=stream_tail(s);
          }
    };
}


install_filter(stream_to_filter(array_to_stream(anomaly_data)));
set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

//Question 3
// TASK 3

const FPS = 10;

function array_to_stream(a) {
    function helper(idx){
        return idx === array_length(a)
                ? null
                : pair(a[idx],()=>helper(idx+1));
    }
    return helper(0);
}
function stream_to_filter(s) {
    return (src,dest)=>{
          const pic = head(s);
          copy_image(pic,dest);
          if(!is_null(stream_tail(s))){
              s=stream_tail(s);
          }
    };
}


function loop(s) {
    function helper(cur){
        return is_null(cur)
                ? helper(s)
                : pair(head(cur),()=>helper(stream_tail(cur)));
    }
    return helper(s);
}
install_filter(
    stream_to_filter(
        loop(array_to_stream(anomaly_data))));
set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

//Question 4
// TASK 4

const FPS = 10;

function array_to_stream(a) {
    function helper(idx){
        return idx === array_length(a)
                ? null
                : pair(a[idx],()=>helper(idx+1));
    }
    return helper(0);
}
function stream_to_filter(s) {
    return (src,dest)=>{
          const pic = head(s);
          copy_image(pic,dest);
          if(!is_null(stream_tail(s))){
              s=stream_tail(s);
          }
    };
}


function loop(s) {
    function helper(cur){
        return is_null(cur)
                ? helper(s)
                : pair(head(cur),()=>helper(stream_tail(cur)));
    }
    return helper(s);
}

function time_lapse(s, n) {
    let temp=s;
    for(let i=0;i<n;i=i+1){
        temp=stream_tail(temp);
    }
    return pair(head(s),()=>time_lapse(temp,n));

}


install_filter(
    stream_to_filter(
        time_lapse(loop(array_to_stream(anomaly_data)),
                  3)));
// install_filter(
//     stream_to_filter(loop(array_to_stream(anomaly_data))
//                   ));
set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

----------------------------------------------------------------------------------------------------

Missions: The Anomaly in Focus

//Question 1
// TASK 1

function red_rectangle_stream(s) {
    return stream_map(
        img=>{
            let min_x=WIDTH - 1;
            let min_y=HEIGHT -1;
            let max_x=0;
            let max_y=0;
            for(let i=0;i<HEIGHT;i=i+1){
                for(let j=0;j<WIDTH;j=j+1){
                    if(img[i][j][0]===255 && img[i][j][1]===0 && img[i][j][2]===0){
                        min_x=math_min(min_x,i);
                        min_y=math_min(min_y,j);
                        max_x=math_max(max_x,i);
                        max_y=math_max(max_y,j);
                    }
                }
            }
            return pair(pair(min_x,min_y),pair(max_x,max_y));
        },
        s
        );
}
head(red_rectangle_stream(anomaly_stream));

//head(red_rectangle_stream(anomaly_stream));
// should evaluate to: [[141, 191], [159, 209]]

//Question 2
// TASK 2
function red_rectangle_stream(s) {
    return stream_map(
        img=>{
            let min_x=WIDTH - 1;
            let min_y=HEIGHT -1;
            let max_x=0;
            let max_y=0;
            for(let i=0;i<HEIGHT;i=i+1){
                for(let j=0;j<WIDTH;j=j+1){
                    if(img[i][j][0]===255 && img[i][j][1]===0 && img[i][j][2]===0){
                        min_x=math_min(min_x,i);
                        min_y=math_min(min_y,j);
                        max_x=math_max(max_x,i);
                        max_y=math_max(max_y,j);
                    }
                }
            }
            return pair(pair(min_x,min_y),pair(max_x,max_y));
        },
        s
        );
}
head(red_rectangle_stream(anomaly_stream));

function stream_combine(f, s1, s2) {
    return pair(f(head(s1),head(s2)),
                ()=>stream_combine(f,stream_tail(s1),stream_tail(s2)));

}


// Trim the given image using the given rectangle.
// Returns an image that includes all purely red
// pixels of the given image.

function trim(image, rectangle) {
    const trimmed = [];
    const i_min = head(head(rectangle));
    const j_min = tail(head(rectangle));
    const i_max = head(tail(rectangle));
    const j_max = tail(tail(rectangle));

    for (let i = i_min; i <= i_max; i = i + 1) {
        const new_i = i - i_min;
        trimmed[new_i] = [];
        for (let j = j_min; j <= j_max; j = j + 1) {
            const new_j = j - j_min;
            trimmed[new_i][new_j] = image[i][j];
        }
    }
    return trimmed;
}

// Example:

const focused_stream = stream_combine(
                           trim,
                           anomaly_stream,
                           red_rectangle_stream(anomaly_stream));
head(focused_stream);

// Should return a close-up of the anomaly, a 19x19 image of black,
// red and white pixels.

//Question 3
// Use your solutions of the previous tasks and
// write other functions HERE that might be helpful
// to answer the questions in this task.
function red_rectangle_stream(s) {
    return stream_map(
        img=>{
            let min_x=WIDTH - 1;
            let min_y=HEIGHT -1;
            let max_x=0;
            let max_y=0;
            for(let i=0;i<HEIGHT;i=i+1){
                for(let j=0;j<WIDTH;j=j+1){
                    if(img[i][j][0]===255 && img[i][j][1]===0 && img[i][j][2]===0){
                        min_x=math_min(min_x,i);
                        min_y=math_min(min_y,j);
                        max_x=math_max(max_x,i);
                        max_y=math_max(max_y,j);
                    }
                }
            }
            return pair(pair(min_x,min_y),pair(max_x,max_y));
        },
        s
        );
}
function stream_combine(f, s1, s2) {
    return pair(f(head(s1),head(s2)),
                ()=>stream_combine(f,stream_tail(s1),stream_tail(s2)));

}

// Trim the given image using the given rectangle.
// Returns an image that includes all purely red
// pixels of the given image.

function trim(image, rectangle) {
    const trimmed = [];
    const i_min = head(head(rectangle));
    const j_min = tail(head(rectangle));
    const i_max = head(tail(rectangle));
    const j_max = tail(tail(rectangle));

    for (let i = i_min; i <= i_max; i = i + 1) {
        const new_i = i - i_min;
        trimmed[new_i] = [];
        for (let j = j_min; j <= j_max; j = j + 1) {
            const new_j = j - j_min;
            trimmed[new_i][new_j] = image[i][j];
        }
    }
    return trimmed;
}

// Example:
function find_anomaly(s){
    return stream_map(
        img=>{
            for(let i=0;i<19;i=i+1){
                let prev=null;
                let str="";
                for(let j=0;j<19;j=j+1){
                    if(img[i][j][0]===255 && img[i][j][1]===255 && img[i][j][2]===255){//white pixel
                          if(!is_null(prev) && j-prev>1){
                                    display(stringify(i)+","+stringify(j));
                                    display(img[i][j-1]);
                                    prev=j;
                            }
                            else{
                                prev=j;
                            }
                        
                    }
                    if(img[i][j][0]===255 && img[i][j][1]===255 && img[i][j][2]===255 && img[i][j][3]===255){
                        //display(img[i][j]);
                        str=str+"w";
                    }
                    else if(img[i][j][0]===255 && img[i][j][1]===0 && img[i][j][2]===0){
                        str=str+"r";
                    }
                    else{
                        str=str+"b";
                    }
                }
                display(str);
                }
            
        },
        s
        );
}
const focused_stream = stream_combine(
                           trim,
                           anomaly_stream,
                           red_rectangle_stream(anomaly_stream));
                          
eval_stream(find_anomaly(focused_stream),20);
//head(focused_stream);
/*
Q1: What color it might absorb?
ANS: Light Yellow (RGB(255, 255, 235)).


Q2: What color of laser beam would you use?
ANS:  Blue color as yellow absorbs blue the best.


Q3: Which part of the shield would you target?
ANS: The central part.
     Which is the part marked with "O" below.

"bbbbbrrrrrrrrrbbbbb"
"bbbbrrrrrrrrrrrbbbb"
"bbrrrrrrrrrrrrrrrbb"
"bbrrrrrrrrrrrrrrrbb"
"brrrrrrrrrrrrrrrrrb"
"rrrrrrrrrrrrrrrrrrr"
"rrrrrrrwwwwwrrrrrrr"
"rrrrrrwwwOwwwrrrrrr"
"rrrrrrwwOOOwwrrrrrr"
"rrrrrrwOOOOOwrrrrrr"
"rrrrrrwwOOOwwrrrrrr"
"rrrrrrwwwOwwwrrrrrr"
"rrrrrrrwwwwwrrrrrrr"
"rrrrrrrrrrrrrrrrrrr"
"brrrrrrrrrrrrrrrrrb"
"bbrrrrrrrrrrrrrrrbb"
"bbrrrrrrrrrrrrrrrbb"
"bbbbrrrrrrrrrrrbbbb"
"bbbbbrrrrrrrrrbbbbb"


Q4: How did you find the answer?
ANS: Using the function find_anomaly, everytime we encounter a white tile,
     we can save the column index of it in a temporary variable. If we have 
     a white tile and its distance from the rightmost previous white tile
     is more than 1, that means there was an anomaly (non-white tile) between
     them, and we display the index and color of the tile.
*/



----------------------------------------------------------------------------------------------------

Missions: The Essence of the Source

//Question 1
// TASK 1
let number_of_frames=0;
function count_frames_created(program_string) {
    parse_and_evaluate(program_string);
    let ans=number_of_frames;
    number_of_frames=0;
    return ans;
}

// Calculator language
// * Adding booleans, conditionals, and sequences
// * Adding blocks and declarations
// * Adding compound functions (but no return)

//
// evaluation
//

function evaluate(component, env) {
    return is_literal(component)
           ? literal_value(component)
           : is_conditional(component)
           ? eval_conditional(component, env)
           : is_sequence(component)
           ? eval_sequence(sequence_statements(component), env)
           : is_name(component)
           ? lookup_symbol_value(symbol_of_name(component), env)
           : is_block(component)
           ? eval_block(component, env)
           : is_function_declaration(component)
           ? evaluate(function_decl_to_constant_decl(component), env)
           : is_declaration(component)
           ? eval_declaration(component, env)
           : is_application(component)
           ? apply(evaluate(function_expression(component), env),
                   list_of_values(arg_expressions(component), env))
           : is_operator_combination(component)
           ? evaluate(operator_combination_to_application(component),
                      env)
           : is_lambda_expression(component)
           ? make_function(lambda_parameter_symbols(component),
                           lambda_body(component), env)
           : error(component, "Unknown component:");
}

function eval_conditional(comp, env) {
   return is_truthy(evaluate(conditional_predicate(comp), env))
          ? evaluate(conditional_consequent(comp), env)
          : evaluate(conditional_alternative(comp), env);
}

function eval_sequence(stmts, env) {
    if (is_empty_sequence(stmts)) {
        return undefined;
    } else if (is_last_statement(stmts)) {
        return evaluate(first_statement(stmts), env);
    } else {
        const ignore = evaluate(first_statement(stmts), env);
        return eval_sequence( rest_statements(stmts), env);
    }
}

function scan_out_declarations(component) {
    return is_sequence(component)
           ? accumulate(append,
                        null,
                        map(scan_out_declarations,
                            sequence_statements(component)))
           : is_declaration(component)
           ? list(declaration_symbol(component))
           : null;
}

function eval_block(component, env) {
    const body = block_body(component);
    const locals = scan_out_declarations(body);
    const unassigneds = list_of_unassigned(locals);
    
    number_of_frames = is_null(locals)
                        ? number_of_frames
                        : number_of_frames + 1;
    return evaluate(body, extend_environment(locals,
                                             unassigneds,
                                             env));
}

function list_of_unassigned(symbols) {
    return map(symbol => "*unassigned*", symbols);
}

function eval_declaration(component, env) {
    assign_symbol_value(
        declaration_symbol(component),
        evaluate(declaration_value_expression(component), env),
        env);
  return undefined;
}

function list_of_values(exprs, env) {
    return map( comp => evaluate(comp, env), exprs);
}

function apply(fun, args) {
     if(is_primitive_function(fun)){
         return apply_primitive_function(fun, args);
     }
     else if (is_compound_function(fun)){
         number_of_frames = is_null(function_parameters(fun))
                        ? number_of_frames
                        : number_of_frames + 1;
         return evaluate(function_body(fun),
                      extend_environment(
                          function_parameters(fun),
                          args,
                          function_environment(fun)));
     }
     else{
         return error(fun, "Unknown function type:");
     }
           
           
          
           
}

//
// syntax functions
//

// literals

function is_literal(component) {
    return is_tagged_list(component, "literal");
}
function literal_value(component) {
    return head(tail(component));
}

function is_tagged_list(component, the_tag) {
    return is_pair(component) && head(component) === the_tag;
}

// operator combinations

function is_operator_combination(component) {
    return is_unary_operator_combination(component) ||
           is_binary_operator_combination(component);
}
function is_binary_operator_combination(component) {
    return is_tagged_list(component, "binary_operator_combination");
}
function is_unary_operator_combination(component) {
    return is_tagged_list(component, "unary_operator_combination");
}
function operator_symbol(component) {
    return list_ref(component, 1);
}
function first_operand(component) {
    return list_ref(component, 2);
}
function second_operand(component) {
    return list_ref(component, 3);
}

function operator_combination_to_application(component) {
    const operator = operator_symbol(component);
    return is_unary_operator_combination(component)
           ? make_application(make_name(operator),
                              list(first_operand(component)))
           : make_application(make_name(operator),
                              list(first_operand(component),
                                   second_operand(component)));
}

// conditionals

function is_conditional(component) {
    return is_tagged_list(component, "conditional_expression") ||
           is_tagged_list(component, "conditional_statement");
}
function conditional_predicate(component) {
   return list_ref(component, 1);
}
function conditional_consequent(component) {
   return list_ref(component, 2);
}
function conditional_alternative(component) {
   return list_ref(component, 3);
}

// sequences

function is_sequence(stmt) {
   return is_tagged_list(stmt, "sequence");
}
function sequence_statements(stmt) {
   return head(tail(stmt));
}
function first_statement(stmts) {
   return head(stmts);
}
function rest_statements(stmts) {
   return tail(stmts);
}
function is_empty_sequence(stmts) {
   return is_null(stmts);
}
function is_last_statement(stmts) {
   return is_null(tail(stmts));
}

// names

function is_name(component) {
    return is_tagged_list(component, "name");
}

function symbol_of_name(component) {
    return head(tail(component));
}

function make_name(symbol) {
    return list("name", symbol);
}

// blocks

function is_block(component) {
    return is_tagged_list(component, "block");
}
function block_body(component) {
    return head(tail(component));
}
function make_block(statement) {
    return list("block", statement);
}

// declarations

function is_declaration(component) {
    return is_tagged_list(component, "constant_declaration") ||
           is_tagged_list(component, "function_declaration");
}
function declaration_symbol(component) {
    return symbol_of_name(head(tail(component)));
}
function declaration_value_expression(component) {
    return head(tail(tail(component)));
}
function make_constant_declaration(name, value_expression) {
    return list("constant_declaration", name, value_expression);
}

// application

function is_application(component) {
   return is_tagged_list(component, "application");
}
function function_expression(component) {
   return head(tail(component));
}
function arg_expressions(component) {
   return head(tail(tail(component)));
}

function make_application(function_expression, argument_expressions) {
    return list("application",
                function_expression, argument_expressions);
}

// lambda expressions

function is_lambda_expression(component) {
    return is_tagged_list(component, "lambda_expression");
}
function lambda_parameter_symbols(component) {
    return map(symbol_of_name, head(tail(component)));
}
function lambda_body(component) {
    return head(tail(tail(component)));
}

function make_lambda_expression(parameters, body) {
    return list("lambda_expression", parameters, body);
}

// function declaration

function is_function_declaration(component) {
    return is_tagged_list(component, "function_declaration");
}
function function_declaration_name(component) {
    return list_ref(component, 1);
}
function function_declaration_parameters(component) {
    return list_ref(component, 2);
}
function function_declaration_body(component) {
    return list_ref(component, 3);
}
function function_decl_to_constant_decl(component) {
    return make_constant_declaration(
               function_declaration_name(component),
               make_lambda_expression(
                   function_declaration_parameters(component),
                   function_declaration_body(component)));
}

//
// support functions
//

// conditionals

function is_truthy(x) {
    return is_boolean(x)
           ? x
           : error(x, "boolean expected, received");
}

// environments

function enclosing_environment(env) { return tail(env); }

function first_frame(env) { return head(env); }

const the_empty_environment = null;

function make_frame(symbols, values) { return pair(symbols, values); }

function frame_symbols(frame) { return head(frame); }

function frame_values(frame) { return tail(frame); }

function extend_environment(symbols, vals, base_env) {
    return length(symbols) === length(vals)
           ? pair(make_frame(symbols, vals), base_env)
           : length(symbols) < length(vals)
           ? error("too many arguments supplied: " +
                   stringify(symbols) + ", " +
                   stringify(vals))
           : error("too few arguments supplied: " +
                   stringify(symbols) + ", " +
                   stringify(vals));
}

function lookup_symbol_value(symbol, env) {
    function env_loop(env) {
        function scan(symbols, vals) {
            return is_null(symbols)
                   ? env_loop(enclosing_environment(env))
                   : symbol === head(symbols)
                   ? head(vals)
                   : scan(tail(symbols), tail(vals));
        }
        if (env === the_empty_environment) {
            error(symbol, "unbound name");
        } else {
            const frame = first_frame(env);
            return scan(frame_symbols(frame), frame_values(frame));
        }
    }
    return env_loop(env);
}

function assign_symbol_value(symbol, val, env) {
    function env_loop(env) {
        function scan(symbols, vals) {
            return is_null(symbols)
                   ? env_loop(enclosing_environment(env))
                   : symbol === head(symbols)
                   ? set_head(vals, val)
                   : scan(tail(symbols), tail(vals));
        }
        if (env === the_empty_environment) {
            error(symbol, "unbound name -- assignment");
        } else {
            const frame = first_frame(env);
            return scan(frame_symbols(frame), frame_values(frame));
        }
    }
    return env_loop(env);
}

// function objects

function make_function(parameters, body, env) {
    return list("compound_function",
                parameters, body, env);
}

function is_compound_function(f) {
    return is_tagged_list(f, "compound_function");
}
function function_parameters(f) {
    return list_ref(f, 1);
}
function function_body(f) {
    return list_ref(f, 2);
}
function function_environment(f) {
    return list_ref(f, 3);
}

function is_primitive_function(fun) {
    return is_tagged_list(fun, "primitive");
}

function primitive_implementation(fun) {
    return head(tail(fun));
}

// setting up global environment

const primitive_functions = list(
       list("head",    head             ),
       list("tail",    tail             ),
       list("pair",    pair             ),
       list("list",    list             ),
       list("is_null", is_null          ),
       list("display", display          ),
       list("error",   error            ),
       list("math_abs",math_abs         ),
       list("+",       (x, y) => x + y  ),
       list("-",       (x, y) => x - y  ),
       list("-unary",   x     =>   - x  ),
       list("*",       (x, y) => x * y  ),
       list("/",       (x, y) => x / y  ),
       list("%",       (x, y) => x % y  ),
       list("===",     (x, y) => x === y),
       list("!==",     (x, y) => x !== y),
       list("<",       (x, y) => x <   y),
       list("<=",      (x, y) => x <=  y),
       list(">",       (x, y) => x >   y),
       list(">=",      (x, y) => x >=  y),
       list("!",        x     =>   !   x)
       );

const primitive_function_symbols =
    map(head, primitive_functions);

const primitive_function_objects =
    map(fun => list("primitive", head(tail(fun))),
        primitive_functions);

const primitive_constants = list(list("undefined", undefined),
                                 list("Infinity",  Infinity),
                                 list("math_PI",   math_PI),
                                 list("math_E",    math_E),
                                 list("NaN",       NaN)
                                );
const primitive_constant_symbols =
    map(c => head(c), primitive_constants);
const primitive_constant_values =
    map(c => head(tail(c)), primitive_constants);

function apply_primitive_function(fun, arglist) {
    return apply_in_underlying_javascript(
               primitive_implementation(fun), arglist);
}

function setup_environment() {
    return extend_environment(append(primitive_function_symbols,
                                     primitive_constant_symbols),
                              append(primitive_function_objects,
                                     primitive_constant_values),
                              the_empty_environment);
}

const the_global_environment = setup_environment();

//
// running the evaluator
//

function parse_and_evaluate(program) {
    return evaluate(make_block(parse(program)),
                    the_global_environment);
}
display(count_frames_created("{}{}")); // 0
display(count_frames_created("function foo(n) {n + 1;} foo(0); foo(0); foo(0);")); // 4
display(count_frames_created("function foo(n) {const y = 1; n + 1;} foo(0); foo(0); foo(0);")); // 7


//Question 2
// TASK 2
let number_of_function_objects=0;
function count_function_objects_created(program_string) {
    parse_and_evaluate(program_string);
    let ans=number_of_function_objects;
    number_of_function_objects=0;
    return ans;
}

// Calculator language
// * Adding booleans, conditionals, and sequences
// * Adding blocks and declarations
// * Adding compound functions (but no return)

//
// evaluation
//

function evaluate(component, env) {
    return is_literal(component)
           ? literal_value(component)
           : is_conditional(component)
           ? eval_conditional(component, env)
           : is_sequence(component)
           ? eval_sequence(sequence_statements(component), env)
           : is_name(component)
           ? lookup_symbol_value(symbol_of_name(component), env)
           : is_block(component)
           ? eval_block(component, env)
           : is_function_declaration(component)
           ? evaluate(function_decl_to_constant_decl(component), env)
           : is_declaration(component)
           ? eval_declaration(component, env)
           : is_application(component)
           ? apply(evaluate(function_expression(component), env),
                   list_of_values(arg_expressions(component), env))
           : is_operator_combination(component)
           ? evaluate(operator_combination_to_application(component),
                      env)
           : is_lambda_expression(component)
           ? make_function(lambda_parameter_symbols(component),
                           lambda_body(component), env)
           : error(component, "Unknown component:");
}

function eval_conditional(comp, env) {
   return is_truthy(evaluate(conditional_predicate(comp), env))
          ? evaluate(conditional_consequent(comp), env)
          : evaluate(conditional_alternative(comp), env);
}

function eval_sequence(stmts, env) {
    if (is_empty_sequence(stmts)) {
        return undefined;
    } else if (is_last_statement(stmts)) {
        return evaluate(first_statement(stmts), env);
    } else {
        const ignore = evaluate(first_statement(stmts), env);
        return eval_sequence( rest_statements(stmts), env);
    }
}

function scan_out_declarations(component) {
    return is_sequence(component)
           ? accumulate(append,
                        null,
                        map(scan_out_declarations,
                            sequence_statements(component)))
           : is_declaration(component)
           ? list(declaration_symbol(component))
           : null;
}

function eval_block(component, env) {
    const body = block_body(component);
    const locals = scan_out_declarations(body);
    const unassigneds = list_of_unassigned(locals);
    return evaluate(body, extend_environment(locals,
                                             unassigneds,
                                             env));
}

function list_of_unassigned(symbols) {
    return map(symbol => "*unassigned*", symbols);
}

function eval_declaration(component, env) {
    assign_symbol_value(
        declaration_symbol(component),
        evaluate(declaration_value_expression(component), env),
        env);
  return undefined;
}

function list_of_values(exprs, env) {
    return map( comp => evaluate(comp, env), exprs);
}

function apply(fun, args) {
    return is_primitive_function(fun)
           ? apply_primitive_function(fun, args)
           : is_compound_function(fun)
           ? evaluate(function_body(fun),
                      extend_environment(
                          function_parameters(fun),
                          args,
                          function_environment(fun)))
           : error(fun, "Unknown function type:");
}

//
// syntax functions
//

// literals

function is_literal(component) {
    return is_tagged_list(component, "literal");
}
function literal_value(component) {
    return head(tail(component));
}

function is_tagged_list(component, the_tag) {
    return is_pair(component) && head(component) === the_tag;
}

// operator combinations

function is_operator_combination(component) {
    return is_unary_operator_combination(component) ||
           is_binary_operator_combination(component);
}
function is_binary_operator_combination(component) {
    return is_tagged_list(component, "binary_operator_combination");
}
function is_unary_operator_combination(component) {
    return is_tagged_list(component, "unary_operator_combination");
}
function operator_symbol(component) {
    return list_ref(component, 1);
}
function first_operand(component) {
    return list_ref(component, 2);
}
function second_operand(component) {
    return list_ref(component, 3);
}

function operator_combination_to_application(component) {
    const operator = operator_symbol(component);
    return is_unary_operator_combination(component)
           ? make_application(make_name(operator),
                              list(first_operand(component)))
           : make_application(make_name(operator),
                              list(first_operand(component),
                                   second_operand(component)));
}

// conditionals

function is_conditional(component) {
    return is_tagged_list(component, "conditional_expression") ||
           is_tagged_list(component, "conditional_statement");
}
function conditional_predicate(component) {
   return list_ref(component, 1);
}
function conditional_consequent(component) {
   return list_ref(component, 2);
}
function conditional_alternative(component) {
   return list_ref(component, 3);
}

// sequences

function is_sequence(stmt) {
   return is_tagged_list(stmt, "sequence");
}
function sequence_statements(stmt) {
   return head(tail(stmt));
}
function first_statement(stmts) {
   return head(stmts);
}
function rest_statements(stmts) {
   return tail(stmts);
}
function is_empty_sequence(stmts) {
   return is_null(stmts);
}
function is_last_statement(stmts) {
   return is_null(tail(stmts));
}

// names

function is_name(component) {
    return is_tagged_list(component, "name");
}

function symbol_of_name(component) {
    return head(tail(component));
}

function make_name(symbol) {
    return list("name", symbol);
}

// blocks

function is_block(component) {
    return is_tagged_list(component, "block");
}
function block_body(component) {
    return head(tail(component));
}
function make_block(statement) {
    return list("block", statement);
}

// declarations

function is_declaration(component) {
    return is_tagged_list(component, "constant_declaration") ||
           is_tagged_list(component, "function_declaration");
}
function declaration_symbol(component) {
    return symbol_of_name(head(tail(component)));
}
function declaration_value_expression(component) {
    return head(tail(tail(component)));
}
function make_constant_declaration(name, value_expression) {
    return list("constant_declaration", name, value_expression);
}

// application

function is_application(component) {
   return is_tagged_list(component, "application");
}
function function_expression(component) {
   return head(tail(component));
}
function arg_expressions(component) {
   return head(tail(tail(component)));
}

function make_application(function_expression, argument_expressions) {
    return list("application",
                function_expression, argument_expressions);
}

// lambda expressions

function is_lambda_expression(component) {
    return is_tagged_list(component, "lambda_expression");
}
function lambda_parameter_symbols(component) {
    return map(symbol_of_name, head(tail(component)));
}
function lambda_body(component) {
    return head(tail(tail(component)));
}

function make_lambda_expression(parameters, body) {
    //number_of_function_objects = number_of_function_objects + 1;
    return list("lambda_expression", parameters, body);
}

// function declaration

function is_function_declaration(component) {
    return is_tagged_list(component, "function_declaration");
}
function function_declaration_name(component) {
    return list_ref(component, 1);
}
function function_declaration_parameters(component) {
    return list_ref(component, 2);
}
function function_declaration_body(component) {
    return list_ref(component, 3);
}
function function_decl_to_constant_decl(component) {
    return make_constant_declaration(
               function_declaration_name(component),
               make_lambda_expression(
                   function_declaration_parameters(component),
                   function_declaration_body(component)));
}

//
// support functions
//

// conditionals

function is_truthy(x) {
    return is_boolean(x)
           ? x
           : error(x, "boolean expected, received");
}

// environments

function enclosing_environment(env) { return tail(env); }

function first_frame(env) { return head(env); }

const the_empty_environment = null;

function make_frame(symbols, values) { return pair(symbols, values); }

function frame_symbols(frame) { return head(frame); }

function frame_values(frame) { return tail(frame); }

function extend_environment(symbols, vals, base_env) {
    return length(symbols) === length(vals)
           ? pair(make_frame(symbols, vals), base_env)
           : length(symbols) < length(vals)
           ? error("too many arguments supplied: " +
                   stringify(symbols) + ", " +
                   stringify(vals))
           : error("too few arguments supplied: " +
                   stringify(symbols) + ", " +
                   stringify(vals));
}

function lookup_symbol_value(symbol, env) {
    function env_loop(env) {
        function scan(symbols, vals) {
            return is_null(symbols)
                   ? env_loop(enclosing_environment(env))
                   : symbol === head(symbols)
                   ? head(vals)
                   : scan(tail(symbols), tail(vals));
        }
        if (env === the_empty_environment) {
            error(symbol, "unbound name");
        } else {
            const frame = first_frame(env);
            return scan(frame_symbols(frame), frame_values(frame));
        }
    }
    return env_loop(env);
}

function assign_symbol_value(symbol, val, env) {
    function env_loop(env) {
        function scan(symbols, vals) {
            return is_null(symbols)
                   ? env_loop(enclosing_environment(env))
                   : symbol === head(symbols)
                   ? set_head(vals, val)
                   : scan(tail(symbols), tail(vals));
        }
        if (env === the_empty_environment) {
            error(symbol, "unbound name -- assignment");
        } else {
            const frame = first_frame(env);
            return scan(frame_symbols(frame), frame_values(frame));
        }
    }
    return env_loop(env);
}

// function objects

function make_function(parameters, body, env) {
    number_of_function_objects = number_of_function_objects + 1;
    return list("compound_function",
                parameters, body, env);
}

function is_compound_function(f) {
    return is_tagged_list(f, "compound_function");
}
function function_parameters(f) {
    return list_ref(f, 1);
}
function function_body(f) {
    return list_ref(f, 2);
}
function function_environment(f) {
    return list_ref(f, 3);
}

function is_primitive_function(fun) {
    return is_tagged_list(fun, "primitive");
}

function primitive_implementation(fun) {
    return head(tail(fun));
}

// setting up global environment

const primitive_functions = list(
       list("head",    head             ),
       list("tail",    tail             ),
       list("pair",    pair             ),
       list("list",    list             ),
       list("is_null", is_null          ),
       list("display", display          ),
       list("error",   error            ),
       list("math_abs",math_abs         ),
       list("+",       (x, y) => x + y  ),
       list("-",       (x, y) => x - y  ),
       list("-unary",   x     =>   - x  ),
       list("*",       (x, y) => x * y  ),
       list("/",       (x, y) => x / y  ),
       list("%",       (x, y) => x % y  ),
       list("===",     (x, y) => x === y),
       list("!==",     (x, y) => x !== y),
       list("<",       (x, y) => x <   y),
       list("<=",      (x, y) => x <=  y),
       list(">",       (x, y) => x >   y),
       list(">=",      (x, y) => x >=  y),
       list("!",        x     =>   !   x)
       );

const primitive_function_symbols =
    map(head, primitive_functions);

const primitive_function_objects =
    map(fun => list("primitive", head(tail(fun))),
        primitive_functions);

const primitive_constants = list(list("undefined", undefined),
                                 list("Infinity",  Infinity),
                                 list("math_PI",   math_PI),
                                 list("math_E",    math_E),
                                 list("NaN",       NaN)
                                );
const primitive_constant_symbols =
    map(c => head(c), primitive_constants);
const primitive_constant_values =
    map(c => head(tail(c)), primitive_constants);

function apply_primitive_function(fun, arglist) {
    return apply_in_underlying_javascript(
               primitive_implementation(fun), arglist);
}

function setup_environment() {
    return extend_environment(append(primitive_function_symbols,
                                     primitive_constant_symbols),
                              append(primitive_function_objects,
                                     primitive_constant_values),
                              the_empty_environment);
}

const the_global_environment = setup_environment();

//
// running the evaluator
//

function parse_and_evaluate(program) {
    return evaluate(make_block(parse(program)),
                    the_global_environment);
}

display(count_function_objects_created(
    `function foo(f) { x => y => f(x, y); }
     function bar(x, y) { x + y; }
     foo(bar);`
)); // 3
display(count_function_objects_created("{}{}")); // 0
display(count_function_objects_created("function foo(n) {n + 1;} foo(0); foo(0); foo(0);")); // 1


//Question 3
// TASK 3

// Calculator language
// * Adding booleans, conditionals, and sequences
// * Adding blocks and declarations
// * Adding compound functions (but no return)

//
// evaluation
//

function evaluate(component, env) {
    return is_literal(component)
           ? literal_value(component)
           : is_conditional(component)
           ? eval_conditional(component, env)
           : is_sequence(component)
           ? eval_sequence(sequence_statements(component), env)
           : is_name(component)
           ? lookup_symbol_value(symbol_of_name(component), env)
           : is_block(component)
           ? eval_block(component, env)
           : is_function_declaration(component)
           ? evaluate(function_decl_to_constant_decl(component), env)
           : is_declaration(component)
           ? eval_declaration(component, env)
           : is_application(component)
           ? apply(evaluate(function_expression(component), env),
                   list_of_values(arg_expressions(component), env))
           : is_operator_combination(component)
           ? evaluate(operator_combination_to_application(component),
                      env)
           : is_lambda_expression(component)
           ? make_function(lambda_parameter_symbols(component),
                           lambda_body(component), env)
           : error(component, "Unknown component:");
}

function eval_conditional(comp, env) {
   return is_truthy(evaluate(conditional_predicate(comp), env))
          ? evaluate(conditional_consequent(comp), env)
          : evaluate(conditional_alternative(comp), env);
}

function eval_sequence(stmts, env) {
    if (is_empty_sequence(stmts)) {
        return undefined;
    } else if (is_last_statement(stmts)) {
        return evaluate(first_statement(stmts), env);
    } else {
        const ignore = evaluate(first_statement(stmts), env);
        return eval_sequence( rest_statements(stmts), env);
    }
}

function scan_out_declarations(component) {
    return is_sequence(component)
           ? accumulate(append,
                        null,
                        map(scan_out_declarations,
                            sequence_statements(component)))
           : is_declaration(component)
           ? list(declaration_symbol(component))
           : null;
}

function eval_block(component, env) {
    const body = block_body(component);
    const locals = scan_out_declarations(body);
    const unassigneds = list_of_unassigned(locals);
    return evaluate(body, extend_environment(locals,
                                             unassigneds,
                                             env));
}

function list_of_unassigned(symbols) {
    return map(symbol => "*unassigned*", symbols);
}

function eval_declaration(component, env) {
    assign_symbol_value(
        declaration_symbol(component),
        evaluate(declaration_value_expression(component), env),
        env);
  return undefined;
}

function list_of_values(exprs, env) {
    return map( comp => evaluate(comp, env), exprs);
}

function apply(fun, args) {
    return is_primitive_function(fun)
           ? apply_primitive_function(fun, args)
           : is_compound_function(fun)
           ? evaluate(function_body(fun),
                      extend_environment(
                          function_parameters(fun),
                          args,
                          function_environment(fun)))
           : error(fun, "Unknown function type:");
}

//
// syntax functions
//

// literals

function is_literal(component) {
    return is_tagged_list(component, "literal");
}
function literal_value(component) {
    return head(tail(component));
}

function is_tagged_list(component, the_tag) {
    return is_pair(component) && head(component) === the_tag;
}

// operator combinations

function is_operator_combination(component) {
    return is_unary_operator_combination(component) ||
           is_binary_operator_combination(component);
}
function is_binary_operator_combination(component) {
    return is_tagged_list(component, "binary_operator_combination");
}
function is_unary_operator_combination(component) {
    return is_tagged_list(component, "unary_operator_combination");
}
function operator_symbol(component) {
    return list_ref(component, 1);
}
function first_operand(component) {
    return list_ref(component, 2);
}
function second_operand(component) {
    return list_ref(component, 3);
}

function operator_combination_to_application(component) {
    const operator = operator_symbol(component);
    return is_unary_operator_combination(component)
           ? make_application(make_name(operator),
                              list(first_operand(component)))
           : make_application(make_name(operator),
                              list(first_operand(component),
                                   second_operand(component)));
}

// conditionals

function is_conditional(component) {
    return is_tagged_list(component, "conditional_expression") ||
           is_tagged_list(component, "conditional_statement");
}
function conditional_predicate(component) {
   return list_ref(component, 1);
}
function conditional_consequent(component) {
   return list_ref(component, 2);
}
function conditional_alternative(component) {
   return list_ref(component, 3);
}

// sequences

function is_sequence(stmt) {
   return is_tagged_list(stmt, "sequence");
}
function sequence_statements(stmt) {
   return head(tail(stmt));
}
function first_statement(stmts) {
   return head(stmts);
}
function rest_statements(stmts) {
   return tail(stmts);
}
function is_empty_sequence(stmts) {
   return is_null(stmts);
}
function is_last_statement(stmts) {
   return is_null(tail(stmts));
}

// names

function is_name(component) {
    return is_tagged_list(component, "name");
}

function symbol_of_name(component) {
    return head(tail(component));
}

function make_name(symbol) {
    return list("name", symbol);
}

// blocks

function is_block(component) {
    return is_tagged_list(component, "block");
}
function block_body(component) {
    return head(tail(component));
}
function make_block(statement) {
    return list("block", statement);
}

// declarations

function is_declaration(component) {
    return is_tagged_list(component, "constant_declaration") ||
           is_tagged_list(component, "function_declaration");
}
function declaration_symbol(component) {
    return symbol_of_name(head(tail(component)));
}
function declaration_value_expression(component) {
    return head(tail(tail(component)));
}
function make_constant_declaration(name, value_expression) {
    return list("constant_declaration", name, value_expression);
}

// application

function is_application(component) {
   return is_tagged_list(component, "application");
}
function function_expression(component) {
   return head(tail(component));
}
function arg_expressions(component) {
   return head(tail(tail(component)));
}

function make_application(function_expression, argument_expressions) {
    return list("application",
                function_expression, argument_expressions);
}

// lambda expressions

function is_lambda_expression(component) {
    return is_tagged_list(component, "lambda_expression");
}
function lambda_parameter_symbols(component) {
    return map(symbol_of_name, head(tail(component)));
}
function lambda_body(component) {
    return head(tail(tail(component)));
}

function make_lambda_expression(parameters, body) {
    return list("lambda_expression", parameters, body);
}

// function declaration

function is_function_declaration(component) {
    return is_tagged_list(component, "function_declaration");
}
function function_declaration_name(component) {
    return list_ref(component, 1);
}
function function_declaration_parameters(component) {
    return list_ref(component, 2);
}
function function_declaration_body(component) {
    return list_ref(component, 3);
}
function function_decl_to_constant_decl(component) {
    return make_constant_declaration(
               function_declaration_name(component),
               make_lambda_expression(
                   function_declaration_parameters(component),
                   function_declaration_body(component)));
}

//
// support functions
//

// conditionals

function is_truthy(x) {
    return is_boolean(x)
           ? x
           : error(x, "boolean expected, received");
}

// environments

function enclosing_environment(env) { return tail(env); }

function first_frame(env) { return head(env); }

const the_empty_environment = null;

function make_frame(symbols, values) { return pair(symbols, values); }

function frame_symbols(frame) { return head(frame); }

function frame_values(frame) { return tail(frame); }

function extend_environment(symbols, vals, base_env) {
    return length(symbols) === length(vals)
           ? pair(make_frame(symbols, vals), base_env)
           : length(symbols) < length(vals)
           ? error("too many arguments supplied: " +
                   stringify(symbols) + ", " +
                   stringify(vals))
           : error("too few arguments supplied: " +
                   stringify(symbols) + ", " +
                   stringify(vals));
}

function lookup_symbol_value(symbol, env) {
    function env_loop(env) {
        function scan(symbols, vals) {
            return is_null(symbols)
                   ? env_loop(enclosing_environment(env))
                   : symbol === head(symbols)
                   ? head(vals)
                   : scan(tail(symbols), tail(vals));
        }
        if (env === the_empty_environment) {
            error(symbol, "unbound name");
        } else {
            const frame = first_frame(env);
            return scan(frame_symbols(frame), frame_values(frame));
        }
    }
    return env_loop(env);
}

function assign_symbol_value(symbol, val, env) {
    function env_loop(env) {
        function scan(symbols, vals) {
            return is_null(symbols)
                   ? env_loop(enclosing_environment(env))
                   : symbol === head(symbols)
                   ? set_head(vals, val)
                   : scan(tail(symbols), tail(vals));
        }
        if (env === the_empty_environment) {
            error(symbol, "unbound name -- assignment");
        } else {
            const frame = first_frame(env);
            return scan(frame_symbols(frame), frame_values(frame));
        }
    }
    return env_loop(env);
}

// function objects

function make_function(parameters, body, env) {
    return list("compound_function",
                parameters, body, env);
}

function is_compound_function(f) {
    return is_tagged_list(f, "compound_function");
}
function function_parameters(f) {
    return list_ref(f, 1);
}
function function_body(f) {
    return list_ref(f, 2);
}
function function_environment(f) {
    return list_ref(f, 3);
}

function is_primitive_function(fun) {
    return is_tagged_list(fun, "primitive");
}

function primitive_implementation(fun) {
    return head(tail(fun));
}

// setting up global environment

const primitive_functions = list(
       list("head",    head             ),
       list("tail",    tail             ),
       list("pair",    pair             ),
       list("list",    list             ),
       list("is_null", is_null          ),
       list("display", display          ),
       list("error",   error            ),
       list("math_abs",math_abs         ),
       list("+",       (x, y) => 
                                is_list(x) && is_list(y)
                                    ? append(x,y)
                                    : x + y),
       list("-",       (x, y) => x - y  ),
       list("-unary",   x     =>   - x  ),
       list("*",       (x, y) => x * y  ),
       list("/",       (x, y) => x / y  ),
       list("%",       (x, y) => x % y  ),
       list("===",     (x, y) => x === y),
       list("!==",     (x, y) => x !== y),
       list("<",       (x, y) => x <   y),
       list("<=",      (x, y) => x <=  y),
       list(">",       (x, y) => x >   y),
       list(">=",      (x, y) => x >=  y),
       list("!",        x     =>   !   x)
       );

const primitive_function_symbols =
    map(head, primitive_functions);

const primitive_function_objects =
    map(fun => list("primitive", head(tail(fun))),
        primitive_functions);

const primitive_constants = list(list("undefined", undefined),
                                 list("Infinity",  Infinity),
                                 list("math_PI",   math_PI),
                                 list("math_E",    math_E),
                                 list("NaN",       NaN)
                                );
const primitive_constant_symbols =
    map(c => head(c), primitive_constants);
const primitive_constant_values =
    map(c => head(tail(c)), primitive_constants);

function apply_primitive_function(fun, arglist) {
    return apply_in_underlying_javascript(
               primitive_implementation(fun), arglist);
}

function setup_environment() {
    return extend_environment(append(primitive_function_symbols,
                                     primitive_constant_symbols),
                              append(primitive_function_objects,
                                     primitive_constant_values),
                              the_empty_environment);
}

const the_global_environment = setup_environment();

//
// running the evaluator
//

function parse_and_evaluate(program) {
    return evaluate(make_block(parse(program)),
                    the_global_environment);
}
display_list(parse_and_evaluate(`list(1, 2, 3) + list(4, 5, 6);`));


//Question 4
// TASK 4

// Calculator language
// * Adding booleans, conditionals, and sequences
// * Adding blocks and declarations
// * Adding compound functions (but no return)

//
// evaluation
//

function evaluate(component, env) {
    return is_literal(component)
           ? literal_value(component)
           : is_conditional(component)
           ? eval_conditional(component, env)
           : is_sequence(component)
           ? eval_sequence(sequence_statements(component), env)
           : is_name(component)
           ? lookup_symbol_value(symbol_of_name(component), env)
           : is_block(component)
           ? eval_block(component, env)
           : is_function_declaration(component)
           ? evaluate(function_decl_to_constant_decl(component), env)
           : is_declaration(component)
           ? eval_declaration(component, env)
           : is_application(component)
           ? apply(evaluate(function_expression(component), env),
                   list_of_values(arg_expressions(component), env))
           : is_operator_combination(component)
           ? evaluate(operator_combination_to_application(component),
                      env)
           : is_lambda_expression(component)
           ? make_function(lambda_parameter_symbols(component),
                           lambda_body(component), env)
           : error(component, "Unknown component:");
}

function eval_conditional(comp, env) {
   return is_truthy(evaluate(conditional_predicate(comp), env))
          ? evaluate(conditional_consequent(comp), env)
          : evaluate(conditional_alternative(comp), env);
}

function eval_sequence(stmts, env) {
    if (is_empty_sequence(stmts)) {
        return undefined;
    } else if (is_last_statement(stmts)) {
        return evaluate(first_statement(stmts), env);
    } else {
        const ignore = evaluate(first_statement(stmts), env);
        return eval_sequence( rest_statements(stmts), env);
    }
}

function scan_out_declarations(component) {
    return is_sequence(component)
           ? accumulate(append,
                        null,
                        map(scan_out_declarations,
                            sequence_statements(component)))
           : is_declaration(component)
           ? list(declaration_symbol(component))
           : null;
}

function eval_block(component, env) {
    const body = block_body(component);
    const locals = scan_out_declarations(body);
    const unassigneds = list_of_unassigned(locals);
    return evaluate(body, extend_environment(locals,
                                             unassigneds,
                                             env));
}

function list_of_unassigned(symbols) {
    return map(symbol => "*unassigned*", symbols);
}

function eval_declaration(component, env) {
    assign_symbol_value(
        declaration_symbol(component),
        evaluate(declaration_value_expression(component), env),
        env);
  return undefined;
}

function list_of_values(exprs, env) {
    return map( comp => evaluate(comp, env), exprs);
}

function apply(fun, args) {
    return is_primitive_function(fun)
           ? apply_primitive_function(fun, args)
           : is_compound_function(fun)
           ? evaluate(function_body(fun),
                      extend_environment(
                          function_parameters(fun),
                          args,
                          function_environment(fun)))
           : error(fun, "Unknown function type:");
}

//
// syntax functions
//

// literals

function is_literal(component) {
    return is_tagged_list(component, "literal");
}
function literal_value(component) {
    return head(tail(component));
}

function is_tagged_list(component, the_tag) {
    return is_pair(component) && head(component) === the_tag;
}

// operator combinations

function is_operator_combination(component) {
    return is_unary_operator_combination(component) ||
           is_binary_operator_combination(component);
}
function is_binary_operator_combination(component) {
    return is_tagged_list(component, "binary_operator_combination");
}
function is_unary_operator_combination(component) {
    return is_tagged_list(component, "unary_operator_combination");
}
function operator_symbol(component) {
    return list_ref(component, 1);
}
function first_operand(component) {
    return list_ref(component, 2);
}
function second_operand(component) {
    return list_ref(component, 3);
}

function operator_combination_to_application(component) {
    const operator = operator_symbol(component);
    return is_unary_operator_combination(component)
           ? make_application(make_name(operator),
                              list(first_operand(component)))
           : make_application(make_name(operator),
                              list(first_operand(component),
                                   second_operand(component)));
}

// conditionals

function is_conditional(component) {
    return is_tagged_list(component, "conditional_expression") ||
           is_tagged_list(component, "conditional_statement");
}
function conditional_predicate(component) {
   return list_ref(component, 1);
}
function conditional_consequent(component) {
   return list_ref(component, 2);
}
function conditional_alternative(component) {
   return list_ref(component, 3);
}

// sequences

function is_sequence(stmt) {
   return is_tagged_list(stmt, "sequence");
}
function sequence_statements(stmt) {
   return head(tail(stmt));
}
function first_statement(stmts) {
   return head(stmts);
}
function rest_statements(stmts) {
   return tail(stmts);
}
function is_empty_sequence(stmts) {
   return is_null(stmts);
}
function is_last_statement(stmts) {
   return is_null(tail(stmts));
}

// names

function is_name(component) {
    return is_tagged_list(component, "name");
}

function symbol_of_name(component) {
    return head(tail(component));
}

function make_name(symbol) {
    return list("name", symbol);
}

// blocks

function is_block(component) {
    return is_tagged_list(component, "block");
}
function block_body(component) {
    return head(tail(component));
}
function make_block(statement) {
    return list("block", statement);
}

// declarations

function is_declaration(component) {
    return is_tagged_list(component, "constant_declaration") ||
           is_tagged_list(component, "function_declaration");
}
function declaration_symbol(component) {
    return symbol_of_name(head(tail(component)));
}
function declaration_value_expression(component) {
    return head(tail(tail(component)));
}
function make_constant_declaration(name, value_expression) {
    return list("constant_declaration", name, value_expression);
}

// application

function is_application(component) {
   return is_tagged_list(component, "application");
}
function function_expression(component) {
   return head(tail(component));
}
function arg_expressions(component) {
   return head(tail(tail(component)));
}

function make_application(function_expression, argument_expressions) {
    return list("application",
                function_expression, argument_expressions);
}

// lambda expressions

function is_lambda_expression(component) {
    return is_tagged_list(component, "lambda_expression");
}
function lambda_parameter_symbols(component) {
    return map(symbol_of_name, head(tail(component)));
}
function lambda_body(component) {
    return head(tail(tail(component)));
}

function make_lambda_expression(parameters, body) {
    return list("lambda_expression", parameters, body);
}

// function declaration

function is_function_declaration(component) {
    return is_tagged_list(component, "function_declaration");
}
function function_declaration_name(component) {
    return list_ref(component, 1);
}
function function_declaration_parameters(component) {
    return list_ref(component, 2);
}
function function_declaration_body(component) {
    return list_ref(component, 3);
}
function function_decl_to_constant_decl(component) {
    return make_constant_declaration(
               function_declaration_name(component),
               make_lambda_expression(
                   function_declaration_parameters(component),
                   function_declaration_body(component)));
}

//
// support functions
//

// conditionals

function is_truthy(x) {
    return is_boolean(x)
           ? x
           : error(x, "boolean expected, received");
}

// environments

function enclosing_environment(env) { return tail(env); }

function first_frame(env) { return head(env); }

const the_empty_environment = null;

function make_frame(symbols, values) { return pair(symbols, values); }

function frame_symbols(frame) { return head(frame); }

function frame_values(frame) { return tail(frame); }

function extend_environment(symbols, vals, base_env) {
    return length(symbols) === length(vals)
           ? pair(make_frame(symbols, vals), base_env)
           : length(symbols) < length(vals)
           ? error("too many arguments supplied: " +
                   stringify(symbols) + ", " +
                   stringify(vals))
           : error("too few arguments supplied: " +
                   stringify(symbols) + ", " +
                   stringify(vals));
}

function lookup_symbol_value(symbol, env) {
    function env_loop(env) {
        function scan(symbols, vals) {
            return is_null(symbols)
                   ? env_loop(enclosing_environment(env))
                   : symbol === head(symbols)
                   ? head(vals)
                   : scan(tail(symbols), tail(vals));
        }
        if (env === the_empty_environment) {
            error(symbol, "unbound name");
        } else {
            const frame = first_frame(env);
            return scan(frame_symbols(frame), frame_values(frame));
        }
    }
    return env_loop(env);
}

function assign_symbol_value(symbol, val, env) {
    function env_loop(env) {
        function scan(symbols, vals) {
            return is_null(symbols)
                   ? env_loop(enclosing_environment(env))
                   : symbol === head(symbols)
                   ? set_head(vals, val)
                   : scan(tail(symbols), tail(vals));
        }
        if (env === the_empty_environment) {
            error(symbol, "unbound name -- assignment");
        } else {
            const frame = first_frame(env);
            return scan(frame_symbols(frame), frame_values(frame));
        }
    }
    return env_loop(env);
}

// function objects

function make_function(parameters, body, env) {
    return list("compound_function",
                parameters, body, env);
}

function is_compound_function(f) {
    return is_tagged_list(f, "compound_function");
}
function function_parameters(f) {
    return list_ref(f, 1);
}
function function_body(f) {
    return list_ref(f, 2);
}
function function_environment(f) {
    return list_ref(f, 3);
}

function is_primitive_function(fun) {
    return is_tagged_list(fun, "primitive");
}

function primitive_implementation(fun) {
    return head(tail(fun));
}

// setting up global environment

const primitive_functions = list(
       list("head",    head             ),
       list("tail",    tail             ),
       list("pair",    pair             ),
       list("list",    list             ),
       list("is_null", is_null          ),
       list("display", display          ),
       list("error",   error            ),
       list("math_abs",math_abs         ),
       list("+",       (x, y) => x + y  ),
       list("-",       (x, y) => x - y  ),
       list("-unary",   x     =>   - x  ),
       list("*",       (x, y) => x * y  ),
       list("/",       (x, y) => x / y  ),
       list("%",       (x, y) => x % y  ),
       list("===",     (x, y) => x === y),
       list("!==",     (x, y) => x !== y),
       list("<",       (x, y) => x <   y),
       list("<=",      (x, y) => x <=  y),
       list(">",       (x, y) => 
           ( is_primitive_function(x) || is_compound_function(x) ) && is_list(y)
                ? map(z=>apply(x,list(z)),y)
                : x > y
       ),
       list(">=",      (x, y) => x >=  y),
       list("!",        x     =>   !   x)
       );

const primitive_function_symbols =
    map(head, primitive_functions);

const primitive_function_objects =
    map(fun => list("primitive", head(tail(fun))),
        primitive_functions);

const primitive_constants = list(list("undefined", undefined),
                                 list("Infinity",  Infinity),
                                 list("math_PI",   math_PI),
                                 list("math_E",    math_E),
                                 list("NaN",       NaN)
                                );
const primitive_constant_symbols =
    map(c => head(c), primitive_constants);
const primitive_constant_values =
    map(c => head(tail(c)), primitive_constants);

function apply_primitive_function(fun, arglist) {
    return apply_in_underlying_javascript(
               primitive_implementation(fun), arglist);
}

function setup_environment() {
    return extend_environment(append(primitive_function_symbols,
                                     primitive_constant_symbols),
                              append(primitive_function_objects,
                                     primitive_constant_values),
                              the_empty_environment);
}

const the_global_environment = setup_environment();

//
// running the evaluator
//

function parse_and_evaluate(program) {
    return evaluate(make_block(parse(program)),
                    the_global_environment);
}

parse_and_evaluate(`
function multiply_by_ten(x) {
    x * 10;
}
multiply_by_ten > list(1, 2, 3);`);
// returns list(10, 20, 30)

parse_and_evaluate(`
math_abs > list(5, -10, 15, 20, -25);`);
// returns list(5, 10, 15, 20, 25)

parse_and_evaluate(`
(x => { x * x; }) > list(1, 2, 3);`);
// returns list(1, 4, 9)


----------------------------------------------------------------------------------------------------

