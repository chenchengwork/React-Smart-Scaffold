/**
 * Created by chencheng on 17-9-4.
 */
import PropTypes from 'prop-types';

/**
 * react component contextTypes的装饰器，目前支持的类型： router
 * @param arguments
 * @returns {function(*)}
 */
export const contextTypes = (...params) => (targetClass) => {
    params.forEach((type) => {
        targetClass.contextTypes = targetClass.contextTypes || {};
        if (!targetClass.contextTypes.hasOwnProperty(type)) {
            switch (type) {
                case 'router':
                    targetClass.contextTypes[type] = PropTypes.object.isRequired;
                    break;

            }
        }
    });
};


