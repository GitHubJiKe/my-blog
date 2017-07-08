import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as photoAction from '../../actions/photo';
import { Button, Layout, Upload, Icon, message, Affix } from 'antd';
import './style.css';
const { Header, Content } = Layout;


class PhotoWall extends Component {
    constructor(props, context) {
        super(props, context);
        this.getViews = this.getViews.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }

    getViews() {
        return this.props.photo.photos.map((v, idx) => <img className='img' key={v._id} src={v.url} />);
    }

    componentDidMount() {
        this.props.actions.getAllPhotos();
    }

    componentWillReceiveProps(props) {

    }

    onFileChange(e) {
        var file = e.target.files[0];
        var { type, size } = file;
        if ((type == 'image/png' || type == 'image/gif' || type == 'image/jpeg' || type == 'image/bmp')) {
            if (file.size < (50 * 1024 * 1024)) {
                this.props.actions.addPhoto(file);
            } else {
                message.warning('文件过大');
            }
        } else {
            message.warning('文件类型有误');
        }
        e.target.value = '';
    }

    render() {
        return (<div>
            <Layout>
                <Header style={{ position:'fixed',width:'100%',backgroundColor: '#1DA57A', textAlign: 'center' }}>
                    <Button
                        style={{ float: 'left', marginLeft: 10, marginTop: 15, marginBottom: 10 }}
                        type="primary"
                        onClick={this.props.handleBack}>返回</Button>
                    <Affix
                        style={{ float: 'right'}}
                        offsetTop={0}
                        onChange={affixed => console.log(affixed)}>
                        <Button
                            type="primary"
                            onClick={() => document.getElementById('photoUploader').click()}>
                            点击上传
                        </Button>
                    </Affix>
                </Header>
                <Content style={{marginTop:70}}>
                    {this.getViews()}
                </Content>
            </Layout>
            <input
                style={{ visibility: 'hidden', width: 0, height: 0 }}
                type="file"
                multiple="multiple"
                id="photoUploader"
                size="12"
                accept="image/*"
                onChange={this.onFileChange} />
        </div>);
    }
}

export default connect(
    state => ({
        photo: state.photo
    }),
    dispatch => ({ actions: bindActionCreators(photoAction, dispatch) })
)(PhotoWall)