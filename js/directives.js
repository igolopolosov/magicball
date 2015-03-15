angular.module('directives', [])
    .directive('recordColor', function () {
        return function (scope, element) {
            switch (scope.q.AnswerType) {
                case 'Положительный':
                    element.addClass('bg-success');
                    break;
                case 'Нерешительно положительный':
                    element.addClass('bg-info');
                    break;
                case 'Нейтральный':
                    element.addClass('bg-warning');
                    break;
                case 'Отрицательный':
                    element.addClass('bg-danger');
                    break;
            }
        }
    });