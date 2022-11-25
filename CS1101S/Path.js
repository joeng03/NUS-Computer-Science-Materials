Path: Elements of Programming

//Question 1
1

//Question 2
1

//Question 3
const foo = 10;
const bar = 10 + 20;
// your solution goes here
const foobar=foo+bar;
//foobar;

//Question 4
// your solution goes here
function bar(){
    return 20;
}
//bar();

//Question 5
function square(x) {
    return x * x;
}

// your solution goes here

function square_of_difference(x,y){
    return square(x-y);
}

----------------------------------------------------------------------------------------------------

Path: Runology

//Question 1
1

//Question 2
1

//Question 3
3

//Question 4
// The following are PREDECLARED:
// red, blue, stack, heart, nova, show
// Please do not import them.

function love(rune) {
    // edit the return expression
    return stack(red(heart),rune);
}

show(love(blue(nova)));

// To view the rune, click on the blinking icon on the right panel to see the image.
// Don't forget to click on the airplane icon to run the tests :)
// As a reminder, if the tests are open, then the run button will run all tests.

//Question 5
// The following are PREDECLARED:
// show, stackn, quarter_turn_left, quarter_turn_right, turn_upside_down,
// and all the basic runes: nova, heart, etc.
// Please do not import them.
// Do not import the beside, besiden, beside_frac functions.
// They will not work.

function besiden(n, rune) {
    // edit the return expression
    return quarter_turn_left(stackn(n,quarter_turn_right(rune)));
}

show(besiden(5, heart));

// To view the rune, click on the blinking icon on the right panel to see the image.
// Don't forget to click on the airplane icon to run the tests :)
// As a reminder, if the tests are open, then the run button will run all tests.

//Question 6
1

----------------------------------------------------------------------------------------------------

Path: Substitution model and Recursion

//Question 1
0

//Question 2
1

//Question 3
1

//Question 4
1

//Question 5
0

//Question 6
1

//Question 7
0

//Question 8
2

//Question 9
1

----------------------------------------------------------------------------------------------------

Path: Orders of Growth

//Question 1
1

//Question 2
1

//Question 3
1

//Question 4
0

//Question 5
3

//Question 6
2

//Question 7
3

//Question 8
1

----------------------------------------------------------------------------------------------------

Path: Recursion, HOF and Scoping

//Question 1
const DONT_CARE = undefined; // Ignore this, do not edit.

// When thinking about base cases,
// do the simplest thing possible
// and leave the hard work to the computer.

function choose(n, r) {
    return (r < 0 || r > n) 
           ? 0
           : (r === 0 || n === r) 
	       ? 1
           : DONT_CARE; // DO NOT EDIT.
}

//Question 2
// Suppose you need to choose R items from N items.
// Consider the first item.
// - We can either choose it, or not choose it.

// If we choose the first item:
// - How many more items must we choose from the remaining N - 1 items?
const CHOOSE_FIRST_ITEM = choose(N-1, R-1);

// If we don't choose the first item:
// - How many more items must we choose from the remaining N - 1 items?
const NOT_CHOOSE_FIRST_ITEM = choose(N-1, R); 

// Express your answers in terms of choose, N and R.
// They have been pre-declared.

//Question 3
function choose(n, r) {
    return (r < 0 || r > n) 
           ? 0
           : (r === 0 || n === r)
	       ? 1
           : choose(n - 1,r - 1) + choose(n - 1,r);
}



//Question 4
// Sum the first n odd natural numbers.
function sum_odd(n) {
    const a = 1;
    const b = 2 * n - 1;
    function term(x){
        return x;
    }
    function next(x){
        return x+2;
    }
    return sum(term,a,next,b);
    //could also use lambda functions, i.e.
    // sum(x => x, 1, x => x + 2, 2 * n - 1);
}

//Question 5
// Sum the first n odd numbers less than or equal to n.
function sum_odd_lte(n) {
    const a = 1;
    const b = n;
    function term(x){
        return x;
    }
    function next(x){
        return x+2;
    }
    return sum(term,a,next,b);
}

