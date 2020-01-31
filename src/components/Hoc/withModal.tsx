import React from 'react';
import * as PropTypes from 'prop-types';
import { Modal } from "antd";
import { ModalProps } from "antd/lib/modal"
const isFunction = (data: any) => typeof data === 'function';

type Callback = () => void

interface RestProps {[index:string]: any}

interface ModalHocProps extends RestProps{
    modalProps?: ModalProps
}

export interface WrappedComponentProps extends RestProps{
    modalControl?: {
        show?: (cb?:Callback) => void;
        close?: (cb?:Callback) => void;
        showSaving?: (cb?:Callback) => void;
        hideSaving?: (cb?:Callback) => void;
        registerShow?: (cb?:Callback) => void;
        registerOk?: (cb:Callback, isShowSaving?:boolean) => void;
        registerCancel?: (cb:Callback) => void;
    };
}

export default (WrappedComponent: React.ComponentType<WrappedComponentProps>) => {

    return class ModalHoc extends React.PureComponent<ModalHocProps>{
        static propTypes = {
            modalProps: PropTypes.object
        };

        state = {
            visible: false,
            saving: false,
        };

        doOk = () => {};
        doShow = () => {};
        doCancel = () => {};

        componentDidCatch(e:Error){
            console.error(e);
        }

        componentDidMount(){
            this.modalControl.show(this.doShow)
        }

        handleOk = () => isFunction(this.doOk) && this.doOk();

        handleCancel = () => this.modalControl.close(this.doCancel);

        /**
         * 弹框的控制器
         * @type {{show: (function(*=): *), close: (function(*=): *), showSaving: (function(*=): *), hideSaving: (function(*=): *), registerOk: ModalHoc.modalControl.registerOk, registerCancel: ModalHoc.modalControl.registerCancel}}
         */
        modalControl = {
            show: (cb?:Callback) => this.setState({ visible: true }, () => isFunction(cb) && cb()),
            close: (cb?:Callback) => this.setState({ visible: false, saving: false }, () => isFunction(cb) && cb()),
            showSaving: (cb?:Callback) => this.setState({ saving: true }, () => isFunction(cb) && cb()),
            hideSaving: (cb?:Callback) => this.setState({ saving: false }, () => isFunction(cb) && cb()),
            registerShow: (cb?:Callback) => {
                if(isFunction(cb)){
                    this.doShow = cb;
                }
            },
            registerOk: (cb:Callback, isShowSaving = true) => {
                if(isFunction(cb)){
                    if(isShowSaving){
                        this.doOk = () => this.setState({ saving: true }, () => cb())
                    }else {
                        this.doOk = cb;
                    }
                }
            },
            registerCancel: (cb?:Callback) => {
                if(isFunction(cb)){
                    this.doCancel = cb;
                }
            }
        };

        render() {
            const { modalProps, ...rest } = this.props;
            const { visible, saving } = this.state;

            return (
                <Modal
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    confirmLoading={saving}
                    destroyOnClose={true}
                    {...modalProps}
                >
                    <WrappedComponent modalControl={this.modalControl} {...rest} />
                </Modal>
            );
        }
    }
};

