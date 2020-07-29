const BaseUrl = 'https://erp-report-shenyang.oss-cn-beijing.aliyuncs.com/';
const EMPTY = require('../images/logo-ip.png');
export default {
    /**
     * @method 格式化图片
     * */
    formatImg(url) {
        if (url) {
            if (url) return BaseUrl + url;
        }
        return EMPTY
    },
}
