Others: Practice Practical Assessment 1

//Question 1
function make_k_list(k, d) {
    return d === 0
            ? 0
            : map(x=>make_k_list(k,d-1),enum_list(1,k));
}

display_list(make_k_list(2,3));

//Question 2
function sum_k_list(klist) {
    return is_null(klist)
            ? 0
            : is_pair(klist)
                ? accumulate(
                    (x,y)=>y+sum_k_list(x),
                     0,
                     klist
                    )
                : klist;
}

//Question 3
function map_k_list(f, klist) {
    return is_null(klist)
            ? null 
            : is_pair(klist)
                ? map(x=> map_k_list(f,x),klist)
                : f(klist);
}

//Question 4
function route_distance(mat, route) {
    let dist = 0;
    for(let xs=route;!is_null(tail(xs));xs=tail(xs)){
        dist = dist + mat[head(xs)][head(tail(xs))];
    }
    return dist;
}

//Question 5
// The route_distance function for the preceding task has been
// pre-declared here for you to use in this task.
// Do not declare your own route_distance function.
/*
function route_distance(mat, route) {
    // Pre-declared
}
*/

function shortest_paper_route(n, mat, start) {

    let shortest_route = null;
    let shortest_dist = Infinity;
    
    function permutations(ys) {
        return is_null(ys)
            ? list(null)
            : accumulate(append, null,
                map(x => map(p => pair(x, p),
                             permutations(remove(x, ys))),
                    ys));
    }
    
    for(let ys=permutations(enum_list(0,n-1));!is_null(ys);ys=tail(ys)){
        if(head(head(ys)) === start){
            let cur_dist = route_distance(mat,append(head(ys),list(start)));
            if(cur_dist < shortest_dist){
                shortest_route = head(ys);
                shortest_dist = cur_dist;
            }
        }
    }
    return pair(append(shortest_route,list(start)),shortest_dist);
}

//Question 6
function make_postfix_exp(bae) {
    if(!is_array(bae)){
        return [bae];
    }
    const first = make_postfix_exp(bae[0]);
    const second = make_postfix_exp(bae[2]);
    const third = bae[1];
    const first_array_length=array_length(first);
    for(let i=0;i<array_length(second);i=i+1){
        first[i+first_array_length]=second[i];
    }
    first[array_length(first)]=third;
    return first;
}

//Question 7
function eval_postfix_exp(pfe) {

    if(array_length(pfe)===1){
        return pfe[0];
    }

    const symbol = pfe[array_length(pfe) - 1];
    const left = [];
    const right = [];
    let cnt_operator=0;
    let cnt_operand=0;
    let i=array_length(pfe)-2;
    while(i>=0){
        if(is_number(pfe[i])){
            cnt_operand=cnt_operand+1;
        }
        else{
            cnt_operator=cnt_operator+1;
        }
        if(cnt_operand===cnt_operator+1){
            break;
        }
        i=i-1;
    }
    if(i===-1){
        left[0]=pfe[0];
        right[0]=pfe[2];
    }
    else{
        for(let j=0;j<i;j=j+1){
            left[j]=pfe[j];
        }
    
        for(let k=i;k<=array_length(pfe)-2;k=k+1){
            right[k-i]=pfe[k];
        }
    }

    if(symbol==="+"){
        return eval_postfix_exp(left) + eval_postfix_exp(right);
    }
    else if(symbol==="-"){
        return eval_postfix_exp(left) - eval_postfix_exp(right);

    }
    else if(symbol==="*"){
        return eval_postfix_exp(left) * eval_postfix_exp(right);

    }
    else{
        return eval_postfix_exp(left) / eval_postfix_exp(right);
    }
    
}


----------------------------------------------------------------------------------------------------

Others: Practice Practical Assessment 2

//Question 1
function delta_encode(L) {
    let prev=0;
    return map(
            x=>{
                let delta =x-prev;
                prev=x;
                return delta;
            },
            L);
}
delta_encode(list(3,4,6,-2,-2));

//Question 2
function delta_decode(D) {
    let delta=0;
    return map(
        x=>{
            delta=x+delta;
            return delta;
        },
        D);

}

//Question 3
function runlength_encode(L) {
    if(is_null(L)){
        return L;
    }
    let prev=head(L);
    let cnt=1;
    let ans=null;
    for(let xs=tail(L);!is_null(xs);xs=tail(xs)){
        if(head(xs) !== prev){
            if(cnt===1){
                ans=pair(prev,ans);
            }
            else{
                ans=pair(pair(prev,cnt),ans);
                }
            prev=head(xs);
            cnt=1;
        }
        else{
            cnt=cnt+1;
        }
    }
    if(cnt===1){
        ans=pair(prev,ans);
    }
    else{
        ans=pair(pair(prev,cnt),ans);
    }
    return reverse(ans);
    
}

