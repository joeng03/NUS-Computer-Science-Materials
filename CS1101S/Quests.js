Quests: Runic Carpets

//Question 1
// build a besiden function on top 
// of the given stackn function 
function besiden(n, rune) {
  return quarter_turn_left(stackn(n, quarter_turn_right(rune)));
}

// persianCenter computes the center
// portion of the carpet
function persianCenter(rune, count) {
  return beside_frac(
    1 / count,
    stackn(count - 2, rune),
    beside_frac(
      1 - 1 / (count - 1), 
      make_cross(rune), 
      stackn(count - 2, rune))
  );
}

function persian(rune, count) {
  return stack_frac(
    1 / count,
    besiden(count, rune),
    stack_frac(
      1 - 1 / (count - 1),
      persianCenter(rune, count),
      besiden(count, rune)
    )
  );
}

//Tests
show(persian(heart, 7));
show(persian(make_cross(rcross), 5));
const paw = from_url("https://i.imgur.com/GJg95B8.png");
show(persian(paw, 5));


----------------------------------------------------------------------------------------------------

Quests: Colorful Carpets

//Question 1
function besiden(n, rune) {

    return n === 1 

        ? rune 

        : beside_frac(1 / n, 

                      rune,

                      besiden(n - 1, rune));

}



// Test

show(besiden(7, heart));

//Question 2
function besiden(n, rune) {

    return n === 1 ?

        rune :

        beside_frac(1 / n, rune,

            besiden(n - 1, rune));

}



function carpet(n, m, rune) {

    return stackn(n, besiden(m, rune));

}



// Test

show(carpet(7, 5, heart));

//Question 3
/*

Enter your answers here

(answer each question in one or two complete sentences):



(a) The program would draw 10x10 patchwork carpets,in which in a 

    single carpet, all hearts have the same (random) color.



(b) This is due to applicative order reduction in Source. 

    The argument is evaluated before the function is applied 

    to it. Therefore, random_color(heart) is first evaluated

    (only once) to a heart with a random color, before the 

    carpet() function and subsequent besiden() and stackn() 

    functions are applied to the same rune.





(c) The program would draw 10x10 patchwork carpets,in which in a single

    carpet, the hearts may be assigned different (random) colors.This 

    is because normal order reduction delays the evaluation of function

    arguments until they are needed. Therefore, random_color would be 

    called for each heart in the carpet, resulting in each heart being

    individually assigned to a random color.

*/

//Question 4
function randomly_colored_besiden(m, rune) {

    return m === 1 ?

        random_color(rune) :

        beside_frac(1 / m, random_color(rune),

            randomly_colored_besiden(m - 1, rune));

}



function randomly_colored_carpet(n, m, rune) {

    return n === 1 ?

        randomly_colored_besiden(m, rune) :

        stack_frac(1 / n, randomly_colored_besiden(m, rune),

            randomly_colored_carpet(

                n - 1,

                m,

                rune));

}



// Test

show(randomly_colored_carpet(10, 10, heart));

// should produce a carpet as shown in the title picture of this quest.

----------------------------------------------------------------------------------------------------

Quests: Functional Expressionism

//Question 1
const increment_repeater =
    repeater => f => x => repeater(f)(f(x));

const twice = f => x => f(f(x));
const thrice = increment_repeater(twice);
const fourtimes = increment_repeater(thrice);
const warn = thrice(display);
warn("ALERT");          // should display "ALERT"
                        // three times in orange
const bigwarn = fourtimes(display);
bigwarn("A L E R T");   // should display "A L E R T"
                        // four times in orange
                        // (the REPL will display
                        // "A L E R T"a fifth time
                        // [in white] as the value
                        // returned by bigwarn)

//Question 2
const pair = (x, y) => f => f(x, y);

const head = p => p((x,y) => x);  
const tail = p => p((x,y) => y); 

head(pair(1, 2)) === 1; // should return true
tail(pair(1, 2)) === 2; // should return true

//Question 3
/*
Ω(n)
*/

//Question 4
const zero_repeater = f => x => x;
const one_repeater = f => x => f(zero_repeater, () => zero_repeater(f)(x));
const two_repeater = f => x => f(one_repeater, () => one_repeater(f)(x));
const three_repeater = f => x => f(two_repeater, () => two_repeater(f)(x));
const to_int = repeater => repeater((iter_count, x) => x() + 1)(0);

const increment_repeater = repeater => f => x => f(repeater,() => repeater(f)(x));

const add_repeaters = (repeater1, repeater2) => repeater1((iter_count,x) => increment_repeater(x()))(repeater2);


display(to_int(add_repeaters(two_repeater,
                     three_repeater)));  // should return 5


//Question 5
const zero_repeater = f => x => x;
const one_repeater = f => x => f(zero_repeater, () => zero_repeater(f)(x));
const two_repeater = f => x => f(one_repeater, () => one_repeater(f)(x));
const three_repeater = f => x => f(two_repeater, () => two_repeater(f)(x));

const to_int = repeater => repeater((iter_count, x) => x() + 1)(0);

const decrement_repeater = repeater => repeater((x,y) => x)(0);
to_int(decrement_repeater(three_repeater));  // should return 2



----------------------------------------------------------------------------------------------------

