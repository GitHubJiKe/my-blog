import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as articleAction from '../../actions/article'
import Panel from '../show/panel'
import MDEditor from '../editor/editor'
import { getTimeStr } from '../../base/commonFunc';
import PhotoWall from '../photo-wall';
import { Table, Button, Layout, Modal } from 'antd';
const { Header, Footer, Content } = Layout;

const NEWARTICLE = { title: '', content: '', author: '', createTime: Date.now(), updateTime: Date.now(), _id: '', tags: [] };
class MainPage extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = { articles: [], checkArticle: {}, visible: false, isEdit: false, isNew: false, isShowPhotos: false };
        this.checkArticle = this.checkArticle.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
        this.editArticle = this.editArticle.bind(this);
        this.newArticle = this.newArticle.bind(this);
        this.goBack = this.goBack.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    componentDidMount() {
        this.props.actions.getAllArticles();
    }

    componentWillReceiveProps(nextProps) {
        var { isEdit } = this.state;
        if (!isEdit) {
            this.state.articles = nextProps.article.data;
            this.setState({});
        }
    }

    checkArticle(record) {
        this.setState({ checkArticle: record, visible: true });
    }

    deleteArticle(_id) {
        this.props.actions.removeArticle(_id);
    }

    getCloumn() {
        return [{
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
        }, {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: '内容简介',
            dataIndex: 'content',
            key: 'content',
            render: content => <p>{content.substring(0, 20) + '...'}</p>
        }, {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render: text => <p>{getTimeStr(text)}</p>
        }, {
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            render: text => <p>{getTimeStr(text)}</p>
        }, {
            title: '查看',
            key: 'check',
            render: (text, record) => <Button type="primary" onClick={() => this.checkArticle(record)}>查看</Button>
        }, {
            title: '删除',
            key: 'delete',
            render: (text, record) => <Button type="primary" onClick={() => this.deleteArticle(record._id)}>删除</Button>
        }];
    }

    editArticle() {
        this.setState({ isEdit: true, visible: false });
    }

    newArticle() {
        this.setState({ isEdit: true, checkArticle: NEWARTICLE, isNew: true });
    }

    goBack(isEdit) {
        this.setState({ isEdit });
    }

    showPhotos() {
        this.setState({ isShowPhotos: true });
    }

    handleBack(){
        this.setState({isShowPhotos:false});
    }

    render() {
        var { isEdit, visible, articles, checkArticle, isNew, isShowPhotos } = this.state;
        var { statusCode, text } = this.props.article;
        var photoWall = '';
        var editor = <MDEditor
            article={checkArticle}
            actions={this.props.actions}
            exteraData={{ isNew, isEdit, statusCode, text }}
            goBack={this.goBack} />
        var mainView = <Layout>
            <Header style={{ backgroundColor: '#1DA57A', textAlign: 'center' }}>
                <h1 style={{ color: 'white', display: 'inline-block' }}>Welcome To MyBlog</h1>
                <Button style={{ float: 'right', marginRight: 10, marginTop: 10 }}
                    type="primary"
                    onClick={() => this.newArticle()}>新建</Button>
                <Button style={{ float: 'right', marginRight: 10, marginTop: 10 }}
                    type="primary"
                    onClick={() => this.showPhotos()}>照片墙</Button>
            </Header>
            <Content>
                <Table rowKey={record => record._id} columns={this.getCloumn()} dataSource={articles} />
            </Content>
            <Footer style={{ textAlign: 'center' }}>by Peter</Footer>
        </Layout>
        var panelView = <Panel article={checkArticle} />;
        if (isShowPhotos) {
            editor = '';
            mainView = '';
            photoWall = <PhotoWall handleBack={this.handleBack} photos={[[{ url: 'http://img3.imgtn.bdimg.com/it/u=3193006289,3802606706&fm=26&gp=0.jpg' }, { url: 'http://img3.imgtn.bdimg.com/it/u=3193006289,3802606706&fm=26&gp=0.jpg' }, { url: 'http://img3.imgtn.bdimg.com/it/u=3193006289,3802606706&fm=26&gp=0.jpg' }, { url: 'http://img3.imgtn.bdimg.com/it/u=3193006289,3802606706&fm=26&gp=0.jpg' }]]} />
        }
        return <div>
            {isEdit ? editor : mainView}
            {photoWall}
            <Modal
                width={1000}
                title={checkArticle.title}
                visible={visible}
                maskClosable={true}
                footer={[<Button key='edit' type="primary" onClick={() => this.editArticle()}>编辑</Button>]}
                onCancel={() => this.setState({ visible: false })}
            >
                {panelView}
            </Modal >
        </div >
    }
}

export default connect(
    state => ({
        article: state.default
    }),
    dispatch => ({ actions: bindActionCreators(articleAction, dispatch) })
)(MainPage)