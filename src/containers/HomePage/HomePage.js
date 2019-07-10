import React, { Component } from 'react';
import crypto from 'crypto';
import API from '../../api/api';
import { Row, Col, Typography } from 'antd';
import styles from './HomePage.module.css';
import CommentForm from '../../components/CommentForm/CommentForm';
import CommentView from '../../components/CommentView/CommentView';

const { Title } = Typography;

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: null,
            error: null,
            filter: null,
            page: 0
        };

        this.addComment = this.addComment.bind(this);
        this.search = this.search.bind(this);
        this.createHash = this.createHash.bind(this);
        this.loadMore = this.loadMore.bind(this);
    }

    componentDidMount() {
        API.getComments(this.state.page, this.state.filter).then((res) => {
            this.setState({
                comments: res.data
            });
        }).catch((e) => {
            this.setState({
                error: e.response.data.message,
            });
        });
    }

    addComment(form) {
        form.validateFields((err, values) => {
            if (!err) {
                const { email, message } = values;

                API.postComment(email, message).then((res) => {
                    const comments = [...this.state.comments];
                    comments.push({
                        email,
                        message,
                        avatar: this.createHash(email)
                    });

                    this.setState({
                        comments,
                        filter: null
                    }, () => {
                        form.resetFields()
                    });
                }).catch((e) => {
                    this.setState({
                        error: e.response.data.message,
                    });
                });
            }
        });
    }

    createHash(email) {
        return `https://www.gravatar.com/avatar/${crypto.createHash('md5').update(email).digest("hex")}`
    }

    search(event) {
        const filter = event.target.value === "" ? null : event.target.value;

        API.getComments(this.state.page, filter).then((res) => {
            this.setState({
                comments: res.data,
                filter: filter,
                page: 0
            });
        }).catch((e) => {
            this.setState({
                error: e.response.data.message,
            });
        });
    }

    loadMore() {
        const page = this.state.page + 1;

        API.getComments(page, this.state.filter).then((res) => {
            const comments = this.state.comments.concat(res.data);

            this.setState({
                comments,
                page
            });
        }).catch((e) => {
            debugger
            this.setState({
                error: e.response.data.message,
            });
        });
    }

    render() {
        return (
            <React.Fragment>
                <Row type="flex" justify="center" align="middle" className={styles["home-row"]}>
                    <Col span={9} className={styles["home-col"]}>
                        <Title>Comments</Title>
                        <CommentForm
                            addComment={this.addComment}
                        />
                        <CommentView
                            comments={this.state.comments ? this.state.comments : []}
                            loading={!(this.state.comments)}
                            search={this.search}
                            hasMore={this.state.hasMore}
                            loadMore={this.loadMore}
                            filter={this.state.filter}
                        />
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default HomePage;