Quests: Cardioid Arrest

//Question 1
const connect_numbers =
    n => draw_connected_full_view(n)(unit_circle);

connect_numbers(5); // returns a Drawing of a pentagon

//Question 2
const connect_results =
    (n, f) =>
        draw_connected_full_view(n)
        (t => unit_circle(f(math_round(t * n) / n)));
const star = (n,step) => connect_results(n,k => step * k);

star(11,4);

//Question 3
const connect_results =
    (n, f) =>
        draw_connected_full_view(n)
        (t => unit_circle(f(math_round(t * n)) / n));

const wheel = (n) => 
                connect_results(
                    3 * n,
                    k => {
                        const v = 3 * math_round((k - 1) / 3);
                        return k % 3 ===1 ? v + 1.5 * n : v;
                    }
                );
    
wheel(8);
wheel(100);

//Question 4
const connect_results =
    (n, f) =>
        draw_connected_full_view(n)
        (t => unit_circle(f(math_round(t * n)) / n));

const connect_laps =
    (n, g) =>
    connect_results(n * 3,
                    k => { const v = math_round((k - 1) / 3);
                           return k % 3 === 1 ? g(v)*3 : v * 3; }
                   );


const draw_times_table = (m,n) => 
                            connect_laps(m,x => n * x);
                            
                            
                            
connect_laps(200,x =>math_pow(x,5));
draw_times_table(100, 2);      // m = 2: cardioid: 1 lobe
draw_times_table(100, 3);      // m = 3: nephroid: 2 lobes
draw_times_table(100, 4);      // m = 4: 3 lobes...

draw_times_table(397, 200);    // m = (n + 3) / 2: cardioid
draw_times_table(500, 252);    // m = (n + 4) / 2: nephroid
draw_times_table(501, 253);    // m = (n + 5) / 2: 3 lobes...

draw_times_table(500, 168);    // m = (n + 4) / 3: cardioid
draw_times_table(295, 100);    // m = (n + 5) / 3: nephroid
draw_times_table(594, 200);    // m = (n + 6) / 3: 3 lobes...

draw_times_table(395, 100);    // m = (n + 5) / 4: cardioid
draw_times_table(494, 100);    // m = (n + 6) / 5: cardioid
draw_times_table(593, 100);    // m = (n + 7) / 6: cardioid...

draw_times_table(400, 201);    // m = n / 2 + 1 (/4,/8,/16)
draw_times_table(200, 99);     // m = (n / 2) - 1: square pattern

----------------------------------------------------------------------------------------------------

Quests: Curvaceous Wizardry

//Question 1
const test_curve =
    t => make_point(t, 0.5 + (math_sin(4 * (math_PI * t)) / 2));

function stack(c1, c2) {
    return t => 
                t < 0.5 
                    ? make_point(x_of(c1(2 * t)), 
                                 0.5 * y_of(c1(2 * t)) + 0.5)
                    : make_point(x_of(c2(2 * t - 1)), 
                                 0.5 * y_of(c2(2 * t - 1)));
}

// Test
draw_points(10000)(stack(test_curve, test_curve));

//Question 2
const test_curve =
    t => make_point(t, 0.5 + (math_sin(4 * (math_PI * t)) / 2));

function stack_frac(frac, c1, c2) {
     return t => 
                t < 0.5 
                    ? make_point(x_of(c1(2 * t)), 
                                 frac * y_of(c1(2 * t)) + (1 - frac))
                    : make_point(x_of(c2(2 * t - 1)), 
                                 (1 - frac) * y_of(c2(2 * t - 1)));
}

//Test
draw_points(10000)
    (stack_frac(1 / 5,
                test_curve,
                stack_frac(1 / 2, test_curve, test_curve)));

----------------------------------------------------------------------------------------------------

Quests: Echoes of the Past

//Question 1
function backward(sound) {
    return make_sound(t => get_wave(sound)(get_duration(sound) - t),
                      get_duration(sound));
}


/*
const my_sound = consecutively(
    list(sine_sound(400, 1), sine_sound(800, 1)));
play(my_sound);
play(backward(my_sound));
*/
                                

/*
init_record();                       

const my_voice = record_for(2, 0.2); 

play(backward(my_voice()));          
*/

//Question 2
function repeat(n, sound) {
    return make_sound(
            t => get_wave(sound)(t % get_duration(sound)),
            get_duration(sound) * n
           );
}

// Test
const my_sound = consecutively(
    list(sine_sound(400, 1), sine_sound(800, 1)));
const my_repeated = repeat(3, my_sound);
play(my_repeated);

//Question 3
function fast_forward(n, sound) {
    return make_sound(t => get_wave(sound)(n * t),get_duration(sound) / n);
}

const my_sound = consecutively(
    list(sine_sound(400, 1), sine_sound(800, 1)));
play(my_sound);
play(fast_forward(1/3,my_sound));



//                                      // step 0: press "Run"

// init_record();                       // step 1 in REPL

// const my_voice = record_for(2, 0.2); // step 2 in REPL

// play(fast_forward(2, my_voice()));   // step 3 in REPL

