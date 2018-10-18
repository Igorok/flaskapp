from flaskapp.blueprints.web.models.index import Model
from flaskapp.blueprints.web.models.user import UserModel
from datetime import datetime, timedelta
import math

class PostItem (Model):
    id = 0
    blogId = 0
    userId = ''
    userName = ''
    userEmail = ''
    title = ''
    description = ''
    text = ''
    date = ''
    public = False

    # create post item
    def __init__(self, **kwargs):
        self.id = kwargs['id'] if 'id' in kwargs else None
        self.blogId = kwargs['blogId'] if 'blogId' in kwargs else None
        self.userId = kwargs['userId'] if 'userId' in kwargs else None
        self.userName = str(kwargs['userName']).strip() if 'userName' in kwargs else ''
        self.userEmail = str(kwargs['userEmail']).strip() if 'userEmail' in kwargs else ''
        self.title = str(kwargs['title']).strip() if 'title' in kwargs else ''
        self.description = str(kwargs['description']).strip() if 'description' in kwargs else ''
        self.text = str(kwargs['text']).strip() if 'text' in kwargs else ''
        self.public = kwargs['public'] if 'public' in kwargs else False

        if 'date' in kwargs:
            self.date = str(kwargs['date']).strip()
        else:
            self.date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # validate item
    def validate (self, **kwargs):
        __wrongFields = []

        if (self.id is None):
            __wrongFields.append('id')

        if (self.blogId is None):
            __wrongFields.append('blogId')

        if (self.userId is None):
            __wrongFields.append('userId')

        if (
            self.title is None or 
            len(self.title) == 0 or
            len(self.title) > 128
        ):
            __wrongFields.append('title')

        if (
            self.description is None or
            len(self.description) == 0 or
            len(self.description) > 256
        ):
            __wrongFields.append('description')

        if (
            self.text is None or
            len(self.description) == 0
        ):
            __wrongFields.append('description')

        if (len(__wrongFields) > 0):
            raise Exception('Wrong fields ' + ', '.join(__wrongFields))


class PostModel (Model):
    TABLE = 'post'

    
    # edit current post
    def editPost (self, *args, **kwargs):
        uModel = UserModel()
        # check authentication and get data of current user
        profileDict = uModel.getUserByToken(**kwargs)

        postItem = PostItem(
            id = kwargs.get('id', None),
            blogId = kwargs.get('blogId', None),
            title = kwargs.get('title', None),
            description = kwargs.get('descript', None),
            text = kwargs.get('text', None),
            userId = profileDict.get('id', None),
            public = kwargs.get('public', None),
        )
        postItem.validate()

        if postItem.id == -1:
            return self.addPost(**postItem.__dict__)







    # add new item to posts
    def addPost(self, *args, **kwargs):
        postItem = PostItem(**kwargs)

        blogSql = '''select "id" from "blog" 
            where "id" = %s and "user_id" = %s
            '''

        connection = self.connect_postgres()
        cursor = connection.cursor()
        cursor.execute(blogSql, [postItem.blogId, postItem.userId])
        ids = cursor.fetchone()[0]

        """
        sql = '''insert into "{0}"
            ("title", "text", "user_id", "date")
            values (%s, %s, %s, %s)
            returning "id"
            ;'''.format(self.TABLE)

        connection = self.connect_postgres()
        cursor = connection.cursor()
        cursor.execute(sql, [blogItem.title, blogItem.text, blogItem.userId, blogItem.date])
        ids = cursor.fetchone()[0]
        connection.commit()
        connection.close()
        blogItem.id = ids
        return blogItem.__dict__


        """

        return None















    def editBlog (self, *args, **kwargs):
        uModel = UserModel()
        # check authentication and get data of current user
        profileDict = uModel.getUserByToken(**kwargs)

        blogItem = BlogItem(
            id = kwargs['id'],
            title = kwargs['title'],
            text = kwargs['text'],
            userId = profileDict['id'],
            public = kwargs['public'],
        )
        blogItem.validate()

        if blogItem.id == -1:
            return self.addBlog(**kwargs)

        selectRows = ['id', 'user_id', 'text', 'title', 'public', self.TABLE]
        selectSql = 'select "{0}", "{1}", "{2}", "{3}", "{4}" from "{5}" where id = %s'.format(*selectRows);
        connection = self.connect_postgres()
        cursor = connection.cursor()
        cursor.execute(selectSql, [blogItem.id])
        selectItem = cursor.fetchone()

        selectDict = self.list_to_dict(selectRows)(selectItem)

        if (selectDict == None or selectDict["user_id"] != profileDict["id"]):
            connection.close()
            raise Exception('Blog not found')

        if (
            blogItem.title == selectDict['text'] and
            blogItem.text == selectDict['text'] and
            blogItem.public == selectDict['public']
        ):
            connection.close()
            raise Exception('Nothing to update')

        updateSql = '''update "{0}"
            set "title" = %s, "text" = %s, "public" = %s, "date" = %s
            where id = %s
            ;'''.format(self.TABLE)

        cursor.execute(updateSql, [blogItem.title, blogItem.text, blogItem.public, blogItem.date, blogItem.id])
        connection.commit()
        connection.close()

        return blogItem.__dict__