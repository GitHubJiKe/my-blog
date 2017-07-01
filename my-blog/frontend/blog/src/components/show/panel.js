import React, { Component } from 'react';
var ReactMarkdown = require('react-markdown');
import { Button, Tag } from 'antd';
import { getTimeStr } from '../../base/commonFunc';
import { COLORS,myStyle } from '../../base/constant';




export default class Panel extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = { title: '', content: '', author: '', createTime: 0, updateTime: 0, _id: '', tags: [] };
        if (props.article) this.state = props.article;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps.article });
    }

    render() {
        var { title, content, author, createTime, updateTime, tags } = this.state;
        return <div style={{ width: '100%', height: 500, overflowY: 'scroll' }}>
            <h1 style={myStyle}>{title}</h1>
            <h3 style={myStyle}>{author}</h3>
            <div style={myStyle}>
                {tags.map(v =>
                    <Tag key={v} color={COLORS[parseInt(Math.random() * 7)]} closable={false} >
                        {`${v.slice(0, 20)}...`}
                    </Tag>
                )}
            </div>
            <p style={myStyle}>创建时间：{getTimeStr(createTime)}</p>
            <p style={myStyle}>更新时间：{getTimeStr(updateTime)}</p>
            <div style={{ minHeight: 300, width: '100%' }}>
                <ReactMarkdown source={content} />
            </div>
        </div>
    }

}