//Question 4
function runlength_decode(R) {
    let ans=null;
    for(let xs=R;!is_null(xs);xs=tail(xs)){
        if(is_pair(head(xs))){
            for(let i=0;i<tail(head(xs));i=i+1){
                ans=pair(head(head(xs)),ans);
            }
        }
        else{
            ans=pair(head(xs),ans);
        }
    }
    return reverse(ans);
}

//Question 5
// Feel free to use these functions:
const get_x = (aar) => list_ref(aar, 0);
const get_y = (aar) => list_ref(aar, 1);
const get_width = (aar) => list_ref(aar, 2);
const get_height = (aar) => list_ref(aar, 3);


function smallest_bounding_AAR_area(rs) {
    let x1=Infinity;
    let y1=Infinity;
    let x2=-Infinity;
    let y2= -Infinity;
    for(let xs=rs;!is_null(xs);xs=tail(xs)){
        x1=math_min(x1,get_x(head(xs)));
        y1=math_min(y1,get_y(head(xs)));
        x2=math_max(x2,get_x(head(xs)) + get_width(head(xs)));
        y2=math_max(y2,get_y(head(xs)) + get_height(head(xs)));
    }
    return (x2-x1)*(y2-y1);
}


//Question 6
// Feel free to use these functions:
const get_x = (aar) => list_ref(aar, 0);
const get_y = (aar) => list_ref(aar, 1);
const get_width = (aar) => list_ref(aar, 2);
const get_height = (aar) => list_ref(aar, 3);


function optimized_smallest_bounding_AAR_area(rs) {
    function helper(rs,max_width,max_height){
        return is_null(rs)
                ? max_width*max_height
                : math_min(
                    helper(
                        tail(rs),
                        math_max(max_width,get_width(head(rs))),
                        math_max(max_height,get_height(head(rs)))
                        ),
                    helper(
                        tail(rs),
                        math_max(max_width,get_height(head(rs))),
                        math_max(max_height,get_width(head(rs)))
                        )
                    );
    }
    return helper(rs,-Infinity,-Infinity);
}

//Question 7
// Feel free to use these functions:
const get_x = (aar) => list_ref(aar, 0);
const get_y = (aar) => list_ref(aar, 1);
const get_width = (aar) => list_ref(aar, 2);
const get_height = (aar) => list_ref(aar, 3);


function overlap_area(aar1, aar2) {
    const x2_A=get_x(aar1)+get_width(aar1);
    const y2_A=get_y(aar1)+get_height(aar1);
    const x2_B=get_x(aar2)+get_width(aar2);
    const y2_B=get_y(aar2)+get_height(aar2);
    return math_max(
    0,
    (math_min(x2_A,x2_B)-
            math_max(get_x(aar1),get_x(aar2)))*
    ( math_min(y2_A,y2_B)-
           math_max(get_y(aar1),get_y(aar2)))
          );
          
}

----------------------------------------------------------------------------------------------------

Others: Mock Practical Assessment (Mock PA)

//Question 1
function is_pa_word(s) {
    return !is_null(filter(word=>word===s,pa_words));
}

//Question 2
function count_matches(char, pos) {
    return length(filter(word=>char_at(word,pos)===char,pa_words));
}

// testing

// count_matches("q", 2);  // should return 3
// count_matches("y", 26); // should return 1

//Question 3
// your helper functions go here

function char_stream(s) {
    function helper(idx){
        return is_null(s)
                ? null
                : pair(char_at(s,idx),()=>helper(idx+1));
    }
    return helper(0);
}

// testing

// const my_stream = char_stream("hello");
// stream_ref(my_stream, 4);  // returns "o"

//Question 4
function solve(n, constraints) {
    return filter(
        word => string_length(word) === n &&
                accumulate(
                    (constraint,fulfilled) => fulfilled && (char_at(word,head(constraint)) === tail(constraint)),
                    true,
                    constraints
                    ),
        pa_words
        );
}

// testing

// display_list(solve(13, list(pair(2, "s"), pair(4, "u"), pair(7, "e"), pair(9, "u"))));
          // should display list("resourcefully")

//Question 5
function eval_poly(poly) {
    return x => accumulate(
                    (term,acc)=> acc + head(term) * math_pow(x,tail(term)),
                    0,
                    poly);
}


