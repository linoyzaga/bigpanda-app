import React, { Component } from 'react';
import _ from 'lodash';
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
            filteredComments: null,
            error: null,
            page: 0
        };

        this.addComment = this.addComment.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        API.getComments(this.state.page).then((res) => {
            this.setState({
                comments: res.data,
                filteredComments: res.data
            });
        }).catch((e) => {
            this.setState({
                error: e.response.data.message,
            });
        });
    }

    addComment(event) {
        // API.postComment().then((res) => {
        //     this.setState({
        //         comments: res.data,
        //     });
        // }).catch((e) => {
        //     this.setState({
        //         error: e.response.data.message,
        //     });
        // });
    }

    search(filter) {
        const comments = _.filter(this.state.comments, (comment) => {
            return _.includes(comment.email, filter)
        });

        this.setState({
            filteredComments: comments
        });
    }

    render() {
        return (
            <React.Fragment>
                <Row type="flex" justify="center" align="middle" className={styles["home-row"]}>
                    <Col span={9} className={styles["home-col"]}>
                        <Title>Comments Page</Title>
                        <CommentForm addComment={this.state.addComment}/>
                        <CommentView
                            comments={this.state.filteredComments ? this.state.filteredComments : []}
                            loading={!(this.state.filteredComments)}
                            search={this.search}
                        />
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default HomePage;