//Question 4
function echo(n, d, sound) {
    return n < 0
            ? silence_sound(0)
            : consecutively(list(
                            sound,
                            silence_sound(d),
                            echo(
                              n - 1,
                              d,
                              make_sound(t => 0.5 * get_wave(sound)(t),get_duration(sound)))
                            ));
}

// Test
const test_sound = sine_sound(800, 0.2);
play(echo(2,0.4, test_sound));

//Question 5
// Copy your functions backward, repeat,
// fast_forward and echo here.
function backward(sound) {
    return make_sound(t => get_wave(sound)(get_duration(sound) - t),
                      get_duration(sound));
}
function repeat(n, sound) {
    return make_sound(
            t => get_wave(sound)(t % get_duration(sound)),
            get_duration(sound) * n
           );
}
function fast_forward(n, sound) {
    return make_sound(t => get_wave(sound)(n * t),get_duration(sound) / n);
}
function echo(n, d, sound) {
    return n < 0
            ? silence_sound(0)
            : consecutively(list(
                            sound,
                            silence_sound(d),
                            echo(
                              n - 1,
                              d,
                              make_sound(t => 0.5 * get_wave(sound)(t),get_duration(sound)))
                            ));
}


function make_alien_jukebox(sound) {
    const backward_sound = backward(sound);
    const halfSpeed_sound = fast_forward(0.5,sound);
    const doubleSpeed_repeat_sound = repeat(3,fast_forward(2,sound));
    const echoSound = echo(4,0.3,backward_sound);
    return option =>
            option === 0
                ? play(sound)
                : option === 1
                    ? play(backward_sound)
                    : option === 2
                        ? play(halfSpeed_sound)
                        : option === 3
                            ? play(doubleSpeed_repeat_sound)
                            : play(echoSound);
    // can also apply list and list_ref (although a bit more costly)
}


const test_sound = consecutively(list(sine_sound(400, 1), sine_sound(800, 1)));
const j = make_alien_jukebox(test_sound);

j(0);  // plays original recording

j(1);  // plays it backward

j(2);  // plays it at half speed

j(3);  // plays it at double speed, three times in a row

j(4);  // plays it backward with 4-times echo,
        //     with 0.3 seconds echo delay

----------------------------------------------------------------------------------------------------

Quests: The Magical Tone Matrix

//Question 1
// Question 1

function generate_list_of_note(letter_name, list_of_interval) {
    const tonic = letter_name_to_midi_note(letter_name);
    function generate_list_of_note_helper(note,list_of_interval){
        return is_null(list_of_interval)
                    ? pair(note,null)
                    : pair(note,
                        generate_list_of_note_helper(note + head(list_of_interval),
                        tail(list_of_interval)));
    }
    return generate_list_of_note_helper(tonic,list_of_interval);
}

const pentatonic_list_of_interval = list(2, 2, 3, 2, 3);

function repeat_interval(n, list_of_interval, accum_list_of_interval) {
  return n === 0
    ? accum_list_of_interval
    : repeat_interval(
        n - 1,
        list_of_interval,
        append(list_of_interval, accum_list_of_interval)
      );
}

function repeated_scale(note, list_of_interval, n, duration, instrument) {
    return map(x => instrument(x,duration),
                generate_list_of_note(note,repeat_interval(n,list_of_interval,null)));
}

play(consecutively(repeated_scale("C4", pentatonic_list_of_interval,
                                  2, 1, cello)));

//Question 2
//Question 2

function play_matrix(duration, list_of_sounds) {
    const time_for_each_sound = get_duration(head(list_of_sounds));
    function pressed_notes(notes,accum_notes,n){
        return is_null(notes)
                ? accum_notes
                : pressed_notes(tail(notes),
                    head(notes) 
                        ? pair(list_ref(list_of_sounds,n),accum_notes)
                        : accum_notes,
                    n + 1);
    }
    function play_matrix_helper(column_idx){
        const notes = map(row => list_ref(row,column_idx),get_matrix());
        const notes_to_play = pressed_notes(notes,null,0);
        play_concurrently(simultaneously(notes_to_play));
        set_timeout(() => play_matrix_helper((column_idx + 1) % 16),(duration + time_for_each_sound) * 1000);
        
    }
    play_matrix_helper(0);
    
}

function stop_matrix() {
    clear_all_timeout();
}

function generate_list_of_note(letter_name, list_of_interval) {
    const tonic = letter_name_to_midi_note(letter_name);
    function generate_list_of_note_helper(note,list_of_interval){
        return is_null(list_of_interval)
                    ? pair(note,null)
                    : pair(note,
                        generate_list_of_note_helper(note + head(list_of_interval),
                        tail(list_of_interval)));
    }
    return generate_list_of_note_helper(tonic,list_of_interval);
}

const pentatonic_list_of_interval = list(2, 2, 3, 2, 3);

function repeat_interval(n, list_of_interval, accum_list_of_interval) {
  return n === 0
    ? accum_list_of_interval
    : repeat_interval(
        n - 1,
        list_of_interval,
        append(list_of_interval, accum_list_of_interval)
      );
}

function repeated_scale(note, list_of_interval, n, duration, instrument) {
    return map(x => instrument(x,duration),
                generate_list_of_note(note,repeat_interval(n,list_of_interval,null)));
}
const sounds = repeated_scale("C4", pentatonic_list_of_interval, 3, 0.2, cello);

