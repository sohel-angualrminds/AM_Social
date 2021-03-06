import React from 'react'
import HeaderPage from './HeaderPage'
import debounce from "lodash.debounce"
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Skeleton from '@mui/material/Skeleton'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import InfiniteScroll from 'react-infinite-scroll-component'
   
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const limit = 2

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ExpandMore = styled((props) => {
    const { expand, ...other } = props
    return <IconButton {...other} />
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function MainPage() {

    const [a, setA] = React.useState(2)
    const function1 = () => {
        setA(prev => prev + 2)
    }

    const navigate = useNavigate()

    const userData = JSON.parse(localStorage.getItem('userData'))
    const token1 = userData.token

    //Add new post

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Get all posts data

    const [allPostsData, setAllPostsData] = React.useState([])

    const [expanded, setExpanded] = React.useState([]);
    const [like, setLike] = React.useState([])

    // const [toggle, setToggle] = React.useState(1);
    const [pageNumber,setPageNumber] = React.useState(1)

    const [skeleton, setSkeleton] = React.useState(true)

    React.useEffect(() => {
        axios.get(`/feed/?page=${pageNumber}&limit=${limit}`, {
            headers: {
                Authorization: token1
            }
        })
            .then(response => {
                console.log(response.data.data.results)

                const tempArray = Array(response.data.data.results.length).fill(false)
                setExpanded(tempArray)

                const tempArray1 = Array(response.data.data.results.length).fill(false)
                setLike(tempArray1)

                setAllPostsData(response.data.data.results)

                setTimeout(() => {
                    setSkeleton(false)
                }, 250)
            })
            .catch(error => console.log(error))
    }, [])

    const fetchData = () => {
        // console.log('hjbdvhf');
        setTimeout(() => {
            axios.get(`/feed/?page=${pageNumber+1}&limit=${limit}`, {
            headers: {
                Authorization: token1
            }
        })
            .then(response => {
                setPageNumber(prev => prev + 1)
                console.log(response.data.data.results)
                // const tempArray = Array(response.data.data.results.length).fill(false)
                // setExpanded(tempArray)
                // const tempArray1 = Array(response.data.data.results.length).fill(false)
                // setLike(tempArray1)
                // if (pageNumber === 1) {
                //     setAllPostsData(response.data.data.results);
                // } else {
                    // setTimeout(() => {
                        setAllPostsData([...allPostsData, ...response.data.data.results])
                        setLike([...like,...Array(response.data.data.results.length).fill(false)])
                        setExpanded([...expanded,...Array(response.data.data.results.length).fill(false)])
                    // },100)
                    
                // }
            })
            .catch(error => console.log(error))
        },1500)
    }

    console.log(allPostsData);
    console.log(like);
    console.log(expanded);
    
    //expand comment

    const handleExpandClick = (commentIndex) => {
        const tempArray = expanded.map((item, index) => {
            if (index === commentIndex) {
                return !item
            }
            else {
                return item
            }
        })
        setExpanded(tempArray);
    };

    //For Add new post

    const [newPostData, setNewPostData] = React.useState({
        image: '',
        caption: ''
    })

    const imageHandler = (e) => {
        console.log(e.target.files[0])
        setNewPostData(prev => {
            return {
                ...prev,
                image: e.target.files[0]
            }
        })
    }

    const captionHandler = (e) => {
        console.log(e.target.value)
        setNewPostData(prev => {
            return {
                ...prev,
                caption: e.target.value
            }
        })
    }

    const [open2, setOpen2] = React.useState(false);

    const handleClick2 = () => {
        setOpen2(true);
    };

    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen2(false);
    };

    const [open3, setOpen3] = React.useState(false);

    const handleClick3 = () => {
        setOpen3(true);
    };

    const handleClose3 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen3(false);
    };

    const newPostHandler = () => {

        const formData = new FormData()
        formData.append("image", newPostData.image);
        formData.append("caption", newPostData.caption);

        console.log(newPostData)

        if (newPostData.image === '' || newPostData.caption === '') {
            handleClick3()
        } 
        else {
            axios.post('/feed/addPost', formData, {
                headers: {
                    Authorization: token1
                }
            })
                .then(response => {
                    console.log(response)
                    // setToggle(prev => prev + 1)
                    setNewPostData({
                        image: '',
                        caption: ''
                    })
                    handleClick2()
                    axios.get(`/feed/?page=${pageNumber}&limit=${limit}`, {
                    headers: {
                        Authorization: token1
                    }
                })
                .then(response =>{
                    console.log(response.data.data.results);
                    setAllPostsData(response.data.data.results)
                })
                .catch(error => {
                    console.log(error);
                })
                })
                .catch(error => console.log(error))
        }


    }

    const goHomePageHandler = () => {
        handleClose()
    }

    const likePostHandler = (id, likesCount, likeIndex) => {
        const tempArray3 = like.map((item, index) => {
            if (index === likeIndex) {
                return !item
            }
            else {
                return item
            }
        })
        setLike(tempArray3)

        console.log(id)
        axios.put(`/feed/like/${id}`, { count: likesCount + 1 }, {
            headers: {
                Authorization: token1
            }
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => console.log(error))
    }

    //add new comment and handler

    const [newComment, setnewComment] = React.useState({
        comment: ''
    })

    const newCommentHandler = (e) => {
        // console.log(e.target.value)
        setnewComment(prev => {
            return {
                comment: e.target.value
            }
        })
    }

    const addCommentHandler = (id) => {
        console.log(id)
        console.log(newComment)
        axios.put(` /feed/comment/${id}`, { comment: newComment.comment }, {
            headers: {
                Authorization: token1
            }
        })
            .then(response => {
                console.log(response)
                // setToggle(prev => prev + 1)
                axios.get(`/feed/?page=${pageNumber}&limit=${limit}`, {
                    headers: {
                        Authorization: token1
                    }
                })
                .then(response =>{
                    console.log(response.data.data.results);
                    setAllPostsData(response.data.data.results)
                })
                .catch(error => {
                    console.log(error);
                })
            })
            .catch(error => console.log(error))
    }

    // console.log(newPostData);    

    return (
        <div style={{backgroundColor:'#D3D3D3'}}>
            <HeaderPage />

            <div style={{ margin: '10px', marginLeft: '100px', marginRight: '100px' }} >
                <Button variant="contained" onClick={handleOpen} sx={{ marginTop: '5px', marginBottom: '5px',backgroundColor:'#F4A4A4' }} >+ Add New Post</Button>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>

                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Create New Post
                        </Typography>

                        <br />

                        <input
                            type="file"
                            // value={newPostData.image}
                            onChange={(e) => imageHandler(e)}
                        />

                        <br />

                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={3}
                            placeholder="Caption * "
                            style={{ width: 200, marginTop: '10px' }}
                            value={newPostData.caption}
                            onChange={(e) => captionHandler(e)}
                        />

                        <br />

                        <Button variant="contained" sx={{ marginTop: '10px' }} onClick={() => newPostHandler()} >Add New Posts</Button>

                        <br />

                        <Button variant="contained" sx={{ marginTop: '10px' }} onClick={() => goHomePageHandler()} >Home</Button>

                    </Box>
                </Modal>
            </div>

            <Snackbar open={open3} autoHideDuration={6000} onClose={handleClose3} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
                <Alert onClose={handleClose3} severity="error" sx={{ width: '100%' }} >
                    Enter all data!
                </Alert>
            </Snackbar>

            <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose2} severity="success" sx={{ width: '100%' }}>
                    Post added!
                </Alert>
            </Snackbar>

            <InfiniteScroll
                dataLength={allPostsData.length} 
                next={fetchData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                
            >            

            {
                skeleton
                    ?
                    allPostsData && allPostsData.map((item, index) => {
                        return <Skeleton key={index} variant="rectangular" sx={{ maxWidth: 300, marginTop: '30px', marginLeft: '40%', height: '300px' }} />
                    })
                    :
                    allPostsData && allPostsData.map((postItem, postIndex) => {
                        return <Card sx={{ maxWidth: 350, marginTop: '30px', marginLeft: '40%',borderRadius:'10px' }} key={postIndex}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: '#EFB7BA',color:'#194F92' }} aria-label="recipe">
                                        {postItem.userINFO.firstName && postItem.userINFO.firstName.split(' ')[0][0]}
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={postItem.userINFO.firstName && postItem.userINFO.firstName}
                                subheader={postItem.userINFO.email && postItem.userINFO.email}
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image={postItem.image}
                                alt="Paella dish"
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary" >
                                    <h3>{postItem.caption}</h3>
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites" sx={{ color: like[postIndex] ? 'red' : '' }} onClick={() => likePostHandler(postItem._id, postItem.likesCount, postIndex)}>
                                    <FavoriteIcon />
                                </IconButton>
                                {like[postIndex] ? postItem.likesCount+1 : postItem.likesCount}
                                <ExpandMore
                                    expand={expanded[postIndex]}
                                    onClick={() => handleExpandClick(postIndex)}
                                    aria-expanded={expanded[postIndex]}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                            <Collapse in={expanded[postIndex]} timeout="auto" unmountOnExit>
                                <CardContent>

                                    <TextField
                                        id="standard-basic"
                                        label="Add New Comment"
                                        variant="standard"
                                        value={newComment.comment}
                                        onChange={(e) => newCommentHandler(e)}
                                    />

                                    <Button variant="contained" onClick={() => addCommentHandler(postItem._id)}>+</Button>

                                    <Typography paragraph>Comments:</Typography>


                                    {
                                        postItem.comments.map((commentItem, commentIndex) => {
                                            return <Typography paragraph key={commentIndex} sx={{display: "inlineflex"}} >
                                                <Avatar>{commentItem.firstName.split(' ')[0][0]}</Avatar>
                                                {commentItem.firstName+ " " + commentItem.lastName + " : " + commentItem.comment}
                                            </Typography>
                                        })
                                    }

                                </CardContent>
                            </Collapse>
                        </Card>
                    })
            }

            </InfiniteScroll>

        </div>
    )
}

export default MainPage

