import { Toast } from 'antd-mobile';
require('utils/dingtalk');

export function getPositions(success, fail) {
    dd.ready(function () {
        dd.device.geolocation.get({
            targetAccuracy: 500,
            coordinate: 0,
            withReGeocode: false,
            useCache: true, //默认是true，如果需要频繁获取地理位置，请设置false
            onSuccess: function (result) {
                success(result);
            },
            onFail: function (err) {
                fail(err);
            }
        });
    });
}