play_matrix(0.5, sounds);

----------------------------------------------------------------------------------------------------

Quests: Grading a Sort

//Question 1
/*
By modifying merge sort, we can keep track of the number of 'operations' needed
to sort the list, thus obtaining the number of out-of-order pairs (inversions).

At every step,split the list into 2, and recurse for the no. of inversions 
in each of them. Return the sum of no. of inversions of both parts, plus the 
no. of inversions obtained when merging them to form a sorted list. 

When merging 2 sublists, the no. of inversions is, given any element (say x) in 
the second list, find the number of elements in the fist list that should have 
been placed after it. Therefore, if x is smaller than the first element in the 
first list, add the length of the first list to the no. of inversions, as 
the elements of the first list are larger than x (since first list is sorted).

Since we have to keep track of both the no. of inversions of the lists and all
of its elements in sorted order, we can use a pair (inversions,sorted_list) for 
this purpose.

Time complexity for this solution is O(nlogn),ϴ(nlogn) which is same as merge 
sort.

*/

//Question 2
function middle(n) {

    return math_floor(n / 2);

}

function take(xs, n) {

    return n === 0

            ? null 

            : pair(head(xs),take(tail(xs),n - 1));

}

function drop(xs, n) {

    return n === 0

            ? xs

            : drop(tail(xs),n - 1);

}

function merge(xs, ys,accum,inversions) {

  if (is_null(xs)) {

    return pair(inversions,append(reverse(accum),ys));

  } else if (is_null(ys)) {

    return pair(inversions,append(reverse(accum),xs));

  } else {

    const x = head(xs);

    const y = head(ys);

    return x <= y 

            ? merge(tail(xs),ys,pair(x,accum),inversions)

            : merge(xs,tail(ys),pair(y,accum),inversions + length(xs));

  }

}

function merge_sort(xs) {

  if (is_null(tail(xs))) {

    return pair(0,xs);

  } else {

    const mid = middle(length(xs));

    const left = merge_sort(take(xs, mid));

    const right = merge_sort(drop(xs, mid));

    const merged = merge(tail(left),tail(right),null,0);

    return pair(head(left)+head(right)+head(merged),tail(merged));

  }

}

function graderVer1(xs){

    return head(merge_sort(xs));

}

graderVer1(list(3,2,1,4,1,4,1,2,4,1,2,34,2,3,1,22,3,1,23,12,3,2,

3,1,232,2,3,1,23,4,3,2,3,1,2,3,4,3,2,3,4,3,2,3,1,2,3,2,4,4,3,3,2,

2,1,2,3,2,3,2,3,1,2,4,3,3,2,3,12,3,213,213,12,321,3,123,21,3,4,3,

3,432,423,42,342,324,500,4,3,3,2,3,4,5,6,5,4,30,2,3,40,324,34,

2,3,4,2,6,67,8,7,7,8,9,7,5,4,5,6,7,75));



//Question 3
/* Describe your solution here


For each element (say x) in the list, use x to partition the list 
into 2 parts. Find the number of elments larger than x from the first part,
and number of elements larger than x from the second part. Multiply them 
together to get the number of inverted triplets that has x as center.
This solution takes O(n^2) time, as for every element in the list,
we traverse the list(again) once. 

We can speed up this process using a data structure that requires O(logn) time
for insertion, deletion, and searching. For example, the C++ set. Maintain 2
of these data structures to store the elements on left and right respectively.
Time complexity of the solution can then be reduced to O(nlogn).
*/

//Question 4
function graderVer2(xs){
    function take(xs, n) {
    return n === 0
            ? null 
            : pair(head(xs),take(tail(xs),n - 1));
    }
    
    function drop(xs, n) {
    return n === 0
            ? xs
            : drop(tail(xs),n - 1);
    }
    
    function num_elements(f,xs){
        return is_null(xs)
                ? 0
                : f(head(xs))
                    ? 1 + num_elements(f,tail(xs))
                    : num_elements(f,tail(xs));
    }
    const larger = y => x => x > y;
    const smaller = y => x => x < y;
    return accumulate(
        (x,y) => num_elements(larger(list_ref(xs,x)),take(xs,x))
                * num_elements(smaller(list_ref(xs,x)),drop(xs,x))
                + y,
        0,
        enum_list(0,length(xs) - 1));
}
graderVer2(list(7, 3, 4, 3, 3, 1)); // should return 2

----------------------------------------------------------------------------------------------------

Quests: Stellar Motion Detector

//Question 1
// TASK 1

const WIDTH = 400;
const HEIGHT = 300;
const FPS = 15;

// Any helper functions and constants go here.

function stellar_motion_detector(src, dest) {
    const width = image_width();
    const height = image_height();
    let min_x=WIDTH;
    let max_x=0;
    let min_y=HEIGHT;
    let max_y=0;
    for(let r=0;r<height;r=r+1){
        for(let c=0;c<width;c=c+1){
            if(src[r][c][0]===255){
                if(r>max_y){
                    max_y=r;
                }
                if(r<min_y){
                    min_y=r;
                }
                if(c>max_x){
                    max_x=c;
                }
                if(c<min_x){
                    min_x=c;
                }
            }
            dest[r][c][0]=src[r][c][0];
            dest[r][c][1]=src[r][c][1];
            dest[r][c][2]=src[r][c][2];
            dest[r][c][3]=src[r][c][3];
        }
    }
    for(let r=min_y;r<max_y;r=r+1){
        for(let c=min_x;c<max_x;c=c+1){
                dest[r][c][2]=255;
        }
    }
    
}

