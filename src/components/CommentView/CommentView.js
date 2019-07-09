import React, { Component } from 'react';
import { List, Avatar, Input } from 'antd';
import styles from './CommentView.module.css'

const { Search } = Input;

const CommentView = ({loading, comments, search}) => {
    return (
        <div>
            <Search
                placeholder="Filter"
                onSearch={value => search(value)}
                className={styles["search-box"]}
            />
            <List
                itemLayout="horizontal"
                loading={loading}
                dataSource={comments}
                renderItem={item => (
                    <List.Item className={styles["list-item"]}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={item.email}
                            description={item.message}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default CommentView;