//Question 6
function accumulate(combiner, term, a, next, b, base) {
    return a > b
        ? base
        : combiner(term(a),
                    accumulate(combiner,term,next(a),next,b,base));
}

// Example uses:

// function sum(term, a, next, b) {
//   return accumulate( (x, y) => x + y, term, a, next, b, 0);
// }

// function product(term, a, next, b) {
//   return accumulate( (x, y) => x * y, term, a, next, b, 1);
// }

// function fact(n) {
//     return product(x => x, 1, x => x + 1, n);
// }

----------------------------------------------------------------------------------------------------

Path: Curves

//Question 1
function diagonal(t) {
    return make_point(t,t);
}

// Test
draw_points(50)(diagonal);

//Question 2
function unit_square(t) {
    return t <= 0.25
            ? make_point(4 * t,0)
            : t <= 0.5
                ? make_point(1,4 * t - 1)
                : t <=0.75
                    ? make_point(-4 * t + 3,1)
                    : make_point(0,-4 * t + 4);
}

// Test
draw_points_full_view_proportional(80)(unit_square);

----------------------------------------------------------------------------------------------------

Path: Data Abstraction

//Question 1
2

//Question 2
4

//Question 3
1

//Question 4
0

//Question 5
1

//Question 6
4

//Question 7
/* You can use only the following pre-declared functions in your solution:
- `make_rat`
- `numer`
- `denom`
- `add_rat`
- `sub_rat`
- `mul_rat`
- `div_rat`
- `equal_rat`
- `gcd`
*/

// Given two rational numbers rat1, rat2,
// return true iff rat1 <= rat2.

function lte(rat1, rat2) {
    const rat3=sub_rat(rat2,rat1);
    return numer(rat3) * denom(rat3) >= 0;
}
lte(make_rat(-1,1), make_rat(-1,2));

//Question 8
// The function lte has been pre-declared for you.
function gte(x, y) {
   return lte(y,x);
}

function eq(x, y) {
    return lte(x,y) && lte(y,x);
}

function lt(x, y) {
    return lte(x,y) && !eq(x,y);
}

function gt(x, y) {
    return !lte(x,y);
}

//Question 9
/* For reference:

function length(xs) {
    return is_null(xs) ? 0 : 1 + length(tail(xs));
}
*/

// Given a list of numbers xs,
// return the sum of all numbers in xs.

function sum(xs) {
    return is_null(xs)
            ? 0
            : head(xs) + sum(tail(xs));
}

----------------------------------------------------------------------------------------------------

Path: List and Tree Processing

//Question 1
// Produces a list of integers from a to b,
// assuming a, b are integers.

function enum_list(a, b) {
    return a > b
            ? null
                : a===b
                    ? list(b)
                    : pair(a,enum_list(a+1,b));
}

//Question 2
// Produces a list of integers from a to b,
// assuming a, b are integers.

function enum_list(a, b) {
    return build_list(x => x + a, b - a + 1);
}

//Question 3
// You must use the supplied filter function.

// Given a list of integers xs, returns a list that
//   contains only the odd integers in xs.
function odd_only(xs) {
    return filter(x => x % 2 === 1,xs);
}

// Given a list of positive integers xs, returns a list that
//   contains only the prime numbers in xs.
// Hint: write a helper function.


function prime_only(xs) {
    function isPrime(x,divisor){
        return x === 1
                ? false
                : divisor === 1
                    ? true
                    : x % divisor !== 0 && isPrime(x,divisor - 1);
    }
   return filter(x => isPrime(x,math_floor(math_sqrt(x))),xs);
}

display(prime_only(list(1, 2, 3)));

//Question 4
const display = custom_display; // DO NOT EDIT.

// Calls display on every item in the list xs.
function traverse(xs) {
    if (is_null(xs)){
        return null;
    }
    else{
        display(head(xs));
        return traverse(tail(xs));
    }
    
}


