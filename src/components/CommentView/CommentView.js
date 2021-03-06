import React from 'react';
import { List, Avatar, Input, Button, Popover } from 'antd';
import _ from 'lodash';
import QueueAnim from 'rc-queue-anim';
import styles from './CommentView.module.css'

const { Search } = Input;

const CommentView = ({loading, comments, search, filter, loadMore, onChange}) => {
    const buildList = (comments) => {
        return _.map(comments, (item, index) => {
            return (
                <List.Item key={index}>
                    <List.Item.Meta
                        avatar={
                            (<Popover
                                    title={item.email}
                                    content={`Last Active: ${item.lastActive}`}
                                    trigger="click"
                                >
                                    <Avatar src={item.avatar}/>
                                </Popover>
                            )}
                        title={item.email}
                        description={item.message} />
                </List.Item>
            )
        })
    }

    return (
        <React.Fragment>
            <Search
                value={filter}
                placeholder="Filter"
                onSearch={search}
                onChange={onChange}
                className={styles["search-box"]}
            />
            <QueueAnim
                component={List}
                componentProps={{ className: styles["list-item"],
                    itemLayout: 'horizontal',
                    loading: loading,
                     }}
            >
                {buildList(comments)}
            </QueueAnim>
            {comments.length === 0 ?
                null :
                <Button
                onClick={loadMore}
                className={styles['load-button']}
                >
                    Load more
                </Button>}
        </React.Fragment>
    );
};

export default CommentView;