install_filter(stellar_motion_detector);

set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

----------------------------------------------------------------------------------------------------

Quests: Rescue the Space Lizard

//Question 1
// TASK 1

function max_flies_to_eat(tile_flies) {

    function dfs(i,j){
        return i >= array_length(tile_flies) || j < 0 || j >= array_length(tile_flies[0])
                ? 0
                : tile_flies[i][j]
                  + math_max(dfs(i+1,j-1),dfs(i+1,j),dfs(i+1,j+1));
    }
    
    let ans=0;
    for(let j=0;j<array_length(tile_flies[0]);j=j+1){
        ans=math_max(ans,dfs(0,j));
    }
    return ans;
}

//TEST:
const tile_flies = [[3, 1, 7, 4, 2],
                    [2, 1, 3, 1, 1],
                    [1, 2, 2, 1, 8],
                    [2, 2, 1, 5, 3],
                    [2, 1, 4, 4, 4],
                    [5, 7, 2, 5, 1]];

max_flies_to_eat(tile_flies); // Expected result: 32

//Question 2
// TASK 2

let mem = [];

function read(n, k) {
    return mem[n] === undefined
           ? undefined
           : mem[n][k];
}

function write(n, k, value) {
    if (mem[n] === undefined) {
        mem[n] = [];
    }
    mem[n][k] = value;
}

function memo_max_flies_to_eat(tile_flies) {
    mem = [];
    
    function dfs(i,j){
        if(i >= array_length(tile_flies) || j < 0 || j >= array_length(tile_flies[0])){
            return 0;
        }else if(read(i,j) !== undefined){
            return read(i,j);
        }else{
            const val = tile_flies[i][j] + math_max(dfs(i+1,j-1),dfs(i+1,j),dfs(i+1,j+1));
            write(i,j,val);
            return val;
        }
    }
    
    let ans=0;
    for(let j=0;j<array_length(tile_flies[0]);j=j+1){
        ans=math_max(ans,dfs(0,j));
    }
    return ans;
}

// TEST:
const tile_flies = [[3, 1, 7, 4, 2],
                    [2, 1, 3, 1, 1],
                    [1, 2, 2, 1, 8],
                    [2, 2, 1, 5, 3],
                    [2, 1, 4, 4, 4],
                    [5, 7, 2, 5, 1]];

memo_max_flies_to_eat(tile_flies); // Expected result: 32

----------------------------------------------------------------------------------------------------

Quests: Concurrent Programming

//Question 1
3

//Question 2
1

//Question 3
5

//Question 4
5

//Question 5
4

//Question 6
0

//Question 7
4

//Question 8
0

//Question 9
5

----------------------------------------------------------------------------------------------------

Quests: Programming Register Machines

//Question 1
// TASK 1

function fib_machine() {
    return make_machine(
        list("a","b","n","t"),
        list(
             list("=",binary_function((a,b)=> a === b)),
             list("+",binary_function((a,b)=> a + b)),
             list("-",binary_function((a,b)=> a - b))
             ),
        list(
            assign("t",list(constant(0))),
            "fib",
            test(op("="),reg("n"),constant(0)),
            branch(label("fib_done")),
            assign("t",list(reg("b"))),
            assign("b",list(op("+"),reg("b"),reg("a"))),
            assign("a",list(reg("t"))),
            assign("n",list(op("-"),reg("n"),constant(1))),
            go_to(label("fib")),
            "fib_done"
            )
                      );
} 

// Testing code:
const m = fib_machine();
set_register_contents(m, "a", 0); // Set register "a" to 0
set_register_contents(m, "b", 1); // Set register "b" to 1
set_register_contents(m, "n", 7); // Set register "n" to 7
start(m); // Run the register machine
// The register "a" should contain the 7th fibonacci number: 13
get_register_contents(m, "a");

//Question 2
// TASK 2

function pascal_machine() {
    return make_machine(
        list("a","b","val","continue"),
        list(
             list("=",binary_function((a,b) => a === b)),
             list("+",binary_function((a,b) => a + b)),
             list("-",binary_function((a,b) => a - b)),
             list("||",binary_function((a,b) => a || b))
            ),
        list(
            assign("continue",list(label("pt_done"))),
            "pt_loop",
            test(op("="),reg("a"),constant(0)),
            branch(label("base_case")),
            test(op("="),reg("a"),reg("b")),
            branch(label("base_case")),
            save("continue"),
            assign("continue",list(label("pt_1"))),
            save("b"),
            save("a"),
            assign("b",list(op("-"),reg("b"),constant(1))),
            assign("a",list(op("-"),reg("a"),constant(1))),
            go_to(label("pt_loop")),

            "pt_1",        
            restore("a"),
            restore("b"),
            restore("continue"),
            assign("b", list(op("-"), reg("b"), constant(1))),
            save("continue"),
            assign("continue", list(label("pt_2"))),
            save("val"),
            go_to(label("pt_loop")),
            
            "pt_2",                  
            assign("a", list(reg("val"))),
            restore("val"),                
            restore("continue"),
            assign("val",list(op("+"), reg("val"), reg("a"))),
            go_to(reg("continue")),       
            
            "base_case",
            assign("val",list(constant(1))),
            go_to(reg("continue")),
            "pt_done"
            )
        );
} 

