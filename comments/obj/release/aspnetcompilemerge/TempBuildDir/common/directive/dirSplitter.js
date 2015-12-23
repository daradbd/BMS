(function () {
    'use strict';
    angular.module('bgDirectives', [])
    .directive('bgSplitter', function () {
        var constants = { SplitterThick: 4 };
        // init the splitter: add splitter , binding click, add button....
        function initSplitter($scope, $element, $attrs) {
            $scope.unit = $scope.unit || 'percent';
            var pane1 = $scope.panes[0];
            var pane2 = $scope.panes[1];
            var vertical = $scope.orientation == 'vertical';
            $scope.position = $scope.position || (vertical ? 'bottom' : 'left');

            var icon = vertical ? 'glyphicon-triangle-top' : 'glyphicon-triangle-left';
            var handler = angular.element('<div class="split-handler ' + $scope.position + '"></div>');
            var cssClass = getSplitterGlyphicon($scope.orientation, $scope.position, false);
            var cssClassRight = getSplitterGlyphiconRight($scope.orientation, $scope.position, false);
            var buttonHander = angular.element('<div class="split-button"><span aria-hidden="true" class="glyphicon ' + cssClass + '"></span></div>');
            var buttonHanderRight = angular.element('<div class="split-button button-right"><span aria-hidden="true" class="glyphicon ' + cssClassRight + '"></span></div>');

            handler.append(buttonHander);
            handler.append(buttonHanderRight);
            pane1.elem.after(handler);

            $scope.handler = handler;
            $scope.collapsed = false;
            $scope.cssClass = cssClass;
            $scope.splitButton = buttonHander;
            $scope.splitButtonRight = buttonHanderRight;

            var containerSize = $element[0].getBoundingClientRect();

            if (vertical) {
                var height = pane1.size;
                if ($scope.unit != 'px') {
                    height = Math.floor(height * containerSize.height / 100);
                }
                setHeight($scope, $element, pane1.size);
            } else {
                var width = pane1.width;
                if ($scope.unit != 'px') {
                    width = Math.floor(width * containerSize.width / 100);
                }
                setWidth($scope, $element, pane1.size);
            }

            // Register the event for collapse button
            buttonHander.bind('click', function (ev) {
                ev.preventDefault();
                var bounds = $element[0].getBoundingClientRect();
                $scope.collapsed = !$scope.collapsed;
                // store the previous size before we collapsed it
                if ($scope.collapsed) {
                    var pane1Bound = angular.element(pane1.elem)[0].getBoundingClientRect();
                    console.log('pane1: ' + pane1Bound);
                    $scope.previousSize = vertical ? pane1Bound.height : pane1Bound.width;
                    console.log('store previousSize: ' + $scope.previousSize);
                }

                if (vertical) {
                    if ($scope.position == 'top') {
                        setHeight($scope, $element, $scope.collapsed ? 0 : $scope.previousSize);
                    } else {
                        setHeight($scope, $element, $scope.collapsed ? bounds.height : $scope.previousSize);
                    }
                } else {
                    if ($scope.position == 'left') {
                        setWidth($scope, $element, $scope.collapsed ? 0 : $scope.previousSize);
                    } else {
                        setWidth($scope, $element, $scope.collapsed ? bounds.width : $scope.previousSize);
                    }
                }

            });


            // Register the event for collapse button
            buttonHanderRight.bind('click', function (ev) {
               // $scope.position = 'right'
                ev.preventDefault();
                var bounds = $element[0].getBoundingClientRect();
                //var bounds2 = $element[1].getBoundingClientRect();
                $scope.collapsed = !$scope.collapsed;
                // store the previous size before we collapsed it
                if ($scope.collapsed) {
                    var pane1Bound = angular.element(pane1.elem)[0].getBoundingClientRect();
                    var pane2Bound = angular.element(pane2.elem)[0].getBoundingClientRect();
                    console.log('pane2: ' + pane2Bound);
                    $scope.previousSize = vertical ? pane1Bound.height : pane2Bound.width;
                    if($scope.previousSize <3 ){
                        $scope.previousSize = (pane1Bound.width / 2);
                        $scope.collapsed = false;

                    }
   
                    console.log('store previousSize: ' + $scope.previousSize);
                }

                if (vertical) {
                    if ($scope.position == 'top') {
                        setHeight($scope, $element, $scope.collapsed ? 0 : $scope.previousSize);
                    } else {
                        setHeight($scope, $element, $scope.collapsed ? bounds.height : $scope.previousSize);
                    }
                } else {
                    if ($scope.position == 'right') {
                        setWidth($scope, $element, $scope.collapsed ? 0 : $scope.previousSize);
                    } else {
                        setWidth($scope, $element, $scope.collapsed ? bounds.width : $scope.previousSize);
                    }
                }

            });






            handler.bind('mousedown', function (ev) {
                ev.preventDefault();
                $scope.drag = true;
            });
            angular.element(document).bind('mouseup', function (ev) {
                $scope.drag = false;
            });

            $element.bind('mousemove', function (ev) {
                if (!$scope.drag) return;
                console.log('drag splitter');
                var bounds = $element[0].getBoundingClientRect();
                var pos = 0;
                if (vertical) {
                    var height = bounds.bottom - bounds.top;
                    pos = ev.clientY - bounds.top;

                    if (pos <= 1) return;
                    setHeight($scope, $element, pos);

                } else {

                    var width = bounds.right - bounds.left;
                    pos = ev.clientX - bounds.left;

                    if (pos < constants.SplitterThick) return;
                    setWidth($scope, $element, pos);
                }
            });
        }

        /** bind **/

        /* get the up/down/left/right image base on the state of the splitter*/

        function getSplitterGlyphicon(orientation, position, isCollapsed) {
            if (orientation == 'vertical') {
                if ((position == 'top' && !isCollapsed) || (position == 'bottom' && isCollapsed)) {
                    return 'glyphicon-triangle-top';
                } else {
                    return 'glyphicon-triangle-bottom';
                }
            } else {
                if ((position == 'left' && !isCollapsed) || (position == 'right' && isCollapsed)) {
                    return 'glyphicon-triangle-left';
                } else {
                    return 'glyphicon-triangle-right';
                }
            }
        }
        function getSplitterGlyphiconRight(orientation, position, isCollapsed) {
            if (orientation == 'vertical') {
                if ((position == 'top' && !isCollapsed) || (position == 'bottom' && isCollapsed)) {
                   return 'glyphicon-triangle-bottom';
                } else {
                     return 'glyphicon-triangle-top';
                }
            } else {
                if ((position == 'left' && !isCollapsed) || (position == 'right' && isCollapsed)) {
                   return 'glyphicon-triangle-right';
                } else {
                     return 'glyphicon-triangle-left';
                }
            }
        }


        function setWidth($scope, $element, width) {
            //width is already calculate into pixel
            var pane1 = $scope.panes[0];
            var pane2 = $scope.panes[1];
            var handler = $scope.handler;
            var bound = $element[0].getBoundingClientRect();
            var width1 = width;

            width1 = (width1 > bound.width - constants.SplitterThick) ? (bound.width - constants.SplitterThick) : width1;
            var width2 = bound.width - width1 - constants.SplitterThick;
            var isCollapsed = false;
            if (($scope.position == 'left' && width1 <= constants.SplitterThick) || ($scope.position == 'right' && width2 <= constants.SplitterThick)) {
                //collapse case
                isCollapsed = true;
                handler.removeClass('opened');
                handler.addClass('collapsed');
                if ($scope.position == 'left') {
                    pane1.elem.removeClass('show');
                    pane1.elem.addClass('hide');
                } else {
                    pane2.elem.removeClass('hide');
                    pane2.elem.addClass('show');
                }
            } else {
                handler.removeClass('collapsed');
                handler.addClass('opened');
                if ($scope.position == 'left') {
                    pane1.elem.removeClass('hide');
                    pane1.elem.addClass('show');
                } else {
                    pane2.elem.removeClass('hide');
                    pane2.elem.addClass('show');
                }
            }
            // set width, position for pane1, pane2, handler

            pane1.elem.css('width', width1 + 'px');
            handler.css('left', width1 + 'px');
            pane2.elem.css('left', (width1 + constants.SplitterThick) + 'px');
            pane2.elem.css('width', width2 + 'px');
            var cssClass = getSplitterGlyphicon($scope.orientation, $scope.position, isCollapsed);
            $scope.collapsed = isCollapsed;
            //update the css for split button
            if ($scope.cssClass != cssClass) {
                var span = angular.element($scope.splitButton[0].querySelector('span'));
                span.removeClass($scope.cssClass);
                span.addClass(cssClass);
                $scope.cssClass = cssClass;
            }
            console.log('w1: ' + width1 + '; w2: ' + width2);
        };

        function setHeight($scope, $element, height) {
            // height is already calculate into pixel
            var pane1 = $scope.panes[0];
            var pane2 = $scope.panes[1];
            var handler = $scope.handler;
            var bound = $element[0].getBoundingClientRect();
            var height1 = height;

            height1 = (height1 > bound.height - constants.SplitterThick) ? (bound.height - constants.SplitterThick) : height1;
            var height2 = bound.height - height1 - constants.SplitterThick;
            var isCollapsed = false;
            if (($scope.position == 'top' && height1 <= constants.SplitterThick) || ($scope.position == 'bottom' && height2 <= constants.SplitterThick)) {
                isCollapsed = true;
                handler.removeClass('opened');
                handler.addClass('collapsed');
                if ($scope.position == 'top') {
                    pane1.elem.removeClass('show');
                    pane1.elem.addClass('hide');
                } else {
                    pane2.elem.removeClass('show');
                    pane2.elem.addClass('hide');
                }
            } else {
                handler.removeClass('collapsed');
                handler.addClass('opened');
                if ($scope.position == 'top') {
                    pane1.elem.removeClass('hide');
                    pane1.elem.addClass('show');
                } else {
                    pane2.elem.removeClass('hide');
                    pane2.elem.addClass('show');
                }
            }

            // set height, position for pane1, pane2, handler
            pane1.elem.css('height', height1 + 'px');
            handler.css('top', height1 + 'px');
            pane2.elem.css('top', (height1 + constants.SplitterThick) + 'px');
            pane2.elem.css('height', height2 + 'px');
            var cssClass = getSplitterGlyphicon($scope.orientation, $scope.position, isCollapsed);
            $scope.collapsed = isCollapsed;
            //update the css for split button
            if ($scope.cssClass != cssClass) {
                var span = angular.element($scope.splitButton[0].querySelector('span'));
                span.removeClass($scope.cssClass);
                span.addClass(cssClass);
                $scope.cssClass = cssClass;
            }
        };

        var rs = {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                orientation: '@',
                unit: '@',
                position: '@'
            },
            template: '<div class="split-panes {{orientation}}" ng-transclude></div>',
            controller: ['$scope', function ($scope) {
                $scope.panes = [];

                this.addPane = function (pane) {
                    if ($scope.panes.length > 1)
                        throw 'splitters can only have two panes';
                    $scope.panes.push(pane);
                    return $scope.panes.length;
                };
            }],
            link: function (scope, element, attrs) {
                initSplitter(scope, element, attrs);
            }
        };

        return rs;
    })
    .directive('bgPane', function () {
        return {
            restrict: 'E',
            require: '^bgSplitter',
            replace: true,
            transclude: true,
            scope: {
                size: '='
            },
            template: '<div class="split-pane{{index}}" ng-transclude></div>',
            link: function (scope, element, attrs, bgSplitterCtrl) {
                scope.elem = element;
                scope.index = bgSplitterCtrl.addPane(scope);
            }
        };
    });
})();
