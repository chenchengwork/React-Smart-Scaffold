import "./CustomIcon.scss";
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * 自定义icon
 * @param type
 * @param className
 * @param spin
 * @param rest
 * @return {*}
 * @constructor
 */
const CustomIcon = ({type, className,  spin, ...rest}) => {
    const classString = classNames({
        iconfont: true,
        'custom-icon-spin': !!spin,
        [`icon-${type}`]: true,
    }, className);

    return <i className={classString} {...rest}></i>
};
CustomIcon.propTypes = {
    type: PropTypes.string.isRequired,      // icon类型
    className: PropTypes.string,            // 类名
    spin: PropTypes.bool,                   // 是否旋转
    style: PropTypes.object,                // 样式
};

export default CustomIcon;