// Testing code:
const m = pascal_machine();
set_register_contents(m, "a", 3); // Set register "a" to 3 (index = 3)
set_register_contents(m, "b", 7); // Set register "b" to 7 (row = 7)
set_register_contents(m, "continue", null);
set_register_contents(m, "val", 0);
start(m); // Run the register machine
// The register "val" should contain the Pascal number with index 3 and row 7: 35
get_register_contents(m, "val");

----------------------------------------------------------------------------------------------------

Quests: Logical!

//Question 1
process_query(`assert(address(list("Bitdiddle", "Ben"),
                              list("Slumerville", list("Ridge", "Road"), 10)))`);
process_query(`assert(job(list("Bitdiddle", "Ben"), 
                          list("computer", "wizard")))`);
process_query(`assert(salary(list("Bitdiddle", "Ben"), 122000))`);

process_query('assert(address(list("Hacker", "Alyssa", "P"), list("Cambridge", list("Mass", "Ave"), 78)))');
process_query('assert(job(list("Hacker", "Alyssa", "P"), list("computer", "programmer")))');
process_query('assert(salary(list("Hacker", "Alyssa", "P"), 81000))');
process_query('assert(supervisor(list("Hacker", "Alyssa", "P"), list("Bitdiddle", "Ben")))');

process_query('assert(address(list("Fect", "Cy", "D"), list("Cambridge", list("Ames", "Street"), 3)))');
process_query('assert(job(list("Fect", "Cy", "D"), list("computer", "programmer")))');
process_query('assert(salary(list("Fect", "Cy", "D"), 70000))');
process_query('assert(supervisor(list("Fect", "Cy", "D"), list("Bitdiddle", "Ben")))');

process_query('assert(address(list("Tweakit", "Lem", "E"), list("Boston", list("Bay", "State", "Road"), 22)))');
process_query('assert(job(list("Tweakit", "Lem", "E"), list("computer", "technician")))');
process_query('assert(salary(list("Tweakit", "Lem", "E"), 51000))');
process_query('assert(supervisor(list("Tweakit", "Lem", "E"), list("Bitdiddle", "Ben")))');

process_query('assert(address(list("Reasoner", "Louis"), list("Slumerville", list("Pine", "Tree", "Road"), 80)))');
process_query('assert(job(list("Reasoner", "Louis"), list("computer", "programmer", "trainee")))');
process_query('assert(salary(list("Reasoner", "Louis"), 62000))');
process_query('assert(supervisor(list("Reasoner", "Louis"), list("Hacker", "Alyssa", "P")))');

process_query('assert(supervisor(list("Bitdiddle", "Ben"), list("Warbucks", "Oliver")))');

process_query('assert(address(list("Warbucks", "Oliver"), list("Swellesley", list("Top", "Heap", "Road"))))');
process_query('assert(job(list("Warbucks", "Oliver"), list("administration", "big", "wheel")))');
process_query('assert(salary(list("Warbucks", "Oliver"), 314159))');

process_query('assert(address(list("Scrooge", "Eben"), list("Weston", list("Shady", "Lane"), 10)))');
process_query('assert(job(list("Scrooge", "Eben"), list("accounting", "chief", "accountant")))');
process_query('assert(salary(list("Scrooge", "Eben"), 141421))');
process_query('assert(supervisor(list("Scrooge", "Eben"), list("Warbucks", "Oliver")))');

process_query('assert(address(list("Cratchit", "Robert"), list("Allston", list("N", "Harvard", "Street"), 16)))');
process_query('assert(job(list("Cratchit", "Robert"), list("accounting", "scrivener")))');
process_query('assert(salary(list("Cratchit", "Robert"), 26100))');
process_query('assert(supervisor(list("Cratchit", "Robert"), list("Scrooge", "Eben")))');

process_query('assert(address(list("Aull", "DeWitt"), list("Slumerville", list("Onion", "Square"), 5)))');
process_query('assert(job(list("Aull", "DeWitt"), list("administration", "assistant")))');
process_query('assert(salary(list("Aull", "DeWitt"), 42195))');
process_query('assert(supervisor(list("Aull", "DeWitt"), list("Warbucks", "Oliver")))');

process_query('assert(can_do_job(list("computer", "wizard"), list("computer", "programmer")))');
process_query('assert(can_do_job(list("computer", "wizard"), list("computer", "technician")))');

process_query('assert(can_do_job(list("computer", "programmer"), list("computer", "programmer", "trainee")))');

process_query('assert(can_do_job(list("administration", "assistant"), list("administration", "big", "wheel")))');

const my_query = `
supervisor($x, list("Bitdiddle", "Ben"))
`;

process_query(my_query);

// Expected result

