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