//Question 6
function add_poly(poly1, poly2) {
    if (is_null(poly1)) {
        
        return poly2;
    } else if (is_null(poly2)) {
        
        return poly1;
    } else {
        const coeff1 = head(head(poly1));
        const coeff2 = head(head(poly2));
        const exp1 = tail(head(poly1));
        const exp2 = tail(head(poly2));

        if (exp1 === exp2) {
            return coeff1+coeff2 === 0
                    ? add_poly(tail(poly1),tail(poly2))
                    : pair(pair(coeff1+coeff2,exp1),add_poly(tail(poly1),tail(poly2)));

        } else if (exp1 < exp2) {
            return pair(head(poly1),add_poly(tail(poly1),poly2));
        } else {
              return pair(head(poly2),add_poly(poly1,tail(poly2)));
        }
    }
}

add_poly(list(pair(2, 0), pair(3, 2), pair(-5, 3), pair(8, 6)),
list(pair(1, 1), pair(4, 2), pair(5, 3), pair(9, 5)));

//Question 7
// The add_poly function for the preceding task has been
// pre-declared here for you to use in this task.
// Do not declare your own add_poly function.
/*
function add_poly(poly1, poly2) {
    // Pre-declared
}
*/

function multiply_poly(poly1, poly2) {
    return accumulate(
        (term_1,acc) => 
        add_poly(acc,map(term_2=>pair(head(term_1)*head(term_2),tail(term_1)+tail(term_2)),poly2)),
        null ,
        poly1
        );
}

//Question 8
// Question was left blank by the student.

----------------------------------------------------------------------------------------------------

Others: Practice Practical Assessment 3 (formerly Mock PA)

//Question 1
function is_pa_word(s) {
    return !is_null(filter(word=>word===s,pa_words));
}

//Question 2
function count_matches(char, pos) {
    return length(filter(word=>char_at(word,pos)===char,pa_words));
}


//Question 3
// your helper functions go here

function char_stream(s) {
    function helper(idx){
        return is_null(s)
                ? null
                : pair(char_at(s,idx),()=>helper(idx+1));
    }
    return helper(0);
}


//Question 4
function solve(n, constraints) {
    return filter(
        word => string_length(word) === n &&
                accumulate(
                    (constraint,fulfilled) => fulfilled && (char_at(word,head(constraint)) === tail(constraint)),
                    true,
                    constraints
                    ),
        pa_words
        );
}

// testing

// display_list(solve(13, list(pair(2, "s"), pair(4, "u"), pair(7, "e"), pair(9, "u"))));
          // should display list("resourcefully")

//Question 5
function eval_poly(poly) {
    return x => accumulate(
                    (term,acc)=> acc + head(term) * math_pow(x,tail(term)),
                    0,
                    poly);
}


//Question 6
function add_poly(poly1, poly2) {
    if (is_null(poly1)) {
        
        return poly2;
    } else if (is_null(poly2)) {
        
        return poly1;
    } else {
        const coeff1 = head(head(poly1));
        const coeff2 = head(head(poly2));
        const exp1 = tail(head(poly1));
        const exp2 = tail(head(poly2));

        if (exp1 === exp2) {
            return coeff1+coeff2 === 0
                    ? add_poly(tail(poly1),tail(poly2))
                    : pair(pair(coeff1+coeff2,exp1),add_poly(tail(poly1),tail(poly2)));

        } else if (exp1 < exp2) {
            return pair(head(poly1),add_poly(tail(poly1),poly2));
        } else {
              return pair(head(poly2),add_poly(poly1,tail(poly2)));
        }
    }
}

//Question 7
// The add_poly function for the preceding task has been
// pre-declared here for you to use in this task.
// Do not declare your own add_poly function.
/*
function add_poly(poly1, poly2) {
    // Pre-declared
}
*/
function multiply_poly(poly1, poly2) {
    return accumulate(
        (term_1,acc) => 
        add_poly(acc,map(term_2=>pair(head(term_1)*head(term_2),tail(term_1)+tail(term_2)),poly2)),
        null ,
        poly1
        );
}

//Question 8
function alt_column_matrix(R, C) {
    const M = [];
    let cnt=1;
    let up_to_down=true;
    for(let i=0;i<R;i=i+1){
        M[i]=[];
    }
    for(let j=0;j<C;j=j+1){
        if(up_to_down){
            for(let i=0;i<R;i=i+1){
                M[i][j]=cnt;
                cnt=cnt+1;
            }
        
        }else{
            for(let i=R-1;i>=0;i=i-1){
                M[i][j]=cnt;
                cnt=cnt+1;
            }
        }
        up_to_down=!up_to_down;
    }
    return M;
}

----------------------------------------------------------------------------------------------------

Others: Practical Assessment (PA)

