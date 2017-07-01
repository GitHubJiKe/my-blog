import React, { Component } from 'react';
import { Button, Input,message } from 'antd';
import '../../style/font-awesome-4.7.0/css/font-awesome.min.css';
import { getTimeStr } from '../../base/commonFunc';
import TagAdder from './tagAdder';
import {myStyle } from '../../base/constant';


export default class MDEditor extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = { title: '', content: '', author: '', createTime: 0, updateTime: 0, _id: '', tags: [] };
        if (props.article) this.state = props.article;
        this.updateCode = this.updateCode.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleAction = this._handleAction.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.state.article = nextProps.article;
        this.setState({});
    }

    updateCode(e) {
        this.setState({ content: e.target.value });
    }

    _handleSubmit() {
        var state = this.state;
        var {title,content}  = state;
        if(!title) return message.warning('您缺少一个好标题');
        if(!content) return message.warning('内容才是真材实料');
        var {actions,article,exteraData} = this.props;
        var {isNew,text} = exteraData;
        var toUpdate = JSON.parse(JSON.stringify(state));
        delete toUpdate._id;
        if (isNew) {
            actions.addArticle(toUpdate);
        } else {
            var { _id } = state;
            toUpdate.updateTime = Date.now();
            actions.updateArticle(_id, toUpdate);
        }
    }

    _handleChange(type) {
        let dom = document.getElementById(type);
        let obj = {};
        obj[type] = dom.value;
        this.setState(obj);
    }

    _handleAction(tags) {
        this.setState({ tags });
    }

    render() {
        var { title, content, author, createTime, updateTime, tags } = this.state;
        return <div>
            <Button
                style={{ float: 'left', marginLeft: 10, marginTop: 10, marginBottom: 10 }}
                type="primary"
                onClick={() => {window.location.href = '/';}}>返回</Button>
            <Input id='title' size='large'
                style={myStyle}
                value={title}
                placeholder="请输入标题"
                onChange={() => this._handleChange('title')} />
            <Input id='author'
                style={myStyle}
                value={author}
                placeholder="请输入作者"
                onChange={() => this._handleChange('author')} />
            <div style={myStyle}>
                <TagAdder tags={tags} _handleAction={this._handleAction} />
            </div>
            <p style={myStyle}>创建时间：{getTimeStr(createTime)}</p>
            <p style={myStyle}>更新时间：{getTimeStr(updateTime)}</p>
            <textarea rows={30} style={{ width: '100%', padding: 10 }} placeholder="请写下您的文章..." value={content} onChange={this.updateCode} />
            <Button
                style={{ float: 'right', marginRight: 10, marginTop: 10 }}
                type="primary"
                onClick={() => this._handleSubmit()}>提交</Button>
        </div>
    }

}