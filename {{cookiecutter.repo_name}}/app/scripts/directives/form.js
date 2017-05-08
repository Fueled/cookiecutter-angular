'use strict';

var app = angular.module('{{cookiecutter.base_app_name}}.directives');

app.directive('formFieldset', function() {
    return {
        require: '^form',
        templateUrl: 'views/partials/form/fieldset.html',
        restrict: 'A',
        scope: {
            'field': '=formFieldset',
            'valid': '=formFieldsetValid',
            'errors': '=formErrors',
            'model': '<formFieldsetModel',
        }
    };
});

app.directive('formFieldsetTextarea', function() {
    return {
        require: '^form',
        templateUrl: 'views/partials/form/fieldset-textarea.html',
        restrict: 'A',
        scope: {
            'field': '=formFieldsetTextarea',
            'valid': '=formFieldsetValid',
            'errors': '=formErrors',
            'model': '<formFieldsetModel',
        }
    };
});

// app.directive('validateTel', function(){
//     return {
//        restrict: 'A',
//        require: 'ngModel',
//        link: function(scope, ele, attrs, ctrl){

//             if (attrs.validateTel === 'true') {
//                 ctrl.$parsers.unshift(function(value) {
//                     var valid = '';
//                     if(value){
//                         valid = bcCountries.isValidNumber(bcCountries.formatNumber(value));
//                         ctrl.$setValidity('tel', valid);
//                     } else if (!attrs.required) {
//                         ctrl.$setValidity('tel', true);
//                     }

//                     ctrl.$setViewValue(bcCountries.formatNumber(value));
//                     ctrl.$render();

//                     return valid ? bcCountries.formatNumber(value) : '';
//                 });

//             }

//         }
//     };
// });

// app.directive('dateFieldValidator', [function () {
//     var validateDate = function (date, format) {
//         if (!date || !date.length) {
//             return true;
//         }
//         return moment(date, format.toUpperCase(), true).isValid();
//     };

//     return {
//         restrict: 'A',
//         require: 'ngModel',
//         scope: {
//             dateFormat: '@'
//         },
//         link: function (scope, elem, attrs, ngModelCtrl) {
//             //For DOM -> model validation
//             ngModelCtrl.$parsers.unshift(function (value) {
//                 var valid = validateDate(value, scope.dateFormat);
//                 ngModelCtrl.$setValidity('validDate', valid);
//                 return valid ? value : undefined;
//             });

//             //For Model Update --> DOM
//             ngModelCtrl.$formatters.unshift(function (value) {
//                 var valid = validateDate(value, scope.dateFormat);
//                 ngModelCtrl.$setValidity('validDate', valid);
//                 return value;
//             });
//         }
//     };

// }]);

app.directive('validatedInput', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        terminal: true,
        priority: 1000,
        /* jshint unused:vars */
        link: function(scope, element, attrs) {

            var type = scope.field.type || 'text';

            if (type === 'number') {
                element.attr('type', 'tel');
            } else {
                element.attr('type', type);
            }

            if (scope.field.placeholder) {
                element.attr('placeholder', scope.field.placeholder);
            }

            if (scope.field.minlength){
                element.attr('ng-minlength', scope.field.minlength);
            }
            if (scope.field.maxlength){
                element.attr('ng-maxlength', scope.field.maxlength);
            }

            if (scope.field.autoComplete === false) {
                element.attr('autocomplete', 'off');
            } else if (scope.field.autoComplete) {
                element.attr('autocomplete', scope.field.autoComplete);
            }

            /*  CREDIT CARD VALIDATION:
                - Uncomment below for credit card validation
                - Uncomment 'credit-cards' in app.js
                - Uncomment 'angular-credit-cards' in bower.json
                */ 
            // if (scope.field.ccValidate) {
            //     element.attr('cc-number', true);
            //     element.attr('cc-format', true);
            // }

            /*  TELEPHONE NUMBER VALIDATION:
                - Uncomment below for telephone validation
                - Uncomment 'bc-phone-number' in bower.json
                - Uncomment 'validateTel' directive above
                */ 
            // if (type === 'tel') {
            //     element.attr('data-validate-tel', true);
            // }

            /*  DATE FIELD VALIDATOR:
                - Uncomment below for date field validation
                - Uncomment 'angularMoment' in app.js
                - Uncomment 'angular-moment' in bower.json
                - Uncomment 'dateFieldValidator' directive above
                */ 
            // if (scope.field.dateFormat) {
            //     element.attr('date-format', scope.field.dateFormat);
            //     element.attr('date-field-validator', true);
            // }

            element.removeAttr('validated-input');

            $compile(element)(scope);
        }
    };
}]);

app.directive('focusOnCondition', ['$timeout',
    function ($timeout) {
        var checkDirectivePrerequisites = function (attrs) {
          if (!attrs.focusOnCondition && attrs.focusOnCondition !== '') {
                throw 'FocusOnCondition missing attribute to evaluate';
          }
        };

        return {            
            restrict: 'A',
            link: function (scope, element, attrs) {
                checkDirectivePrerequisites(attrs);

                scope.$watch(attrs.focusOnCondition, function (currentValue) {
                    if(currentValue) {
                        $timeout(function () {                                                
                            element[0].focus();
                        });
                    }
                });
            }
        };
    }
]);