//Question 1
// TASK 1A

// You may write helper functions here.


function insert_subseq(L, pos, S) {
    let ans=null;
    let ptr=L;
    let ptr_2=S;
    for(let i=0;i<pos;i=i+1){
        ans=pair(head(ptr),ans);
        ptr=tail(ptr);
    }
    for(let j=0;j<length(S);j=j+1){
        ans=pair(head(ptr_2),ans);
        ptr_2=tail(ptr_2);
    }
    for(let xs=ptr;!is_null(ptr);ptr=tail(ptr)){
        ans=pair(head(ptr),ans);
    }
    return reverse(ans);
}

//Question 2
// TASK 1B

// You may write helper functions here.


function remove_subseq(L, start_pos, end_pos){
    let i=0;
    return filter(x=>{
        const keep=! (start_pos<=i && i<=end_pos);
        i=i+1;
        return keep;
    },L);

}


//Question 3
// TASK 2A

// You may write helper functions here.


function is_prefix_of(subseq, seq) {
    if(length(subseq)>length(seq)){
        return false;
    }
    let ptr1=subseq;
    let ptr2=seq;
    while(!is_null(ptr1)){
        if(head(ptr1)!==head(ptr2)){
            return false;
        }
        ptr1=tail(ptr1);
        ptr2=tail(ptr2);
    }
    return true;

}

//Question 4
// TASK 2B

// The following function(s) have been pre-declared here for you
// to use in this task. Do not re-declare them.
/*
function is_prefix_of(subseq, seq) {
    // Implementation not shown.
}
*/

// You may write helper functions here.


function tail_n_times(xs, n) {
    return is_null(xs)
           ? null
           : n <= 0
           ? xs
           : tail_n_times(tail(xs), n - 1);
}


function subseq_replace(new_sub, old_sub, seq) {
    let ptr1=seq;
    let ans=null;
    while(!is_null(ptr1)){
        if(is_prefix_of(old_sub,ptr1)){
            ans=append(ans,new_sub);
            ptr1=tail_n_times(ptr1,length(old_sub));
            continue;
        }else{
            ans=append(ans,list(head(ptr1)));
        }
        ptr1=tail(ptr1);
    }
    return ans;
}

//Question 5
// TASK 3A

// You may write helper functions here.


function make_NiFT(T) {
    let ans1=null;
    let ans2=null;
    let ptr1=T;
    while(!is_null(ptr1)){
        if(is_number(head(ptr1))){
            ans1=pair(head(ptr1),ans1);
        }
        else{
            ans2=pair(make_NiFT(head(ptr1)),ans2);
        }
        ptr1=tail(ptr1);
    }
    return append(reverse(ans1),reverse(ans2));
}

//Question 6
// TASK 3B
function insert(x, xs) {
    return is_null(xs)
           ? list(x)
           : x <= head(xs)
           ? pair(x, xs)
           : pair(head(xs), insert(x, tail(xs)));
}

function insertion_sort(xs) {
    return is_null(xs)
           ? xs
           : insert(head(xs), insertion_sort(tail(xs)));
}

function map_tree(fun, tree) {
    return map(sub_tree =>
                   !is_list(sub_tree)
                   ? fun(sub_tree)
                   : map_tree(fun, sub_tree),
               tree);
}

function flatten_tree(T){
    return accumulate(
        (x,acc)=>is_pair(x)
                    ? append(flatten_tree(x),acc)
                    : is_null(x)
                        ? acc
                        : pair(x,acc),
        null,
        T);
}

function make_SToN(T) {
    let sorted=insertion_sort(flatten_tree(T));
    return map_tree(
        x=>{
            if(is_null(x)){
                return x;
            }
            const y=head(sorted);
            sorted=tail(sorted);
            return y;
        }
        ,T);
}

//Question 7
// TASK 4

// You may write helper functions here.


function shortest_path_length(maze, start_row, start_col) {

    const nrows = array_length(maze);
    const ncols = array_length(maze[0]);
    if(start_row<0 || start_row >= nrows || start_col<0 || start_col >= ncols || (maze[start_row][start_col]==="#")){
        return Infinity;
    }
    else if(maze[start_row][start_col]==="G"){
        return 0;
    }
    maze[start_row][start_col]="#";
    const ans = math_min(
        shortest_path_length(maze,start_row-1,start_col),
        shortest_path_length(maze,start_row+1,start_col),
        shortest_path_length(maze,start_row,start_col-1),
        shortest_path_length(maze,start_row,start_col+1)
        )+1;
    
    maze[start_row][start_col]=".";
    return ans;
}


----------------------------------------------------------------------------------------------------
