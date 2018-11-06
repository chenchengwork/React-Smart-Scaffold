import styles from './index.scss';
import PropTypes from 'prop-types';
import {helper, prompt} from 'utils/T';
import Box from 'components/Box';

import CreateScreenModal from './CreateScreenModal';
import UploadCoverModal from './UploadCoverModal';

import { MainContent, MainHeader } from 'layouts/MainLayout'
import React, { Component, Fragment } from 'react';
import {observer} from 'mobx-react';

import { Card, Icon, Button, Row, Col, Input } from 'antd';
const { Meta } = Card;

import { EnumEndPoint, getCoverPath } from 'constants/app/screen';

@observer
export default class Screen extends Component{

    componentDidMount(){
        this.getScreenList();
    }

    getScreenList = () => this.props.store.fetchScreenList();

    delScreen = (screen_id) => {
        prompt.confirm(() => this.props.store.delScreen(screen_id));
    }

    renderScreenModel = (screen_id = null) => {
        const { createScreenStore } = this.props.store;
        helper.mountReact(<CreateScreenModal
            screen_id={screen_id}
            store={createScreenStore}
            getScreenList={this.getScreenList}
        />);
    };

    renderUploadCoverModel = (screen_id = null) => {
        const { uploadCoverStore } = this.props.store;
        helper.mountReact(<UploadCoverModal
            screen_id={screen_id}
            store={uploadCoverStore}
            getScreenList={this.getScreenList}
        />);
    };

    render(){
        const { store } = this.props;
        const { loading, data } = store;

        return (
            <MainContent className={styles.screen}>
                <MainHeader title="可视化列表" rightRender={
                    <Fragment>
                        <SearchScreen store={store}/>
                        <Button style={{marginLeft: 5}} icon="plus" type="primary" onClick={() => this.renderScreenModel()}>创建</Button>
                    </Fragment>
                }/>

                <Box
                    loading={loading}
                    isNoData={data.rows.length < 1}
                >
                    <Row gutter={16}>
                        {data.rows.map(item => (
                            <Col span={6} key={item.screen_id} style={{marginBottom: 10}}>
                                <Card
                                    style={{ width: "100%" }}
                                    cover={
                                        <CoverImg
                                            imgSrc={getCoverPath(item.account_id, item.screen_id, item.cover)}
                                            screen_id={item.screen_id}
                                        />
                                    }
                                    actions={[
                                        <a target="_blank" title="查看" href={`${EnumEndPoint.screen}?screen_id=${item.screen_id}`}>
                                            <Icon type="eye-o" />
                                        </a>,
                                        <Icon type="edit" title="编辑" onClick={() => this.renderScreenModel(item.screen_id)} />,
                                        <Icon type="upload" title="更新封面" onClick={() => this.renderUploadCoverModel(item.screen_id)} />,
                                        <Icon type="delete" title="删除" onClick={() => this.delScreen(item.screen_id)} />
                                    ]}
                                >
                                    <Meta title={item.name} />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Box>
            </MainContent>
        )
    }
}

@observer
class CoverImg extends Component{
    static propTypes = {
        imgSrc: PropTypes.string.isRequired,
        screen_id: PropTypes.string.isRequired
    };

    state = { isEdit: false };

    getEdit = () => {
        const { screen_id } = this.props;
        return (
            <div className={styles.edit}>
                <a target="_blank" href={`${EnumEndPoint.editor}?screen_id=${screen_id}`}>
                    <Button type="primary">编辑</Button>
                </a>
            </div>
        )
    }

    render(){
        const { imgSrc } = this.props;

        return (
            <div
                className={styles.cover}
                onMouseOver={() => this.setState({isEdit: true})}
                onMouseLeave={() => this.setState({isEdit: false})}
            >
                {
                    this.state.isEdit ? this.getEdit() : null
                }
                <img src={imgSrc} />
            </div>
        )
    }
}


const SearchScreen = observer(({store}) => {
    const { search, updateSearchAction, fetchScreenList } = store;
    return (
        <Input.Search
            value={search.name}
            placeholder="大屏名称"
            onSearch={() => fetchScreenList()}
            onChange={(e)=> updateSearchAction("name", e.target.value.trim())}
        />
    )
});
