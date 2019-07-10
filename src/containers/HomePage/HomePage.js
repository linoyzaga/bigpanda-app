import React, { Component } from 'react';
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
        this.loadMore = this.loadMore.bind(this);
        this.getComments = this.getComments.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
    }

    componentDidMount() {
        this.getComments();
    }

    addComment(form) {
        form.validateFields((err, values) => {
            if (!err) {
                const { email, message } = values;

                API.postComment(email, message).then((res) => {
                    this.setState({
                        filter: null,
                        comments: null,
                        page: 0
                    }, () => {
                        form.resetFields()
                        this.getComments();
                    });
                }).catch((e) => {
                    this.setState({
                        error: e.response.data.message,
                    });
                });
            }
        });
    }

    getComments(page, filter, cb) {
        const newPage = page || this.state.page;
        const newFilter = filter || this.state.filter;

        API.getComments(newPage, newFilter).then((res) => {

            if (cb) {
                cb(res.data);
            } else {
                this.setState({
                    comments: res.data,
                    filter: newFilter,
                    page: newPage
                });
            }
        }).catch((e) => {
            this.setState({
                error: e.response.data.message,
            });
        });
    }

    search(filter) {
        this.getComments(0, filter);
    }

    onFilterChange(event) {
        this.setState({
            filter: event.target.value === "" ? null : event.target.value
        }, () => {
            if (!this.state.filter) this.getComments();
        });
    }

    loadMore() {
        const page = this.state.page + 1;
        
        this.getComments(page, this.state.filter, (newComments) => {
            const comments = this.state.comments.concat(newComments);

            this.setState({
                comments,
                page
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
                            onChange={this.onFilterChange}
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
