import React from 'react';
import { Tag, Input, Tooltip, Button } from 'antd';
import { COLORS } from '../../base/constant';



export default class TagAdder extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tags: props.tags,
            inputVisible: false,
            inputValue: '',
        };
    }


    handleClose = (removedTag) => {
        var { tags } = this.state;
        tags = tags.filter(tag => tag !== removedTag);
        this.setState({});
        this.props._handleAction(tags);
    }

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.tags;
        if (inputValue && this.props.tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
        this.props._handleAction(tags);
    }

    saveInputRef = input => this.input = input

    render() {
        const { tags, inputVisible, inputValue } = this.state;
        return (
            <div>
                {tags.map((tag, index) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag key={tag} color={COLORS[parseInt(Math.random()*7)]} closable={true} afterClose={() => this.handleClose(tag)}>
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </Tag>
                    );
                    return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
                })}
                {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && <Button size="small" type="dashed" onClick={this.showInput}>添加标签</Button>}
            </div>
        );
    }
}