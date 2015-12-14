'use strict';

/* Filters */

angular.module('myApp.filters', []).
    filter('interpolate', ['version', function (version) {
        return function (text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
    }]).filter('htmlToPlaintext', function () {
        return function (text) {
            return String(text).replace(/<[^>]+>/gm, '');
        }
    }).filter('trustAsHtml', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        }
    }).filter('fmtCommonStatus', function (COMMON_STATUS) {
        return function (text) {
            for (var i = 0; i < COMMON_STATUS.length; i++) {
                var s = COMMON_STATUS[i];
                if (text == s.val) {
                    return s.txt;
                }

            }
            return "未知";
        }
    }).filter('fmtAdTp', function (AD_TP) {
        return function (text) {
            for (var i = 0; i < AD_TP.length; i++) {
                var tp = AD_TP[i];
                if (text == tp.val) {
                    return tp.txt;
                }

            }
            return "未知";
        }
    }).filter('fmtAdPrice', function (PRICE_CONFIG) {
        return function (text) {
            return text / PRICE_CONFIG.unit
        }
    }).filter('fmtAdStatus', function (AD_STATUS) {
        return function (text) {
            for (var i = 0; i < AD_STATUS.length; i++) {
                var s = AD_STATUS[i];
                if (text == s.val) {
                    return s.txt;
                }

            }
            return "未知";
        }
    }).filter('fmtTaskStatus', function (TASK_STATUS) {
        return function (text) {
            for (var i = 0; i < TASK_STATUS.length; i++) {
                var s = TASK_STATUS[i];
                if (text == s.val) {
                    return s.txt;
                }

            }
            return "未知";
        }
    }).filter('fmtTaskTp', function (TASK_TP) {
        return function (tp, parent) {
            var tps = TASK_TP[parent];
            if (!tps) {
                return "error";
            }
            for (var i = 0; i < tps.length; i++) {
                var s = tps[i];
                if (tp == s.val) {
                    return s.txt;
                }

            }
            return "未知";
        }
    }).filter('fmtTaskParent', function (TASK_PARENT) {
        return function (text) {
            for (var i = 0; i < TASK_PARENT.length; i++) {
                var s = TASK_PARENT[i];
                if (text == s.val) {
                    return s.txt;
                }

            }
            return "未知";
        }
    }).filter('parsePrice', function (PRICE_CONFIG) {
        return function (price) {
            return parseInt(price * PRICE_CONFIG.unit);
        }
    }).filter('fmtPrice', function (PRICE_CONFIG) {
        return function (price) {
            return (price / PRICE_CONFIG.unit).toFixed(2);
        }
    }).filter('fmtRewardTp', function (AD_REWARD_TP) {
        return function (text, adTp) {
            var REWARD_TP = AD_REWARD_TP[adTp];
            if (!REWARD_TP || !REWARD_TP.length) {
                return "未知";
            }
            for (var i = 0; i < REWARD_TP.length; i++) {
                var s = REWARD_TP[i];
                if (text == s.val) {
                    return s.txt;
                }

            }
            return "未知";
        }
    }).filter('fmtAdGroupTp', function (AD_GROUP_TP) {
        return function (text) {
            for (var i = 0; i < AD_GROUP_TP.length; i++) {
                var s = AD_GROUP_TP[i];
                if (text == s.val) {
                    return s.txt;
                }

            }
            return "未知";
        }
    }).filter('fmtUserGender', function () {
        return function (text) {
            switch (text) {
                case 0:
                    return "-";
                case 1:
                    return "男";
                case 2:
                    return "女";
                default:
                    return "未知";
            }
        }
    }).filter('fmtOrderStatus', function (ORDER_STATUS) {
        return function (text) {
            for (var i = 0; i < ORDER_STATUS.length; i++) {
                var s = ORDER_STATUS[i];
                if (text == s.val) {
                    return s.txt;
                }
            }
            return "未知";
        }
    }).filter('parseUnionRate', function (UNION_RATE_CONFIG) {
        return function (rate) {
            return parseInt(rate * UNION_RATE_CONFIG.unit);
        }
    }).filter('parseUnionRate', function (UNION_RATE_CONFIG) {
        return function (rate) {
            return parseInt(rate * UNION_RATE_CONFIG.unit);
        }
    }).filter('fmtUnionRate', function (UNION_RATE_CONFIG) {
        return function (rate) {
            return (rate / UNION_RATE_CONFIG.unit).toFixed(2);
        }
    }).filter('fmtUnionRateTp', function (UNION_RATE_TP) {
        return function (text) {
            for (var i = 0; i < UNION_RATE_TP.length; i++) {
                var s = UNION_RATE_TP[i];
                if (text == s.val) {
                    return s.txt;
                }
            }
            return "未知";
        }
    });