//Question 5
const display = custom_display; // DO NOT EDIT.

// Calls display on every item in the tree xs.
function traverse(xs) {
    if (is_null(xs)) {
        return null;
    } 
    else if(is_list(head(xs))){
        traverse(head(xs));
    }
    else{
        display(head(xs));
    }
    return traverse(tail(xs));
}

----------------------------------------------------------------------------------------------------

Path: Programming language processing

//Question 1
4

//Question 2
2

//Question 3
2

//Question 4
1

//Question 5
4

//Question 6
0

----------------------------------------------------------------------------------------------------

Path: Sorting

//Question 1
1

//Question 2
3

//Question 3
3

//Question 4
3

//Question 5
0

//Question 6
0

//Question 7
1

//Question 8
1

//Question 9
// put the first n elements of xs into a list
function take(xs, n) {
    return n === 0
            ? null
            : pair(head(xs),take(tail(xs),n - 1));
}

// drop the first n elements from list, return rest
function drop(xs, n) {
    return n === 0
            ? xs
            : drop(tail(xs),n - 1);
}

//Question 10
function min(a, b) {
    return a < b ? a : b;
}

// given a non-empty list xs, returns the smallest item in xs
function smallest(xs) {
    return is_null(tail(xs))
            ? head(xs)
            : min(head(xs),smallest(tail(xs)));
}

//Question 11
// removes the first instance of x from xs
function remove(x, xs) {
    return is_null(xs)
            ? null 
            : x === head(xs)
                ? tail(xs)
                : pair(head(xs),remove(x,tail(xs)));
}
remove(2, list(1,2,3));

//Question 12
function selection_sort(xs) {
    if (is_null(xs)) {
        return null;
    } else {
        const smallest_element = smallest(xs);
        return pair(smallest_element,selection_sort(remove(smallest_element,xs)));
    }
}

----------------------------------------------------------------------------------------------------

Path: Mutable Data

//Question 1
3

//Question 2
1

//Question 3
1

//Question 4
2

//Question 5
3

//Question 6
4

//Question 7
1

//Question 8
3

//Question 9
0

//Question 10
4

----------------------------------------------------------------------------------------------------

Path: Environment Model

//Question 1
1

//Question 2
4

//Question 3
1

//Question 4
3

//Question 5
3

//Question 6
3

//Question 7
0

//Question 8
0

//Question 9
2

//Question 10
2

//Question 11
3

//Question 12
3

//Question 13
1

//Question 14
3

//Question 15
1

----------------------------------------------------------------------------------------------------

Path: Arrays and Loops

//Question 1
2

//Question 2
3

//Question 3
3

//Question 4
2

//Question 5
4

//Question 6
5

//Question 7
4

//Question 8
1

//Question 9
function dot_product(A, B) {
    let acc=0;
    for(let i=0;i<array_length(A);i=i+1){
        acc=acc+A[i]*B[i];
    }
    return acc;
}

//Question 10
function accumulate_array(op, init, A) {
    function helper(init,idx){
        return idx===array_length(A)
                ? init
                : helper(op(init,A[idx]),idx+1);
    }
    return helper(init,0);
}

//Question 11
function filter_array(pred, A) {
    let idx=0;
    const filtered_arr=[];
    for(let i=0;i<array_length(A);i=i+1){
        if(pred(A[i])){
            filtered_arr[idx]=A[i];
            idx=idx+1;
        }
    }
    return filtered_arr;
}

//Question 12
function transpose(M) {
    const new_M=[];
        for(let c=0;c<array_length(M[0]);c=c+1){
            new_M[c]=[];
             for(let r=0;r<array_length(M);r=r+1){
                 new_M[c][r]=M[r][c];
             }
        }
    
    return new_M;
}
transpose([[1,2],[3,4]]);

----------------------------------------------------------------------------------------------------

Path: Searching and Sorting II; Memoization

//Question 1
1

//Question 2
4

//Question 3
1

//Question 4
2

//Question 5
3

//Question 6
3

