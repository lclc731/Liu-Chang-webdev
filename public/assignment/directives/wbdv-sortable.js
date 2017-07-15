/**
 * Created by ChangLiu on 7/6/17.
 */
/**
 * Created by ChangLiu on 7/14/17.
 */
(function () {
    angular
        .module('DirectiveLecture', [])
        .directive('wdDraggable', wdDraggable);


    function wdDraggable() {

        function linkFunction(scope, element) {
            var initialIndex = -1;
            var finalIndex = -1;

            $(element).sortable({
                start: function (event, ui) {
                    initialIndex = $(ui.item).index();
                },
                stop: function (event, ui) {
                    finalIndex = $(ui.item).index();
                    scope.model.sortWidgets(initialIndex, finalIndex);
                }
            });
        }

        return {
            link: linkFunction
        }
    }
})();

// (function () {
//     angular
//         .module('WbdvDirective', [])
//         .directive('wbdvSortable', makeSortable);
//
//     function makeSortable() {
//
//         var config = {
//             template: 'hello'
//         };
//         return config;
//
//     }
// })();


// var start = -1;
// var end = -1;
// $(element)
//     .sortable();
// // start: function(event, ui) {
// //     start = $(ui.item).index();
// // },
// // stop: function (event, ui) {
// //     end = $(ui.item).index();
// //     console.log(start, end);
// //
// //     if(end >= start){
// //         end = end + 1;
// //     }
// //     console.log(start, end);
// //     scope.callback({
// //         start : start,
// //         end : end
// //     });
// // }
//
// }
//
// // var directive = {
// //     restrict: 'ACE',
// //     scope : {
// //         callback : '&'
// //     },
// //     link : linkFunction,
// // };