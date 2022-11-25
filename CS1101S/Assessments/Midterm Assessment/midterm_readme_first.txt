
Please take note of the following main changes to the LISTS functions of Source §2, implemented in Source Academy, prior to AY2021/2022 Semester 1.

(1) The implementations of the following pre-declared functions in Source Academy prior to AY2021/2022 Sem 1 give rise to recursive processes:

    map
    accumulate
    filter
    append
    remove
    remove_all
    enum_list

    Their implementations in Source Academy since AY2021/2022 Sem 1 give rise to iterative processes.


(2) The order of the parameters of build_list function is different:

    * Prior to AY2021/2022 Sem 1:

        function build_list(n, fun) {
            ...
        }

    * Since AY2021/2022 Sem 1:

        function build_list(fun, n) {
            ...
        }