// "supervisor(list(\"Tweakit\", \"Lem\", \"E\"), list(\"Bitdiddle\", \"Ben\"))"
// "supervisor(list(\"Fect\", \"Cy\", \"D\"), list(\"Bitdiddle\", \"Ben\"))"
// "supervisor(list(\"Hacker\", \"Alyssa\", \"P\"), list(\"Bitdiddle\", \"Ben\"))"

//Question 2
process_query(`assert(address(list("Bitdiddle", "Ben"),
                              list("Slumerville", list("Ridge", "Road"), 10)))`);
process_query(`assert(job(list("Bitdiddle", "Ben"), 
                          list("computer", "wizard")))`);
process_query(`assert(salary(list("Bitdiddle", "Ben"), 122000))`);

process_query('assert(address(list("Hacker", "Alyssa", "P"), list("Cambridge", list("Mass", "Ave"), 78)))');
process_query('assert(job(list("Hacker", "Alyssa", "P"), list("computer", "programmer")))');
process_query('assert(salary(list("Hacker", "Alyssa", "P"), 81000))');
process_query('assert(supervisor(list("Hacker", "Alyssa", "P"), list("Bitdiddle", "Ben")))');

process_query('assert(address(list("Fect", "Cy", "D"), list("Cambridge", list("Ames", "Street"), 3)))');
process_query('assert(job(list("Fect", "Cy", "D"), list("computer", "programmer")))');
process_query('assert(salary(list("Fect", "Cy", "D"), 70000))');
process_query('assert(supervisor(list("Fect", "Cy", "D"), list("Bitdiddle", "Ben")))');

process_query('assert(address(list("Tweakit", "Lem", "E"), list("Boston", list("Bay", "State", "Road"), 22)))');
process_query('assert(job(list("Tweakit", "Lem", "E"), list("computer", "technician")))');
process_query('assert(salary(list("Tweakit", "Lem", "E"), 51000))');
process_query('assert(supervisor(list("Tweakit", "Lem", "E"), list("Bitdiddle", "Ben")))');

process_query('assert(address(list("Reasoner", "Louis"), list("Slumerville", list("Pine", "Tree", "Road"), 80)))');
process_query('assert(job(list("Reasoner", "Louis"), list("computer", "programmer", "trainee")))');
process_query('assert(salary(list("Reasoner", "Louis"), 62000))');
process_query('assert(supervisor(list("Reasoner", "Louis"), list("Hacker", "Alyssa", "P")))');

process_query('assert(supervisor(list("Bitdiddle", "Ben"), list("Warbucks", "Oliver")))');

process_query('assert(address(list("Warbucks", "Oliver"), list("Swellesley", list("Top", "Heap", "Road"))))');
process_query('assert(job(list("Warbucks", "Oliver"), list("administration", "big", "wheel")))');
process_query('assert(salary(list("Warbucks", "Oliver"), 314159))');

process_query('assert(address(list("Scrooge", "Eben"), list("Weston", list("Shady", "Lane"), 10)))');
process_query('assert(job(list("Scrooge", "Eben"), list("accounting", "chief", "accountant")))');
process_query('assert(salary(list("Scrooge", "Eben"), 141421))');
process_query('assert(supervisor(list("Scrooge", "Eben"), list("Warbucks", "Oliver")))');

process_query('assert(address(list("Cratchit", "Robert"), list("Allston", list("N", "Harvard", "Street"), 16)))');
process_query('assert(job(list("Cratchit", "Robert"), list("accounting", "scrivener")))');
process_query('assert(salary(list("Cratchit", "Robert"), 26100))');
process_query('assert(supervisor(list("Cratchit", "Robert"), list("Scrooge", "Eben")))');

process_query('assert(address(list("Aull", "DeWitt"), list("Slumerville", list("Onion", "Square"), 5)))');
process_query('assert(job(list("Aull", "DeWitt"), list("administration", "assistant")))');
process_query('assert(salary(list("Aull", "DeWitt"), 42195))');
process_query('assert(supervisor(list("Aull", "DeWitt"), list("Warbucks", "Oliver")))');

process_query('assert(can_do_job(list("computer", "wizard"), list("computer", "programmer")))');
process_query('assert(can_do_job(list("computer", "wizard"), list("computer", "technician")))');

process_query('assert(can_do_job(list("computer", "programmer"), list("computer", "programmer", "trainee")))');

process_query('assert(can_do_job(list("administration", "assistant"), list("administration", "big", "wheel")))');

const my_query = `
  job($name, pair("accounting",$role))
`;

process_query(my_query);

// Expected result

// "supervisor(list(\"Tweakit\", \"Lem\", \"E\"), list(\"Bitdiddle\", \"Ben\"))"
// "supervisor(list(\"Fect\", \"Cy\", \"D\"), list(\"Bitdiddle\", \"Ben\"))"
// "supervisor(list(\"Hacker\", \"Alyssa\", \"P\"), list(\"Bitdiddle\", \"Ben\"))"

//Question 3
process_query(`assert(address(list("Bitdiddle", "Ben"),
                              list("Slumerville", list("Ridge", "Road"), 10)))`);
process_query(`assert(job(list("Bitdiddle", "Ben"), 
                          list("computer", "wizard")))`);
