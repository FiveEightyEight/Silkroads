import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, TextField, Typography } from '@material-ui/core/';
import { Redirect } from 'react-router-dom';
import { Consumer } from '../contexts/Auth';
import { createPost } from '../services/members';

const styles = {
    post: {
        margin: '5px',
        width: '100%',
    },
    upload: {
        padding: '5px',
        height: '100px',
        width: '100%',
    },
    input: {
        margin: '5px',
        display: 'none',
    },
    textField: {
        padding: '5px',
        height: '100px',
        width: '100%',
        margin: 0,
    },
    preview: {
        width: '100%',
        border: 'solid 1px black',
    }
};

export default withStyles(styles)(class Posts extends Component {

    state = {
        user: null,
        user_id: null,
        caption: '',
        upload: null,
        file: null,
        error: null,
        success: null,
        redirect: null,
    };

    handleOnClick = name => e => {
        switch (name) {
            case 'upload':
                this.handleUpload();
                break;

            default:
                break;
        };
    };
    handleOnChange = name => e => {
        switch (name) {
            case 'upload':
                if (e.target.files[0]) {
                    this.setState({
                        upload: e.target.files[0],
                        file: URL.createObjectURL(e.target.files[0]),
                    })
                }
                break;

            case 'caption':
                this.setState({ error: false, [name]: e.target.value });
                break;
            default:
                break;
        };
    };

    handleUpload = () => {
        const { caption, upload, user_id } = this.state;
        if (!caption) {
            this.setState({ error: true });
            return;
        }
        if (caption.length > 254) {
            this.setState({ error: true });
            return;
        }
        if (!upload) {
            createPost(user_id, caption)
                .then(res => {
                    return res.data
                })
                .then(data => {
                    this.setState({ success: data });
                })
        } else {
            createPost(user_id, caption)
                .then(res => {
                    return res.data
                })
                .then(data => {
                    this.setState({ success: data });
                })
        };
    };

    buildPost = (classes) => {
        const { caption, file, error, success, redirect } = this.state;

        if (!success) {
            return (
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography
                                    variant="h4"
                                    align='center'
                                >
                                    <strong>Create Post</strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    onChange={this.handleOnChange('upload')}
                                    multiple
                                    type="file"
                                />
                                <label htmlFor="contained-button-file">
                                    <Button variant="outlined"
                                        component="span"
                                        className={classes.upload}>
                                        <strong><em>Upload</em></strong>
                                    </Button>
                                </label>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="filled-multiline-flexible"
                                    label="Caption"
                                    multiline
                                    rowsMax="4"
                                    rows="3"
                                    value={caption}
                                    onChange={this.handleOnChange('caption')}
                                    className={classes.textField}
                                    margin="normal"
                                    variant="filled"
                                    error={error}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained"
                                    color="secondary"
                                    className={classes.post}
                                    onClick={this.handleOnClick('upload')}
                                >
                                    POST
                            </Button>
                            </Grid>
                            {
                                (file) ? (
                                    <>
                                        <Grid item xs={12}>
                                            <Typography
                                                variant="h5"
                                                align='center'
                                            >
                                                <strong>Image Preview</strong>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <img src={file} alt='file to be ploaded'
                                                className={classes.preview}
                                            />
                                        </Grid>
                                    </>
                                ) : <></>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            )
        } else {
            return (
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography
                                    variant="h4"
                                    align='center'
                                >
                                    <strong> Success! </strong>
                                </Typography>
                                {this.postRedirect()}
                                {(redirect) ?
                                    <Redirect to='/' />
                                    :
                                    <></>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )
        }
    }

    postRedirect = () => {
        setTimeout(() => {
            this.setState({ redirect: true });
        }, 2000);
        return (
            <Grid item xs={12}>
                <Typography
                    variant="h6"
                    align='center'
                >
                    <strong> Redirecting... </strong>
                </Typography>
            </Grid>
        )
    };

    componentDidMount() {
        const { id } = (localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null;
        this.setState({ user_id: id });
    };


    componentWillUnmount() {
        // need to fix this
    };

    render() {
        const { classes } = this.props;
        return (
            <>
                <Consumer>
                    {
                        (user) => {
                            if (!user) return <Redirect to='/' />
                            else return this.buildPost(classes)
                        }
                    }
                </Consumer>
            </>
        )
    }
});