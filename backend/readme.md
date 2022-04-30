****************************************************************************
we aaded json file of postman download it and import it in your postman if you have any query regarding how to pass payload

****************************************************************************

****************************************************************************
  ****provide header which contains token ****
  headers:{
        authorization:token
    }

all opration except sign up and login required token in header section.
****************************************************************************
---------------------------------------------------------------------------------------

after cloning please type following command

npm i
---------------------------------------------------------------------------------------
after that you should run the following command for starting server

npm start

---------------------------------------------------------------------------------------
for Signup you have following url
 
 
 url=http://localhost:7000/user/signup

---------------------------------------------------------------------------------------


---------------------------------------------------------------------------------------
 for login you have following url

  url= http://localhost:7000/user/login
---------------------------------------------------------------------------------------



---------------------------------------------------------------------------------------
for "profile" update you have following url

http://localhost:7000/user/edit


---------------------------------------------------------------------------------------



---------------------------------------------------------------------------------------
for upadting password
FIELDS:oldPassword password confirmPassword

URL : http://localhost:7000/user/changepassword/:id

---------------------------------------------------------------------------------------



---------------------------------------------------------------------------------------
for adding new post

URL : http://localhost:7000/feed/addPost

payload : {
            image://image path
            caption: //caption here,
        }

---------------------------------------------------------------------------------------



---------------------------------------------------------------------------------------
for getting all posts


URL:http://localhost:7000/feed/?page=1&limit=2

---------------------------------------------------------------------------------------




---------------------------------------------------------------------------------------
for adding comment on pertcular post
here post id is required for adding comment

FIELDS:comment

URL : http://localhost:7000/feed/comment/:id

---------------------------------------------------------------------------------------


---------------------------------------------------------------------------------------

for adding like on pertcular post

URL : http://localhost:7000/feed/like/:id

---------------------------------------------------------------------------------------