process_query(`assert(salary(list("Bitdiddle", "Ben"), 122000))`);

process_query('assert(address(list("Hacker", "Alyssa", "P"), list("Cambridge", list("Mass", "Ave"), 78)))');
process_query('assert(job(list("Hacker", "Alyssa", "P"), list("computer", "programmer")))');
process_query('assert(salary(list("Hacker", "Alyssa", "P"), 81000))');
process_query('assert(supervisor(list("Hacker", "Alyssa", "P"), list("Bitdiddle", "Ben")))');

process_query('assert(address(list("Fect", "Cy", "D"), list("Cambridge", list("Ames", "Street"), 3)))');
process_query('assert(job(list("Fect", "Cy", "D"), list("computer", "programmer")))');
process_query('assert(salary(list("Fect", "Cy", "D"), 70000))');
process_query('assert(supervisor(list("Fect", "Cy", "D"), list("Bitdiddle", "Ben")))');

process_query('assert(address(list("Tweakit", "Lem", "E"), list("Boston", list("Bay", "State", "Road"), 22)))');
process_query('assert(job(list("Tweakit", "Lem", "E"), list("computer", "technician")))');
process_query('assert(salary(list("Tweakit", "Lem", "E"), 51000))');
process_query('assert(supervisor(list("Tweakit", "Lem", "E"), list("Bitdiddle", "Ben")))');

process_query('assert(address(list("Reasoner", "Louis"), list("Slumerville", list("Pine", "Tree", "Road"), 80)))');
process_query('assert(job(list("Reasoner", "Louis"), list("computer", "programmer", "trainee")))');
process_query('assert(salary(list("Reasoner", "Louis"), 62000))');
process_query('assert(supervisor(list("Reasoner", "Louis"), list("Hacker", "Alyssa", "P")))');

process_query('assert(supervisor(list("Bitdiddle", "Ben"), list("Warbucks", "Oliver")))');

process_query('assert(address(list("Warbucks", "Oliver"), list("Swellesley", list("Top", "Heap", "Road"))))');
process_query('assert(job(list("Warbucks", "Oliver"), list("administration", "big", "wheel")))');
process_query('assert(salary(list("Warbucks", "Oliver"), 314159))');

process_query('assert(address(list("Scrooge", "Eben"), list("Weston", list("Shady", "Lane"), 10)))');
process_query('assert(job(list("Scrooge", "Eben"), list("accounting", "chief", "accountant")))');
process_query('assert(salary(list("Scrooge", "Eben"), 141421))');
process_query('assert(supervisor(list("Scrooge", "Eben"), list("Warbucks", "Oliver")))');

process_query('assert(address(list("Cratchit", "Robert"), list("Allston", list("N", "Harvard", "Street"), 16)))');
process_query('assert(job(list("Cratchit", "Robert"), list("accounting", "scrivener")))');
process_query('assert(salary(list("Cratchit", "Robert"), 26100))');
process_query('assert(supervisor(list("Cratchit", "Robert"), list("Scrooge", "Eben")))');

process_query('assert(address(list("Aull", "DeWitt"), list("Slumerville", list("Onion", "Square"), 5)))');
process_query('assert(job(list("Aull", "DeWitt"), list("administration", "assistant")))');
process_query('assert(salary(list("Aull", "DeWitt"), 42195))');
process_query('assert(supervisor(list("Aull", "DeWitt"), list("Warbucks", "Oliver")))');

process_query('assert(can_do_job(list("computer", "wizard"), list("computer", "programmer")))');
process_query('assert(can_do_job(list("computer", "wizard"), list("computer", "technician")))');

process_query('assert(can_do_job(list("computer", "programmer"), list("computer", "programmer", "trainee")))');

process_query('assert(can_do_job(list("administration", "assistant"), list("administration", "big", "wheel")))');

const my_query = `
  address($person, pair("Slumerville", $rest))
`;

process_query(my_query);

// Expected result

// "supervisor(list(\"Tweakit\", \"Lem\", \"E\"), list(\"Bitdiddle\", \"Ben\"))"
// "supervisor(list(\"Fect\", \"Cy\", \"D\"), list(\"Bitdiddle\", \"Ben\"))"
// "supervisor(list(\"Hacker\", \"Alyssa\", \"P\"), list(\"Bitdiddle\", \"Ben\"))"

//Question 4
process_query(`assert(
rule(same($x, $x)))`);

process_query(`assert(
rule(member($x, null, null))		     
)`);

process_query(`assert(
rule(member($x, pair($x, $ys), pair($x, $ys))
    )
)`);

process_query(`assert(
rule(member($x, pair($u, $ys), $zs),
     and(member($x, $ys, $zs),
         not(same($x, $u))
        )
	)   
)`);

// TESTING
     
first_answer(`member("a", list("a", "b", "c", "d"), $zs)`);
first_answer(`member("c", list("a", "b", "c", "d"), $zs)`);
first_answer(`member("e", list("a", "b", "c", "d"), $zs)`);
first_answer(`member($x, list("a", "b", "c", "d"), 
                        list("a", "b", "c", "d"))`);
first_answer(`member($x, list("a", "b", "c", "d"), 
                        list("c", "d"))`);

----------------------------------------------------------------------------------------------------

