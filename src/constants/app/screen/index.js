import img_default_cover from './img/default_cover.png';
const { screen, apiDomain, apiPrefix } = window.ENV

export const EnumEndPoint = {
    screen: screen.screenEndPort,
    editor: screen.editorEndPort,
};

/**
 * 获取封面地址
 * @param account_id
 * @param screen_id
 * @param cover
 * @return {*|string}
 */
export const getCoverPath = (account_id, screen_id, cover) => cover ? `${apiDomain}${apiPrefix}public/uploads/screen/${account_id}/${screen_id}/${cover}` : img_default_cover;