//Question 7
3

//Question 8
function search_cond(A, cond) {
    for(let i = 0;i < array_length(A);i = i + 1){
        if(cond(A[i])){
            return i;
        }
    }
    return -1;
}

//Question 9
function insert(A, pos, x) {
    let i = array_length(A);
    while(i > pos){
        A[i]=A[i-1];
        i = i - 1;
    }
    A[pos] = x;
}
const A = [1, 2, 3, 4];
insert(A, 2, 9);
A;  // should now be [1, 2, 9, 3, 4]

//Question 10
function insertion_sort(A) {
    const ans = [];
    for(let i=0; i<array_length(A); i=i+1){
        const pos = search_cond(ans,x => x > A[i]);
        if(pos === -1){
            ans[array_length(ans)] = A[i];
        }else{
            insert(ans,pos,A[i]);
        }
            
    }
    return ans;
}

----------------------------------------------------------------------------------------------------

Path: Streams I

//Question 1
1

//Question 2
4

//Question 3
2

//Question 4
2

//Question 5
1

//Question 6
function n_of_n_stream() {
    function helper(a,b){
        return b === 0
                ? pair(a+1,()=>helper(a+1,a))
                : pair(a,()=>helper(a,b-1));
    }
    return helper(1,1);
}

//Question 7
function shorten_stream(s, k) {
    return k === 0 || is_null(s)
            ? null
            : pair(head(s),() => shorten_stream(stream_tail(s),k - 1));
}]

----------------------------------------------------------------------------------------------------

Path: Streams II

//Question 1
const alternating_ones = pair(1,()=>pair(-1,()=>alternating_ones)); 

//Question 2
function make_alternating_stream(s) {
    function helper(s,neg){
        return pair(neg*head(s),()=>helper(stream_tail(s),neg*-1));
    }
    return helper(s,1);
}

//Question 3
function zip_streams(s1, s2) {
    return pair(head(s1),()=>pair(head(s2),()=>zip_streams(stream_tail(s1),stream_tail(s2))));
}

//Question 4
function every_other(s) {
    return pair(head(s),()=>every_other(stream_tail(stream_tail(s))));
}

//Question 5
function partial_sums(s) {
    function helper(acc,s){
        return pair(acc + head(s),()=>helper(acc + head(s),stream_tail(s)));
    }
    return helper(0,s);
}

----------------------------------------------------------------------------------------------------

Path: Metalinguistic Abstraction

//Question 1
function evaluate(expr) { 
    return is_literal(expr)
           ? literal_value(expr)
           : is_operator_combination(expr)
           ? apply(operator_combination_operator_symbol(expr),
               list_of_values( 
                 list(operator_combination_first_operand(expr),
                      operator_combination_second_operand(expr))))
           : error(expr, "Unknown expression: ");
}
function list_of_values(exprs) {
    return map(evaluate, exprs); 
}

function apply(operator, operands) {
    const first_op = head(operands);
    const second_op = head(tail(operands));
    return operator === "+"
           ? first_op + second_op
           : operator === "-"
           ? first_op - second_op 
           : operator === "*" 
           ? first_op * second_op 
           : operator === "/" 
           ? first_op / second_op
           : error(operator, "Unknown operator");
}

function is_literal(component) {
    return is_tagged_list(component, "literal");
}
function literal_value(component) {    
    return head(tail(component));
}

function is_tagged_list(component, the_tag) {
    return is_pair(component) && head(component) === the_tag;
}

function is_operator_combination(component) {	    
    return is_tagged_list(component, "binary_operator_combination");
}
function operator_combination_operator_symbol(component) {
    return list_ref(component, 1);
}
function operator_combination_first_operand(component) {
    return list_ref(component, 2);
}
function operator_combination_second_operand(component) {
    return list_ref(component, 3);
}

function pretty_print_operator_combination(expr) {
    const op = operator_combination_operator_symbol(expr);
    const lhs = operator_combination_first_operand(expr);
    const rhs = operator_combination_second_operand(expr);
    return "(" + pretty_print_expression(lhs) + " " + op +
           " " +  pretty_print_expression(rhs) + ")";
}

