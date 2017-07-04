import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Button, Layout, Upload ,Icon,message} from 'antd';
const { Header } = Layout;
const Dragger = Upload.Dragger;
export default class PhotoWall extends Component {
    constructor(props, context) {
        super(props, context);
        this._handleChange = this._handleChange.bind(this);
        this.getViews = this.getViews.bind(this);
    }

    getViews() {
        return this.props.photos.map((v, idx) =>
            <Row type="flex" key={idx}>
                {v[0] ? <Col span={6} order={1}><img src={v[0].url} /></Col> : ''}
                {v[1] ? <Col span={6} order={2}><img src={v[1].url} /></Col> : ''}
                {v[2] ? <Col span={6} order={3}><img src={v[2].url} /></Col> : ''}
                {v[3] ? <Col span={6} order={4}><img src={v[3].url} /></Col> : ''}
            </Row>
        );
    }
    _handleChange() {
        // const status = info.file.status;
        // if (status !== 'uploading') {
        //     console.log(info.file, info.fileList);
        // }
        // if (status === 'done') {
        //     message.success(`${info.file.name} file uploaded successfully.`);
        // } else if (status === 'error') {
        //     message.error(`${info.file.name} file upload failed.`);
        // }
    }

    render() {
        return (<div>
            <Header style={{ backgroundColor: '#1DA57A', textAlign: 'center' }}>
                <Button
                    style={{ float: 'left', marginLeft: 10, marginTop: 10, marginBottom: 10 }}
                    type="primary"
                    onClick={this.props.handleBack}>返回</Button>
                <Upload />
            </Header>
            {this.getViews()}
            <Dragger name='file' multiple={true} showUploadList={false} onChange={this._handleChange} action={'/uploadPhotos'}>
                <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">点击或者拖拽图片上传</p>
            </Dragger>
        </div>);
    }
}