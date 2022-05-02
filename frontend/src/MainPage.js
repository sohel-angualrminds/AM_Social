import React from 'react'
import HeaderPage from './HeaderPage'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextareaAutosize from '@mui/material/TextareaAutosize'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

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

function MainPage() 
{
    const location = useLocation()
    console.log(location)

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    //Add new post

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // upload new file
    // const onChange = (e) => {
    //     const file = e.target.files[0]
    // }

    // Get all posts data

    const [allPostsData,setAllPostsData] = React.useState([])

    React.useEffect(() => {
        axios.get('/feed/',{
            headers: {
                Authorization: location.state.token
            }
        })
        .then(response => {
            console.log(response.data.data.results)
            setAllPostsData(response.data.data.results)
        })
        .catch(error => console.log(error))
    },[])

    //For Add new post

    const [newPostData,setNewPostData] = React.useState({
        image : '',
        caption : ''
    })

    const imageHandler = (e) => {
        console.log(e.target.value)
        setNewPostData(prev => {
            return {
                ...prev,
                image : e.target.value
            }
        })
    }

    const captionHandler = (e) => {
        console.log(e.target.value)
        setNewPostData(prev => {
            return {
                ...prev,
                caption : e.target.value
            }
        })
    }

    const newPostHandler = () => {
        axios.post('/feed/addPost',{
            headers: {
                Authorization: location.state.token
            }
        },newPostData)
        .then(response => {
            console.log(response)
        })
        .catch(error => console.log(error))
    }

    const likePostHandler = (id) => {
        console.log(id)
        axios.post(`/feed/like/:${id}`,{
            headers: {
                Authorization: location.state.token
            }
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => console.log(error))
    }

    return (
        <div>
            <HeaderPage />

            <div style={{border:'1px solid black',margin:'10px'}}>
                <Button variant="outlined" onClick={handleOpen} >+ Add New Post</Button>

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
                            type='file' 
                            value={newPostData.image}
                            onChange = { (e) => imageHandler(e) }
                        />

                        <br />
                        
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={3}
                            placeholder="Caption * "
                            style={{ width: 200 }}
                            value={newPostData.caption}
                            onChange = { (e) => captionHandler(e) }
                        />

                        <br />

                        <Button variant="contained" onClick = { () => newPostHandler() } >Add New Posts</Button>

                    </Box>
                </Modal>
            </div>

            {
                allPostsData && allPostsData.map((postItem,postIndex) => {
                    return <Card sx={{ maxWidth: 300 }} key={postIndex}>
                        <CardMedia
                            component="img"
                            height="194"
                            image={postItem.image}
                            alt="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                            {postItem.caption}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites"  onClick={() => likePostHandler(postItem._id) }>
                                <FavoriteIcon />
                            </IconButton>
                            {postItem.likesCount}
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                            <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>Comments:</Typography>

                                {
                                    postItem.comments.map((commentItem,commentIndex) => {
                                        return <Typography paragraph key={commentIndex} >{commentItem.comment}</Typography>
                                    })
                                }
                                
                            </CardContent>
                        </Collapse>
                    </Card>
                })
            }

        </div>
    )
}

export default MainPage

