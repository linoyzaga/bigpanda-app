import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import styles from './CommentForm.module.css';

const { TextArea } = Input;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            comment: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className={styles["login-form"]}>
                <Form
                    layout="inline"
                    onSubmit={this.handleSubmit}>
                    <Form.Item >
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your Email!' }],
                        })(
                            <Input
                                placeholder="Email"
                                className={styles["login-form-input"]}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item >
                        {getFieldDecorator('message', {
                            rules: [{ required: true, message: 'Please input your Message!' }],
                        })(
                        <TextArea
                            type="text"
                            placeholder="Message"
                            rows={4}
                            className={styles["login-form-input"]}
                        />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className={styles["login-form-button"]} >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div
>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(CommentForm);
export default WrappedNormalLoginForm;
