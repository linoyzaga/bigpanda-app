import React  from 'react';
import { Form, Input, Button } from 'antd';
import styles from './CommentForm.module.css';

const { TextArea } = Input;

const CommentForm = ({ addComment, form}) => {
        const { getFieldDecorator } = form;

        return (
            <div className={styles["login-form"]}>
                <Form
                    layout="inline">
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
                            onClick={() => addComment(form)}
                            className={styles["login-form-button"]}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div
>
        );
    }

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(CommentForm);
export default WrappedNormalLoginForm;
