const BaseUrl = 'http://49.233.174.102:8089/uajax/fileupload/getIcon?icon=';
const EMPTY = require('../assets/images/logo-ip.png');
export default {
    /**
     * @method 格式化图片
     * */
    formatImg(url) {
        if (url) {
            if (url)
                return BaseUrl + url;
        }
        return EMPTY
    },

}
