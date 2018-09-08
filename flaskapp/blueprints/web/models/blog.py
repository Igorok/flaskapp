from flaskapp.blueprints.web.models.index import Model
from flaskapp.blueprints.web.models.user import UserModel
from datetime import datetime, timedelta


class BlogItem (Model):
    id = 0
    userId = ''
    userName = ''
    userEmail = ''
    title = ''
    text = ''
    date = ''
    public = False

    # create blog item
    def __init__(self, **kwargs):
        self.id = kwargs['id'] if 'id' in kwargs else None
        self.userId = kwargs['userId'] if 'userId' in kwargs else None
        self.userName = str(kwargs['userName']).strip() if 'userName' in kwargs else ''
        self.userEmail = str(kwargs['userEmail']).strip() if 'userEmail' in kwargs else ''
        self.title = str(kwargs['title']).strip() if 'title' in kwargs else ''
        self.text = str(kwargs['text']).strip() if 'text' in kwargs else ''
        self.public = kwargs['public'] if 'public' in kwargs else False

        if 'date' in kwargs:
            self.date = str(kwargs['date']).strip()
        else:
            self.date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # validate item
    def validate (self, **kwargs):
        __wrongFields = []

        if (self.userId == None):
            __wrongFields.append('userId')
        
        if (self.title == None or len(self.title) == 0):
            __wrongFields.append('title')
        
        if (
            self.text == None or 
            len(self.text) == 0 or 
            len(self.text) > 512
        ):
            __wrongFields.append('text')

        if (len(__wrongFields) > 0):
            raise Exception('Wrong fields ' + ', '.join(__wrongFields))


class BlogModel (Model):
    TABLE = 'blog'

    # get list of blogs
    def getBlogList (self, *args, **kwargs):
        start = int(kwargs['start']) if ('start' in kwargs) else 0
        perpage = int(kwargs['perpage']) if ('perpage' in kwargs) else 20
        userId = int(kwargs['userId']) if ('userId' in kwargs) else None

        blogParam = [perpage, start]
        countParam = []
        blogRows = [
            'id', 'user_id', 'title', 'text', 'date', 'public', 
            'login', 'email', 
            self.TABLE, UserModel.TABLE
        ]
        blogSql = '''select 
            bTable.{0}, bTable.{1}, bTable.{2}, bTable.{3}, bTable.{4}, bTable.{5}, 
            uTable.{6}, uTable.{7} from "{8}" as bTable
            left join "{9}" as uTable
            on bTable.user_id = uTable.id
            '''.format(*blogRows)
        countSql = 'select count(id) from {0} '.format(self.TABLE)

        blogKeys = ['id', 'userId', 'title', 'text', 'date', 'public', 'userName', 'userEmail']

        if (userId != None):
            blogSql += ' ,user_id = %s'
            countSql += ' ,user_id = %s'
            blogParam = [userId] + blogParam
            countParam = [userId] + countParam

        blogSql += ' order by id desc limit %s offset %s;'

        connection = self.connect_postgres()
        cursor = connection.cursor()
        cursor.execute(blogSql, blogParam)
        blogData = cursor.fetchall()

        cursor.execute(countSql)
        countData = cursor.fetchone()
        connection.close()

        listResult = {
            'count': 0,
            'blogs': []
        }
        if (countData != None):
            listResult['count'] = countData[0]
        
        if (blogData != None):
            listResult['blogs'] = map(self.list_to_dict(blogKeys), blogData)

        return listResult





        
    # get blog item
    def getBlog (self, *args, **kwargs):
        if (not 'id' in kwargs):
            raise Exception('Blog not found')

        uModel = UserModel()
        # check authentication and get data of current user
        profileDict = uModel.getUserByToken(**kwargs)

        connection = self.connect_postgres()
        cursor = connection.cursor()

        blogRows = [
            'id', 'user_id', 'title', 'text', 'date', 'public', 
            'login', 'email', 
            self.TABLE, UserModel.TABLE
        ]
        blogSql = '''select 
            bTable.{0}, bTable.{1}, bTable.{2}, bTable.{3},  bTable.{4}, bTable.{5}, 
            uTable.{6}, uTable.{7} from "{8}" as bTable
            left join "{9}" as uTable
            on bTable.user_id = uTable.id
            where bTable.{0} = %s
            ;'''.format(*blogRows)
        
        cursor.execute(blogSql, [kwargs["id"]])
        blogData = cursor.fetchone()
        connection.close()

        if (blogData == None):
            raise Exception('Blog not found')

        blogDict = self.list_to_dict(blogRows)(blogData)

        if (profileDict["id"] != blogDict["user_id"] and not blogDict["public"]):
            raise Exception('Blog not found')

        return dict(
            id = blogDict["id"],
            userId = blogDict["user_id"],
            userName = blogDict["login"],
            userEmail = blogDict["email"],
            title = blogDict["title"],
            text = blogDict["text"],
            date = blogDict["date"],
            public = blogDict["public"],
        )

    # add new item to blog
    def addBlog(self, *args, **kwargs):
        uModel = UserModel()
        # check authentication and get data of current user
        profileDict = uModel.getUserByToken(**kwargs)

        blogItem = BlogItem(
            title = kwargs['title'],
            text = kwargs['text'],
            userId = profileDict['id'],
            public = kwargs['public'],
        )
        blogItem.validate()

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


    # edit current blog
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
