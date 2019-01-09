from flaskapp.blueprints.web.models.index import Model
from flaskapp.blueprints.web.models.user import UserModel
from flaskapp.blueprints.web.models.blog import BlogModel
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
            userId = profileDict.get('id', None),
            title = kwargs.get('title', None),
            description = kwargs.get('descript', None),
            text = kwargs.get('text', None),
            public = kwargs.get('public', None),
        )
        postItem.validate()

        if postItem.id == -1:
            return self.addPost(**postItem.__dict__)

        postRows = ('id', 'title', 'description', 'text', 'public', 'date', self.TABLE)
        postSql = '''select
            "{0}", "{1}", "{2}", "{3}", "{4}", "{5}" from "{6}"
            where id = %s and blog_id = %s and user_id = %s'''.format(*postRows)

        connection = self.connect_postgres()
        cursor = connection.cursor()
        cursor.execute(postSql, (
            postItem.id,
            postItem.blogId,
            postItem.userId
        ))
        postData = cursor.fetchone()

        if (postData is None):
            connection.close()
            raise Exception('Blog not found')

        selectDict = self.list_to_dict(postRows)(postData)
        if (
            postItem.title == selectDict['title'] and
            postItem.description == selectDict['description'] and
            postItem.text == selectDict['text'] and
            postItem.public == selectDict['public']
        ):
            connection.close()
            raise Exception('Nothing to update')

        updateSql = '''update "{0}"
            set "title" = %s, "description" = %s, "text" = %s, "public" = %s, "date" = %s
            where id = %s
            ;'''.format(self.TABLE)

        cursor.execute(updateSql, [postItem.title, postItem.description, postItem.text, postItem.public, postItem.date, postItem.id])
        connection.commit()
        connection.close()

        return postItem.__dict__


    # add new item to posts
    def addPost(self, *args, **kwargs):
        postItem = PostItem(**kwargs)

        blogSql = '''select "id" from "{0}"
            where "id" = %s and "user_id" = %s
            '''.format(BlogModel.TABLE)

        connection = self.connect_postgres()
        cursor = connection.cursor()
        cursor.execute(blogSql, [postItem.blogId, postItem.userId])
        idRes = cursor.fetchone()

        if (idRes is None or idRes[0] is None):
            connection.close()
            raise Exception('Blog not found')

        insertSql = '''insert into "{0}"
            ("blog_id", "user_id", "title", "description", "text", "public", "date")
            values (%s, %s, %s, %s, %s, %s, %s)
            returning "id"'''.format(self.TABLE)

        cursor.execute(insertSql, [
            postItem.blogId,
            postItem.userId,
            postItem.title,
            postItem.description,
            postItem.text,
            postItem.public,
            postItem.date
        ])

        postId = cursor.fetchone()[0]
        connection.commit()
        connection.close()
        postItem.id = postId
        return postItem.__dict__


    # get my post for edit
    def getMyPost(self, *args, **kwargs):
        if (not 'blogId' in kwargs):
            raise Exception('Blog not found')

        if (not 'id' in kwargs):
            raise Exception('Post not found')


        uModel = UserModel()
        # check authentication and get data of current user
        profileDict = uModel.getUserByToken(**kwargs)

        postSql = '''select
            blog.id as blogId,
            blog.user_id as userId,
            post.id as id,
            post.title as title,
            post.description as description,
            post.text as "text",
            post.public as "public",
            post.date as "date"
            from blog
            left join post
            on blog.id = post.blog_id
            where blog.id = %s and blog.user_id = %s and post.id = %s and post.user_id = %s
            ;'''.format(BlogModel.TABLE, self.TABLE)

        connection = self.connect_postgres()
        cursor = connection.cursor()
        cursor.execute(postSql, [
            kwargs["blogId"],
            profileDict["id"],
            kwargs["id"],
            profileDict["id"]
        ])
        postData = cursor.fetchone()
        connection.close()

        if (postData is None):
            raise Exception('Blog not found')

        postRows = [
            "blogId", "userId", "id", "title", "description", "text", "public", "date"
        ]
        postDict = self.list_to_dict(postRows)(postData)

        if (
            postDict is None or
            postDict["blogId"] is None or
            postDict["id"] is None
        ):
            raise Exception('Post not found')


        return postDict


    # get my post for edit
    def getMyBlogDetail(self, *args, **kwargs):
        if (not 'blogId' in kwargs):
            raise Exception('Blog not found')

        start = int(kwargs['start']) if ('start' in kwargs) else 0
        perpage = int(kwargs['perpage']) if ('perpage' in kwargs) else 20

        listResult = {
            'count': 0,
            'blog': None,
            'posts': None
        }

        uModel = UserModel()
        # check authentication and get data of current user
        profileDict = uModel.getUserByToken(**kwargs)

        blogRows = ('id', 'title', 'text', 'public', 'date', 'userId', 'userName')
        blogSql = '''select
            blog.id as "{0}",
            blog.title as "{1}",
            blog.text as "{2}",
            blog.public as "{3}",
            blog.date as "{4}",
            uTable.id as "{5}",
            uTable.login as "{6}"
            from blog
            left join "user" as uTable on blog.user_id = uTable.id
            where blog.id = %s and blog.user_id = %s
            ;'''.format(*blogRows)

        connection = self.connect_postgres()
        cursor = connection.cursor()
        cursor.execute(blogSql, (kwargs['blogId'], profileDict['id']))
        blogData = cursor.fetchone()

        if (blogData is None):
            connection.close()
            return listResult

        listResult['blog'] = self.list_to_dict(blogRows)(blogData)

        postRows = (
            'id', 'blogId', 'title', 'description', 'public', 'date',
            'userId', 'userName'
        )
        postSql = '''select
            post.id as {0},
            post.blog_id as {1},
            post.title as {2},
            post.description as {3},
            post.public as {4},
            post.date as {5},
            uTable.id as {6},
            uTable.login as {7}
            from post
            left join "user" as uTable on post.user_id = uTable.id
            where post.blog_id = %s
                and post.user_id = %s
            order by post.{0} desc limit %s offset %s;
            ;'''.format(*postRows)

        cursor.execute(postSql, (
            kwargs['blogId'],
            profileDict['id'],
            perpage,
            start
        ))
        postData = cursor.fetchall()

        countSql = 'select count(id) from post where blog_id = %s and user_id = %s;'
        cursor.execute(countSql, (
            kwargs['blogId'],
            profileDict['id']
        ))
        countData = cursor.fetchone()

        if (countData != None):
            listResult['count'] = countData[0]

        if (postData != None):
            listResult['posts'] = map(self.list_to_dict(postRows), postData)

        return listResult



    # get posts from blog
    def getBlogDetail(self, *args, **kwargs):
        if (not 'blogId' in kwargs):
            raise Exception('Blog not found')

        start = int(kwargs['start']) if ('start' in kwargs) else 0
        perpage = int(kwargs['perpage']) if ('perpage' in kwargs) else 20

        listResult = {
            'count': 0,
            'blog': None,
            'posts': None
        }

        blogRows = ('id', 'title', 'text', 'public', 'date', 'userId', 'userName')
        blogSql = '''select
            blog.id as "{0}",
            blog.title as "{1}",
            blog.text as "{2}",
            blog.public as "{3}",
            blog.date as "{4}",
            uTable.id as "{5}",
            uTable.login as "{6}"
            from blog
            left join "user" as uTable on blog.user_id = uTable.id
            where blog.id = %s
            ;'''.format(*blogRows)

        connection = self.connect_postgres()
        cursor = connection.cursor()
        cursor.execute(blogSql, [kwargs['blogId']])
        blogData = cursor.fetchone()

        if (blogData is None):
            connection.close()
            return listResult

        listResult['blog'] = self.list_to_dict(blogRows)(blogData)

        postRows = (
            'id', 'blogId', 'title', 'description', 'public', 'date',
            'userId', 'userName'
        )
        postSql = '''select
            post.id as {0},
            post.blog_id as {1},
            post.title as {2},
            post.description as {3},
            post.public as {4},
            post.date as {5},
            uTable.id as {6},
            uTable.login as {7}
            from post
            left join "user" as uTable on post.user_id = uTable.id
            where post.blog_id = %s
                and post.public = true
            order by post.{0} desc limit %s offset %s;
            ;'''.format(*postRows)

        cursor.execute(postSql, [
            kwargs['blogId'],
            perpage,
            start
        ])
        postData = cursor.fetchall()

        countSql = 'select count(id) from post where blog_id = %s;'
        cursor.execute(countSql, [
            kwargs['blogId']
        ])
        countData = cursor.fetchone()

        if (countData != None):
            listResult['count'] = countData[0]

        if (postData != None):
            listResult['posts'] = map(self.list_to_dict(postRows), postData)

        return listResult


    # get my post for edit
    def getPost(self, *args, **kwargs):
        if (not 'blogId' in kwargs):
            raise Exception('Blog not found')

        if (not 'id' in kwargs):
            raise Exception('Post not found')

        postSql = '''select
            blog.id as blogId,
            blog.user_id as userId,
            "user".login as userName,
            "user".email as userEmail,
            post.id as id,
            post.title as title,
            post.description as description,
            post.text as "text",
            post.public as "public",
            post.date as "date"
            from post
            left join blog
                on blog.id = post.blog_id
            left join "user"
                on "user".id = post.user_id
            where post.id = %s and blog.id = %s
            ;'''.format(BlogModel.TABLE, self.TABLE)

        connection = self.connect_postgres()
        cursor = connection.cursor()
        cursor.execute(postSql, [
            kwargs["id"],
            kwargs["blogId"]
        ])
        postData = cursor.fetchone()
        connection.close()

        if (postData is None):
            raise Exception('Blog not found')

        postRows = [
            "blogId", "userId", "userName", "userEmail", "id", "title", "description", "text", "public", "date"
        ]
        postDict = self.list_to_dict(postRows)(postData)

        if (
            postDict is None or
            postDict["blogId"] is None or
            postDict["id"] is None
        ):
            raise Exception('Post not found')


        return postDict