function pretty_print_expression(expr) {
    return is_literal(expr)
            ? stringify(literal_value(expr))
            : pretty_print_operator_combination(expr);
}

function pretty_print(input) {
    return pretty_print_expression(parse(input)) + ";";
}

pretty_print("(1) + ((2));");

//Question 2
function evaluate(expr) { 
    return is_literal(expr)
           ? literal_value(expr)
           : is_operator_combination(expr)
           ? apply(operator_combination_operator_symbol(expr),
               list_of_values( 
                 list(operator_combination_first_operand(expr),
                      operator_combination_second_operand(expr))))
           : error(expr, "Unknown expression: ");
}
function list_of_values(exprs) {
    return map(evaluate, exprs); 
}

function apply(operator, operands) {
    const first_op = head(operands);
    const second_op = head(tail(operands));
    return operator === "+"
           ? first_op + second_op
           : operator === "-"
           ? first_op - second_op 
           : operator === "*" 
           ? first_op * second_op 
           : operator === "/" 
           ? first_op / second_op
           : error(operator, "Unknown operator");
}

function is_literal(component) {
    return is_tagged_list(component, "literal");
}
function literal_value(component) {    
    return head(tail(component));
}

function is_tagged_list(component, the_tag) {
    return is_pair(component) && head(component) === the_tag;
}

function is_operator_combination(component) {	    
    return is_tagged_list(component, "binary_operator_combination");
}

function operator_combination_operator_symbol(component) {
    return list_ref(component, 1);
}

function operator_combination_first_operand(component) {
    return list_ref(component, 2);
}

function operator_combination_second_operand(component) {
    return list_ref(component, 3);
}

function parse_and_evaluate(input) {
    return evaluate(parse(input));
}

parse_and_evaluate("1 + 2 * 3;");

//Question 3
function eval_array_expression(expr) {
    const arr=[];
    let idx=0;
    for(let els=array_elements(expr);!is_null(els);els=tail(els)){
        arr[idx]=evaluate(head(els));
        idx=idx+1;
    }
    return arr;
}
function evaluate(expr) { 
    return is_literal(expr)
           ? literal_value(expr)
           : is_operator_combination(expr)
           ? apply(operator_combination_operator_symbol(expr),
               list_of_values( 
                 list(operator_combination_first_operand(expr),
                      operator_combination_second_operand(expr))))
           : is_array_expression(expr)
           ? eval_array_expression(expr)
           : error(expr, "Unknown expression: ");
}
function list_of_values(exprs) {
    return map(evaluate, exprs); 
}

function apply(operator, operands) {
    const first_op = head(operands);
    const second_op = head(tail(operands));
    return operator === "+"
           ? first_op + second_op
           : operator === "-"
           ? first_op - second_op 
           : operator === "*" 
           ? first_op * second_op 
           : operator === "/" 
           ? first_op / second_op
           : error(operator, "Unknown operator");
}

function is_array_expression(expr) {
    return is_tagged_list(expr, "array_expression");
}

function array_elements(expr) {
    return head(tail(expr));
}

function is_literal(component) {
    return is_tagged_list(component, "literal");
}
function literal_value(component) {    
    return head(tail(component));
}

function is_tagged_list(component, the_tag) {
    return is_pair(component) && head(component) === the_tag;
}

function is_operator_combination(component) {	    
    return is_tagged_list(component, "binary_operator_combination");
}
function operator_combination_operator_symbol(component) {
    return list_ref(component, 1);
}
function operator_combination_first_operand(component) {
    return list_ref(component, 2);
}
function operator_combination_second_operand(component) {
    return list_ref(component, 3);
}
function parse_and_evaluate(input) {
    return evaluate(parse(input));
}
display_list(parse("[1,2+2];"));
parse_and_evaluate("[1, 2];");

----------------------------------------------------------------------------------------------------

