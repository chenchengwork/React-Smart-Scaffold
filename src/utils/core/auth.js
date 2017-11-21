import cookiesUtil from 'js-cookie';
import queryString from 'query-string';
import _ from 'lodash';

class Auth {

    constructor(){
        // 登录成功的cookie key
        this.loginSuccessCookieKey = window.ENV.login.cookieKey;
    }
    /**
     * 验证是否登录
     * @returns {boolean}
     */
    isLogin() {
        return window.ENV.login.isCheckLogin ? cookiesUtil.get(this.loginSuccessCookieKey) : true;
    }

    /**
     * 登录成功重定向
     * @param {Object} history // 当前的history对象
     */
    loginSuccessRedirect(history) {
        const urlParams = queryString.parse(history.location.search);
        let redirectUrl = window.ENV.login.defaultRedirectUrl;

        if (_.isPlainObject(urlParams) && 'redirect_uri' in urlParams ) {
            redirectUrl = decodeURIComponent(urlParams['redirect_uri']);
        }

        history.push(redirectUrl);
    }



}

export default new Auth();
